# Catalog Admin — Category Management (Phase 2)

**Date:** 2026-07-01
**Project:** Meat Connection (meat-connection.vercel.app)
**Status:** Approved design — ready for implementation
**Builds on:** `2026-06-27-catalog-admin-simplify.md` (the editor, GitHub-commit backend, and auth are unchanged). This adds the "Categorías" admin section that phase 1 left as a placeholder (`AdminApp.jsx` — "llega en la próxima fase").

## Why

Category data is currently scattered across four files and has already drifted:

- `src/products.js` — `CATEGORIES = ['jp', 'mackas', 'au', 'kingriver', 'us']` (storage keys).
- `src/i18n.jsx` — ES + EN `categories` label maps. **Missing a `kingriver` label.**
- `src/app.jsx` — hardcoded filter-chip list `[all, jp, au, us, mackas]` (**missing `kingriver`**), plus `CAT_SLUG`/`SLUG_CAT`/`DISPLAY_CAT` maps and a `genericOrigin` branch.
- `api/save-products.js` — its own hardcoded `CATEGORIES` Set for validation.
- `build-sitemap.mjs` — its own hardcoded `CAT_SLUG` map.

A hidden `DISPLAY_CAT` mapping folds the `kingriver` storage tag (22 products — the largest group) into the `au` ("Wagyu Australiano") shopper filter, a leftover from the earlier "consolidate to 4 brand-free categories" work. The result: five storage keys but four shopper-facing filters, kept in sync by hand across five files.

Phase 2 unifies category data into **one committable source of truth** and gives the non-technical owner a UI to add, rename, reorder, and safely delete categories.

## Decisions (locked)

1. **Flatten the two-level model.** Re-tag all `kingriver` products as `au` (no visible change — they already display as Australian) and delete the `DISPLAY_CAT` indirection. One clean list of categories shared by shoppers, the product editor, and the category manager.
2. **Safe delete.** Deleting a category is allowed only when it has **zero products**; otherwise the delete control is disabled. No product is ever orphaned.
3. **Embed categories in `products.json`.** Single file, single atomic GitHub commit, single rebuild — the save pipeline already commits this file.

## Data Model

`src/products.json` changes from a bare product array to a wrapper object:

```jsonc
{
  "categories": [
    { "key": "jp",     "slug": "a5-japones",       "label": { "es": "A5 Japonés",       "en": "A5 Japanese" } },
    { "key": "au",     "slug": "wagyu-australiano", "label": { "es": "Wagyu Australiano", "en": "Australian Wagyu" } },
    { "key": "us",     "slug": "wagyu-americano",   "label": { "es": "Wagyu Americano",   "en": "American Wagyu" } },
    { "key": "mackas", "slug": "black-angus",       "label": { "es": "Black Angus",       "en": "Black Angus" } }
  ],
  "products": [ /* …unchanged product objects… */ ]
}
```

Category fields:

- `key` — short internal id stored on every product as `p.cat` (e.g. `au`). **Stable forever** once created; never changes on rename.
- `slug` — SEO URL segment (`/catalogo/wagyu-australiano`). Auto-generated from the ES label **once, at creation**, then **frozen**. Renaming a label never changes the slug, so existing URLs and shared links keep working.
- `label.es` / `label.en` — shopper- and owner-facing names. Freely editable.

**Array order = shopper filter order.** `all` ("Todos"/"All") remains a UI-only pseudo-filter in `i18n.jsx`; it is not a stored category.

## One-Time Migration (throwaway script)

A script rewrites `src/products.json` in place:

1. Re-tag every product with `cat === 'kingriver'` to `cat: 'au'`.
2. Wrap the array: `{ categories: [...4 seed categories...], products: [...] }`, seeding category labels from the current `i18n.jsx` `categories` maps and slugs from the current `CAT_SLUG` in `app.jsx`.
3. Seed order: `jp`, `au`, `us`, `mackas` (current shopper-filter order).

Verify after: build passes; `au` count = old `au` + old `kingriver` (17 + 22 = 39); no product references a category key absent from `categories`.

## Storefront Rendering

- `src/products.js` — import the wrapper; `PRODUCTS`/`PRODUCT_STRINGS`/etc. derive from `data.products`. Add exports derived from `data.categories`:
  - `CATEGORY_LIST` — ordered `[{ key, slug, label }]`.
  - `CATEGORIES` — ordered array of keys (kept for admin/validation back-compat).
  - `CATEGORY_LABEL` — `{ [key]: { es, en } }` lookup.
  - `CAT_SLUG` / `SLUG_CAT` — derived from the category list (move out of `app.jsx`).
  - `RAW_CATALOG` continues to expose the product array (deep-cloned); add `RAW_CATEGORIES` (deep-cloned category list) for the admin.
