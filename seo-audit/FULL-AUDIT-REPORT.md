# Full SEO Audit — meatconnection.mx

**Site:** https://meatconnection.mx (canonical, non-www) • requested as www.meatconnection.mx
**Audit date:** 2026-06-18
**Platform:** WordPress + WooCommerce + Elementor, LiteSpeed Cache, hosted on Hostinger
**Business type:** B2B premium meat distributor (Wagyu / Angus) — **catalog / quote model** (no prices or checkout shown; CTA is "Cotiza" / request a quote) with national cold-chain shipping + local delivery (Mexico)
**Language:** Spanish (`lang=es`, `og:locale=es_MX`) — single language, no hreflang needed
**Pages discovered (sitemaps):** 90 URLs — 24 pages, 16 products, 6 product categories, 44 product tags. All return HTTP 200.

---

## Executive Summary

### Overall SEO Health Score: **60 / 100** — *Fair / Needs Improvement*

The site has a solid technical foundation (clean crawl, HTTPS, valid Yoast sitemaps, consistent canonicals, properly noindexed cart/checkout) and good homepage/product copy. The score is held back by **missing Product/Offer structured data on a commerce catalog**, **thin pages with missing meta descriptions**, **index bloat from 44 near-duplicate product tags**, and **missing image alt text**. These are mostly fast, high-leverage fixes.

| Category | Score | Weight | Weighted |
|---|---|---|---|
| Technical SEO | 72 | 22% | 15.8 |
| Content Quality | 58 | 23% | 13.3 |
| On-Page SEO | 62 | 20% | 12.4 |
| Schema / Structured Data | 48 | 10% | 4.8 |
| Performance (CWV)* | 60 | 10% | 6.0 |
| AI Search Readiness | 52 | 10% | 5.2 |
| Images | 50 | 5% | 2.5 |
| **TOTAL** | | | **~60** |

\* *Performance is a lab/heuristic estimate — no CrUX field data available (no Google API key configured). Treat as low-confidence.*

### Top 5 Critical Issues
1. **No Product schema on product pages.** Product pages emit only generic `WebPage`/`Organization` JSON-LD — no `Product`, `Offer`, `AggregateRating`, or `Review`. On a commerce catalog this forfeits rich results entirely.
2. **`og:type = article` on product pages** (should be `product`/`og:product`) — wrong Open Graph type for shared product links and social/AI parsing.
3. **Index bloat: 44 product-tag pages are indexable**, most near-duplicates (e.g. `umami-concentrado` / `umami-intenso` / `umami-profundo` / `umami-suave`; `marmoleo-alto` vs `alto-marmoleo`) with ~1 product each → thin, cannibalizing pages diluting crawl budget and authority.
4. **Missing meta descriptions on key pages**: `/nosotros/`, `/contacto/`, `/faq/`, the blog, and product-category pages — Yoast falls back to auto-text or none.
5. **Duplicate H1 on the homepage** (the same heading appears twice) and **category pages have no H1** (`product-category/wagyu` returns H1 = 0, with default "Wagyu archivos" title).

### Top 5 Quick Wins
1. Add **FAQPage schema** to `/faq/` (already has 536 words of real Q&A) → eligible for FAQ rich results.
2. **Write meta descriptions** for the ~5 pages missing them (Yoast field; ~15 min each).
3. **Add alt text** to images — homepage is missing alt on 12 of 18 images (67%).
4. **Set product tags to `noindex`** in Yoast (Search Appearance → Taxonomies) to kill index bloat in one toggle.
5. Fix the **category page title/H1** (remove "archivos" default, add a descriptive H1 + intro paragraph).

---

## Technical SEO — Score 72/100

**Strengths**
- HTTPS enforced; CSP `upgrade-insecure-requests` present. HTTP/2 + HTTP/3 (`alt-svc h3`).
- `www` → non-`www` 301 in place; canonical tags consistently point to non-`www`. Single canonical host.
- `robots.txt` is clean and sensible: blocks `/wp-admin/` (allows `admin-ajax.php`), WooCommerce logs/uploads, `add-to-cart` query params, and `/wp-json/`; declares `Sitemap: https://meatconnection.mx/sitemap_index.xml`.
- Valid Yoast `sitemap_index.xml` split into page/product/product_cat/product_tag with fresh `lastmod`.
- **All 90 crawled URLs return 200** — no 4xx/5xx, no redirect chains beyond the host redirect.
- `cart`, `checkout`, `my-account` correctly **noindexed** (checkout also canonicalizes to cart).
- LiteSpeed Cache active (`x-litespeed-cache: hit`), CSS appears inlined/critical-path optimized.
- `viewport` meta present; mobile-ready theme.

