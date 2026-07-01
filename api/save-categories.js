// Vercel serverless function — commits src/categories.json to GitHub (admin
// Categorías section), triggering Vercel's normal rebuild. Mirrors
// save-products.js: same auth + GitHub commit flow.
//
// Request:  POST { password, categories }
// Env vars: ADMIN_PASSWORD, GITHUB_TOKEN  (+ optional GITHUB_REPO, GITHUB_BRANCH)
import { timingSafeEqual } from 'node:crypto'

const REPO = process.env.GITHUB_REPO || 'BitByteKev/Meat-Connection'
const BRANCH = process.env.GITHUB_BRANCH || 'main'
const FILE_PATH = 'src/categories.json'
const CODE = /^[a-z0-9][a-z0-9-]*$/

function passwordMatches(given, expected) {
  if (typeof given !== 'string' || typeof expected !== 'string' || !expected) return false
  const a = Buffer.from(given), b = Buffer.from(expected)
  if (a.length !== b.length) { timingSafeEqual(b, b); return false }
  return timingSafeEqual(a, b)
}

function validateCategories(cats) {
  if (!Array.isArray(cats)) return 'categories must be an array'
  if (cats.length === 0) return 'categories is empty'
  const keys = new Set(), slugs = new Set()
  for (let i = 0; i < cats.length; i++) {
    const c = cats[i], at = `categories[${i}]`
    if (!c || typeof c !== 'object') return `${at} is not an object`
    for (const f of ['key', 'slug', 'es', 'en']) {
      if (typeof c[f] !== 'string' || !c[f].trim()) return `${at}.${f} is required`
    }
    if (!CODE.test(c.key)) return `${at}.key must be lowercase alphanumeric/dashes`
    if (!CODE.test(c.slug)) return `${at}.slug must be lowercase alphanumeric/dashes`
    if (keys.has(c.key)) return `duplicate key "${c.key}"`
    if (slugs.has(c.slug)) return `duplicate slug "${c.slug}"`
    keys.add(c.key); slugs.add(c.slug)
    if ('aliases' in c) {
      if (!Array.isArray(c.aliases)) return `${at}.aliases must be an array`
      if (!c.aliases.every((a) => typeof a === 'string' && CODE.test(a))) return `${at}.aliases must be category codes`
    }
  }
  return null
}

async function github(path, init) {
  return fetch(`https://api.github.com${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
      'User-Agent': 'meat-connection-admin',
      ...(init && init.headers),
    },
  })
}

export default async function handler(req, res) {
  if (req.method !== 'POST') { res.setHeader('Allow', 'POST'); return res.status(405).json({ error: 'method_not_allowed' }) }
  if (!process.env.ADMIN_PASSWORD || !process.env.GITHUB_TOKEN) return res.status(500).json({ error: 'server_misconfigured' })

  let body = req.body
  if (typeof body === 'string') { try { body = JSON.parse(body) } catch { return res.status(400).json({ error: 'bad_json' }) } }
  const { password, categories } = body || {}
  if (!passwordMatches(password, (process.env.ADMIN_PASSWORD || '').trim())) return res.status(401).json({ error: 'unauthorized' })

  const invalid = validateCategories(categories)
  if (invalid) return res.status(400).json({ error: 'invalid_payload', detail: invalid })

  const normalized = categories.map((c) => ({ key: c.key, slug: c.slug, es: c.es.trim(), en: c.en.trim(), aliases: c.aliases || [] }))
  const content = JSON.stringify(normalized, null, 2) + '\n'
  const encoded = Buffer.from(content, 'utf8').toString('base64')

  try {
    let sha
    const getRes = await github(`/repos/${REPO}/contents/${FILE_PATH}?ref=${BRANCH}`)
    if (getRes.ok) sha = (await getRes.json()).sha
    else if (getRes.status !== 404) return res.status(502).json({ error: 'github_read_failed', status: getRes.status, detail: await getRes.text() })

    const putRes = await github(`/repos/${REPO}/contents/${FILE_PATH}`, {
      method: 'PUT',
      body: JSON.stringify({ message: 'Update categories via admin', content: encoded, branch: BRANCH, ...(sha ? { sha } : {}) }),
    })
    if (!putRes.ok) return res.status(502).json({ error: 'github_write_failed', status: putRes.status, detail: await putRes.text() })
    const out = await putRes.json()
    return res.status(200).json({ ok: true, commit: out.commit && out.commit.sha })
  } catch (e) {
    return res.status(502).json({ error: 'github_request_error', detail: String(e && e.message || e) })
  }
}
