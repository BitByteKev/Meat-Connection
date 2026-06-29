# Meat Connection Luxury Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Retheme the Meat Connection site to a premium, Kai Wagyu–inspired luxury surface (Playfair Display serif headings, champagne-gold accents, video hero, generous whitespace) while keeping butcher red as the action color and changing **no** functionality.

**Architecture:** The site is token-driven — `src/styles.css` holds CSS variables; `src/app.jsx` renders sections with inline styles that reference those variables; `src/ds-bundle.js` is a prebuilt component kit (Button/Card/Badge/Tag/etc.). We change tokens first (fonts + a gold accent), then sweep the inline styles so big headings become serif title-case and small labels/eyebrows become sans-uppercase in gold. The hero is rebuilt around a compressed looping video. No cart/WhatsApp/i18n/admin logic is touched.

**Tech stack:** React 18 + Vite, plain CSS variables, Google Fonts (Playfair Display + Inter), ffmpeg for video compression.

**Note on verification:** This repo has no automated test suite (no `test` script in `package.json`). Each task is verified by (a) `npm run build` succeeding and/or (b) a visual check in the dev server (`npm run dev`, then screenshot/inspect at `http://localhost:5173`). Treat the visual check as the "test."

**Classification rule used throughout** (memorize this — it drives every sweep):
- **BIG TITLE** = h1/h2/section title/card name/service title/cart title/PDP title/stat number → **serif** (`--font-display`), **remove `textTransform:'uppercase'`** (title case), tighten letter-spacing to `-0.01em`.
- **SMALL LABEL** = eyebrow / nav link / button label / form label / footer column head / segmented toggle → **sans** (`--font-eyebrow`), **keep uppercase + letter-spacing**. If it is an **eyebrow**, recolor from red → **gold** (`--accent-gold`).

---

## Task 1: Tokens & fonts (`src/styles.css`)

**Files:**
- Modify: `src/styles.css:1-7` (font import), `src/styles.css:74-75` (font tokens), `src/styles.css` `:root` accent block (add gold + eyebrow + hairline)

- [ ] **Step 1: Replace the Google Fonts import**

Replace lines 1–7 (the comment block + `@import`) with:

```css
/* Meat Connection — Webfonts (luxury redesign)
   - Playfair Display : high-contrast serif for display/headings (Athelas stand-in)
   - Inter            : calm humanist sans for body + small uppercase labels */
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,600&family=Inter:wght@400;500;600;700&display=swap');
```

- [ ] **Step 2: Repoint the family tokens**

Replace lines 74–75:

```css
  --font-display: 'Playfair Display', Georgia, 'Times New Roman', serif;  /* serif display headings */
  --font-body:    'Inter', system-ui, -apple-system, sans-serif;
```

Then add directly below the `--font-mono` line:

```css
  --font-eyebrow: 'Inter', system-ui, sans-serif;  /* small uppercase labels / eyebrows / nav */
```

- [ ] **Step 3: Add the gold accent + hairline semantic tokens**

In the `:root` "Semantic aliases" block (near `--focus-ring`), add:

```css
  --accent-gold:   var(--mc-kraft);   /* #C9A678 champagne gold — eyebrows, hairlines, labels */
  --hairline-gold: 1px solid color-mix(in srgb, var(--mc-kraft) 55%, transparent);
```

- [ ] **Step 4: Build to verify nothing broke**

