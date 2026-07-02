// Vercel serverless function — verifies the admin password at login. The write
// endpoints (save/upload/delete/generate) were always protected server-side;
// this closes the login gate itself, which previously accepted any password
// and only failed later on the first save.
//
// Request:  POST { password }
// Env vars: ADMIN_PASSWORD
import { timingSafeEqual } from 'node:crypto'

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

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'method_not_allowed' })
  }
  if (!process.env.ADMIN_PASSWORD) {
    return res.status(500).json({ error: 'server_misconfigured' })
  }

  let body = req.body
  if (typeof body === 'string') {
    try { body = JSON.parse(body) } catch { return res.status(400).json({ error: 'bad_json' }) }
  }
  const { password } = body || {}

  // Trim the stored value so a stray pasted newline/space in the env var can't lock out the owner.
  if (!passwordMatches(password, (process.env.ADMIN_PASSWORD || '').trim())) {
    return res.status(401).json({ error: 'unauthorized' })
  }
  return res.status(200).json({ ok: true })
}
