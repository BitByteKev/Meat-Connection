// Vercel serverless function — deletes an image from the repo's /images folder via
// GitHub (admin Media library). Triggers Vercel's normal rebuild.
//
// Request:  POST { password, filename }
// Env vars: ADMIN_PASSWORD, GITHUB_TOKEN  (+ optional GITHUB_REPO, GITHUB_BRANCH)
import { timingSafeEqual } from 'node:crypto'

const REPO = process.env.GITHUB_REPO || 'BitByteKev/Meat-Connection'
const BRANCH = process.env.GITHUB_BRANCH || 'main'
const SAFE_NAME = /^[a-z0-9][a-z0-9._-]*\.webp$/i

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
  const { password, filename } = body || {}
  if (!passwordMatches(password, (process.env.ADMIN_PASSWORD || '').trim())) return res.status(401).json({ error: 'unauthorized' })
  if (typeof filename !== 'string' || !SAFE_NAME.test(filename) || filename.includes('..')) return res.status(400).json({ error: 'bad_filename' })

  const path = `images/${filename}`
  try {
    const getRes = await github(`/repos/${REPO}/contents/${path}?ref=${BRANCH}`)
    if (getRes.status === 404) return res.status(200).json({ ok: true, alreadyGone: true })
    if (!getRes.ok) return res.status(502).json({ error: 'github_read_failed', status: getRes.status, detail: await getRes.text() })
    const sha = (await getRes.json()).sha
    const delRes = await github(`/repos/${REPO}/contents/${path}`, {
      method: 'DELETE',
      body: JSON.stringify({ message: `Delete image via admin: ${filename}`, sha, branch: BRANCH }),
    })
    if (!delRes.ok) return res.status(502).json({ error: 'github_delete_failed', status: delRes.status, detail: await delRes.text() })
    return res.status(200).json({ ok: true })
  } catch (e) {
    return res.status(502).json({ error: 'github_request_error', detail: String(e && e.message || e) })
  }
}
