# Catalog Admin — Shopify-Style Redesign (Phase 3)

**Date:** 2026-07-01
**Project:** Meat Connection (meat-connection.vercel.app)
**Status:** Approved design — ready for implementation
**Builds on:** `2026-06-27-catalog-admin-simplify.md` (editor fields, GitHub-commit backend, auth) and `2026-07-01-category-management-design.md` (categories taxonomy + two-endpoint save). Backend, auth, and save endpoints are **unchanged** — this is a front-end restructure of `/admin` only.

## Why

The admin works but reads as a styled form dump: accordion rows, storefront serif/cream branding, a sticky save footer. The owner asked for a Shopify-like experience — the visual language and interaction patterns store owners already know: neutral chrome, a product **table**, a **detail page** per product, bulk actions, and Save in the top bar.

## Decisions (locked)

1. **Full treatment** (user-selected over reskin-only): table list + top action bar + separate detail view + bulk select/actions + empty states.
2. **No backend changes.** Same two endpoints (`/api/save-products`, `/api/save-categories`), same payloads, same whole-catalog commit. The redesign only changes where the buttons live.
3. **Admin-only.** No storefront file is touched; the visual system lives in the admin bundle.
4. **No URL routing.** View state (list vs detail) is React state inside `AdminApp`, as today with sections.

## 1. Visual system (Polaris-inspired, in `fields.jsx`)

Replace the exported style tokens in `src/admin/fields.jsx`; every admin component already imports from there, so the retheme propagates.

- **Canvas:** page background `#f1f2f4`; content in white cards, `1px solid #e1e3e5` border, `border-radius: 12px`, shadow `0 1px 2px rgba(0,0,0,0.05)`.
- **Type:** system sans (`-apple-system, 'Segoe UI', Roboto, sans-serif`) at 13–14px for all admin chrome; drop `var(--font-display)` serif from admin headings (plain 600–700 weight sans instead). Field labels stay small caps but in the neutral gray.
- **Buttons:**
  - `btnPrimary` (new): near-black `#1a1a1a` bg, white text — Guardar, + Agregar producto.
  - `btn` (secondary): white bg, `#d0d3d6` border, dark text.
  - `btnDanger`: quiet — white bg, red text/border; used for Eliminar only.
- **Status pill** (new `Pill` component in `fields.jsx`): green tint (`#d1f0d9` bg / `#0a6c2e` text) for **Activo**, gray tint for **Agotado**.
- **Inputs:** white, `#d0d3d6` border, 8px radius, focus ring `#1a1a1a`.
- Hardcoded near-identical grays in sub-components (`#cfcbc4` etc.) are normalized to the new tokens while passing through those files.

## 2. Shell (`AdminApp.jsx`)

- **Top bar** (new, replaces the sticky save footer): full-width white bar, `1px` bottom border, sticky top. Left: "Meat Connection" wordmark + "Admin" tag. Right: dirty indicator ("● Cambios sin guardar", amber dot, visible only when the working catalog differs from `RAW_CATALOG`), **Guardar** (`btnPrimary`, disabled when clean or saving, label "Guardando…" while in flight), and **Salir**.
- **Dirty tracking:** `dirty = JSON.stringify(pruneCatalog(catalog)) !== JSON.stringify(pruneCatalog(clone(RAW_CATALOG)))`, memoized on `catalog`. Save success does NOT clear dirty by resetting state (the source of truth updates only after the Vercel rebuild); instead, after a successful save, store the saved snapshot in state and compare against that.
- **Save status:** success/error banner becomes a fixed toast under the top bar (same messages as today, incl. the ~1 min rebuild note and 401 → logout).
- **Sidebar:** unchanged sections (Productos / Categorías / Medios) with counts; active item becomes a gray pill (`#e8eaec` bg, dark text) instead of the red block; white background, neutral border.
- The `section` state gains a companion `detailIndex` (index into `catalog`, or `null`); the main area renders the table when `detailIndex === null`, the detail view otherwise. Indexed, not id-keyed, because the ID field is editable inside the detail view. Switching sidebar sections clears `detailIndex`; deleting the open product clears it too.

## 3. Products table (`ProductsTable.jsx`, new — replaces the accordion list)

One white card containing:

- **Toolbar row:** search input, category `<select>`, sort `<select>` (same three modes), result count — identical logic and state as today (`query`, `filterCat`, `sort` stay in `AdminApp` and are passed down), restyled.
- **Table** (semantic `<table>`): columns —
  1. ☑ row checkbox (header checkbox = select all *visible* rows)
  2. 44px thumbnail (cover image; gray placeholder if none)
  3. **Producto** — ES name (fallback id), subtext line `id · SKU` in gray
  4. **Estado** — `Pill` Activo/Agotado from `p.available`
  5. **Categoría** — label via existing `categoryOptions`
  6. **Marmoleo** — variant summary (e.g. "BMS 8–12") or "—"
  7. Reorder ↑/↓ — rendered only when `canMove` (manual sort, no query, no category filter; the existing rule)
