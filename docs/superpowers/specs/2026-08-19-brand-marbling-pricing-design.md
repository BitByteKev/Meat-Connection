# Brand-specific marbling pricing + Abatti Ranch brand

Date: 2026-08-19

## Problem

The catalog admin needs to price the **same cut and the same marbling grade**
differently depending on which brand supplies it (e.g. grade "4-5" from King
River at one price, and grade "4-5" from a new brand, Abatti Ranch, at a
different price). The storefront must show both prices clearly, distinguished
by brand, on the product page.

Separately, the owner has added Abatti Ranch Wagyu as a new distributed brand
and wants its logo added to the "Marcas" (brands) section on the homepage,
the per-product "Marcas" tab, and the admin's brand checkboxes.

## Current state (confirmed by code inspection)

- `src/products.json`: each product's `marbling.variants` is a list of grade
  rows: `{ lo, hi, label, image, sku, mayoreo, menudeo, marcas: [brandKey] }`.
  `marcas` is already optional per variant, and a variant's price already
  applies only to that variant.
- `src/admin/MarblingEditor.jsx`: already lets the admin add any number of
  grade variants, each with its own price and brand checkboxes (`BRANDS`
  list: mackas, kingriver, lgrow, anguspure, wagyu, jewel).
- `src/app.jsx`: `BRAND_LIST` (name, key, logo, external url) drives both the
  homepage "Marcas" strip (`Partners`/`BrandTiles`) and the per-product
  "Marcas" tab (`BrandTiles compact filter={marcasFilter}`, filtered to the
  selected grade variant's `marcas`).
- `MarblingScale` (product page grade selector) renders one button per
  variant, labeled only with the grade + price — no brand shown.
- Today, **zero** products have two variants sharing the same `lo`/`hi` (i.e.
  the "same grade, two brands, two prices" pattern doesn't exist yet in the
  data).
- Brand logos are bundled from `src/assets-img/mc_brand_*.{png,webp}` and
  wired into `window.MC_BRAND` in `src/setup-globals.js`. The
  `images/brands/` folder is a raw drop location, not read by the build.
- The new file `images/brands/WhatsApp Image 2026-08-19 at 10.01.25.jpeg` is
  the Abatti Ranch Wagyu logo, on a flat white background (unlike the other
  brand logos, which are transparent PNGs).

## Decisions (confirmed with the owner)

1. **Same-grade/different-brand pricing** is represented by adding another
   variant with the *same* `lo`/`hi` range, carrying its own `marcas` (single
   brand) and its own `mayoreo`/`menudeo` price. No schema change — this
   already works in the admin editor today.
2. **Storefront grade-selector buttons** must show the brand name whenever a
   product has more than one variant sharing the same grade range, so the
   customer can tell them apart (e.g. "4-5 · King River $380" vs. "4-5 ·
   Abatti Ranch $430"). Products with only one variant per grade (the
   existing ~140 products) render exactly as they do today — no visual
   change.
3. **No "hide from main page, only show in Marcas" rule.** The owner's
   original request ("if grade 4-5 is King-River-only, only show it in
   Marcas") is resolved by decision #2: showing the brand name directly on
   the grade button already communicates which brand a price belongs to.
   Nothing needs to be hidden from the main product page.
4. **Abatti Ranch is a new brand**, key `abattiranch`, display name "Abatti
   Ranch Wagyu", linking out to `https://www.abattiranchwagyu.com/` (verified
   real, matches the logo) — same tile treatment as King River, Macka's,
   etc. (opens in a new tab).
5. **Marbling stays optional per product** — not making it mandatory. Every
   product's edit form already has the marbling selector available
   (`MarblingEditor` renders unconditionally with a "Sin marmoleo" option);
   this project doesn't change that.

## Changes

### 1. Logo asset
- Process `images/brands/WhatsApp Image 2026-08-19 at 10.01.25.jpeg`: remove
  the white background via alpha-decontamination (tested — clean edges, no
  halo) and save as `src/assets-img/mc_brand_abatti.png`, following the
  existing `mc_brand_<key>.{png,webp}` naming convention.
- Leave the raw file in place under `images/brands/` (it's not read by the
  build either way, so there's no behavior difference — just don't reference
  it from code).

### 2. `src/setup-globals.js`
- Import `mc_brand_abatti.png` and add `abattiranch: brand_abatti` to
  `window.MC_BRAND`.

### 3. `src/app.jsx` — `BRAND_LIST`
- Add `{ name: 'Abatti Ranch Wagyu', key: 'abattiranch', url: 'https://www.abattiranchwagyu.com/' }`.

### 4. `src/app.jsx` — `MarblingScale` grade-selector buttons
- When building the button list, group `marbling.variants` by `lo`/`hi`. For
  any group with more than one variant, render each of that group's buttons
  with a small brand-name (or logo) label under the price, sourced from that
  variant's `marcas` (via `BRAND_LIST` lookup — join multiple brand names
  with "/" in the rare case a duplicate-grade variant lists more than one
  brand). Variants that are the only one for their grade render unchanged.

### 5. `src/admin/MarblingEditor.jsx` — `BRANDS`
- Add `['abattiranch', 'Abatti Ranch']` to the brand checkbox list (comment
  already notes this list must mirror `BRAND_LIST`).

### 6. `src/admin/AdminApp.jsx` — `validate()`
- Add a check: within a product's marbling variants, if two or more variants
  share the same `lo`/`hi`, each of them must have a non-empty `marcas`.
  Return a clear Spanish error naming the product and grade if not (mirrors
  the existing validation message style).

### 7. `src/admin/exportXlsx.js` — `productRows()`
- Add a "Marca" column to the exported wholesale price sheet, populated from
  each variant's `marcas` (brand display names, joined with "/" if more than
  one) — so duplicate-grade rows stay distinguishable in the spreadsheet the
  same way they are on the site.

## Out of scope

- No changes to the homepage "Marcas" section or the product-page "Marcas"
  tab beyond the new brand tile appearing in the shared `BRAND_LIST` — both
  already render correctly with no code changes.
- No change to whether marbling is required per product.
- No bulk migration of existing products.json data — the owner/staff will
  add new brand+price rows through the admin as needed, product by product.
- No admin UI change to visually group duplicate-grade rows beyond the new
  validation message (a nice-to-have, not required for this pass).

## Testing

- Manual: in the admin, add a second King River-style variant with the same
  grade range as an existing one, a different brand, and a different price;
  confirm it saves, and confirm the storefront product page shows both
  buttons labeled with their brand names and correct prices.
- Manual: confirm a product with only one variant per grade (majority of the
  catalog) is visually unchanged.
- Manual: confirm the Abatti Ranch tile appears on the homepage Marcas
  section, links to abattiranchwagyu.com in a new tab, and appears in the
  admin's brand checkbox list.
- Manual: trigger the validation error by saving a product with two
  same-grade variants where one has no brand marked; confirm the save is
  blocked with a clear message.
- Manual: export the wholesale .xlsx and confirm the new "Marca" column is
  populated correctly, including for duplicate-grade rows.
