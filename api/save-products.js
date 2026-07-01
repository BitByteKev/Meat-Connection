// Vercel serverless function — the ONLY server-side code in the project.
// Authenticates an admin save and commits src/products.json to GitHub, which
// triggers Vercel's normal rebuild. No database, no always-on backend.
//
// Request:  POST { password, products }
// Env vars: ADMIN_PASSWORD, GITHUB_TOKEN  (+ optional GITHUB_REPO, GITHUB_BRANCH)
import { timingSafeEqual } from 'node:crypto'

const REPO = process.env.GITHUB_REPO || 'BitByteKev/Meat-Connection'
const BRANCH = process.env.GITHUB_BRANCH || 'main'
const FILE_PATH = 'src/products.json'
const CATEGORIES = new Set(['jp', 'mackas', 'au', 'kingriver', 'us'])

// Constant-time string compare that doesn't leak length via early return.
function passwordMatches(given, expected) {
  if (typeof given !== 'string' || typeof expected !== 'string' || !expected) return false
  const a = Buffer.from(given)
  const b = Buffer.from(expected)
  if (a.length !== b.length) {
    // Still run a compare to keep timing roughly constant, then fail.
    timingSafeEqual(b, b)
    return false
  }
  return timingSafeEqual(a, b)
}

// Defensive re-validation of the payload before it can be committed.
function validateCatalog(products) {
  if (!Array.isArray(products)) return 'products must be an array'
  if (products.length === 0) return 'products is empty'
  const ids = new Set()
  for (let i = 0; i < products.length; i++) {
    const p = products[i]
    const at = `products[${i}]`
    if (!p || typeof p !== 'object') return `${at} is not an object`
    if (typeof p.id !== 'string' || !p.id.trim()) return `${at}.id is required`
    if (ids.has(p.id)) return `duplicate id "${p.id}"`
    ids.add(p.id)
    if (!CATEGORIES.has(p.cat)) return `${at}.cat must be one of jp|mackas|au|kingriver|us`
    if (typeof p.tone !== 'string' || !p.tone) return `${at}.tone is required`
    if (!Array.isArray(p.images) || p.images.length === 0) return `${at}.images must be a non-empty array`
    if (!p.images.every((f) => typeof f === 'string' && f)) return `${at}.images must be filenames`
    if ('available' in p && typeof p.available !== 'boolean') return `${at}.available must be a boolean`
    for (const f of ['sku', 'weight']) {
      if (f in p && typeof p[f] !== 'string') return `${at}.${f} must be a string`
    }
    if ('marbling' in p && p.marbling !== null) {
      const mb = p.marbling
      if (typeof mb !== 'object' || typeof mb.system !== 'string' || !Array.isArray(mb.variants)) return `${at}.marbling must be {system, variants[]}`
      for (let k = 0; k < mb.variants.length; k++) {
        const v = mb.variants[k]
        if (!v || typeof v !== 'object') return `${at}.marbling.variants[${k}] is not an object`
        if (!Number.isFinite(v.lo) || !Number.isFinite(v.hi)) return `${at}.marbling.variants[${k}] needs numeric lo/hi`
        if (typeof v.image !== 'string') return `${at}.marbling.variants[${k}].image must be a string`
      }
    }
    if (!p.badge || typeof p.badge !== 'object') return `${at}.badge object is required`
    for (const lang of ['es', 'en']) {
      const badge = p.badge[lang]
      if (badge !== null && typeof badge !== 'string') return `${at}.badge.${lang} must be string or null`
      const L = p[lang]
      if (!L || typeof L !== 'object') return `${at}.${lang} object is required`
      if (typeof L.name !== 'string' || !L.name.trim()) return `${at}.${lang}.name is required`
      for (const field of ['description', 'origin', 'cooking']) {
        if (typeof L[field] !== 'string') return `${at}.${lang}.${field} must be a string`
      }
    }
  }
  return null
}

async function github(path, init) {
  const res = await fetch(`https://api.github.com${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
      'User-Agent': 'meat-connection-admin',
      ...(init && init.headers),
    },
  })
  return res
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'method_not_allowed' })
  }
  if (!process.env.ADMIN_PASSWORD || !process.env.GITHUB_TOKEN) {
    return res.status(500).json({ error: 'server_misconfigured' })
  }

  // Vercel parses JSON bodies automatically; fall back to manual parse just in case.
  let body = req.body
  if (typeof body === 'string') {
    try { body = JSON.parse(body) } catch { return res.status(400).json({ error: 'bad_json' }) }
  }
  const { password, products } = body || {}

  // Trim the stored value so a stray pasted newline/space in the env var can't lock out the owner.
  if (!passwordMatches(password, (process.env.ADMIN_PASSWORD || '').trim())) {
    return res.status(401).json({ error: 'unauthorized' })
  }

  const invalid = validateCatalog(products)
  if (invalid) return res.status(400).json({ error: 'invalid_payload', detail: invalid })

  const content = JSON.stringify(products, null, 2) + '\n'
  const encoded = Buffer.from(content, 'utf8').toString('base64')

  try {
    // Get the current file SHA (required to update an existing file).
    let sha
    const getRes = await github(`/repos/${REPO}/contents/${FILE_PATH}?ref=${BRANCH}`)
    if (getRes.ok) {
      const cur = await getRes.json()
      sha = cur.sha
    } else if (getRes.status !== 404) {
      const detail = await getRes.text()
      return res.status(502).json({ error: 'github_read_failed', status: getRes.status, detail })
    }

    const putRes = await github(`/repos/${REPO}/contents/${FILE_PATH}`, {
      method: 'PUT',
      body: JSON.stringify({
        message: 'Update catalog via admin',
        content: encoded,
        branch: BRANCH,
        ...(sha ? { sha } : {}),
      }),
    })
    if (!putRes.ok) {
      const detail = await putRes.text()
      return res.status(502).json({ error: 'github_write_failed', status: putRes.status, detail })
    }
    const out = await putRes.json()
    return res.status(200).json({ ok: true, commit: out.commit && out.commit.sha })
  } catch (e) {
    return res.status(502).json({ error: 'github_request_error', detail: String(e && e.message || e) })
  }
}
