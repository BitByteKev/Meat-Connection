# AI Generate Product Copy — Design Spec

**Date:** 2026-06-27
**Status:** Approved (revised)

## Revision (2026-06-27)

No name is required up front. The admin sends the **cover photo** to Claude
(vision); the model identifies the cut, estimates the marbling level, and also
generates the bilingual **name** (catalog style: "{Cut} {origin} · Marbling
{level}"). Generated output is now `{ es, en }` each with
`{ name, description, origin, cooking }`, and the editor fills the name fields
too. An existing name is passed as an optional hint and refined.

## Goal

Add an "✨ Generar con IA" button to the catalog admin that generates a product's
bilingual copy (Descripción / Origen / Cómo cocinar, in ES + EN) from the product
name, its origin category, and an optional free-text notes box. Saves the owner
from writing six text boxes per product by hand in two languages.

## Why

The owner has to write descriptions for every cut in both Spanish and English.
This is the slowest part of adding a product. One click should draft all six
boxes; the owner then tweaks and saves as usual.

## Decisions (locked)

- **Input:** product name + category + an optional "Notas para la IA" box (cut
  details, marbling, feed, etc.). The notes box is ephemeral — never written to
  `products.json`.
- **Model:** `claude-opus-4-8` (best bilingual copy; ~$0.05–0.15/product, trivial
  at this volume).
- **Overwrite:** if any of the six boxes already have text, confirm before
  replacing; otherwise fill silently.

## Architecture

Single LLM call, mirroring the existing `save-products` serverless pattern. No
database, no streaming — request in, structured JSON out.

### New: `api/generate-product.js` (Vercel serverless, ESM)

- `export const config = { maxDuration: 30 }`
- `POST { password, name, cat, notes }` → `200 { es, en }` where each is
  `{ description, origin, cooking }` (all strings).
- **Auth:** reuse the constant-time `ADMIN_PASSWORD` compare from
  `save-products.js` (copy `passwordMatches`, trim the env value). Prevents
  outsiders from burning the API key. 401 on mismatch.
- **Validation:** `name` non-empty string; `cat` ∈ `jp|au|us`. 400 otherwise.
- **Config guard:** if `ADMIN_PASSWORD` or `ANTHROPIC_API_KEY` is missing →
  500 `server_misconfigured`.
- **LLM call:** official `@anthropic-ai/sdk`, `client.messages.create` with
  `model: 'claude-opus-4-8'`, `max_tokens: 4000`, no `thinking` (fast), and
  `output_config: { format: { type: 'json_schema', schema: SCHEMA } }` so the
  6 fields return guaranteed-valid. Parse `response.content[0].text` with
  `JSON.parse`. On `stop_reason === 'refusal'` (or non-text content) → 502 with a
  friendly message. Wrap the SDK call in try/catch → 502 `generate_failed`.
- **Origin label map:** `jp` → "Wagyu Japonés A5", `au` → "Wagyu Australiano",
  `us` → "Black Angus (EE.UU.)" — passed into the prompt so the model knows the
  tier/provenance.

### Prompt

System: expert bilingual copywriter for **Meat Connection**, a premium wagyu /
fine-meat importer. Voice: confident, appetizing, concrete — not flowery. Accurate;
never invent grades, certifications, or awards not given in the notes.

User content: the product name, the readable origin label, and the owner's notes
(may be empty). Ask for, per language (ES = Mexican Spanish and primary, EN):

- `description` — 2–3 short paragraphs. The **first line must work as a standalone
  one-sentence hook** (the catalog card shows it).
- `origin` — provenance: region/farm, breed, grade/feed where known.
- `cooking` — practical preparation guidance (heat, timing, resting, doneness).

Keep paragraphs separated by blank lines (the storefront renders `\n\n` as
paragraph breaks and lines starting with `•`/`-` as bullets).

### Schema (`SCHEMA`)

```js
const LANG = {
  type: 'object',
  properties: {
    description: { type: 'string' },
    origin: { type: 'string' },
    cooking: { type: 'string' },
  },
  required: ['description', 'origin', 'cooking'],
  additionalProperties: false,
}
const SCHEMA = {
  type: 'object',
  properties: { es: LANG, en: LANG },
  required: ['es', 'en'],
  additionalProperties: false,
}
```

### `package.json`

Add `@anthropic-ai/sdk` to `dependencies`. Used only by `api/` functions, so it
does not enter the Vite front-end bundle.

### Admin UI: `src/admin/AdminApp.jsx`

In `ProductEditor` (which stays mounted across open/close, so local state
persists for the session):

- New local state: `notes` (string, default `''`), `genBusy` (bool),
  `genErr` (string|null).
- A shared block rendered **above** the two `LangColumn`s:
  - `TextArea` "Notas para la IA (opcional)", 3 rows, bound to `notes`.
    Helper line: "Detalles del corte: marmoleo, alimentación, marca… La IA los usa
    pero no se guardan."
  - Button "✨ Generar con IA" (disabled while `genBusy`, shows "Generando…").
  - Inline `genErr` message when set.
- Handler `generate()`:
  1. `name = (product.es.name || product.en.name).trim()`. If empty →
     `setGenErr('Escribe primero el nombre del producto.')`, return.
  2. Read password from `sessionStorage[PW_KEY]`. (Editor is only shown when
     authed, so it exists.)
  3. `POST /api/generate-product { password, name, cat: product.cat, notes }`.
  4. `401` → call a passed-in `onAuthFail()` (lifts to AdminApp `logout()`),
     message "Sesión expirada, vuelve a entrar."
  5. other non-OK → `setGenErr('No se pudo generar, intenta de nuevo.' + detail)`.
  6. OK → `{ es, en }`. If any of the 6 current boxes is non-empty, `confirm(
     '¿Reemplazar el texto actual con lo generado?')`; if declined, return.
  7. Apply via `onChange`: merge `es.description/origin/cooking` and
     `en.description/origin/cooking` into the product, leaving
     id/cat/tone/images/name/badge untouched.

`AdminApp` passes `onAuthFail={logout}` to each `ProductEditor`.

## Out of scope (YAGNI)

- No image generation, no name/badge generation (name is the input).
- No streaming / progress text — the call is short.
- No per-field regeneration; it fills all six at once.
- No uploads.

## Env / ops

- New Vercel env var **`ANTHROPIC_API_KEY`** (owner adds). Function returns
  `server_misconfigured` until set.
- No `vercel.json` change, no CSP change (same-origin `/api` call).

## Files

- Create: `api/generate-product.js`
- Modify: `package.json` (add `@anthropic-ai/sdk`)
- Modify: `src/admin/AdminApp.jsx` (notes box, button, handler, `onAuthFail`)
