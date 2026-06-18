# Meat Connection — Wagyu Storefront

Static site built from the Meat Connection design system. No build step, no
runtime Babel — the React/JSX is precompiled to `app.js`. Drop it on Vercel
(or any static host) and it works.

## Files
```
index.html      entry — loads React (CDN), the design-system bundle, app.js
app.js          precompiled storefront (home / shop / product / cart)
ds_bundle.js    Meat Connection design-system components (unchanged)
styles.css      design tokens (colors, type, spacing) + responsive rules
images/         the 5 wagyu product photos (webp, ~1000px)
assets/         logo
vercel.json     static config + long-cache headers for images/assets
```

## Edit prices
Open `app.js`, search for `const PRODUCTS` (top of file). Each cut has a
`price` and `weight` — change those. (Source lives in the chat as
`app_src.jsx` if you'd rather edit JSX and recompile.)

## Deploy to Vercel

### Option A — CLI (fastest)
```bash
npm i -g vercel        # once
cd meat-connection
vercel                 # preview URL
vercel --prod          # production
```
When asked for settings: Framework = **Other**, Build Command = **(none)**,
Output Directory = **./**. Vercel serves the folder as-is.

### Option B — GitHub
1. Push this folder to a GitHub repo.
2. vercel.com → New Project → import the repo.
3. Framework Preset: **Other**. Leave build/output blank. Deploy.

## Local preview
```bash
npx serve .            # or: python3 -m http.server 8000
```
Open the printed URL. (Opening index.html via file:// also works.)

## Notes
- Fonts (Oswald + Archivo) load from Google Fonts; icons from Lucide CDN —
  both are the design system's substitutions. Swap if brand assets arrive.
- Checkout and Search are UI-only. Wire Checkout to Stripe/Shopify when ready.
- To self-host React instead of the CDN, download the two react UMD files into
  the folder and update the `<script src>` paths in index.html.