Run: `npm run build`
Expected: build succeeds, no errors. (Headings will now render in Playfair but still UPPERCASE — that's expected; later tasks remove uppercase.)

- [ ] **Step 5: Commit**

```bash
git add src/styles.css
git commit -m "Switch fonts to Playfair Display + Inter; add gold accent tokens"
```

---

## Task 2: Rebuild the Hero with video (`src/app.jsx:199-237`)

**Files:**
- Modify: `src/app.jsx:199-237` (the `Hero` component)

This task references `public/hero.mp4` and `public/hero-poster.jpg`, which are produced in Task 8. Until then the hero shows the poster/charcoal background — that is fine; do not block on the asset.

- [ ] **Step 1: Replace the `Hero` function body**

Replace the entire `Hero` function (lines 199–237) with:

```jsx
function Hero({ onShop, onQuote }) {
  const { Button } = window.MeatConnectionDesignSystem_3e7a26;
  const { t } = useLang();
  return (
    <section style={{ position: 'relative', background: 'var(--mc-charcoal)', color: 'var(--mc-paper)', overflow: 'hidden' }}>
      <video
        className="mc-hero-video"
        src="/hero.mp4" poster="/hero-poster.jpg"
        autoPlay muted loop playsInline preload="metadata"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }}
      />
      <div style={{ position: 'absolute', inset: 0, zIndex: 1,
        background: 'linear-gradient(90deg, rgba(15,15,15,0.88) 0%, rgba(15,15,15,0.55) 48%, rgba(15,15,15,0.15) 100%)' }} />
      <div className="mc-hero" style={{ position: 'relative', zIndex: 2, maxWidth: 'var(--container-max)', margin: '0 auto', padding: '110px 24px', maxWidth: 'var(--container-max)' }}>
        <div style={{ maxWidth: '600px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '22px' }}>
            <span style={{ height: '1px', width: '32px', background: 'var(--accent-gold)' }}></span>
            <span style={{ fontFamily: 'var(--font-eyebrow)', textTransform: 'uppercase', letterSpacing: '0.24em', fontWeight: 600, fontSize: '12px', color: 'var(--accent-gold)' }}>{t.hero.tag}</span>
          </div>
          <h1 className="mc-h1" style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '64px', lineHeight: 1.04, letterSpacing: '-0.01em', margin: 0, textShadow: '0 2px 24px rgba(0,0,0,0.45)' }}>
            {t.hero.title1} <span style={{ color: 'var(--accent-gold)', fontStyle: 'italic' }}>{t.hero.title2}</span>
          </h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '18px', lineHeight: 1.6, color: 'var(--mc-ink-100)', maxWidth: '460px', margin: '22px 0 32px', textShadow: '0 1px 12px rgba(0,0,0,0.5)' }}>
            {t.hero.para}
          </p>
          <div className="mc-hero-cta" style={{ display: 'flex', gap: '12px' }}>
            <Button variant="primary" size="lg" onClick={onQuote} iconLeft={<Icon name="MessageCircle" size={18} color="#fff" />}>{t.hero.ctaQuote}</Button>
            <Button variant="secondary" size="lg" onClick={onShop} style={{ color: 'var(--mc-paper)', borderColor: 'var(--accent-gold)' }} iconRight={<Icon name="ArrowRight" size={18} color="var(--mc-paper)" />}>{t.hero.ctaCatalog}</Button>
          </div>
          <div className="mc-stats" style={{ display: 'flex', gap: '28px', marginTop: '44px' }}>
            {t.hero.stats.map(([a, b]) => (
              <div key={a}>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '26px' }}>{a}</div>
                <div style={{ fontFamily: 'var(--font-eyebrow)', fontSize: '11px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--accent-gold)', marginTop: '2px' }}>{b}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
```

Note: the old hero had a `1.1fr/0.9fr` two-column grid with `MC_PALETA` image. The video replaces it; the right-column image is intentionally removed. The CSS rule `.mc-hero` (grid) in `styles.css` no longer applies a grid here because we set inline layout — verify no visual conflict in Step 3.

- [ ] **Step 2: Add reduced-motion + mobile handling for the hero video**

Append to `src/styles.css`:

```css
/* Hero video: respect reduced-motion and keep text readable on small screens */
@media (prefers-reduced-motion: reduce) {
  .mc-hero-video { display: none; }
}
@media (max-width: 640px) {
  .mc-hero { padding: 72px 20px !important; }
  .mc-h1 { font-size: 40px !important; }
}
```

- [ ] **Step 3: Visual check**

Run: `npm run dev` then open `http://localhost:5173`.
Expected: hero shows charcoal (or poster) background with a serif headline, the second word in gold italic, gold eyebrow, red "Cotizar"/WhatsApp primary button. No layout overflow. (Video appears once Task 8 produces `/hero.mp4`.)

- [ ] **Step 4: Commit**

```bash
git add src/app.jsx src/styles.css
git commit -m "Rebuild hero around looping video with serif headline + gold accent"
```

---

## Task 3: Header & nav retheme (`src/app.jsx:107-197`)

**Files:**
- Modify: `src/app.jsx` lines 73, 131, 143, 183 (label fonts), and the logo `<img>` at line ~136

- [ ] **Step 1: Make the wordmark feel premium**

The header logo is an image (`window.MC_LOGO`) at ~line 136 (`<img src={window.MC_LOGO} ... style={{ height: '32px', ... }}`). Keep the image but add a thin gold bottom border to the header for an editorial rule. In the `<header>` style (line 122), change `borderBottom: '3px solid var(--mc-red)'` to:

```js
borderBottom: '1px solid var(--mc-ink-700)'
```

and add a gold hairline under the inner bar by changing the inner `<div>` (line 123) — append to its style object: `boxShadow: 'inset 0 -1px 0 var(--accent-gold)'`.

- [ ] **Step 2: Nav links → sans uppercase, gold hover**

At line 131, change `fontFamily: 'var(--font-display)'` to `fontFamily: 'var(--font-eyebrow)'`. In the `onMouseOver` (line 133) change the hover color from `'#fff'` to `'var(--accent-gold)'`.

- [ ] **Step 3: Other header labels → sans**

- Line 73 (`LangToggle` button): change `fontFamily: 'var(--font-display)'` → `fontFamily: 'var(--font-eyebrow)'`.
- Line 143 (reorder button): change `fontFamily: 'var(--font-display)'` → `fontFamily: 'var(--font-eyebrow)'`.
- Line 183 (mobile nav links): change `fontFamily: 'var(--font-display)'` → `fontFamily: 'var(--font-eyebrow)'`.

Leave the red `IconButton` cart and the cart-count badge (line 154) as-is except change line 154 `fontFamily: 'var(--font-display)'` → `fontFamily: 'var(--font-eyebrow)'`.

- [ ] **Step 4: Visual check**

Run dev server; expected: header has gold hairline, nav links are clean sans-uppercase and turn gold on hover, red "Cotizar" + cart preserved.

- [ ] **Step 5: Commit**

```bash
git add src/app.jsx
git commit -m "Retheme header: gold hairline, sans-uppercase nav with gold hover"
```

---

## Task 4: Big-title uppercase removal sweep (`src/app.jsx`)

**Files:**
- Modify: `src/app.jsx` lines 100, 255, 384, 443, 461, 531, 551, 669, 827, 870, 883

For **each** line below, find the inline style and **delete the exact substring `textTransform: 'uppercase', `** (note the trailing comma+space). These are BIG TITLES that must become serif title-case. Do them one at a time; after each, the heading keeps `font-family: var(--font-display)` (now Playfair) and renders title-case.

- [ ] **Step 1:** Line 100 — `ProductImage` fallback name. Remove `textTransform: 'uppercase',` from that style.
- [ ] **Step 2:** Line 255 — `ProductCard` product name. Remove `textTransform: 'uppercase',`.
- [ ] **Step 3:** Line 384 — `ProductDetail` `<h1>` page title. Remove `textTransform: 'uppercase',`.
- [ ] **Step 4:** Line 443 — `CartDrawer` title. Remove `textTransform: 'uppercase',`.
- [ ] **Step 5:** Line 461 — `CartDrawer` line-item name. Remove `textTransform: 'uppercase',`.
- [ ] **Step 6:** Line 531 — `SectionHead` `<h2>`. Remove `textTransform: 'uppercase',`.
- [ ] **Step 7:** Line 551 — `Services` card title. Remove `textTransform: 'uppercase',`.
- [ ] **Step 8:** Line 669 — `ContactSection` thanks title. Remove `textTransform: 'uppercase',`.
- [ ] **Step 9:** Line 827 — `Testimonials` author name. Remove `textTransform: 'uppercase',`.
- [ ] **Step 10:** Line 870 — best-sellers `<h2>`. Remove `textTransform: 'uppercase',`.
- [ ] **Step 11:** Line 883 — `Shop` page `<h1>`. Remove `textTransform: 'uppercase',`.

> ⚠️ Do **not** touch lines 131, 143, 154, 183, 387, 393, 399, 503, 530, 658, 869, 872 in this task — those are SMALL LABELS handled in Tasks 3/5. Line numbers shift as you edit; after each removal, re-grep (`grep -n "textTransform: 'uppercase'" src/app.jsx`) and match by the surrounding component name, not the raw number.

- [ ] **Step 12: Visual check**

Run dev server. Expected: all section titles, product names, the cart title, PDP title, and shop title now render as elegant serif title-case (not all-caps). Eyebrows/labels remain uppercase.

- [ ] **Step 13: Commit**

```bash
git add src/app.jsx
git commit -m "Make big headings serif title-case (drop uppercase on display titles)"
```

---

## Task 5: Eyebrows & small labels → gold + sans (`src/app.jsx`)

**Files:**
- Modify: `src/app.jsx` lines 211, 530, 559, 613, 869 (gold recolor) and 387, 393, 399, 503, 658, 872 (font → eyebrow)

- [ ] **Step 1: Recolor eyebrows red → gold**

- Line 530 (`SectionHead` eyebrow): change `color: 'var(--mc-red-bright)'` → `color: 'var(--accent-gold)'`, and `fontFamily: 'var(--font-display)'` → `fontFamily: 'var(--font-eyebrow)'`.
- Line 869 (best-sellers eyebrow): change `color: 'var(--mc-red)'` → `color: 'var(--accent-gold)'`, and `fontFamily: 'var(--font-display)'` → `fontFamily: 'var(--font-eyebrow)'`.

- [ ] **Step 2: Recolor decorative service/contact icons to gold**

- Line 559 (`Services` sub icon): change `color="var(--mc-red-bright)"` → `color="var(--accent-gold)"`.
- Line 613 (`Clients`/contact icon): change `color="var(--mc-red-bright)"` → `color="var(--accent-gold)"`.

> Keep the **solid red icon tiles** at line 548 (`background: 'var(--mc-red)'`) as-is — those are action-colored, intentional. Only the thin standalone accent icons go gold.

- [ ] **Step 3: Small labels → eyebrow sans (keep uppercase)**

Change `fontFamily: 'var(--font-display)'` → `fontFamily: 'var(--font-eyebrow)'` on these label lines: 387 (PDP saleType label), 393 (PDP segmented buttons), 399 (PDP qty label), 503 (Footer column heads), 658 (contact form label), 872 (best-sellers "see all" link).

- [ ] **Step 4: Visual check**

Run dev server, toggle ES/EN. Expected: every eyebrow is gold sans-uppercase; footer column heads, PDP labels, and the "see all" link are clean sans-uppercase; red is now reserved for buttons/CTAs and the solid service tiles.

- [ ] **Step 5: Commit**

```bash
git add src/app.jsx
git commit -m "Eyebrows and small labels: gold sans-uppercase; red reserved for actions"
```

---

## Task 6: Product cards & catalog polish (`src/app.jsx:240-271, 362-433`)

**Files:**
- Modify: `src/app.jsx:253-257` (card body), `src/app.jsx:362-433` (`ProductDetail` accents)

- [ ] **Step 1: Add a gold category sub-label to product cards**

In `ProductCard` (after line 256's description `div`, inside the same text block at ~line 254-257), the card currently shows name + hook. Replace the inner `<div>` block (lines 254–257) with:

```jsx
        <div>
          <div style={{ fontFamily: 'var(--font-eyebrow)', textTransform: 'uppercase', letterSpacing: '0.14em', fontSize: '11px', color: 'var(--accent-gold)', marginBottom: '6px' }}>{product.category || ''}</div>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '20px', lineHeight: 1.1, color: 'var(--text-strong)' }}>{p.name}</div>
          <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px' }}>{cardHook(p.description)}</div>
        </div>
```

> `product.category` comes from `products.js`/`products.json`. If a product lacks a category string, the gold label renders empty (harmless). Confirm the field name by checking `src/products.js`; if it is named differently (e.g. `origin` or `tone`), use the human-readable origin field, else omit this line.

- [ ] **Step 2: PDP "Add" / quote buttons stay red**

In `ProductDetail` (362–433), confirm the primary add/quote `Button` uses `variant="primary"` (red). If any primary action there uses a non-red variant, set it to `variant="primary"`. No change needed if already primary.

- [ ] **Step 3: Visual check**

Run dev server, open a product. Expected: white card, small gold origin label, serif product name, red add/quote button.

- [ ] **Step 4: Commit**

```bash
git add src/app.jsx
git commit -m "Catalog cards: gold origin label over serif name; keep red actions"
```

---

## Task 7: Component kit retheme (`src/ds-bundle.js`)

**Files:**
- Modify: `src/ds-bundle.js` (font-display + uppercase occurrences at lines ~55, 190, 300, 557, 618, 637, 810)

The bundle is generated, but it is plain JS we can edit directly. Each occurrence belongs to a component (Badge/Tag/Button/Card/etc.).

- [ ] **Step 1: Identify each occurrence's component**

Run: `grep -n "font-display\|textTransform: 'uppercase'\|Oswald" src/ds-bundle.js`
For each hit, read ~15 lines of context to see which component (the `// components/...` paths in the header map names to code).

- [ ] **Step 2: Apply the classification rule**

- **Button / Tag / Badge / IconButton labels** (small UI text): change `fontFamily: 'var(--font-display)'` → `fontFamily: 'var(--font-eyebrow)'`. Keep their uppercase if present (button labels read well uppercase sans).
- **Card titles or any large heading inside a component**: change to keep `var(--font-display)` (serif) and **remove** `textTransform: 'uppercase'`.
- If any occurrence hard-codes `'Oswald'` literally, replace with `var(--font-display)` (serif) for titles or `var(--font-eyebrow)` for labels per the same rule.

- [ ] **Step 3: Confirm red variants intact**

Verify `Button variant="primary"` and `Badge tone="red" solid` still resolve to `--mc-red`. No change unless they reference a removed token.

- [ ] **Step 4: Build + visual check**

Run: `npm run build` then `npm run dev`. Expected: buttons, tags, badges render in Inter (sans); any card titles are serif title-case; primary buttons and red badges stay red.

- [ ] **Step 5: Commit**

```bash
git add src/ds-bundle.js
git commit -m "Retheme component kit fonts to match serif/sans system"
```

---

## Task 8: Compress the hero video (`Wagyu.mp4` → `public/hero.mp4` + poster)

**Files:**
- Create: `public/hero.mp4`, `public/hero-poster.jpg`
- Source: `Wagyu.mp4` (66 MB, repo root — must NOT be committed)

- [ ] **Step 1: Ensure ffmpeg is available**

Run: `ffmpeg -version`
If "command not found": run `brew install ffmpeg` (macOS). If Homebrew is unavailable, stop and ask the user to compress `Wagyu.mp4` to ≤8 MB 1080p H.264 (no audio) and a poster JPG, then drop them at `public/hero.mp4` and `public/hero-poster.jpg`.

- [ ] **Step 2: Inspect the source**

Run: `ffprobe -hide_banner Wagyu.mp4`
Note duration and resolution. If duration > ~12s, trim to a tight ~8–10s loop in the next step with `-t 10`.

- [ ] **Step 3: Encode a web-friendly, muted, looping-friendly MP4**

Run (1080p target, ~CRF 26, no audio; drop `-t 10` if the clip is already short):

```bash
ffmpeg -i Wagyu.mp4 -t 10 -an \
  -vf "scale='min(1920,iw)':-2,fps=30" \
  -c:v libx264 -profile:v high -pix_fmt yuv420p \
  -crf 26 -preset slow -movflags +faststart \
  public/hero.mp4
```

Expected: `public/hero.mp4` is roughly 3–8 MB. If it exceeds ~8 MB, re-run with `-crf 30` or `scale='min(1280,iw)':-2` (720p).

- [ ] **Step 4: Extract a poster frame**

Run:

```bash
ffmpeg -i public/hero.mp4 -ss 00:00:01 -frames:v 1 -q:v 3 public/hero-poster.jpg
```

- [ ] **Step 5: Verify size + that the hero plays**

Run: `ls -lh public/hero.mp4 public/hero-poster.jpg` (confirm hero.mp4 ≤ ~8 MB).
Run `npm run dev`; expected: hero video autoplays muted and loops behind the gradient.

- [ ] **Step 6: Make sure the raw source is ignored, then commit the web assets**

Run: `grep -q '^Wagyu.mp4$' .gitignore || printf 'Wagyu.mp4\n' >> .gitignore`

```bash
git add public/hero.mp4 public/hero-poster.jpg .gitignore
git commit -m "Add compressed hero video + poster; ignore raw Wagyu.mp4"
```

> Do **not** `git add Wagyu.mp4` — the 66 MB raw file stays out of the repo.

---

## Task 9: Full-site verification & cleanup

**Files:** none (verification only)

- [ ] **Step 1: Production build**

Run: `npm run build`
Expected: succeeds with no errors.

- [ ] **Step 2: Visual sweep, both languages**

Run `npm run dev`. Walk the full page in ES and EN: header, hero (video playing), services, catalog grid, a product detail, brands, clients, contact, footer, cart drawer. Confirm:
- All big headings are serif title-case; all eyebrows/labels gold sans-uppercase.
- Red appears only on actions (buttons, CTAs, promo, solid service tiles, cart) and the WhatsApp FAB.
- No leftover all-caps Oswald anywhere.

Run to confirm no stray uppercase display headings remain:
`grep -n "var(--font-display)" src/app.jsx | grep "uppercase"`
Expected: only intentional SMALL-LABEL lines (if any remain they should use `--font-eyebrow`, not `--font-display`) — there should be **no** `--font-display` + `uppercase` pairs left.

- [ ] **Step 3: Accessibility checks**

- Confirm `prefers-reduced-motion` hides the video (toggle OS setting or DevTools rendering emulation; hero falls back to poster/charcoal).
- Confirm gold (`#C9A678`) is used only for large/secondary labels on dark or for accents — never small body copy on white (fails AA).

- [ ] **Step 4: Final commit (if any cleanup edits were made)**

```bash
git add -A
git commit -m "Final luxury-redesign verification cleanup"
```

- [ ] **Step 5: Hand back**

Report: build status, a before/after screenshot of the hero, and confirm cart/WhatsApp/ES-EN still work. Offer to open a PR from `luxury-redesign`.

---

## Self-review notes (coverage vs spec)

- Fonts (Playfair + Inter) → Task 1. ✓
- Gold accent token + usage → Tasks 1, 3, 5, 6. ✓
- Red kept as action color → preserved in Tasks 2–7 (buttons/badges/promo untouched). ✓
- Video hero + poster + compression + reduced-motion → Tasks 2, 8. ✓
- Whole-site retheme (header→footer) → Tasks 3–7. ✓
- Uppercase removal on display headings → Task 4 (enumerated) + verified in Task 9. ✓
- ds-bundle kit → Task 7. ✓
- No functional change (cart/WhatsApp/i18n/admin) → no task touches that logic. ✓
- Risk: 66 MB video not shipped → Task 8 Step 6 (gitignore) + spec risk. ✓
- Accessibility/contrast → Task 9 Step 3. ✓
