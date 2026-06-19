# Meat Connection — Spanish B2B Distributor Site

**Date:** 2026-06-18
**Source of content:** https://meatconnection.mx/

## Goal
Repopulate the existing Wagyu storefront with the real Meat Connection brand:
a Spanish-language B2B premium-meat distributor in Mexico. Keep the existing
charcoal/red design system, fonts, and product photos. Change content and
structure only.

## Decisions (confirmed with user)
- **Direction:** Match real brand — Spanish, B2B wholesale distributor.
- **Conversion:** Both — keep cart/shop UX, add prominent WhatsApp + quote CTAs.
- **New sections:** Services/value props, Brand partners, Target clients,
  Contact/quote — all four.
- **Pricing:** Keep existing prices on cards so cart stays functional.

## Scope of files
- `index.html` — **the authoritative, self-contained page that actually
  renders.** It inlines the design system + a Babel-transpiled JSX app
  (`<script type="text/babel">`) and the product images as base64. It does NOT
  load `app.js`. All live content changes are made here.
- `app.js` — precompiled `React.createElement` copy. Despite the README, it is
  NOT referenced by `index.html`. Updated in parallel to stay consistent, but
  changing it alone has no visible effect.
- `index.html` meta — updated `<title>` + OG/description.
- `styles.css` — added responsive rules for new home sections + hero CTA stack.
- `src/` Vite scaffold is unused by the live site — left untouched.

## Note on README accuracy
README claims `app.js` is the deployed file loaded by `index.html`. In reality
`index.html` is self-contained (in-browser Babel). Worth correcting later.

## Brand facts (from reference)
- Tagline: "Vendemos la mejor carne premium del mundo para tu negocio en México."
- WhatsApp: +52 664 313 1945 (wa.me/5216643131945)
- Social: Instagram / Facebook @meatconnectionmx
- Categories: Wagyu Japonés, Wagyu Australiano, Carne Americana.
- Services: Envíos Express, Importadores Directos, Conservación Total (cadena de
  frío); porcionado y etiquetado, empacado al vacío, presentación en charolas.
- Partners: Kobe Beef, Jack's Creek, Stone Axe, Margaret River Wagyu, Masami
  Beef, Wagyu Japanese Beef.
- Clients: restaurantes, hoteles de lujo, carnicerías gourmet, clubes privados y
  campos de golf, caterers corporativos, organizadores de eventos.

## Component changes (app.js)
1. **PRODUCTS** — Spanish names/desc, categories `Wagyu Japonés` / `Wagyu
   Australiano`, mapped to the 5 existing photos.
2. **Header** — Spanish nav: Catálogo, Cortes, Marcas, Nosotros, Contacto;
   Spanish search placeholder.
3. **Hero** — Spanish headline/eyebrow/stats; CTAs "Ver Catálogo" + "Cotizar por
   WhatsApp".
4. **New `Services` section** — 3 value props + 3 sub-services (icons).
5. **New `Partners` strip** — brand names.
6. **New `Clients` section** — target client list.
7. **New `Contact` section** — WhatsApp, social, quote form (nombre, negocio,
   WhatsApp, asunto). Form is UI-only (like existing checkout).
8. **`WhatsAppFab`** — floating button on all views (wa.me link).
9. **ProductDetail / Cart / ShopToolbar / Footer** — Spanish copy.
10. **Home view** — order: Hero → Servicios → This Week's Cuts → Marcas →
    Clientes → Contacto.

## Out of scope
- Real checkout/payment wiring (kept UI-only).
- Inventing MXN prices (keep existing values).
- Touching the unused `src/` Vite scaffold.