**Issues**
| Severity | Issue | Detail |
|---|---|---|
| High | Index bloat | 44 product-tag URLs + `uncategorized` category are indexable and in the sitemap; most are thin near-duplicates. |
| High | Missing security headers | Only `content-security-policy: upgrade-insecure-requests`. **No HSTS, X-Content-Type-Options, X-Frame-Options, Referrer-Policy, Permissions-Policy.** |
| Medium | Duplicate shop surfaces | Both `/shop/` and `/tienda/` exist (plus `/tienda/mas-vendidos/`, `/tienda/por-region/`, `/tienda/por-corte/`) — confirm one canonical shop and avoid duplicate listing pages. |
| Medium | `uncategorized` product category indexable | Default WooCommerce catch-all category should be noindexed or removed. |
| Low | Mixed-language slugs | `/tienda/` (ES) coexists with `/shop/`, `/cart/`, `/checkout/`, `/my-account/` (EN). Cosmetic, but inconsistent for an es_MX site. |

**Core Web Vitals:** No field data (CrUX/GSC) — configure a Google API key to replace estimates with real data. Lab signals below.

---

## Content Quality — Score 58/100

**Strengths**
- Homepage is substantial (~1,034 words) with clear value proposition and brand narrative.
- Product copy is decent (~469 words on the sampled A5 page) with sensory/quality language well-suited to premium positioning.
- Distinct topical content exists: `acerca-de-la-carne`, `consejos-de-cocina`, `japan-library`, `japanese-wagyu`, `envios`.

**Issues**
| Severity | Page | Words | Problem |
|---|---|---|---|
| High | `/the-marble-blog/` | **77** | Blog index is essentially empty — no posts, no H2s. Either build it out or noindex until populated. |
| High | `/product-category/wagyu/` | 191 | Thin, **no H1**, default "archivos" title, no intro copy. |
| Medium | `/nosotros/` (About) | 224 | Thin for an E-E-A-T trust page; no team/credentials/sourcing detail, no meta description. |
| Medium | `/contacto/` | 270 | Thin; no meta description. |
| Medium | 44 product tags | ~low | Thin, near-duplicate taxonomy pages. |

**E-E-A-T:** The brand voice supports *Expertise* (Wagyu grading, marbling, origin language), but trust signals are underdeveloped: the About page is thin, there are no author bios on editorial pages, no visible certifications/sourcing provenance, and the blog (a natural authority-builder) is empty. For a premium food/B2B vendor, provenance and trust content directly affect conversions and AI citability.

---

## On-Page SEO — Score 62/100

**Strengths**
- Strong, keyword-aligned titles + meta descriptions on the homepage, `/tienda/`, product pages, and `/envios/`.
- Breadcrumbs present site-wide (`BreadcrumbList` schema).
- Open Graph + `og:image` + `og:locale=es_MX` present.

**Issues**
| Severity | Issue | Evidence |
|---|---|---|
| High | Missing meta descriptions | `/nosotros/`, `/contacto/`, `/faq/`, `/the-marble-blog/`, product-category pages = `Meta Description: None`. |
| High | Duplicate H1 | Homepage renders the same H1 twice ("Vendemos la mejor carne premium del Mundo…"). |
| High | Category pages missing H1 | `product-category/wagyu` → H1 count = 0. |
| Medium | Default archive titles | "Wagyu archivos \| Meat connection" — Yoast taxonomy title template not customized. |
| Medium | Blog has no H2 structure | `/the-marble-blog/` → 0 H2s. |
| Low | Internal linking depth | Homepage has ~39 internal links (healthy), but thin category/tag pages create shallow, low-value internal targets. Add contextual links from product pages to category and editorial content. |

---

## Schema & Structured Data — Score 48/100

**Currently implemented (sitewide, via Yoast):** `Organization`, `WebSite` + `SearchAction`, `WebPage`, `BreadcrumbList`, `ImageObject`, `ListItem`. Category pages add `CollectionPage`. This is a clean Yoast graph.

