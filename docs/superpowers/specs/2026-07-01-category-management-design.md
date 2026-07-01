# Catalog Admin — Category Management (Phase 2)

**Date:** 2026-07-01
**Project:** Meat Connection (meat-connection.vercel.app)
**Status:** Shipped — this document records the design as actually built.
**Builds on:** `2026-06-27-catalog-admin-simplify.md` (the editor, GitHub-commit backend, and auth are unchanged). This adds the "Categorías" admin section that phase 1 left as a placeholder.

> **Note on history.** An earlier draft of this spec proposed embedding categories inside `products.json` and flattening the `kingriver` group into `au`. The implementation took a different, cleaner path: a **separate `categories.json`** taxonomy file with an **alias model** that keeps `kingriver` as a hidden alias of `au` (no re-tagging of 22 products, no data migration). This document now describes what shipped, not the original proposal.

## Why

Before phase 2, category data was scattered and had already drifted across `products.js`, `i18n.jsx`, `app.jsx`, `api/save-products.js`, and `build-sitemap.mjs` — five hand-synced copies, one of them (`kingriver`) missing from the shopper filter and label maps. Phase 2 unifies the public taxonomy into **one committable source of truth** (`categories.json`) and gives the non-technical owner a UI to add, rename, reorder, and safely delete categories.

## Decisions (as shipped)

1. **Separate `categories.json`, not embedded.** The taxonomy lives in its own file, committed and rebuilt independently of the product catalog. Two small files with clear ownership instead of one large wrapper. `products.json` stays a bare product array (no schema change to the catalog file).
2. **Alias model, not flatten.** `kingriver` (22 products, the largest group) remains a real storage key on those products, declared as an **alias** of `au`. The storefront folds aliases into their parent for display and filtering. No product was re-tagged and no migration script was needed. Adding future sub-brands under an existing filter is a one-line `aliases` edit.
3. **Safe delete.** A category can be deleted only when **zero** products reference it *or any of its aliases*; otherwise the delete control is disabled with an explanatory tooltip. No product is ever orphaned.
4. **Keys and slugs are stable once created.** A category's internal `key` (stored on products) and `slug` (its `/catalogo/<slug>` URL) never change on rename, so existing product references and shared links keep working. Labels are freely editable.

## Data Model

### `src/categories.json` — the public taxonomy

An ordered array; **array order is the shopper filter order**.

```json
[
  { "key": "jp",     "slug": "a5-japones",       "es": "A5 Japonés",       "en": "A5 Japanese",      "aliases": [] },
  { "key": "au",     "slug": "wagyu-australiano","es": "Wagyu Australiano","en": "Australian Wagyu", "aliases": ["kingriver"] },
  { "key": "us",     "slug": "wagyu-americano",  "es": "Wagyu Americano",  "en": "American Wagyu",   "aliases": [] },
  { "key": "mackas", "slug": "black-angus",      "es": "Black Angus",      "en": "Black Angus",      "aliases": [] }
]
```

Category fields:

- `key` — internal id stored on every product as `p.cat`. **Stable forever**; never changes on rename.
- `slug` — SEO URL segment. Auto-generated from the ES label at creation, then frozen.
- `es` / `en` — display labels (flat strings, not a nested `label` object). Freely editable.
- `aliases` — other internal cat codes that display and filter **under** this category. Products carrying an alias code (e.g. `kingriver`) show as the parent (`au`). This is how the two-level history is preserved without touching product data.

`all` ("Todos"/"All") is a UI-only pseudo-filter, not a stored category.

### Product fields (from `2026-06-27` + phase-2 additions)

Per-product top-level keys as they exist in `products.json`: `id, cat, tone, images, badge, es, en` plus the optional structured fields **`marbling`, `available`, `sku`, `weight`**. Per-language `es`/`en` objects each hold `{ name, description, origin, cooking }`.

`marbling` (nullable) has the shape consumed by the storefront's marbling scale:

