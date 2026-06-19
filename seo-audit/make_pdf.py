#!/usr/bin/env python3
"""Generate a professional A4 SEO audit PDF for meatconnection.mx."""
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
from pathlib import Path
from weasyprint import HTML

OUT = Path(__file__).parent
DOMAIN = "meatconnection.mx"
DATE = "18 June 2026"
SCORE = 60

cats = [
    ("Technical SEO", 72, "22%"),
    ("Content Quality", 58, "23%"),
    ("On-Page SEO", 62, "20%"),
    ("Schema", 48, "10%"),
    ("Performance (CWV)*", 60, "10%"),
    ("AI Readiness", 52, "10%"),
    ("Images", 50, "5%"),
]

ACCENT = "#7a1f1f"   # deep wagyu red
DARK = "#1a1a1a"
GREY = "#6b6b6b"
LIGHT = "#f4f1ee"


def color_for(v):
    if v >= 80: return "#2e7d32"
    if v >= 60: return "#e6a700"
    return "#c0392b"


# ---- Chart 1: category score bars ----
fig, ax = plt.subplots(figsize=(7.2, 3.2), dpi=160)
names = [c[0] for c in cats][::-1]
vals = [c[1] for c in cats][::-1]
colors = [color_for(v) for v in vals]
bars = ax.barh(names, vals, color=colors, height=0.62)
ax.set_xlim(0, 100)
ax.bar_label(bars, fmt="%d", padding=4, fontsize=9, color=DARK)
ax.axvline(80, color="#2e7d32", ls=":", lw=0.8, alpha=0.5)
ax.axvline(60, color="#e6a700", ls=":", lw=0.8, alpha=0.5)
for s in ["top", "right"]:
    ax.spines[s].set_visible(False)
ax.tick_params(labelsize=9, length=0)
ax.set_xlabel("Score (0–100)", fontsize=9, color=GREY)
plt.tight_layout()
bar_path = OUT / "chart_categories.png"
plt.savefig(bar_path, bbox_inches="tight", transparent=True)
plt.close()

# ---- Chart 2: overall score donut ----
fig, ax = plt.subplots(figsize=(2.6, 2.6), dpi=160)
ring = color_for(SCORE)
ax.pie([SCORE, 100 - SCORE], colors=[ring, "#e8e3df"], startangle=90,
       counterclock=False, wedgeprops=dict(width=0.30))
ax.text(0, 0.08, str(SCORE), ha="center", va="center", fontsize=34, fontweight="bold", color=DARK)
ax.text(0, -0.28, "/ 100", ha="center", va="center", fontsize=11, color=GREY)
ax.set(aspect="equal")
donut_path = OUT / "chart_score.png"
plt.savefig(donut_path, bbox_inches="tight", transparent=True)
plt.close()


def cat_rows():
    out = ""
    for n, v, w in cats:
        out += f"""<tr><td>{n}</td><td class='num'>{w}</td>
        <td class='num'><span class='pill' style='background:{color_for(v)}'>{v}</span></td></tr>"""
    return out


CRITICAL = [
    ("No <b>Product schema</b> on product pages", "Pages emit only generic <code>WebPage</code> JSON-LD — no <code>Product</code>, <code>Offer</code>, <code>AggregateRating</code>. Zero rich-result eligibility on a commerce catalog."),
    ("<code>og:type=article</code> on products", "Wrong Open Graph type for product links; should be <code>product</code>."),
    ("Index bloat — 44 product-tag pages", "Mostly near-duplicates (<code>umami-concentrado/intenso/profundo/suave</code>, <code>marmoleo-alto</code> vs <code>alto-marmoleo</code>) with ~1 product each."),
    ("Missing meta descriptions", "<code>/nosotros/</code>, <code>/contacto/</code>, <code>/faq/</code>, the blog, and product-category pages."),
    ("Heading structure broken", "Homepage renders a duplicate H1; product-category pages have <b>no H1</b> and default “Wagyu archivos” titles."),
]

