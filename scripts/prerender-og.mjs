// Post-build: prerender a static HTML shell per product so social crawlers
// (WhatsApp, Facebook, iMessage) — which don't run JS — see product-specific
// OG tags with the product photo. Humans still get the SPA: these shells load
// the same bundle, and Vercel serves them from the filesystem before the
// /producto/(.*) rewrite kicks in. Runs as part of `npm run build`, and every
// admin save triggers a rebuild, so the pages stay in sync with the catalog.
import { readFileSync, writeFileSync, readdirSync, mkdirSync } from 'node:fs'
import { createHash } from 'node:crypto'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const SITE = 'https://meat-connection.vercel.app'

const catalog = JSON.parse(readFileSync(join(root, 'src/products.json'), 'utf8'))
const template = readFileSync(join(root, 'dist/index.html'), 'utf8')

// Same slug rules as PRODUCT_SLUG in src/app.jsx so URLs match the SPA router.
const slugify = (s) => (s || '').toString().normalize('NFD').replace(/[̀-ͯ]/g, '')
  .toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

// Map a source image in /images to the hashed asset the vite build emitted.
// Matched by CONTENT, not filename: vite dedupes byte-identical files and only
// emits one of them, so name-based matching misses the duplicates.
const md5 = (buf) => createHash('md5').update(buf).digest('hex')
const assetByContent = new Map(
  readdirSync(join(root, 'dist/assets'))
    .filter((a) => /\.webp$/i.test(a))
    .map((a) => [md5(readFileSync(join(root, 'dist/assets', a))), a])
)
const hashedAsset = (file) => {
  try {
    const hit = assetByContent.get(md5(readFileSync(join(root, 'images', file))))
    return hit ? `${SITE}/assets/${hit}` : null
  } catch { return null }
}
const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

const esc = (s) => (s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
const setMeta = (html, attr, key, value) =>
  html.replace(new RegExp(`(<meta ${attr}="${escapeRe(key)}" content=")[^"]*(">)`), `$1${value}$2`)

let done = 0
const missing = []
const seen = {}
for (const p of catalog) {
  const nm = (p.es && p.es.name) || p.id
  const base = slugify(nm) || slugify(p.id)
  const slug = seen[base] == null ? ((seen[base] = 0), base) : `${base}-${++seen[base]}`
  const cover = (p.images || [])[0]
  const img = cover && hashedAsset(cover)
  if (!img) { missing.push(p.id); continue } // falls back to the SPA rewrite + generic OG card

  const title = esc(`${nm} · Meat Connection`)
  const firstLine = ((p.es && p.es.description) || '').split('\n').map((l) => l.trim()).find(Boolean) || ''
  const desc = esc(firstLine.slice(0, 200) || 'Carne premium de importación directa. Cotiza por WhatsApp.')
  const url = `${SITE}/producto/${slug}`

  let html = template
    .replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`)
    .replace(/(<link rel="canonical" href=")[^"]*(">)/, `$1${url}$2`)
    .replace(/(<meta property="og:image:type" content=")[^"]*(">)/, '$1image/webp$2')
    .replace(/<meta property="og:image:width" content="[^"]*">\s*/, '')
    .replace(/<meta property="og:image:height" content="[^"]*">\s*/, '')
  html = setMeta(html, 'name', 'description', desc)
  html = setMeta(html, 'property', 'og:title', title)
  html = setMeta(html, 'property', 'og:description', desc)
  html = setMeta(html, 'property', 'og:url', url)
  html = setMeta(html, 'property', 'og:image', img)
  html = setMeta(html, 'property', 'og:image:alt', title)
  html = setMeta(html, 'name', 'twitter:title', title)
  html = setMeta(html, 'name', 'twitter:description', desc)
  html = setMeta(html, 'name', 'twitter:image', img)

  const dir = join(root, 'dist/producto', slug)
  mkdirSync(dir, { recursive: true })
  writeFileSync(join(dir, 'index.html'), html)
  done++
}
console.log(`prerender-og: ${done} product pages written` + (missing.length ? ` · sin foto en dist/assets: ${missing.join(', ')}` : ''))