- `src/app.jsx`:
  - Filter chips derive from `CATEGORY_LIST` (prepend the `all` pseudo-entry) — replaces the hardcoded line-684 array and permanently fixes the drift.
  - Category eyebrow/labels read from `CATEGORY_LABEL[key][lang]` instead of `t.categories[key]`.
  - Remove `DISPLAY_CAT` and `catOf`'s remapping; `p.cat` is now the display category directly.
  - `genericOrigin` (per-category fallback origin text when a product's own `origin` is empty) stays a small map keyed on the legacy `jp`/`us`/`au` keys with the existing default. Categories without an entry (e.g. newly added) simply show no Origen tab when the product's `origin` is empty. Per-category origin text is a future enhancement, not phase 2.
- `src/i18n.jsx` — remove the per-key entries (`jp`/`au`/`us`/`mackas`) from `categories`; keep `all`. Footer `catalogItems` and hero category lists stay static marketing copy (non-goal — see below).
- `build-sitemap.mjs` — read category slugs from `products.json`'s `categories` instead of its own hardcoded `CAT_SLUG` map; emit one `/catalogo/:slug` URL per category.

## Admin "Categorías" Section

Replaces the placeholder card in `AdminApp.jsx`. Follows existing product-list patterns (the shared `move()` helper for reorder, existing `btn`/`btnDanger`/`card` styles, same save flow). New file `src/admin/CategoriesEditor.jsx`.

- Admin loads `RAW_CATEGORIES` into state alongside the catalog.
- Ordered list; each row shows: reorder ↑/↓ arrows · **ES label input** · **EN label input** (inline) · a product-count badge (count of products whose `cat` === this key) · delete (⌫) button.
- **Delete** is disabled (with a title/tooltip explaining why) when the count > 0. Enabled only at count 0.
- **+ Agregar categoría** appends a new row; `key` and `slug` are auto-generated from the ES label (slugify; ensure uniqueness against existing keys/slugs by suffixing if needed). Key/slug are not directly editable by the owner.
- Product editor's category `Select` shows **labels** (value = key, display = `label.es`) instead of raw keys.
- Category changes commit together with product changes via the existing **"Guardar y publicar"** button — one save, one commit.

### Admin validation (client, before save)

- Each category: non-empty unique `key`, non-empty unique `slug`, non-empty `label.es` and `label.en`.
- Every product's `cat` must match an existing category `key`.
- Reuse the existing status-banner pattern; error messages name the offending category.

## Server (`api/save-products.js`)

- Accept `{ password, products, categories }` (was `{ password, products }`).
- Validate `categories`: non-empty array; each entry has unique non-empty `key` and `slug` (string), and `label.es`/`label.en` non-empty strings.
- Replace the hardcoded `CATEGORIES` Set: validate each `product.cat` against the **submitted** category keys. This removes the last hardcoded category source.
- Commit the wrapper object `{ categories, products }` to `src/products.json` (same single-file GitHub PUT flow, unchanged otherwise). Serialize with the same 2-space `JSON.stringify` + trailing newline.

## Files

- `src/products.json` — migrated to `{ categories, products }`.
- `scripts/migrate-categories.mjs` (or an inline throwaway) — one-time migration; can be removed after.
- `src/products.js` — read wrapper; add category exports; derive `CAT_SLUG`/`SLUG_CAT`.
- `src/app.jsx` — derive filter chips + labels from category data; remove `DISPLAY_CAT`/local `CAT_SLUG`.
- `src/i18n.jsx` — drop per-key category labels; keep `all`.
- `src/admin/AdminApp.jsx` — load/edit/save categories; label-based category dropdown; render new section.
- `src/admin/CategoriesEditor.jsx` — **new** category-management UI.
- `api/save-products.js` — new payload shape + category validation; commit wrapper.
- `build-sitemap.mjs` — read slugs from `products.json` categories.

## Testing

- **Migration:** build passes; `au` product count = 39; no product `cat` is missing from `categories`; storefront renders all products under the correct four filters; `kingriver` no longer appears anywhere.
- **Storefront:** four filter chips render in order; renaming a label updates chips + eyebrows but the URL slug is unchanged; a product with empty `origin` in a legacy category still shows the generic origin.
- **Admin:** add a category (key/slug auto-generated) → appears in product dropdown; rename ES/EN labels; reorder → shop filter order follows; delete blocked while count > 0, allowed at 0; save round-trips categories + products.
- **Sitemap:** `build-sitemap.mjs` emits one `/catalogo/:slug` per category, matching the category slugs.
- **E2E (after env vars):** a real save commits the wrapper `products.json`, and the site rebuilds with the changes live.

## Non-Goals

Per-category origin text editor, category images/thumbnails, draft/preview, and auto-derived marketing copy (footer `catalogItems`, hero category lists stay static). Directly editing a category's `key` or `slug`. Simplicity for the non-technical owner is the point.