- **Row click** (outside checkbox/reorder controls) opens the detail view for that product.
- **Bulk bar:** when ≥1 row is selected, the toolbar row is replaced by: "N seleccionados" + **Marcar disponible** / **Marcar agotado** (set `available` on the selected products in state) + **Eliminar** (removes them from state after a `window.confirm`). All bulk edits are local state; publishing still goes through the top-bar Guardar.
- **Selection state:** a `Set` of row keys in `AdminApp`, using the existing `key(p, i) = p.id || '#'+i` rule (id can be empty on freshly added products). Cleared on section change, filter change, and after any bulk action.
- **Empty state:** when the filter/search yields zero rows, a centered card message "Sin resultados" + a "Limpiar filtros" `btn` that resets query/filter/sort.
- **Footer of table:** "+ Agregar producto" (`btnPrimary`) — appends `newProduct()` and immediately opens its detail view.

## 4. Product detail view (`ProductDetail.jsx`, new)

Replaces the main area when a row is clicked (no URL change).

- **Header row:** "← Productos" back link (returns to table, keeps filters), ES name (or "(sin nombre)") as the page title, status `Pill`, and **Eliminar** (`btnDanger`, `window.confirm`, then back to table).
- **Body — stacked white section cards** (Shopify's card-per-section pattern), all reusing today's editors and change handlers unchanged:
  1. **Datos** — ID, Categoría (label dropdown), Tono, Disponible checkbox, SKU, Peso.
  2. **Imágenes** — `ImagesPicker`.
  3. **Marmoleo** — `MarblingEditor`.
  4. **IA** — `AiGenerate` (notes + generate button).
  5. **Contenido** — ES / EN `LangColumn`s side by side (stack on narrow screens, as today).
- Edits mutate the same product-in-catalog state via the existing `setProduct(i, next)`; **saving is only the top-bar Guardar** (whole catalog, one commit — mechanics identical to today, `pruneCatalog` + `validate` + `/api/save-products`).
- Validation errors on save surface in the toast, exactly as today (they already name the offending product/field).

## 5. Categorías and Medios sections

- **CategoriesEditor:** keeps its own in-page "Guardar categorías" button and separate endpoint (two-commit model is by design — see phase-2 spec). Restyle only: white cards, new buttons/pills, sticky footer converted to a plain end-of-content row.
- **MediaLibrary:** restyle pass only (tokens propagate; normalize local hardcoded grays). No behavior change.
- The top-bar **Guardar** is products-only; it is hidden (or disabled with a tooltip) while the Categorías section is active to avoid implying it saves categories.

## Files

- `src/admin/fields.jsx` — retheme tokens; add `btnPrimary`, `Pill`.
- `src/admin/AdminApp.jsx` — top bar (dirty indicator + Guardar + Salir), toast, sidebar restyle, `detailId` state; loses the accordion `ProductEditor` and sticky footer; keeps login gate, state, `pruneCatalog`/`validate`/`save`, `AiGenerate`, `LangColumn`, `newProduct`.
- `src/admin/ProductsTable.jsx` — **new** table + toolbar + bulk bar + empty state.
- `src/admin/ProductDetail.jsx` — **new** detail screen composed of section cards.
- `src/admin/CategoriesEditor.jsx`, `src/admin/MediaLibrary.jsx`, `src/admin/ImagesPicker.jsx`, `src/admin/MarblingEditor.jsx` — restyle pass only.
- No changes: `api/*`, storefront files, `uploads.js`.

## Testing

No test runner in this project; gates are `npm run build` plus a scripted admin walkthrough in the browser (vite preview):

- **Table:** search/filter/sort behave as before; reorder arrows only in manual+unfiltered; row click opens detail; select-all selects visible rows only.
- **Bulk:** select 2 → Marcar agotado → pills update; Eliminar asks for confirmation and removes; dirty indicator lights up.
- **Detail:** every field edits; images/marbling/AI sections work; back link preserves filters; Eliminar returns to table.
- **Save round-trip (regression-critical):** edit one product → Guardar → payload contains ALL fields (`marbling` nested shape, `available`/`sku`/`weight`, badge, both langs) — the marbling-wipe class must stay closed. Verify `pruneCatalog` output unchanged vs today for an untouched catalog.
- **Dirty indicator:** clean on load; lights on any edit; Guardar disabled when clean.
- **Categories/Media:** function unchanged post-restyle; top-bar Guardar hidden/disabled on Categorías.
- **Login/401:** unchanged (401 on save → logout + message).

## Non-Goals

URL routing inside /admin, per-product save endpoints, autosave, undo/redo history, drag-and-drop reorder (arrows stay), image bulk actions in Media, multi-user roles, and any storefront change. The two-commit save model (products vs categories) stays as designed in phase 2.