**Critical gaps**
| Severity | Gap | Impact |
|---|---|---|
| Critical | **No `Product` schema** on product pages | No product rich results. Even in a quote model you can emit `Product` with `name`, `image`, `brand`, `description`, `sku`, `category`, and an `Offer` with `availability` (`PreOrder`/`InStock`) and `priceSpecification`/`priceCurrency` or `"price":"0"` is not valid — use a quote-appropriate offer or omit price but keep availability. |
| Critical | `og:type = article` on products | Should be `product`. Add `product:*` OG tags or correct via Yoast WooCommerce SEO. |
| High | **No `FAQPage` schema** on `/faq/` | Page has 536 words of genuine Q&A — easy FAQ rich result win. |
| High | **No `LocalBusiness`** despite local delivery (`/entregas-locales/`) | Add `LocalBusiness`/`FoodEstablishment` with NAP, area served, hours if applicable. |
| Medium | No `Review`/`AggregateRating` | If reviews exist or are collected, expose them in schema for star eligibility. |

**Recommendation:** Install **Yoast WooCommerce SEO** (or enable WooCommerce's native structured data) to auto-emit `Product`/`Offer` schema and correct `og:type`. Validate with Google's Rich Results Test after deployment.

---

## Performance (Core Web Vitals) — Score 60/100 *(lab estimate, low confidence)*

No CrUX field data available (configure `GOOGLE_API_KEY` for real LCP/INP/CLS). Lab observations:

- **Stack is heavy:** Elementor page builder + Swiper + jQuery + gtag. Homepage HTML is **~215 KB** (CSS appears inlined by LiteSpeed, inflating document size).
- **Caching is good:** LiteSpeed Cache hits; HTTP/2+3.
- **LCP risk:** lazy-load is applied to 12/18 homepage images via base64 SVG placeholders. The first/logo image is *not* lazy (good), but verify the **hero/LCP image is excluded from lazy-load and ideally has `fetchpriority=high`**.
- **INP risk:** Elementor + jQuery + Swiper raise main-thread cost on mobile — likely the weakest CWV.

**Actions:** confirm hero image is preloaded/eager; defer non-critical JS; reduce unused Elementor widgets; verify LiteSpeed image optimization (WebP) is on; measure real INP via field data.

---

## Images — Score 50/100

- **Homepage: 12 of 18 images missing/empty alt (67%).**
- Product page: 4 of 12 images missing alt.
- Native `loading=lazy` is applied broadly (good), but ensure the LCP/hero image is **not** lazy.
- Format/optimization: serve WebP/AVIF (LiteSpeed image optimization) and confirm responsive `srcset`.
- **Action:** add descriptive, keyword-relevant Spanish alt text to all content images (e.g. "Filete Wagyu Japonés A5 con alto marmoleo en corte transversal").

---

## AI Search Readiness (GEO) — Score 52/100

- **Positives:** clean Schema graph, clear es_MX content, descriptive product language, `WebSite`+`SearchAction`.
- **Gaps:**
  - No `llms.txt` at root (optional but emerging signal for AI crawler guidance).
  - Thin/empty editorial content (blog, About) limits passage-level **citability** — AI engines cite well-structured, factual, authoritative passages. The Wagyu grading / origin topics are high-citation-potential but under-developed.
  - Missing `Product`/`FAQPage`/`LocalBusiness` schema reduces entity clarity for AI extraction.
- **Actions:** build out `japan-library` / `acerca-de-la-carne` into authoritative, well-structured explainers (definitions, tables, Q&A blocks); add FAQ schema; consider an `llms.txt`.

---

## Backlinks

Not deeply analyzed — no Moz/Bing/DataForSEO credentials configured (basic tier only). The site appears young/small; prioritize on-page and content fixes first, then pursue Mexican food/gastronomy and B2B HORECA citations and directory listings.

---

## Notes on Data Limitations
- No Google API (PageSpeed/CrUX/GSC/GA4) → CWV, indexation, and traffic are estimated, not measured.
- No Playwright → no rendered screenshots/visual above-fold capture.
- No DataForSEO/Moz → no live SERP positions or backlink profile.
- Configure these to upgrade the audit from lab/heuristic to field-data-backed.