WINS = [
    "Add <b>FAQPage schema</b> to <code>/faq/</code> — already has 536 words of Q&amp;A.",
    "Write the ~5 missing meta descriptions (Yoast field, ~15 min each).",
    "Add <b>alt text</b> — homepage is missing it on 12 of 18 images (67%).",
    "Set <b>product tags to noindex</b> in Yoast — kills index bloat in one toggle.",
    "Fix category page title/H1 and add intro copy.",
]

ACTIONS = [
    ("CRITICAL", "crit", [
        ("Add Product structured data (Product + Offer)", "Yoast WooCommerce SEO / native WC schema", "Dev"),
        ("Fix og:type to 'product'", "Yoast WooCommerce SEO", "<1h"),
        ("Noindex product tags + uncategorized", "Yoast → Taxonomies", "<1h"),
    ]),
    ("HIGH — within 1 week", "high", [
        ("Add meta descriptions to ~5 pages", "Yoast meta field", "<1h"),
        ("Add FAQPage schema to /faq/", "FAQ block / JSON-LD", "<1h"),
        ("Fix homepage duplicate H1 + category H1", "Elementor + Yoast templates", "Few h"),
        ("Add image alt text", "WP Media Library", "<1h"),
        ("Add security headers (HSTS, nosniff, etc.)", "LiteSpeed / .htaccess", "Few h"),
        ("Resolve /shop/ vs /tienda/ duplication", "301 + canonical", "Few h"),
    ]),
    ("MEDIUM — within 1 month", "med", [
        ("Build out About + blog + contact content", "Content", "Project"),
        ("Add LocalBusiness/FoodEstablishment schema", "JSON-LD", "Few h"),
        ("Performance pass: hero eager, WebP, defer JS", "LiteSpeed + Elementor", "Project"),
        ("Internal linking + GEO content depth", "Content", "Few h"),
    ]),
    ("LOW — backlog", "low", [
        ("Configure Google APIs (PSI/CrUX/GSC/GA4)", "API key + GSC verify", "<1h"),
        ("Backlink / authority building", "Outreach + Moz/DataForSEO", "Ongoing"),
        ("Normalize EN system slugs", "Migration only", "Project"),
    ]),
]


def action_blocks():
    html = ""
    for title, cls, rows in ACTIONS:
        body = "".join(
            f"<tr><td>{a}</td><td>{b}</td><td class='num'>{c}</td></tr>" for a, b, c in rows
        )
        html += f"""
        <h3 class='ah {cls}'>{title}</h3>
        <table class='atable'>
          <thead><tr><th>Action</th><th>How / where</th><th class='num'>Effort</th></tr></thead>
          <tbody>{body}</tbody>
        </table>"""
    return html


