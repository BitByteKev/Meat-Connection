// Single source of truth for the PUBLIC category taxonomy (the buckets shown in
// the storefront filter, footer, and URLs). Edited by the admin Categorías
// section and committed to categories.json; consumed by the storefront app,
// products.js, the admin, and the sitemap generator.
//
// Each entry: { key, slug, es, en, aliases }
//   key     — internal category code stored on products (e.g. "au")
//   slug    — URL segment for /catalogo/<slug>
//   es/en   — display label per language
//   aliases — other internal cats that display + filter under this one
//             (folds legacy sub-brand codes into a parent category; currently
//             none — the former "kingriver" products were re-tagged to "au")
import CATEGORIES from './categories.json'

export const CATEGORY_LIST = CATEGORIES
export const CATEGORY_KEYS = CATEGORIES.map((c) => c.key)

export const CAT_SLUG = Object.fromEntries(CATEGORIES.map((c) => [c.key, c.slug]))
export const SLUG_CAT = Object.fromEntries(CATEGORIES.map((c) => [c.slug, c.key]))

// Internal cat (key or alias) -> display key. Identity for each key, plus every
// alias mapped onto its parent.
export const DISPLAY_CAT = (() => {
  const m = {}
  for (const c of CATEGORIES) {
    m[c.key] = c.key
    for (const a of c.aliases || []) m[a] = c.key
  }
  return m
})()

export const catOf = (p) => DISPLAY_CAT[p.cat] || p.cat

export function catLabel(key, lang) {
  const c = CATEGORIES.find((x) => x.key === key)
  return c ? c[lang] || c.es || key : key
}

// Every internal category key a product may carry (display keys + aliases) —
// the selectable set for the admin product dropdown, so any legacy alias values
// still on a product stay valid. (No aliases in use at present.)
export const ALL_CAT_KEYS = (() => {
  const out = []
  for (const c of CATEGORIES) {
    out.push(c.key)
    for (const a of c.aliases || []) out.push(a)
  }
  return out
})()
