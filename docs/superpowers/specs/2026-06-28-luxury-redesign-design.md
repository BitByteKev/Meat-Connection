# Meat Connection — Luxury Redesign (Kai Wagyu–inspired)

**Date:** 2026-06-28
**Status:** Approved design, pending implementation plan
**Goal:** Make the Meat Connection site read as a premium, professional brand by adopting Kai Wagyu's luxury surface (elegant serif headings, champagne-gold accent, generous whitespace, cinematic photography/video) — **while keeping Meat Connection's own butcher red** as the action color and leaving all functionality (cart, WhatsApp ordering, reorder, ES/EN i18n) unchanged.

## Reference comparison (why)

Kai Wagyu (kaiwagyu.com) reads as a luxury boutique; the current Meat Connection reads as an industrial butcher. The gap comes from four levers, in priority order:

1. **Type** — Kai uses a high-contrast serif (*Athelas*) for headings over a calm sans. Meat Connection uses condensed all-caps Oswald, which reads "signage/warehouse."
2. **Color** — Kai uses black + champagne gold (luxury cue). Meat Connection uses red on charcoal (fast-casual/butcher cue).
3. **Imagery** — Kai uses large, cinematic, well-lit cuts. Meat Connection's hero is type-only with dead space.
4. **Whitespace** — Kai lets elements breathe; Meat Connection packs the screen.

This redesign moves levers 1, 2 (additively), 3, and 4 while preserving brand red.

## Decisions (locked)

- **Direction:** "Luxury base, red kept." Black/charcoal + champagne gold + serif, with butcher red retained as the action color.
- **Heading font:** **Playfair Display** (free Google Font; stands in for the Apple-only *Athelas*). Replaces Oswald for display/headings.
- **Body font:** calm humanist sans — **Inter** (or keep existing Archivo at lighter weight). Body is not the focus; keep it quiet.
- **Gold accent:** `#C9A678` (already present in tokens as `--mc-kraft`). Used for eyebrows, hairline rules, sub-labels, small flourishes — **never** for primary CTAs.
- **Red (`#C10F10`):** kept as the action color — promo bar, primary CTAs, WhatsApp buttons, product "+" buttons, section top-rules.
- **Hero:** full-bleed looping **`Wagyu.mp4`** video behind a left→right dark gradient scrim; serif headline with one gold *italic* accent word; red WhatsApp CTA + outline "Ver catálogo." Poster image fallback.
- **Scope:** whole-site **surface** retheme (header → footer). No changes to cart/WhatsApp/i18n/admin logic.
- **Headings are no longer uppercase** — serif luxury headings use title case (uppercase is reserved for small gold eyebrows/labels).

## Architecture & where changes land

The site is token-driven, so most of the work is in two layers:

### 1. Design tokens — `src/styles.css`
- Replace the Google Fonts `@import` (Oswald + Archivo) with **Playfair Display + Inter**.
- `--font-display: 'Playfair Display', Georgia, serif;`
- `--font-body: 'Inter', system-ui, sans-serif;`
- Add a semantic gold alias, e.g. `--accent-gold: var(--mc-kraft);` (= `#C9A678`), and use it for eyebrows/hairlines/labels.
- Soften: increase default section padding/whitespace; introduce a thin gold hairline divider token.
- Keep all red tokens (`--mc-red`, etc.) as-is — red stays the action color.

### 2. Component surface — `src/app.jsx` + `src/ds-bundle.js`
Display headings currently set `fontFamily: 'var(--font-display)'` **and** `textTransform: 'uppercase'` inline in many places. Retheme work:
- Remove `textTransform: 'uppercase'` (and tighten letter-spacing) on **display headings** in: `Hero` (199), `SectionHead` (527), `ProductCard`/`ProductImage` names, `ProductDetail` (362), `MarbleShowcase` (792), `Testimonials` (813), `Footer` (487), `Services` (538), `Partners` (570), `Clients` (604), `ContactSection` (624).
- Keep uppercase + letter-spacing **only** on small eyebrows/labels/nav, now colored gold.
- `Header` (107): serif wordmark treatment, gold hover on nav links, keep red "Cotizar"/quote button. Keep the red `IconButton` cart.
- `Hero` (199): rebuild as video background (`<video autoplay muted loop playsinline poster=...>`), gradient scrim, serif headline with gold `<i>` accent word, red primary CTA.
- `SectionHead` (527): eyebrow in gold; title in serif title-case.
- Product cards (`ProductCard` 240 / `ProductGrid` 265): white card surface, serif product name, gold sub-label, red "+"/add button (uses existing `Button`/`IconButton` red variant).
- `ds-bundle.js` components (`Button`, `Card`, `Badge`, `Tag`): verify they read from tokens; if any hard-code Oswald/uppercase, update there so the kit follows the new type system.

### 3. Hero video asset — `public/`
- **Compress** `Wagyu.mp4` (66 MB) → `public/hero.mp4` at **~4–8 MB** (e.g. 1080p or 720p, H.264, ~2–3 Mbps, no audio track), plus a **poster** `public/hero-poster.jpg` (first/representative frame).
- Reference the compressed file from `Hero`, with `preload="metadata"` and the poster for first paint.
- **Dependency:** `ffmpeg` is **not installed** in this environment. Implementation plan must cover installing it (`brew install ffmpeg`) or compressing via an alternative the user runs. Do **not** ship the 66 MB file.

## Out of scope
- No changes to cart logic, WhatsApp message building, reorder, localStorage, i18n strings, admin app, products data, or SEO/schema.
- No new pages or features. Copy stays the same (only visual treatment changes).
- Logo file unchanged (white wordmark works on dark; if a gold-accented lockup is wanted later, that's a follow-up).

## Risks / watch-items
- **Video weight/performance** — the 66 MB source froze the preview tab. Compression + poster + `preload="metadata"` is mandatory, not optional. Provide a static-image hero fallback for reduced-data / mobile if needed.
- **Serif legibility at small sizes** — Playfair is high-contrast; keep it to headings, never body/UI text.
- **Uppercase removal sweep** — uppercase is set inline in many spots; missing one will look inconsistent. Implementation should grep for `textTransform: 'uppercase'` and review each.
- **Accessibility** — maintain contrast (gold `#C9A678` on white fails AA for body text; only use gold for large/secondary labels, never small body copy). Respect `prefers-reduced-motion` for the hero video.

## Success criteria
- Side-by-side, the redesigned hero/sections read clearly more "premium/editorial" than the current site (serif + gold + space + video).
- Red is still clearly the brand's action color; brand remains recognizably Meat Connection.
- Page weight and load stay reasonable (compressed video, poster fallback).
- No functional regressions in cart, WhatsApp ordering, reorder, or ES/EN switching.
