// Single source of truth for the product catalog.
// Loads the ordered catalog from products.json and derives everything the app needs:
//   - PRODUCTS:        [{ id, cat, tone, image }]            (storefront grid + filters)
//   - MC_IMG:          { [id]: bundledImageURL }             (product photos, by id)
//   - PRODUCT_STRINGS: { es: {...}, en: {...} }              (name/badge/desc/details per id, per lang)
// The admin page edits products.json (committed via the serverless function); the public
// site reads it at build time and stays fully static.
import catalog from './products.json'

// Map every image in /images to its bundled URL, keyed by filename, so a product can
// reference any existing photo by name without a code change.
const imageModules = import.meta.glob('../images/*.webp', { eager: true, import: 'default' })
const imageByFile = {}
for (const path in imageModules) {
  const file = path.slice(path.lastIndexOf('/') + 1)
  imageByFile[file] = imageModules[path]
}

export const PRODUCTS = catalog.map(({ id, cat, tone, image }) => ({ id, cat, tone, image }))

export const MC_IMG = Object.fromEntries(
  catalog.map((p) => [p.id, imageByFile[p.image]]),
)

function stringsForLang(lang) {
  const obj = {}
  for (const p of catalog) {
    obj[p.id] = {
      name: p[lang].name,
      badge: p.badge[lang],
      desc: p[lang].desc,
      details: p[lang].details,
    }
  }
  return obj
}

export const PRODUCT_STRINGS = { es: stringsForLang('es'), en: stringsForLang('en') }
