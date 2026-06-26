# Catalog Admin — Design Spec

**Date:** 2026-06-26
**Project:** Meat Connection (meat-connection.vercel.app)
**Status:** Approved design — ready for implementation plan

## Overview

Add a password-protected admin page that lets the business owner (and the developer) edit the product catalog of the existing static Vite/React site without touching code. Saving an edit commits an updated data file to GitHub, which triggers Vercel's normal rebuild; changes appear live in ~1 minute. No database and no always-on backend — the only server-side code is one Vercel serverless function used solely to authenticate and commit the file.

This is a **content admin for the catalog only**. It is explicitly **not** a CRM and does not manage leads, customers, or orders.

## Goals

- Owner + developer can log in and edit existing products: name, short description, badge, category, image, and the rich "details" sections — in both Spanish and English.
- Add, remove, and reorder products.
- Changes go live automatically (~1 min rebuild) with no code edits and no local dev environment.
- Keep the public site static, fast, and essentially free to run (Vercel + GitHub free tiers).
- All product data and the admin code live in the existing repo (supports the maintenance retainer).

## Non-Goals (v1)

- Uploading new image files (v1 selects from images already in `/images`).
- Multiple user accounts / roles (single shared password).
- Draft / preview / publish workflow (save = commit = live).
- Leads, customers, quotes, orders, analytics dashboards (not a CRM).
- Editing UI chrome strings (nav, hero, services, etc.) — those stay in `i18n.jsx`.
- Concurrency control beyond last-write-wins (acceptable for two occasional editors).

## Architecture

```
Public visitor ─► static site (Vercel CDN) ─► reads products.json at build time
Editor ─► /admin (same SPA, password gate) ─► POST /api/save-products
                                                  │ verify ADMIN_PASSWORD
                                                  │ commit src/products.json via GitHub API (GITHUB_TOKEN)
                                                  ▼
                                           GitHub push ─► Vercel rebuild ─► live (~1 min)
```

- **Read path (public):** unchanged in spirit — the site reads product data at build time, so it stays static. No auth, no runtime DB calls.
- **Write path (admin):** the only dynamic piece. A single Vercel Function holds the GitHub token server-side and commits the file. The browser never sees the token.

## Data Model & Migration

Today product data is split across three places:
- `STRINGS.es.products` / `STRINGS.en.products` in `src/i18n.jsx` (name, badge, desc, details)
- `PRODUCTS` array in `src/app.jsx` (`id`, `cat`, `tone`)
- image map in `src/setup-globals.js` (`window.MC_IMG` keyed by id)

**Migration:** consolidate all product data into a single **`src/products.json`** — an ordered array. Each entry:

```json
{
  "id": "tritip",
  "cat": "jp",
  "tone": "charcoal",
  "image": "TRI-TIP-WAGYU-JAPONES-A5-ALTO-MARMOLEO-1.webp",
  "badge": { "es": "A5 · Japón", "en": "A5 · Japan" },
  "es": { "name": "...", "desc": "...", "details": [ /* sections */ ] },
  "en": { "name": "...", "desc": "...", "details": [ /* sections */ ] }
}
```

A "details" section keeps the existing shape: `{ h, p?: string[], list?: string[], methods?: [{ h, p?: string[], list?: string[] }] }`.

- A one-time migration script extracts current values from `i18n.jsx` + `app.jsx` + `setup-globals.js` into `products.json` (must reproduce all 14 products exactly).
- `i18n.jsx` keeps only UI chrome strings (nav, header, hero, services, partners, clients, contact, testimonials, footer, pdp tab labels/qty/saleType, wa templates, notice, categories, shop). The `products` and per-product `details` move out.
- `app.jsx` builds its product list and the per-language `t.products[id]` lookups from `products.json` instead of from `i18n`/hardcoded `PRODUCTS`.
- **Categories** remain `jp` / `au` / `us`; labels stay in `i18n.categories`.

### Image resolution

Products reference an image by **filename** (string). The app maps filename → bundled URL via `import.meta.glob('../images/*.webp', { eager: true })`, replacing the current hardcoded `import` list in `setup-globals.js`. This lets the admin assign any image already in `/images` without code changes. The showcase/hero/brand/logo images stay as they are (separate from the catalog picker).

## Admin Page (`/admin`)

Rendered by the same SPA when `window.location.pathname` starts with `/admin`; a Vercel rewrite serves `index.html` at that path. The storefront and admin are mutually exclusive renders (admin is not linked from the public site).

