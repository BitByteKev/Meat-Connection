# Catalog Admin — Simplify the Editor (revision)

**Date:** 2026-06-27
**Project:** Meat Connection (meat-connection.vercel.app)
**Status:** Approved design — ready for implementation
**Supersedes:** the editor/data-model portions of `2026-06-26-catalog-admin-design.md` (the GitHub-commit backend, auth, and `/admin` routing are unchanged).

## Why

The first admin shipped with a one-language-at-a-time toggle and a deeply nested
"details" editor (sections → paragraphs → bullet lists → cooking methods). The
owner found it too complicated. This revision makes editing flat and shows both
languages at once.

## Data Model Change

Each product's per-language content drops from `{ name, desc, details[] }` to four
plain fields:

```json
"es": { "name": "...", "description": "...", "origin": "...", "cooking": "..." }
```

- `name` — card + detail-page title.
- `description` — plain text; powers the **Descripción** tab. Its **first non-empty
  line** is reused as the catalog card hook (no separate short field).
- `origin` — plain text; powers the **Origen** tab.
- `cooking` — plain text; powers the **Cómo cocinar** tab.

Shared (unchanged, one value per product): `id`, `cat`, `tone`, `image`,
`badge: { es, en }`. The `details[]` array and the old short `desc` are removed.

Text fields use newlines for structure: a blank line separates paragraphs; a line
starting with `• ` or `- ` renders as a bullet. That's the only "formatting" — you
make a list by typing one.

## One-Time Migration (lossy, by design)

A throwaway script rewrites `src/products.json` in place:

1. For each product, for `es` and `en`, split the existing `details[]` into three
   buckets with the **same logic the site uses today** (`bucketDetails`): heading
   matching `/^orig/i` → origin; `/cocci|cooking/i` → cooking; everything else →
   description.
2. Flatten each bucket's sections to text: section heading → its own line;
   each `p[]` paragraph → a line; each `list[]` item → `• item`; each cooking
   method → its `h` as a line followed by its paragraphs/bullets. Blank line
   between sections.
3. `description` = the old punchy `desc` + blank line + the flattened description
   bucket (so the card hook stays sharp and the tab leads with the hook).
4. Drop `desc` and `details`; keep `name`, `badge`, `image`, `cat`, `tone`.

No information is lost — only the rigid structure. The owner can trim freely.

## Product Page Rendering

Replace `bucketDetails` + `Sections` with a single `TextBlock` renderer that turns
one text field into paragraphs and bullet lists (split on blank lines; `•`/`-`
lines become `<li>`). The three tabs (Descripción / Origen / Cómo cocinar) render
their respective field. A tab appears only if its field has text; `origin` falls
back to the existing generic per-category origin copy when empty (current behavior).
The catalog card shows the first non-empty line of `description`.

## Admin Editor

- Same password gate, product list (add / remove / reorder), image picker, and
  shared `id` / `cat` / `tone` controls.
- **Remove** the ES/EN toggle, `DetailsEditor`, and `StringList` — no sections,
  bullets, or methods UI anywhere.
- When a product row is expanded: `id` / `cat` / `tone` / image (shared) on top,
  then **two columns, ES left and EN right**. Each column has `name`,
  `description`, `origin`, `cooking` as plain textareas, plus `badge`. Columns
  stack vertically on narrow screens.
- Validation: unique non-empty `id`, `cat ∈ {jp,au,us}`, `name` non-empty in **both**
  languages, `image` is a known file. The "missing name" error names the specific
  language. Save prunes only trailing whitespace.

## Server (api/save-products.js)

- Trim `ADMIN_PASSWORD` (env value only, not the submitted password) before the
  constant-time compare, so a stray pasted newline can't lock the owner out.
- Update payload validation to the new schema: `name` non-empty (both langs);
  `description` / `origin` / `cooking` are strings; `badge.es` / `badge.en` string
  or null. Reject anything else with 400.

## Files

- `src/products.json` — migrated to the new shape.
- `src/products.js` — `PRODUCT_STRINGS` exposes `{ name, description, origin, cooking }`.
- `src/app.jsx` — new `TextBlock` renderer; card uses first line of `description`;
  remove `bucketDetails`/`Sections`.
- `src/admin/AdminApp.jsx` — two-column ES/EN editor; simpler prune/validate.
- `src/admin/DetailsEditor.jsx` — **deleted**.
- `src/admin/fields.jsx` — drop `StringList`; keep `TextField`/`TextArea`/`Select`.
- `api/save-products.js` — password trim + new-schema validation.

## Testing

- Migration: build passes; every product shows non-empty `description`; spot-check
  that ES/EN text reads correctly and the old hook is line 1 of `description`.
- Storefront: cards show the hook; detail tabs render text + bullets; a product
  with empty `origin` still shows the generic origin.
- Admin: expand a product → ES/EN side by side; edit both → save round-trips.
- E2E (after env vars): real save commits `products.json` and the site rebuilds.

## Non-Goals

Image uploads, multiple accounts, draft/preview, and any structured rich-text
return. Simplicity is the point.