CSS = f"""
@page {{ size: A4; margin: 18mm 16mm 16mm 16mm;
  @bottom-center {{ content: "Meat Connection — SEO Audit · {DATE}"; font-size:8px; color:{GREY}; }}
  @bottom-right {{ content: "Page " counter(page) " / " counter(pages); font-size:8px; color:{GREY}; }}
}}
@page :first {{ margin:0; @bottom-center{{content:none}} @bottom-right{{content:none}} }}
* {{ box-sizing:border-box; }}
body {{ font-family:'Helvetica Neue',Arial,sans-serif; color:{DARK}; font-size:10.5px; line-height:1.5; }}
h1,h2,h3 {{ color:{DARK}; }}
code {{ background:{LIGHT}; padding:1px 4px; border-radius:3px; font-size:9px; }}
.cover {{ height:297mm; padding:34mm 24mm; position:relative; }}
.cover .bar {{ position:absolute; top:0; left:0; right:0; height:14mm; background:{ACCENT}; }}
.cover .kicker {{ color:{ACCENT}; letter-spacing:3px; font-size:11px; font-weight:bold; text-transform:uppercase; }}
.cover h1 {{ font-size:40px; margin:8px 0 4px; line-height:1.05; }}
.cover .dom {{ font-size:18px; color:{GREY}; margin-bottom:30px; }}
.cover .scorewrap {{ display:flex; align-items:center; gap:26px; margin:24px 0; }}
.cover .verdict {{ font-size:22px; font-weight:bold; }}
.cover .meta {{ margin-top:40px; color:{GREY}; font-size:11px; line-height:1.9; border-top:1px solid #e2dcd6; padding-top:16px; }}
.cover .meta b {{ color:{DARK}; }}
section {{ page-break-before:always; }}
.h2 {{ font-size:19px; border-bottom:2px solid {ACCENT}; padding-bottom:5px; margin:0 0 14px; }}
table {{ width:100%; border-collapse:collapse; margin:8px 0 16px; }}
th,td {{ text-align:left; padding:6px 9px; border-bottom:1px solid #e7e2dd; vertical-align:top; }}
th {{ background:{LIGHT}; font-size:9px; text-transform:uppercase; letter-spacing:.5px; color:{GREY}; }}
td.num,th.num {{ text-align:center; white-space:nowrap; }}
.pill {{ color:#fff; padding:2px 9px; border-radius:10px; font-weight:bold; font-size:9.5px; }}
.scoretable td:first-child {{ font-weight:600; }}
ol.crit {{ padding-left:18px; }}
ol.crit li {{ margin-bottom:7px; }}
ol.crit li .d {{ color:{GREY}; display:block; font-size:9.5px; }}
ul.wins li {{ margin-bottom:6px; }}
.callout {{ background:{LIGHT}; border-left:3px solid {ACCENT}; padding:10px 14px; margin:12px 0; font-size:10px; }}
.ah {{ font-size:12px; margin:16px 0 4px; padding:4px 10px; color:#fff; border-radius:3px; }}
.ah.crit{{background:#c0392b}} .ah.high{{background:#d97706}} .ah.med{{background:#2563eb}} .ah.low{{background:#6b7280}}
.atable th, .atable td {{ font-size:9.5px; }}
.img {{ width:100%; }}
.two {{ display:flex; gap:18px; }}
.two > div {{ flex:1; }}
.note {{ font-size:8.5px; color:{GREY}; font-style:italic; }}
"""

