# Multiple Images per Product — Design Spec

**Date:** 2026-06-27
**Project:** Meat Connection (meat-connection.vercel.app)
**Status:** Approved design — ready for implementation
**Builds on:** `2026-06-27-catalog-admin-simplify.md`

## Goal

Let a product carry more than one photo. Catalog cards show the cover; the product
detail page shows a swipeable carousel; the admin picks/reorders multiple images.

## Data Model

Replace the single `image` string with an ordered `images` array of filenames:

```json
{ "id": "tritip", "cat": "jp", "tone": "charcoal",
  "images": ["TRI-TIP-WAGYU-JAPONES-A5-ALTO-MARMOLEO-1.webp"],
  "badge": { "es": "...", "en": "..." }, "es": {...}, "en": {...} }
```

- `images[0]` is the **cover** (used on cards and as the first carousel slide).
- Filenames resolve to bundled URLs through the existing `import.meta.glob` map.
- **Migration:** one-time script sets `images: [image]` for every product and drops
  `image`. (All 14 currently have exactly one.)

## products.js

- `PRODUCTS` items expose `images` (array) instead of `image`.
- `MC_IMAGES` — `{ [id]: string[] }` of resolved URLs (carousel source).
- `MC_IMG` — `{ [id]: string }` of the **cover** URL only, so existing single-image
  consumers (`ProductImage` on cards) keep working unchanged.
- `imageUrl(file)` and `IMAGE_FILES` stay (admin picker).

## Storefront (app.jsx)

- `ProductImage` (cards, hero thumbnails) keeps using the cover via `MC_IMG[id]`.
- `ProductDetail` replaces the single image block with a **`Carousel`** component:
  - Shows `images[idx]`; `‹`/`›` arrow buttons and a row of dots; `idx` in state.
  - Touch swipe: `onTouchStart`/`onTouchEnd` compare X delta (threshold ~40px) to go
    prev/next. Wraps around.
  - Clicking the current image opens the existing `Lightbox` for that image.
  - With a single image: render just the image + zoom (no arrows/dots) — current look.
  - Resolves URLs from `MC_IMAGES[id]`; falls back to `MC_IMG[id]` as a one-item list.

## Admin (`src/admin/`)

- New `ImagesPicker` (replaces single `ImagePicker` usage in `AdminApp`):
  - Renders the product's selected images as a reorderable row of thumbnails; each has
    up/down (reorder) and ✕ (remove). The first thumbnail is labeled **Portada**.
  - "Agregar imagen" toggles the existing thumbnail grid of all `/images`; clicking a
    grid image appends it (ignored if already selected).
  - Reordering to first position changes the cover. At least one image required.
- `AdminApp` `pruneCatalog`/`validate`/`newProduct` use `images` (array). Validation:
  non-empty `images`, every entry in `IMAGE_FILES`. New product seeds `images: [first
  known file]`.
- The old single `ImagePicker.jsx` is replaced by `ImagesPicker.jsx`.

## Server (api/save-products.js)

- Validate `images` is a non-empty array of strings (replaces the single `image`
  string check). Reject otherwise with 400.

## Testing

- Migration: build passes; every product has `images` length ≥ 1; cards still show the
  cover; existing single-image products look identical.
- Detail: a product with 2+ images shows arrows + dots; arrows/swipe/dots change the
  slide and wrap; click-to-zoom shows the current image; a 1-image product shows no
  carousel chrome.
- Admin: add a second image, reorder it to cover, remove one, save round-trips; saving
  with zero images is blocked.

## Non-Goals

Image uploads (still pick from existing `/images`), per-image captions, per-language
images, and lazy/responsive `srcset` beyond current behavior.
