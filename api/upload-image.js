// Vercel serverless function — commits an admin-uploaded product image (webp) to
// the repo's /images folder via GitHub, which triggers Vercel's normal rebuild.
//
// Request:  POST { password, filename, content }   (content = base64 webp bytes)
// Env vars: ADMIN_PASSWORD, GITHUB_TOKEN  (+ optional GITHUB_REPO, GITHUB_BRANCH)
import { timingSafeEqual } from 'node:crypto'

const REPO = process.env.GITHUB_REPO || 'BitByteKev/Meat-Connection'
const BRANCH = process.env.GITHUB_BRANCH || 'main'
const SAFE_NAME = /^[a-z0-9][a-z0-9._-]*\.webp$/i
const MAX_B64 = 8_000_000 // ~6 MB image

function passwordMatches(given, expected) {
  if (typeof given !== 'string' || typeof expected !== 'string' || !expected) return false
  const a = Buffer.from(given), b = Buffer.from(expected)
  if (a.length !== b.length) { timingSafeEqual(b, b); return false }
  return timingSafeEqual(a, b)
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
  const { password, filename, content } = body || {}

  if (!passwordMatches(password, (process.env.ADMIN_PASSWORD || '').trim())) return res.status(401).json({ error: 'unauthorized' })
  if (typeof filename !== 'string' || !SAFE_NAME.test(filename) || filename.includes('..')) return res.status(400).json({ error: 'bad_filename' })
  if (typeof content !== 'string' || content.length < 24 || content.length > MAX_B64) return res.status(400).json({ error: 'bad_content' })

  const path = `images/${filename}`
  try {
    // Overwrite is allowed; look up the existing SHA if present.
    let sha
    const getRes = await github(`/repos/${REPO}/contents/${path}?ref=${BRANCH}`)
    if (getRes.ok) { sha = (await getRes.json()).sha }
    else if (getRes.status !== 404) { return res.status(502).json({ error: 'github_read_failed', status: getRes.status, detail: await getRes.text() }) }

    const putRes = await github(`/repos/${REPO}/contents/${path}`, {
      method: 'PUT',
      body: JSON.stringify({ message: `Upload image via admin: ${filename}`, content, branch: BRANCH, ...(sha ? { sha } : {}) }),
    })
    if (!putRes.ok) return res.status(502).json({ error: 'github_write_failed', status: putRes.status, detail: await putRes.text() })
    return res.status(200).json({ ok: true, filename })
  } catch (e) {
    return res.status(502).json({ error: 'github_request_error', detail: String(e && e.message || e) })
  }
}