HTML_DOC = f"""<!doctype html><html><head><meta charset='utf-8'><style>{CSS}</style></head><body>

<div class='cover'>
  <div class='bar'></div>
  <div class='kicker'>Search Engine Optimization Audit</div>
  <h1>SEO Health Report</h1>
  <div class='dom'>{DOMAIN}</div>
  <div class='scorewrap'>
    <img src='{donut_path.name}' style='width:150px'>
    <div>
      <div class='verdict' style='color:{color_for(SCORE)}'>Fair &mdash; Needs Improvement</div>
      <div style='color:{GREY}; margin-top:6px; max-width:230px'>Solid technical base, but structured data, thin content, and index bloat are capping visibility.</div>
    </div>
  </div>
  <div class='meta'>
    <b>Prepared:</b> {DATE}<br>
    <b>Business type:</b> B2B premium Wagyu / Angus distributor (catalog &amp; quote model)<br>
    <b>Platform:</b> WordPress + WooCommerce + Elementor &middot; LiteSpeed &middot; Hostinger<br>
    <b>Language / market:</b> Spanish (es_MX) &middot; Mexico<br>
    <b>Scope crawled:</b> 90 URLs (24 pages, 16 products, 6 categories, 44 tags) &mdash; all HTTP 200
  </div>
</div>

<section>
  <div class='h2'>Executive Summary</div>
  <div class='two'>
    <div>
      <p>The site has a <b>healthy technical foundation</b> &mdash; clean crawl with no broken URLs, HTTPS, valid Yoast sitemaps, consistent non-www canonicals, properly noindexed cart/checkout/account, and LiteSpeed caching. Homepage and product copy are strong.</p>
      <p>The <b>60/100</b> score is held back by four fixable themes: missing <b>Product/Offer structured data</b> on a commerce catalog, <b>thin pages with missing meta descriptions</b>, <b>index bloat</b> from 44 near-duplicate product tags, and <b>missing image alt text</b>. Most are sub-1-hour Yoast/WooCommerce changes.</p>
      <p class='note'>* Performance is a lab/heuristic estimate &mdash; no Google CrUX field data was available (no API key configured).</p>
    </div>
    <div><img class='img' src='{donut_path.name}' style='width:62%; display:block; margin:0 auto'></div>
  </div>

  <h3 style='margin-top:6px'>Category Scores</h3>
  <img class='img' src='{bar_path.name}'>
  <table class='scoretable'>
    <thead><tr><th>Category</th><th class='num'>Weight</th><th class='num'>Score</th></tr></thead>
    <tbody>{cat_rows()}</tbody>
  </table>
</section>

<section>
  <div class='h2'>Top 5 Critical Issues</div>
  <ol class='crit'>
    {''.join(f"<li>{t}<span class='d'>{d}</span></li>" for t,d in CRITICAL)}
  </ol>

  <div class='h2' style='margin-top:24px'>Top 5 Quick Wins</div>
  <ul class='wins'>
    {''.join(f"<li>{w}</li>" for w in WINS)}
  </ul>

  <div class='callout'><b>Projected outcome:</b> completing the Critical + High actions should lift the score to roughly <b>78&ndash;82 / 100</b>, with the largest gains from Product schema and removing tag-page index bloat.</div>
</section>

<section>
  <div class='h2'>Prioritized Action Plan</div>
  {action_blocks()}
  <p class='note'>Effort key: &lt;1h = single setting / quick edit &middot; Few h = a few hours &middot; Project = multi-step / dev or content work.</p>
</section>

<section>
  <div class='h2'>Key Findings by Area</div>
  <h3>Technical SEO &mdash; 72</h3>
  <p>HTTPS + HTTP/2/3, clean robots.txt, valid split Yoast sitemaps, consistent non-www canonicals, all 90 URLs return 200, cart/checkout/account noindexed, LiteSpeed caching. <b>Gaps:</b> index bloat (44 tags + uncategorized), missing security headers (HSTS, X-Content-Type-Options, X-Frame-Options, Referrer-Policy), and duplicate shop surfaces (/shop/ vs /tienda/).</p>
  <h3>Content &amp; On-Page &mdash; 58 / 62</h3>
  <p>Strong homepage (~1,034 words) and product copy. <b>Gaps:</b> thin/empty pages (blog 77 words, category 191, About 224, Contact 270), missing meta descriptions, duplicate homepage H1, and missing category H1s with default archive titles. E-E-A-T trust signals (provenance, team, certifications) are underdeveloped.</p>
  <h3>Schema &mdash; 48</h3>
  <p>Clean Yoast graph (Organization, WebSite+SearchAction, BreadcrumbList, WebPage, CollectionPage). <b>Critical gaps:</b> no Product/Offer on products, og:type=article, no FAQPage on a 536-word FAQ, no LocalBusiness despite local delivery.</p>
  <h3>Performance &amp; Images &mdash; 60 / 50</h3>
  <p>Elementor + Swiper + jQuery + ~215KB HTML; LiteSpeed helps but mobile INP is the likely weak point. Confirm the hero/LCP image is eager + fetchpriority=high. Images: 67% of homepage images and several product images lack alt text; serve WebP/AVIF.</p>
  <h3>AI Search Readiness &mdash; 52</h3>
  <p>Clean schema and clear es_MX content help, but thin editorial content and missing Product/FAQ/LocalBusiness schema limit citability. Build out the Wagyu education pages and add an llms.txt.</p>
</section>

</body></html>"""

html_file = OUT / "SEO-AUDIT-REPORT.html"
html_file.write_text(HTML_DOC, encoding="utf-8")
pdf_file = OUT / "SEO-AUDIT-REPORT.pdf"
HTML(string=HTML_DOC, base_url=str(OUT)).write_pdf(str(pdf_file))
print("PDF written:", pdf_file)
print("Size:", pdf_file.stat().st_size, "bytes")