```json
"marbling": {
  "system": "bms",
  "variants": [
    { "label": "11-12", "lo": 11, "hi": 12, "image": "…webp", "sku": "…" }
  ]
}
```

`available` defaults to `true` (only `false` is stored); `sku`/`weight` are optional strings (only stored when non-empty).

## Category taxonomy module — `src/categories.js`

Imports `categories.json` and derives everything the app, admin, and sitemap need:

- `CATEGORY_LIST` — the ordered array as-is.
- `CATEGORY_KEYS` — ordered display keys (`['jp','au','us','mackas']`).
- `CAT_SLUG` / `SLUG_CAT` — key↔slug lookups.
- `DISPLAY_CAT` — maps every key to itself and every alias to its parent key.
- `catOf(p)` — `DISPLAY_CAT[p.cat] || p.cat` (the display category for a product).
- `catLabel(key, lang)` — localized label for a display key.
- `ALL_CAT_KEYS` — display keys **plus** aliases; the selectable set for the admin product dropdown, so legacy alias values (`kingriver`) stay assignable. Re-exported by `products.js` as `CATEGORIES` for admin/validation.

## Storefront Rendering (`src/app.jsx`, `src/i18n.jsx`)

- Filter chips derive from `CATEGORY_KEYS` (prepending the `all` pseudo-entry): `const cats = [['all', t.categories.all], ...CATEGORY_KEYS.map((k) => [k, catLabel(k, lang)])]`.
- Category eyebrows/labels read from `catLabel(key, lang)`.
- `catOf(p)` maps alias products (`kingriver`) onto their display parent (`au`) for both the grid filter and the category label.
- `i18n.jsx` keeps only the `all` pseudo-label under `categories`; per-key labels now come from `categories.json`. Footer `catalogItems` and the hero brand lists remain static marketing copy (non-goal).

## Sitemap (`build-sitemap.mjs`)

Reads `src/categories.json` directly and emits one `/catalogo/<slug>` URL per category, so sitemap slugs always match the live taxonomy.

## Admin "Categorías" Section — `src/admin/CategoriesEditor.jsx`

Replaces the placeholder card. Loads `CATEGORY_LIST` into local state.

- Ordered rows; each shows: **ES label** · **EN label** · **Slug** (editable, slugified, placeholder from the ES label) · reorder ↑/↓ · **Eliminar**. A caption shows the frozen `key` (or "clave nueva: se generará al guardar") and the in-use product count.
- **Delete** is disabled when `usedBy(c) > 0`, where `usedBy` counts products whose `cat` is the category's key **or any of its aliases**. Enabled only at 0.
- **+ Agregar categoría** appends a blank row; on save, a missing `key`/`slug` is auto-generated from the labels (slugify) and validated for the `^[a-z0-9-]+$` shape and uniqueness.
- Client validation before save: every category needs non-empty ES + EN, a valid unique `key`, and a valid unique `slug`.
- Saves **on its own** via **"Guardar categorías"** → `POST /api/save-categories`. This is a **separate commit and rebuild** from the product catalog.

### Two-endpoint save model (important)

Categories and products are committed by **two independent serverless functions**, each committing its own file:

- `POST /api/save-categories` → commits `src/categories.json`.
- `POST /api/save-products` → commits `src/products.json`.

Because they are separate commits/rebuilds, the intended flow for a **new** category is: save categories → wait ~1 min for the rebuild → **reload the admin** → the new key now appears in the product dropdown → assign products → "Guardar y publicar". The CategoriesEditor success message instructs the owner to reload before assigning products to new categories.

## Product editor (`src/admin/AdminApp.jsx`)

- Category `Select` shows **labels** (value = key, display via `categoryOptions`), including any legacy alias code still present on a product so it stays selectable.
- New `MarblingEditor.jsx` edits the per-cut marbling grades/variants; `available`/`sku`/`weight` are edited inline.
- `pruneCatalog` preserves the **full** product schema on save — `id, cat, tone, images, marbling (cleaned), available?, sku?, weight?, badge, es{…}, en{…}` — trimming only outer whitespace and dropping empty optional keys. This closes the earlier "marbling wiped on save" regression class: no known product field is dropped by an allowlist.
- Client `validate` checks each `p.cat` against `CATEGORIES` (= `ALL_CAT_KEYS`).