- **Login:** single password field. On success the password is held in `sessionStorage` for the session (UX only; the real gate is server-side verification on save). A wrong password yields no write.
- **Product list:** all items in order; actions to **add**, **remove**, **reorder** (move up/down), and set **category** and **tone**.
- **Per-item editor:** Spanish and English fields together — `name`, `desc`, `badge`, an **image picker** (thumbnail grid of existing `/images`), and a **details editor**:
  - Add / remove / reorder sections.
  - Per section: heading (`h`), paragraphs (`p[]`), optional bullet list (`list[]`), optional cooking **methods** (each with its own `h` + `p[]`/`list[]`).
- **Save:** serializes the full catalog and POSTs it to `/api/save-products`. On success, shows a "saved — site will update in ~1 min" confirmation. On failure, shows the error and keeps edits in the form.
- Basic validation before save: every product needs an `id` (unique), a category in `{jp,au,us}`, and a non-empty `name` in both languages; `image` must be one of the known filenames.

## Write Flow & Auth

- **Function:** `api/save-products.js` (Vercel serverless function in the project's `/api` dir).
- **Request:** `POST` with JSON `{ password, products }`.
- **Auth:** compare `password` to `process.env.ADMIN_PASSWORD` (constant-time compare). Reject with 401 on mismatch.
- **Validate:** server re-checks the payload is a well-formed product array before committing (defensive; rejects malformed data with 400).
- **Commit:** use the GitHub Contents API with `process.env.GITHUB_TOKEN` to update `src/products.json` on the default branch (`main`) with a commit message like `Update catalog via admin`. Token is a fine-grained PAT scoped to this repo's Contents: read/write.
- **Result:** GitHub push → Vercel auto-deploy → live in ~1 min. Function returns `{ ok: true }`.
- **CSP:** `connect-src` must allow the admin → `/api/save-products` call (same origin, already covered by `'self'`). The function calls `api.github.com` server-side (not subject to the page CSP). No CSP change expected for the public site; verify the `/admin` page's fetch to `/api/...` works under the current `connect-src 'self'`.

## Vercel / Project Config

- `vercel.json`: add a rewrite so `/admin` serves the SPA; ensure `/api/*` is handled as functions (default). Keep existing headers/CSP; confirm they don't block the admin's same-origin API call.
- Env vars (Vercel dashboard, one-time): `ADMIN_PASSWORD`, `GITHUB_TOKEN` (+ optionally `GITHUB_REPO`/`GITHUB_BRANCH` if not hardcoded).
- Build remains `vite build` → `dist`.

## Error Handling

- Wrong password → 401 → admin shows "Contraseña incorrecta".
- GitHub API failure (rate limit, token, network) → 5xx → admin shows a generic "No se pudo guardar, intenta de nuevo" and preserves edits.
- Malformed payload → 400.
- Image filename not found at build → app falls back to the existing tone-tile placeholder (current `ProductImage` behavior).
- Last-write-wins: if two people save close together, the later commit wins; acceptable for this scale.

## Testing

- **Migration fidelity:** after moving to `products.json`, build and confirm the storefront renders all 14 products identically (names, badges, categories, details, images) in ES and EN — compare against current output.
- **Build:** `vite build` passes; storefront unaffected.
- **Admin UI:** loads at `/admin`, login gate works, editing a field + save round-trips; validation blocks bad input.
- **Function:** verify auth rejection (wrong password), success path commits to GitHub, and a malformed payload is rejected. Test via `vercel dev` locally or a preview deployment (functions need the Vercel runtime).
- **End-to-end:** edit a product on a preview deploy → confirm commit appears in GitHub → confirm rebuild reflects the change.

## Files (anticipated)

- `src/products.json` — new, all catalog data.
- `src/products.js` (or similar) — loads `products.json`, builds the image map via `import.meta.glob`, exposes the product list + per-language lookups to the app.
- `src/app.jsx` — read products from the new module instead of `i18n`/hardcoded `PRODUCTS`.
- `src/i18n.jsx` — remove `products`/`details`; keep UI chrome.
- `src/setup-globals.js` — replace hardcoded catalog image imports with the glob map (hero/brand/logo imports stay).
- `src/admin/` — admin React components (login, product list, editor, details editor, image picker).
- `api/save-products.js` — serverless commit function.
- `vercel.json` — `/admin` rewrite; env usage.
- One-time migration script (throwaway) to generate `products.json`.

## Setup (handover)

1. Create a fine-grained GitHub PAT (this repo, Contents: read/write).
2. In Vercel project settings → Environment Variables: add `ADMIN_PASSWORD` and `GITHUB_TOKEN`.
3. Redeploy. Visit `/admin`, log in, edit, save.
