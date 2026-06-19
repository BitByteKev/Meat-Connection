# SEO Action Plan — meatconnection.mx

**Health Score:** 60/100 (Fair) → realistic target after Critical + High fixes: **78–82/100**
Ordered by priority. Effort: 🟢 <1h · 🟡 a few hours · 🔴 dev/project.

---

## 🔴 CRITICAL — fix immediately (blocks rich results / indexing quality)

### 1. Add Product structured data to product pages 🔴
- **Why:** Product pages emit no `Product`/`Offer`/`AggregateRating` schema — zero rich-result eligibility on a commerce catalog.
- **How:** Install **Yoast WooCommerce SEO** or enable WooCommerce native structured data. Emit `Product` (name, image, brand="Meat Connection", sku, category, description) + an `Offer` appropriate to the quote model (`availability: InStock/PreOrder`, `priceCurrency: MXN`; use `Offer` without a fake `price:0`). Validate in Google Rich Results Test.

### 2. Fix `og:type` on products 🟢
- **Why:** Products send `og:type=article`; should be `product`.
- **How:** Yoast WooCommerce SEO sets this automatically; otherwise correct the OG type and add `product:*` tags.

### 3. Stop product-tag index bloat 🟢
- **Why:** 44 indexable, near-duplicate tag pages (`umami-*`, `textura-*`, `marmoleo-*`) + `uncategorized` dilute crawl budget and cause cannibalization.
- **How:** Yoast → Search Appearance → Taxonomies → **Product Tags = Not indexed** (removes them from sitemap too). Noindex/redirect `product-category/uncategorized/`. Prune unused tags.

---

## 🟠 HIGH — fix within 1 week

### 4. Add meta descriptions to all pages missing them 🟢
- Pages: `/nosotros/`, `/contacto/`, `/faq/`, `/the-marble-blog/`, all `product-category/*`.
- **How:** Write 140–160 char Spanish descriptions with primary keyword + CTA ("Cotiza hoy").

### 5. Add FAQPage schema to /faq/ 🟢
- **Why:** 536 words of real Q&A already on page → easy FAQ rich result.
- **How:** Use an FAQ block/plugin that outputs `FAQPage` JSON-LD, or add manually. Validate.

### 6. Fix homepage duplicate H1 + category missing H1 🟡
- **Why:** Homepage renders the same H1 twice; `product-category/*` pages have **no H1** and default "…archivos" titles.
- **How:** In Elementor, set one H1 on the homepage (demote the duplicate to H2/`<p>`). Customize Yoast taxonomy title template and add a descriptive H1 + 100–150 word intro to each product category.

### 7. Add image alt text 🟢
- **Why:** Homepage missing alt on 12/18 images; product page 4/12.
- **How:** Add descriptive Spanish alt text to all content images; bulk-edit in WP Media Library.

### 8. Add security headers 🟡
- **Why:** Missing HSTS, X-Content-Type-Options, X-Frame-Options, Referrer-Policy, Permissions-Policy.
- **How:** Add via LiteSpeed/`.htaccess` or Hostinger headers:
  `Strict-Transport-Security: max-age=31536000; includeSubDomains`, `X-Content-Type-Options: nosniff`, `X-Frame-Options: SAMEORIGIN`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy: geolocation=(), microphone=()`.

### 9. Resolve duplicate shop surfaces 🟡
- **Why:** `/shop/` and `/tienda/` both live; multiple `/tienda/*` listing variants.
- **How:** Pick one canonical shop (likely `/tienda/`), 301 the other, ensure WooCommerce "Shop page" setting matches, canonical-tag the rest.

---

## 🟡 MEDIUM — fix within 1 month

### 10. Build out thin trust/content pages 🔴
- `/nosotros/` (224w): add story, sourcing/provenance, certifications, team, cold-chain process → E-E-A-T.
- `/the-marble-blog/` (77w, empty): publish Wagyu education posts (grados A5, marmoleo, origen japonés vs australiano, recetas) or noindex until ready.
- `/contacto/` (270w): add NAP, hours, service area, map.

### 11. Add LocalBusiness/FoodEstablishment schema 🟡
- For `/entregas-locales/` and `/contacto/`: name, address, phone, `areaServed`, hours, `priceRange`. Supports local/AI discovery.

### 12. Performance pass (CWV) 🔴
- Confirm hero/LCP image is eager + `fetchpriority=high` (not lazy).
- Enable LiteSpeed WebP/image optimization; ensure `srcset`.
- Reduce Elementor widget bloat; defer non-critical JS to lower mobile INP.
- **Measure with real field data** (set up Google API — see #14).

### 13. Internal linking & content depth for GEO 🟡
- Cross-link products → categories → editorial (`japan-library`, `acerca-de-la-carne`).
- Structure educational pages with definitions, comparison tables, and Q&A blocks for AI citability. Consider `llms.txt`.

---

## 🔵 LOW — backlog

### 14. Configure measurement APIs 🟢
- Add Google API key (PageSpeed/CrUX/GSC/GA4) and verify Search Console for real CWV, indexation, and traffic. Re-run this audit for field-data scoring.

### 15. Backlink/authority building 🔴
- Pursue Mexican gastronomy/HORECA citations, supplier directories, and chef/restaurant partnerships. Add Moz/DataForSEO for a real backlink audit.

### 16. Normalize slug language 🔵
- Optional: align EN system slugs (`/shop/`, `/cart/`) with the es_MX site for consistency (low SEO impact, do during a planned migration only).

---

## Suggested sequence
**Week 1:** #1–#9 (most are <1h Yoast/WooCommerce toggles + writing). Biggest score jump.
**Month 1:** #10–#13 (content + performance — the durable ranking/conversion gains).
**Backlog:** #14–#16 (measurement + authority).