## Server validation

`api/save-products.js` (`{ password, products }`):

- Constant-time password compare (`timingSafeEqual`, env value trimmed).
- `validateCatalog` re-checks every product: unique non-empty `id`; `tone`; non-empty `images[]`; optional `available` boolean; optional `sku`/`weight` strings; optional `marbling` shape (`{system, variants:[{lo,hi,image,…}]}`); `badge.{es,en}` string-or-null; `{es,en}.name` non-empty and `description/origin/cooking` strings.
- **Category-key check sources `categories.json`** — the valid key set is derived from the committed taxonomy (display keys + aliases, mirroring `ALL_CAT_KEYS`), **not** a hardcoded list. This is required so a category added via `/api/save-categories` becomes usable on products after the next rebuild. *(A hardcoded `Set(['jp','mackas','au','kingriver','us'])` shipped initially and silently rejected any newly-added category at save time; it was replaced with the `categories.json`-derived set.)*

`api/save-categories.js` (`{ password, categories }`):

- Same auth + GitHub-commit flow as products.
- `validateCategories`: non-empty array; each entry has non-empty string `key`/`slug`/`es`/`en`; `key` and `slug` match `^[a-z0-9][a-z0-9-]*$`; keys and slugs unique; optional `aliases` array of category-code strings.
- Normalizes and commits `categories.json` with 2-space `JSON.stringify` + trailing newline.

## Files (as shipped)

- `src/categories.json` — **new** public taxonomy (separate file).
- `src/categories.js` — **new** taxonomy module (`CATEGORY_LIST`/`CATEGORY_KEYS`/`CAT_SLUG`/`SLUG_CAT`/`DISPLAY_CAT`/`catOf`/`catLabel`/`ALL_CAT_KEYS`).
- `src/products.json` — unchanged shape (bare product array; products gained optional `marbling`/`available`/`sku`/`weight`).
- `src/products.js` — imports category keys from `categories.js`; exposes marbling/availability derivations.
- `src/app.jsx` — filter chips + labels from category data via `catLabel`/`catOf`; alias folding.
- `src/i18n.jsx` — keeps only the `all` category pseudo-label.
- `src/admin/AdminApp.jsx` — label-based category dropdown; full-schema `pruneCatalog`; renders the new section.
- `src/admin/CategoriesEditor.jsx` — **new** category-management UI (separate save).
- `src/admin/MarblingEditor.jsx` — **new** marbling editor.
- `api/save-products.js` — category check sourced from `categories.json`; marbling/availability validation.
- `api/save-categories.js` — **new** endpoint committing `categories.json`.
- `build-sitemap.mjs` — reads slugs from `categories.json`.

## Testing / verification

- **Build:** `npm run build` passes.
- **Save round-trip (data integrity):** `pruneCatalog` + server `validateCatalog` preserve `marbling` (full nested shape) and all optional fields; no field is dropped by an allowlist.
- **Storefront:** four filter chips in taxonomy order; `kingriver` products render and filter under "Wagyu Australiano"; renaming a label updates chips/eyebrows but the URL slug is unchanged.
- **Admin — rename/reorder/safe-delete:** editing labels, reordering (shop filter order follows), and delete-blocked-while-in-use all work on existing categories.
- **Admin — add:** after the fix, adding a category → reload → assigning a product to it → save round-trips successfully (previously rejected by the hardcoded server allowlist).
- **Sitemap:** one `/catalogo/<slug>` per category, matching `categories.json`.

## Non-Goals

Per-category origin text editor, category images/thumbnails, draft/preview, auto-derived marketing copy (footer `catalogItems`, hero brand lists stay static), directly editing a category `key`, and single-commit atomic save of categories + products together (they remain two endpoints/two rebuilds by design). Simplicity for the non-technical owner is the point.
