// build-sitemap.mjs — regenerate public/sitemap.xml from the catalog.
// Uses the SAME slug logic as src/app.jsx (Spanish name, deduped) so the URLs match.
//   node build-sitemap.mjs
import { readFileSync, writeFileSync } from 'node:fs'

const BASE = 'https://meat-connection.vercel.app'
const TODAY = new Date().toISOString().slice(0, 10)
const catalog = JSON.parse(readFileSync('./src/products.json', 'utf8'))
const categories = JSON.parse(readFileSync('./src/categories.json', 'utf8'))

function slugify(s) {
  return (s || '').toString().normalize('NFD').replace(/[̀-ͯ]/g, '')
    .toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

// Product slugs — deduped in catalog order (matches app.jsx).
const seen = {}
const productSlugs = catalog.map((p) => {
  const base = slugify((p.es && p.es.name) || p.id) || slugify(p.id)
  return seen[base] == null ? (seen[base] = 0, base) : `${base}-${++seen[base]}`
})

const urls = [['/', '1.0', 'weekly'], ['/catalogo', '0.9', 'weekly']]
for (const c of categories) urls.push([`/catalogo/${c.slug}`, '0.8', 'weekly'])
for (const s of productSlugs) urls.push([`/producto/${s}`, '0.7', 'monthly'])

const body = urls.map(([path, priority, freq]) =>
  `  <url>\n    <loc>${BASE}${path}</loc>\n    <lastmod>${TODAY}</lastmod>\n    <changefreq>${freq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`
).join('\n')
writeFileSync('./public/sitemap.xml',
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`, 'utf8')
console.log(`Wrote ${urls.length} URLs to public/sitemap.xml`)
