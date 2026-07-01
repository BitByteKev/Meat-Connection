import React from 'react'
import * as ReactDOM from 'react-dom/client'
import { Analytics } from '@vercel/analytics/react'
import { LangProvider, useLang, getStrings, fmt } from './i18n.jsx'
import { PRODUCTS as PRODUCT_LIST } from './products.js'
import AdminApp from './admin/AdminApp.jsx'


/* ===== shared: Icon, money, catalog, ProductImage ===== */
function Icon({ name, size = 20, color = 'currentColor', strokeWidth = 2, style = {} }) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (!ref.current || !window.lucide || !window.lucide[name]) return;
    ref.current.innerHTML = '';
    const el = window.lucide.createElement(window.lucide[name]);
    el.setAttribute('width', size); el.setAttribute('height', size);
    el.setAttribute('stroke', color); el.setAttribute('stroke-width', strokeWidth);
    ref.current.appendChild(el);
  });
  return <span ref={ref} style={{ display: 'inline-flex', ...style }}></span>;
}

/* ===== contact / brand constants (Meat Connection — meatconnection.mx) ===== */
const WA_NUMBER = '526631082592';
const WA_DISPLAY = '+52 663 108 2592';
const IG_LINK = 'https://instagram.com/meatconnectionmx';
const FB_LINK = 'https://facebook.com/meatconnectionmx';
const waHref = (msg) => 'https://wa.me/' + WA_NUMBER + (msg ? '?text=' + encodeURIComponent(msg) : '');
const openWhatsApp = (msg) => window.open(waHref(msg), '_blank');

/* Reorder: returning clients re-send their last order in one tap — their #1 friction.
   We store only id/price/qty so the message rebuilds in the current language.
   Falls back to a generic reorder message until a first order is placed on this device. */
const LAST_ORDER_KEY = 'mc_last_order';
function saveLastOrder(items) {
  try { localStorage.setItem(LAST_ORDER_KEY, JSON.stringify(items.map((i) => ({ id: i.id, qty: i.qty, saleType: i.saleType })))); } catch (e) {}
}
function loadLastOrder() {
  try { const s = JSON.parse(localStorage.getItem(LAST_ORDER_KEY)); return Array.isArray(s) && s.length ? s : null; } catch (e) { return null; }
}
const productName = (id) => (getStrings().products[id] ? getStrings().products[id].name : id);
function orderLines(items) {
  const S = getStrings().pdp;
  return items.map((it) => {
    const tipo = it.saleType === 'menudeo' ? S.menudeo : S.mayoreo;
    return '• ' + productName(it.id) + ' — ' + it.qty + ' kg (' + tipo + ')';
  }).join('\n');
}
function reorderWhatsApp() {
  const wa = getStrings().wa;
  const last = loadLastOrder();
  openWhatsApp(last ? wa.reorderIntro + '\n' + orderLines(last) : wa.reorderGeneric);
}

/* Catálogo — orden, categoría y tono vienen de products.json (ver ./products.js).
   Nombre/desc/badge se leen por id desde i18n (que también deriva de products.json). */
const PRODUCTS = PRODUCT_LIST;
const TONE_BG = { charcoal: 'var(--mc-charcoal)', kraft: 'var(--mc-kraft)', cream: 'var(--mc-cream)', red: 'var(--mc-red)' };
const TONE_FG = { charcoal: 'var(--mc-paper)', kraft: 'var(--mc-ink-900)', cream: 'var(--mc-ink-800)', red: '#fff' };

/* ===== Language toggle (ES | EN) ===== */
function LangToggle({ style, className }) {
  const { lang, setLang } = useLang();
  const opts = [['es', 'ES'], ['en', 'EN']];
  return (
    <div role="group" aria-label="Language" className={className} style={{ display: 'inline-flex', border: '1px solid color-mix(in srgb, currentColor 32%, transparent)', borderRadius: 'var(--radius-md)', overflow: 'hidden', flex: 'none', ...style }}>
      {opts.map(([code, label]) => {
        const on = lang === code;
        return (
          <button key={code} onClick={() => setLang(code)} aria-pressed={on}
            aria-label={code === 'es' ? 'Cambiar a español' : 'Switch to English'}
            style={{ border: 'none', cursor: 'pointer', padding: '0 10px', height: '40px', minWidth: '40px',
              fontFamily: 'var(--font-eyebrow)', fontWeight: 700, fontSize: '13px', letterSpacing: '0.06em',
              background: on ? 'var(--mc-red)' : 'transparent', color: on ? '#fff' : 'currentColor', transition: 'background var(--dur-fast), color var(--dur-fast)' }}>
            {label}
          </button>
        );
      })}
    </div>
  );
}

/* Real-photo product image (replaces menu-board tile). fit: cover|contain */
function ProductImage({ product, height = 220, big = false, fit = 'cover' }) {
  const { t } = useLang();
  const name = t.products[product.id].name;
  const src = product.img || window.MC_IMG[product.id];
  if (src) {
    return (
      <RevealImg src={src} alt={name} loading="lazy"
        frameStyle={{ height: height + 'px', background: 'var(--mc-charcoal)' }}
        imgStyle={{ width: '100%', height: '100%', objectFit: fit, display: 'block' }} />
    );
  }
  const bg = TONE_BG[product.tone] || 'var(--mc-cream)';
  const fg = TONE_FG[product.tone] || 'var(--mc-ink-800)';
  return (
    <div style={{ position: 'relative', height: height + 'px', background: bg, color: fg, display: 'flex',
      flexDirection: 'column', justifyContent: 'flex-end', padding: big ? '28px' : '18px', overflow: 'hidden' }}>
      <div style={{ position: 'relative', fontFamily: 'var(--font-display)',
        lineHeight: 0.98, fontWeight: 700, fontSize: big ? '54px' : '30px' }}>{name}</div>
    </div>
  );
}

/* ===== Header ===== */
function Header({ cartCount, onCart, onNav, onAnchor, onReorder, overHero = false }) {
  const { IconButton, Button } = window.MeatConnectionDesignSystem_3e7a26;
  const { t } = useLang();
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [atTop, setAtTop] = React.useState(true);
  React.useEffect(() => {
    const onScroll = () => setAtTop(window.scrollY < 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const transparent = overHero && atTop;
  const links = [
    { label: t.nav.catalog, go: () => onNav('shop') },
    { label: t.nav.services, go: () => onAnchor('servicios') },
    { label: t.nav.brands, go: () => onAnchor('marcas') },
    { label: t.nav.clients, go: () => onAnchor('clientes') },
    { label: t.nav.contact, go: () => onAnchor('contacto') },
  ];
  React.useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);
  const goMobile = (l) => { setMenuOpen(false); l.go(); };
  return (
    <header style={{ color: 'var(--text-strong)', position: 'sticky', top: 0, zIndex: 30 }}>
      {/* Frosted bar lives on its own element (NOT the <header>): backdrop-filter
          on an ancestor would make it the containing block for the fixed menu below,
          collapsing the menu's height:100% at the top of the page. */}
      <div style={{
        background: transparent ? 'rgba(247,245,240,0.82)' : 'var(--mc-paper)',
        backdropFilter: transparent ? 'saturate(1.3) blur(10px)' : 'none',
        WebkitBackdropFilter: transparent ? 'saturate(1.3) blur(10px)' : 'none',
        borderBottom: '1px solid var(--border-subtle)',
        transition: 'background var(--dur-med) var(--ease-out), border-color var(--dur-med) var(--ease-out)'
      }}>
      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', padding: '0 20px', height: '68px', display: 'flex', alignItems: 'center', gap: '24px', boxShadow: 'inset 0 -1px 0 var(--hairline-gold)' }}>
        <img src={window.MC_LOGO_INK} alt="Meat Connection" style={{ height: '32px', cursor: 'pointer' }} onClick={() => onNav('home')} />
        <nav className="mc-nav" style={{ display: 'flex', gap: '4px', flex: 1 }}>
          {links.map((l) => (
            <button key={l.label} onClick={l.go}
              style={{ border: 'none', background: 'transparent', color: 'var(--text-body)', cursor: 'pointer',
                fontFamily: 'var(--font-eyebrow)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600, fontSize: '14px', padding: '8px 12px' }}
              onMouseOver={(e) => e.currentTarget.style.color = 'var(--accent-gold-ink)'} onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-body)'}>
              {l.label}
            </button>
          ))}
        </nav>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginLeft: 'auto' }}>
          <LangToggle className="mc-langtoggle" />
          <button onClick={onReorder} aria-label={t.header.reorderAria} title={t.header.reorderTitle}
            className="mc-reorder-btn"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '7px', height: '40px', padding: '0 13px',
              border: '1px solid var(--border-default)', background: 'transparent', color: 'var(--text-strong)', cursor: 'pointer',
              borderRadius: 'var(--radius-md)', fontFamily: 'var(--font-eyebrow)', textTransform: 'uppercase',
              letterSpacing: '0.06em', fontWeight: 600, fontSize: '13px', whiteSpace: 'nowrap' }}
            onMouseOver={(e) => { e.currentTarget.style.borderColor = 'var(--mc-red)'; e.currentTarget.style.color = 'var(--mc-red)'; }}
            onMouseOut={(e) => { e.currentTarget.style.borderColor = 'var(--border-default)'; e.currentTarget.style.color = 'var(--text-strong)'; }}>
            <Icon name="RotateCcw" size={16} color="currentColor" /><span className="mc-reorder-label">{t.header.reorder}</span>
          </button>
          <div style={{ position: 'relative' }}>
            <IconButton variant="red" ariaLabel={t.header.cartAria} onClick={onCart}>
              <Icon name="ShoppingCart" size={18} color="#fff" />
            </IconButton>
            {cartCount > 0 && (
              <span style={{ position: 'absolute', top: '-6px', right: '-6px', background: '#fff', color: 'var(--mc-charcoal)', fontFamily: 'var(--font-eyebrow)', fontWeight: 700, fontSize: '11px', minWidth: '20px', height: '20px', borderRadius: '999px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 5px' }}>{cartCount}</span>
            )}
          </div>
          <button className="mc-menu-btn" aria-label={t.header.openMenu} aria-expanded={menuOpen} onClick={() => setMenuOpen(true)}
            style={{ width: '44px', height: '44px', alignItems: 'center', justifyContent: 'center', border: 'none', background: 'transparent', color: 'var(--text-strong)', cursor: 'pointer' }}>
            <Icon name="Menu" size={24} color="var(--text-strong)" />
          </button>
        </div>
      </div>
      </div>

      {/* Mobile slide-in menu */}
      <div onClick={() => setMenuOpen(false)} aria-hidden="true"
        style={{ position: 'fixed', inset: 0, background: 'rgba(20,20,20,0.6)', opacity: menuOpen ? 1 : 0, pointerEvents: menuOpen ? 'auto' : 'none', transition: 'opacity var(--dur-med)', zIndex: 60 }}></div>
      <aside role="dialog" aria-label={t.header.navAria} aria-modal="true"
        style={{ position: 'fixed', top: 0, right: 0, height: '100%', width: '84vw', maxWidth: '360px', background: 'var(--mc-paper)', color: 'var(--text-strong)', boxShadow: 'var(--shadow-lg)', transform: menuOpen ? 'translateX(0)' : 'translateX(100%)', transition: 'transform var(--dur-slow) var(--ease-out)', zIndex: 61, display: 'flex', flexDirection: 'column', padding: '18px 22px calc(22px + env(safe-area-inset-bottom))' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '16px' }}>
          <img src={window.MC_LOGO_INK} alt="Meat Connection" style={{ height: '30px' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <LangToggle />
            <button onClick={() => setMenuOpen(false)} aria-label={t.header.closeMenu}
              style={{ width: '44px', height: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', background: 'transparent', color: 'var(--text-body)', cursor: 'pointer' }}>
              <Icon name="X" size={24} color="var(--text-body)" />
            </button>
          </div>
        </div>
        <nav style={{ display: 'flex', flexDirection: 'column', marginTop: '8px', flex: 1 }}>
          {links.map((l) => (
            <button key={l.label} onClick={() => goMobile(l)}
              style={{ border: 'none', borderBottom: '1px solid var(--border-subtle)', background: 'transparent', color: 'var(--text-strong)', cursor: 'pointer', textAlign: 'left',
                fontFamily: 'var(--font-eyebrow)', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600, fontSize: '20px', padding: '18px 4px' }}>
              {l.label}
            </button>
          ))}
        </nav>
        <Button variant="secondary" size="lg" fullWidth onClick={() => { setMenuOpen(false); onReorder(); }}
          iconLeft={<Icon name="RotateCcw" size={18} color="var(--text-strong)" />}
          style={{ color: 'var(--text-strong)', borderColor: 'var(--border-default)', marginBottom: '10px' }}>{t.header.reorderOrder}</Button>
        <Button variant="primary" size="lg" fullWidth onClick={() => { setMenuOpen(false); openWhatsApp(getStrings().wa.quote); }}
          iconLeft={<Icon name="MessageCircle" size={18} color="#fff" />}>{t.header.quoteWhatsApp}</Button>
      </aside>
    </header>
  );
}

/* ===== Hero ===== */
function Hero({ onShop, onQuote }) {
  const { Button } = window.MeatConnectionDesignSystem_3e7a26;
  const { t } = useLang();
  // marginTop tucks the hero under the 68px sticky header so the video fills behind it;
  // mc-hero top padding (here + styles.css media queries) compensates to keep the headline clear.
  return (
    <section className="mc-hero-section" style={{ position: 'relative', background: 'var(--mc-charcoal)', color: 'var(--mc-paper)', overflow: 'hidden', marginTop: '-68px' }}>
      <video
        className="mc-hero-video"
        src="/hero.mp4" poster="/hero-poster.jpg"
        autoPlay muted loop playsInline preload="metadata"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 72%', zIndex: 0 }}
      />
      <div style={{ position: 'absolute', inset: 0, zIndex: 1,
        background: 'linear-gradient(90deg, rgba(15,15,15,0.88) 0%, rgba(15,15,15,0.55) 48%, rgba(15,15,15,0.15) 100%)' }} />
      <div className="mc-hero" style={{ position: 'relative', zIndex: 2, width: '100%', maxWidth: 'var(--container-max)', margin: '0 auto', padding: '88px 24px' }}>
        <div style={{ maxWidth: '600px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '22px' }}>
            <span style={{ height: '1px', width: '32px', background: 'var(--accent-gold)' }}></span>
            <span style={{ fontFamily: 'var(--font-eyebrow)', textTransform: 'uppercase', letterSpacing: '0.24em', fontWeight: 600, fontSize: '12px', color: 'var(--accent-gold)' }}>{t.hero.tag}</span>
          </div>
          <h1 className="mc-h1" style={{ fontFamily: 'var(--font-display)', fontWeight: 600, lineHeight: 1.04, letterSpacing: '-0.01em', margin: 0, textShadow: '0 2px 24px rgba(0,0,0,0.45)' }}>
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

/* ===== Product grid ===== */
function ProductCard({ product, onOpen }) {
  const { Card, Button, Badge } = window.MeatConnectionDesignSystem_3e7a26;
  const { t } = useLang();
  const p = t.products[product.id];
  return (
    <Card variant="default" padding="none" style={{ display: 'flex', flexDirection: 'column', cursor: 'pointer', transition: 'box-shadow var(--dur-med), transform var(--dur-med)' }}
      onClick={() => onOpen(product)}
      onMouseOver={(e) => { e.currentTarget.style.boxShadow = 'var(--shadow-lg)'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
      onMouseOut={(e) => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'translateY(0)'; }}>
      <div style={{ position: 'relative' }}>
        <ProductImage product={product} height={210} />
        {p.badge && (<div style={{ position: 'absolute', top: '14px', left: '14px' }}><Badge tone="red" solid>{p.badge}</Badge></div>)}
      </div>
      <div style={{ padding: '18px', display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 }}>
        <div>
          <div style={{ fontFamily: 'var(--font-eyebrow)', textTransform: 'uppercase', letterSpacing: '0.14em', fontSize: '11px', color: 'var(--accent-gold-ink)', marginBottom: '6px' }}>{t.categories[product.cat] || ''}</div>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '20px', lineHeight: 1.05, color: 'var(--text-strong)' }}>{p.name}</div>
          <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px' }}>{cardHook(p.description)}</div>
        </div>
        <div style={{ marginTop: 'auto' }}>
          <Button variant="secondary" size="sm" fullWidth onClick={(e) => { e.stopPropagation(); onOpen(product); }} iconRight={<Icon name="ArrowRight" size={15} color="currentColor" />}>{t.card.readMore}</Button>
        </div>
      </div>
    </Card>
  );
}
function ProductGrid({ products, onOpen }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '24px' }}>
      {products.map((p) => <ProductCard key={p.id} product={p} onOpen={onOpen} />)}
    </div>
  );
}

/* ===== Product detail ===== */
/* Per-product content is now plain text per language: description / origin / cooking.
   The catalog card shows the first non-empty line of the description. */
const cardHook = (text) => ((text || '').split('\n').find((l) => l.trim()) || '').trim();

/* Renders one plain-text field as paragraphs + bullet lists. Blank lines separate
   blocks; a block whose lines all start with `•` or `-` becomes a bullet list. */
function TextBlock({ text }) {
  if (!text || !text.trim()) return null;
  const blocks = text.trim().split(/\n\s*\n/);
  const para = { fontFamily: 'var(--font-body)', fontSize: '15px', lineHeight: 1.65, color: 'var(--text-body)', margin: '0 0 12px', whiteSpace: 'pre-line' };
  const li = { fontFamily: 'var(--font-body)', fontSize: '15px', lineHeight: 1.6, color: 'var(--text-body)', margin: '5px 0' };
  return (
    <div>
      {blocks.map((block, i) => {
        const lines = block.split('\n').filter((l) => l.trim());
        const allBullets = lines.length > 0 && lines.every((l) => /^\s*[•-]\s+/.test(l));
        if (allBullets) {
          return <ul key={i} style={{ margin: '4px 0 12px', paddingLeft: '20px' }}>{lines.map((l, j) => <li key={j} style={li}>{l.replace(/^\s*[•-]\s+/, '')}</li>)}</ul>;
        }
        return <p key={i} style={para}>{block}</p>;
      })}
    </div>
  );
}
const qtyBtn = { width: '40px', height: '40px', border: 'none', background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--mc-charcoal)' };
const tabPara = { fontFamily: 'var(--font-body)', fontSize: '15px', lineHeight: 1.65, color: 'var(--text-body)', margin: 0 };
/* Fullscreen image zoom (lightbox). Close on backdrop click, X, or Esc. */
function Lightbox({ src, alt, onClose }) {
  React.useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [onClose]);
  return (
    <div onClick={onClose} role="dialog" aria-modal="true" aria-label={alt}
      style={{ position: 'fixed', inset: 0, background: 'rgba(15,15,15,0.93)', zIndex: 80, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px', cursor: 'zoom-out' }}>
      <button onClick={onClose} aria-label="Cerrar" style={{ position: 'absolute', top: '16px', right: '16px', width: '46px', height: '46px', border: 'none', background: 'rgba(255,255,255,0.12)', color: '#fff', borderRadius: '999px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Icon name="X" size={24} color="#fff" />
      </button>
      <img src={src} alt={alt} onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '95vw', maxHeight: '90vh', width: 'auto', height: 'auto', objectFit: 'contain', borderRadius: '6px', boxShadow: '0 12px 48px rgba(0,0,0,0.55)', cursor: 'default' }} />
    </div>
  );
}
/* Swipeable product gallery: one image at a time with arrows, dots, touch-swipe,
   and click-to-zoom. A single image renders as a plain photo (no chrome). */
function Carousel({ product, name, height = 560 }) {
  const list = (window.MC_IMAGES && window.MC_IMAGES[product.id]) || [];
  const imgs = list.length ? list : (window.MC_IMG[product.id] ? [window.MC_IMG[product.id]] : []);
  const [idx, setIdx] = React.useState(0);
  const [zoom, setZoom] = React.useState(false);
  const touchX = React.useRef(null);
  const n = imgs.length;
  const i = Math.min(idx, Math.max(0, n - 1));
  if (!n) return <div style={{ borderRadius: 'var(--radius-md)', overflow: 'hidden' }}><ProductImage product={product} height={height} fit="contain" big /></div>;
  const go = (d) => setIdx((c) => (c + d + n) % n);
  const src = imgs[i];
  const navBtn = (side) => ({ position: 'absolute', top: '50%', transform: 'translateY(-50%)', [side]: '10px', width: '42px', height: '42px', borderRadius: '999px', border: 'none', background: 'rgba(20,20,20,0.55)', color: '#fff', fontSize: '24px', lineHeight: 1, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2 });
  return (
    <div>
      <div style={{ borderRadius: 'var(--radius-md)', overflow: 'hidden', position: 'relative', cursor: 'zoom-in', background: 'var(--mc-charcoal)' }}
        onClick={() => setZoom(true)} title="Ampliar imagen"
        onTouchStart={(e) => { touchX.current = e.touches[0].clientX; }}
        onTouchEnd={(e) => { if (touchX.current == null) return; const dx = e.changedTouches[0].clientX - touchX.current; if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1); touchX.current = null; }}>
        <img src={src} alt={name} style={{ width: '100%', height: height + 'px', objectFit: 'contain', display: 'block' }} />
        {n > 1 && (
          <>
            <button onClick={(e) => { e.stopPropagation(); go(-1); }} aria-label="Anterior" style={navBtn('left')}>‹</button>
            <button onClick={(e) => { e.stopPropagation(); go(1); }} aria-label="Siguiente" style={navBtn('right')}>›</button>
          </>
        )}
        <div aria-hidden="true" style={{ position: 'absolute', bottom: '12px', right: '12px', width: '40px', height: '40px', borderRadius: '999px', background: 'rgba(20,20,20,0.62)', display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
          <Icon name="ZoomIn" size={20} color="#fff" />
        </div>
      </div>
      {n > 1 && (
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '12px' }}>
          {imgs.map((_, j) => (
            <button key={j} onClick={() => setIdx(j)} aria-label={`Imagen ${j + 1}`}
              style={{ width: '9px', height: '9px', padding: 0, borderRadius: '999px', border: 'none', cursor: 'pointer', background: j === i ? 'var(--mc-red)' : 'var(--mc-ink-300, #cfcbc4)' }} />
          ))}
        </div>
      )}
      {zoom && <Lightbox src={src} alt={name} onClose={() => setZoom(false)} />}
    </div>
  );
}
function ProductDetail({ product, onAdd, onBack }) {
  const { Button, Badge, Tabs } = window.MeatConnectionDesignSystem_3e7a26;
  const { t } = useLang();
  const p = t.products[product.id];
  const [tab, setTab] = React.useState('desc');
  const [saleType, setSaleType] = React.useState('mayoreo');
  const [qty, setQty] = React.useState(5);
  const minQty = saleType === 'mayoreo' ? 5 : 1;
  const pickType = (val) => { setSaleType(val); if (val === 'mayoreo' && qty < 5) setQty(5); };
  const genericOrigin = product.cat === 'jp' ? t.pdp.originJP : product.cat === 'us' ? t.pdp.originUS : t.pdp.originAU;
  return (
    <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', padding: '32px 24px 80px' }}>
      <button onClick={onBack} style={{ border: 'none', background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', fontFamily: 'var(--font-body)', fontSize: '14px', marginBottom: '24px', padding: 0 }}>
        <Icon name="ArrowLeft" size={16} color="var(--text-muted)" /> {t.pdp.back}
      </button>
      <div className="mc-pdp" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'start' }}>
        <Carousel product={product} name={p.name} height={560} />
        <div>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '14px' }}>
            {p.badge && <Badge tone="red" solid>{p.badge}</Badge>}
            <Badge tone="success">{t.pdp.available}</Badge>
          </div>
          <h1 className="mc-page-title" style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '48px', lineHeight: 0.98, margin: '0 0 16px', color: 'var(--text-strong)' }}>{p.name}</h1>
          <div className="mc-pdp-actions" style={{ margin: '24px 0', display: 'flex', flexWrap: 'wrap', gap: '20px', alignItems: 'flex-end' }}>
            <div>
              <div style={{ fontFamily: 'var(--font-eyebrow)', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600, fontSize: '12px', color: 'var(--text-muted)', marginBottom: '8px' }}>{t.pdp.saleType}</div>
              <div role="group" aria-label={t.pdp.saleType} style={{ display: 'inline-flex', border: '2px solid var(--mc-charcoal)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
                {[['mayoreo', t.pdp.mayoreo], ['menudeo', t.pdp.menudeo]].map(([val, label]) => {
                  const on = saleType === val;
                  return (
                    <button key={val} onClick={() => pickType(val)} aria-pressed={on}
                      style={{ border: 'none', cursor: 'pointer', padding: '0 16px', height: '44px', fontFamily: 'var(--font-eyebrow)', textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: 700, fontSize: '13px', background: on ? 'var(--mc-charcoal)' : 'transparent', color: on ? 'var(--mc-paper)' : 'var(--text-strong)' }}>{label}</button>
                  );
                })}
              </div>
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-eyebrow)', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600, fontSize: '12px', color: 'var(--text-muted)', marginBottom: '8px' }}>{t.pdp.qtyLabel}</div>
              <div style={{ display: 'inline-flex', alignItems: 'center', border: '2px solid var(--mc-charcoal)', borderRadius: 'var(--radius-md)', height: '44px' }}>
                <button onClick={() => setQty(Math.max(minQty, qty - 1))} style={qtyBtn}><Icon name="Minus" size={16} /></button>
                <span style={{ width: '48px', textAlign: 'center', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '18px' }}>{qty}</span>
                <button onClick={() => setQty(qty + 1)} style={qtyBtn}><Icon name="Plus" size={16} /></button>
              </div>
            </div>
          </div>
          <Button variant="primary" size="lg" fullWidth onClick={() => onAdd(product, qty, saleType)} iconLeft={<Icon name="ShoppingCart" size={18} color="#fff" />}>
            {fmt(t.pdp.addToOrder, { qty })}
          </Button>
          <div className="mc-trust" style={{ display: 'flex', gap: '20px', margin: '20px 0 28px' }}>
            {t.pdp.trust.map(([ic, txt]) => (
              <div key={txt} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: 'var(--text-muted)' }}>
                <Icon name={ic} size={16} color="var(--mc-red)" /> {txt}
              </div>
            ))}
          </div>
          <Tabs value={tab} onChange={setTab} items={t.pdp.tabs} />
          <div style={{ marginTop: '18px' }}>
            {tab === 'desc' && (p.description ? <TextBlock text={p.description} /> : <p style={tabPara}>{t.pdp.descSuffix}</p>)}
            {tab === 'origin' && (p.origin ? <TextBlock text={p.origin} /> : <p style={tabPara}>{genericOrigin}</p>)}
            {tab === 'cooking' && (p.cooking ? <TextBlock text={p.cooking} /> : <p style={tabPara}>{t.pdp.cooking}</p>)}
          </div>
          <div style={{ marginTop: '22px', padding: '16px 18px', background: 'var(--surface-sunken)', border: '1px solid var(--border-default)', borderRadius: 'var(--radius-md)' }}>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '13.5px', lineHeight: 1.6, color: 'var(--text-body)', margin: 0 }}>{t.notice.processed}</p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '12.5px', lineHeight: 1.55, color: 'var(--text-muted)', margin: '10px 0 0' }}>{t.notice.extraCost}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ===== Cart drawer ===== */
const miniBtn = { width: '26px', height: '26px', border: 'none', background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--mc-charcoal)' };
function CartDrawer({ open, items, onClose, onQty, onRemove, onReorder }) {
  const { Button } = window.MeatConnectionDesignSystem_3e7a26;
  const { t } = useLang();
  return (
    <>
      <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(20,20,20,0.5)', opacity: open ? 1 : 0, pointerEvents: open ? 'auto' : 'none', transition: 'opacity var(--dur-med)', zIndex: 40 }}></div>
      <aside style={{ position: 'fixed', top: 0, right: 0, height: '100%', width: '400px', maxWidth: '92vw', background: 'var(--surface-page)', boxShadow: 'var(--shadow-lg)', transform: open ? 'translateX(0)' : 'translateX(100%)', transition: 'transform var(--dur-slow) var(--ease-out)', zIndex: 50, display: 'flex', flexDirection: 'column' }}>
        <div style={{ background: 'var(--mc-charcoal)', color: 'var(--mc-paper)', padding: '20px 22px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '20px' }}>{t.cart.title}</span>
          <button onClick={onClose} aria-label={t.cart.close} style={{ border: 'none', background: 'transparent', color: 'var(--mc-ink-200)', cursor: 'pointer', display: 'flex' }}><Icon name="X" size={22} color="var(--mc-ink-200)" /></button>
        </div>
        {items.length === 0 ? (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '14px', color: 'var(--text-muted)' }}>
            <Icon name="ShoppingCart" size={48} color="var(--mc-ink-300)" strokeWidth={1.4} />
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '15px' }}>{t.cart.empty}</span>
            <Button variant="secondary" onClick={onReorder} iconLeft={<Icon name="RotateCcw" size={16} />}>{t.cart.reorderPrev}</Button>
            <span style={{ fontSize: '12px', color: 'var(--text-faint)', maxWidth: '230px', textAlign: 'center' }}>{t.cart.frequentHint}</span>
          </div>
        ) : (
          <div style={{ flex: 1, overflowY: 'auto', padding: '8px 0' }}>
            {items.map((it) => (
              <div key={it.id} style={{ display: 'flex', gap: '14px', padding: '16px 22px', borderBottom: '1px solid var(--border-subtle)' }}>
                <div style={{ width: '64px', height: '64px', flex: 'none', overflow: 'hidden', borderRadius: 'var(--radius-sm)', background: 'var(--mc-charcoal)' }}>
                  <img src={it.img || window.MC_IMG[it.id]} alt={t.products[it.id].name} loading="lazy" decoding="async" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '15px', color: 'var(--text-strong)', lineHeight: 1.1, marginBottom: '3px' }}>{t.products[it.id].name}</div>
                  <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text-muted)', marginBottom: '8px' }}>{it.saleType === 'menudeo' ? t.pdp.menudeo : t.pdp.mayoreo}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--border-default)', borderRadius: 'var(--radius-sm)' }}>
                      <button onClick={() => onQty(it, -1)} style={miniBtn}><Icon name="Minus" size={13} /></button>
                      <span style={{ width: '28px', textAlign: 'center', fontSize: '13px', fontWeight: 600 }}>{it.qty}</span>
                      <button onClick={() => onQty(it, 1)} style={miniBtn}><Icon name="Plus" size={13} /></button>
                    </div>
                    <button onClick={() => onRemove(it)} style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: 'var(--text-faint)', display: 'flex', alignItems: 'center', gap: '4px' }}><Icon name="Trash2" size={14} color="var(--text-faint)" /></button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        <div style={{ padding: '18px 22px', borderTop: '2px solid var(--mc-charcoal)', background: 'var(--mc-bone)' }}>
          <Button variant="primary" size="lg" fullWidth disabled={items.length === 0}
            onClick={() => { saveLastOrder(items); openWhatsApp(t.wa.orderIntro + '\n' + orderLines(items)); }}
            iconLeft={<Icon name="MessageCircle" size={18} color="#fff" />}>{t.cart.requestWhatsApp}</Button>
        </div>
      </aside>
    </>
  );
}

/* ===== Footer + toolbar + App ===== */
function Footer({ onCategory, onAnchor }) {
  const { t } = useLang();
  // Catalog column items map positionally to catalog filter codes
  // (Japanese A5 → jp, Australian → au, American → us, Wholesale boxes → all).
  const catCodes = ['jp', 'mackas', 'au', 'kingriver', 'us'];
  const cols = [
    [t.footer.catalogTitle, t.footer.catalogItems.map((label, i) => [label, null, null, () => onCategory(catCodes[i] || 'all')])],
    [t.footer.servicesTitle, t.footer.servicesItems.map((label) => [label, null, null, () => onAnchor('servicios')])],
    [t.footer.contactTitle, [['WhatsApp', waHref(t.wa.quote), 'MessageCircle'], ['Instagram', IG_LINK, 'Instagram'], ['Facebook', FB_LINK, 'Facebook'], [t.footer.quoteCatalogs, '#contacto']]],
  ];
  const linkStyle = { display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--mc-ink-600)', textDecoration: 'none', fontSize: '13px' };
  return (
    <footer style={{ background: 'var(--mc-cream)', color: 'var(--text-body)', borderTop: '1px solid var(--border-default)' }}>
      <div className="mc-foot" style={{ maxWidth: 'var(--container-max)', margin: '0 auto', padding: '56px 24px 32px', display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr 1fr', gap: '40px' }}>
        <div>
          <img src={window.MC_LOGO_INK} alt="Meat Connection" style={{ height: '32px', marginBottom: '16px' }} />
          <p style={{ fontSize: '13px', lineHeight: 1.6, color: 'var(--mc-ink-500)', maxWidth: '240px' }}>{t.footer.tagline}</p>
        </div>
        {cols.map(([h, links]) => (
          <div key={h}>
            <div style={{ fontFamily: 'var(--font-eyebrow)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600, fontSize: '13px', color: 'var(--text-strong)', marginBottom: '14px' }}>{h}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '9px' }}>
              {links.map(([label, href, icon, onClick]) => {
                const hover = (e) => e.currentTarget.style.color = 'var(--accent-gold-ink)';
                const out = (e) => e.currentTarget.style.color = 'var(--mc-ink-600)';
                return onClick
                  ? <button key={label} type="button" onClick={onClick} onMouseOver={hover} onMouseOut={out} style={{ ...linkStyle, border: 'none', background: 'none', padding: 0, cursor: 'pointer', font: 'inherit', textAlign: 'left' }}>{icon && <Icon name={icon} size={16} color="currentColor" strokeWidth={1.75} />}{label}</button>
                  : <a key={label} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener" aria-label={label} onMouseOver={hover} onMouseOut={out} style={linkStyle}>{icon && <Icon name={icon} size={16} color="currentColor" strokeWidth={1.75} />}{label}</a>;
              })}
            </div>
          </div>
        ))}
      </div>
      <div className="mc-foot-legal" style={{ borderTop: '1px solid var(--border-subtle)', padding: '18px 24px', maxWidth: 'var(--container-max)', margin: '0 auto', display: 'flex', justifyContent: 'space-between', gap: '10px', fontSize: '12px', color: 'var(--mc-ink-500)' }}>
        <span>© 2026 Meat Connection · {WA_DISPLAY}</span>
      </div>
    </footer>
  );
}
function ShopToolbar({ active, onPick }) {
  const { Tag } = window.MeatConnectionDesignSystem_3e7a26;
  const { t } = useLang();
  const cats = [['all', t.categories.all], ['jp', t.categories.jp], ['mackas', t.categories.mackas], ['au', t.categories.au], ['kingriver', t.categories.kingriver], ['us', t.categories.us]];
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '28px' }}>
      {cats.map(([key, label]) => <Tag key={key} selected={active === key} onClick={() => onPick(key)}>{label}</Tag>)}
    </div>
  );
}
/* ===== shared section heading ===== */
function SectionHead({ eyebrow, title, sub, light }) {
  return (
    <div style={{ marginBottom: '36px', maxWidth: '640px' }}>
      <div style={{ fontFamily: 'var(--font-eyebrow)', textTransform: 'uppercase', letterSpacing: '0.18em', fontWeight: 600, fontSize: '13px', color: light ? 'var(--accent-gold)' : 'var(--accent-gold-ink)' }}>{eyebrow}</div>
      <h2 className="mc-section-title" style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '40px', lineHeight: 1.02, margin: '8px 0 0', color: light ? 'var(--mc-paper)' : 'var(--text-strong)' }}>{title}</h2>
      {sub && <p style={{ fontFamily: 'var(--font-body)', fontSize: '16px', lineHeight: 1.6, margin: '14px 0 0', color: light ? 'var(--mc-ink-200)' : 'var(--text-muted)' }}>{sub}</p>}
    </div>
  );
}

/* ===== Servicios / propuesta de valor ===== */
function Services() {
  const { Card } = window.MeatConnectionDesignSystem_3e7a26;
  const { t } = useLang();
  return (
    <section id="servicios" style={{ background: 'var(--surface-sunken)', scrollMarginTop: '72px' }}>
      <Reveal style={{ maxWidth: 'var(--container-max)', margin: '0 auto', padding: '72px 24px' }}>
        <SectionHead eyebrow={t.services.eyebrow} title={t.services.title} sub={t.services.sub} />
        <div className="mc-services" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
          {t.services.main.map(([ic, title, d]) => (
            <Card key={title} variant="default" style={{ padding: '28px' }}>
              <div style={{ width: '52px', height: '52px', borderRadius: 'var(--radius-md)', background: 'var(--mc-red)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '18px' }}>
                <Icon name={ic} size={26} color="#fff" />
              </div>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '22px', color: 'var(--text-strong)' }}>{title}</div>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', lineHeight: 1.6, color: 'var(--text-muted)', margin: '10px 0 0' }}>{d}</p>
            </Card>
          ))}
        </div>
        <div className="mc-subservices" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginTop: '24px', padding: '24px', background: 'var(--mc-charcoal)', borderRadius: 'var(--radius-md)' }}>
          {t.services.sub2.map(([ic, txt]) => (
            <div key={txt} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Icon name={ic} size={22} color="var(--accent-gold)" />
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--mc-paper)' }}>{txt}</span>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

/* ===== Marcas que distribuimos ===== */
function Partners() {
  const { t } = useLang();
  const brands = [
    { name: 'King River', key: 'kingriver', url: 'https://kingriver.com.au/' },
    { name: 'Jewel', key: 'jewel', url: 'https://jewelbykingriver.com.au/latest/' },
    { name: "L'grow", key: 'lgrow', url: 'https://sandalwood.au/wagyu/' },
    { name: "Macka's", key: 'mackas', url: 'https://mackasblackangus.com.au/' },
    { name: 'A5 Japonés · Wagyu Japanese Beef', key: 'wagyu', url: null, whiten: true },
  ];
  const tileStyle = { border: '1px solid var(--mc-ink-700)', borderRadius: 'var(--radius-md)', background: 'var(--mc-charcoal)', padding: '28px 24px', minHeight: '132px', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', transition: 'border-color var(--dur-med), box-shadow var(--dur-med), transform var(--dur-med)' };
  const hoverIn = (e) => { e.currentTarget.style.borderColor = 'var(--accent-gold)'; e.currentTarget.style.boxShadow = 'var(--shadow-md)'; e.currentTarget.style.transform = 'translateY(-3px)'; };
  const hoverOut = (e) => { e.currentTarget.style.borderColor = 'var(--mc-ink-700)'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'translateY(0)'; };
  return (
    <section id="marcas" style={{ background: 'var(--surface-page)', scrollMarginTop: '72px' }}>
      <Reveal style={{ maxWidth: 'var(--container-max)', margin: '0 auto', padding: '64px 24px' }}>
        <SectionHead eyebrow={t.partners.eyebrow} title={t.partners.title} sub={t.partners.sub} />
        <div className="mc-brands" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '16px' }}>
          {brands.map((b) => {
            const inner = b.key
              ? <img src={window.MC_BRAND[b.key]} alt={b.name} loading="lazy" decoding="async" style={{ maxHeight: '84px', maxWidth: '100%', width: 'auto', objectFit: 'contain', filter: b.whiten ? 'brightness(0) invert(1)' : undefined, opacity: b.whiten ? 0.92 : undefined }} />
              : <span style={{ fontFamily: 'var(--font-display)', fontSize: '32px', letterSpacing: '0.02em', color: 'var(--mc-paper)' }}>{b.name}</span>;
            return b.url ? (
              <a key={b.name} className="mc-brand-tile" href={b.url} target="_blank" rel="noopener" title={b.name} aria-label={b.name}
                style={tileStyle} onMouseOver={hoverIn} onMouseOut={hoverOut}>{inner}</a>
            ) : (
              <div key={b.name} className="mc-brand-tile" title={b.name} style={tileStyle}>{inner}</div>
            );
          })}
        </div>
      </Reveal>
    </section>
  );
}

/* ===== Para quién — clientes objetivo ===== */
function Clients() {
  const { t } = useLang();
  return (
    <section id="clientes" style={{ background: 'var(--mc-charcoal)', color: 'var(--mc-paper)', scrollMarginTop: '72px' }}>
      <Reveal style={{ maxWidth: 'var(--container-max)', margin: '0 auto', padding: '72px 24px' }}>
        <SectionHead light eyebrow={t.clients.eyebrow} title={t.clients.title} sub={t.clients.sub} />
        <div className="mc-clients" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
          {t.clients.list.map(([ic, txt]) => (
            <div key={txt} style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '20px', border: '1px solid var(--mc-ink-700)', borderRadius: 'var(--radius-md)', background: 'var(--mc-ink-900)' }}>
              <Icon name={ic} size={24} color="var(--accent-gold)" />
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: 'var(--mc-paper)' }}>{txt}</span>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

/* ===== Contacto / cotiza ===== */
function ContactSection({ onQuote }) {
  const { Button, Input } = window.MeatConnectionDesignSystem_3e7a26;
  const { t } = useLang();
  const [sent, setSent] = React.useState(false);
  const [form, setForm] = React.useState({ nombre: '', negocio: '', telefono: '', interes: '' });
  const setField = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const submit = (e) => {
    e.preventDefault();
    const wa = t.wa;
    const msg = wa.contactIntro + '\n'
      + '• ' + wa.name + ': ' + form.nombre + '\n'
      + '• ' + wa.business + ': ' + form.negocio + '\n'
      + '• ' + wa.phone + ': ' + form.telefono
      + (form.interes ? '\n• ' + wa.interest + ': ' + form.interes : '');
    openWhatsApp(msg);
    setSent(true);
  };
  const channels = [
    ['MessageCircle', 'WhatsApp', WA_DISPLAY, waHref(t.wa.quote)],
    ['Instagram', 'Instagram', '@meatconnectionmx', IG_LINK],
    ['Facebook', 'Facebook', '@meatconnectionmx', FB_LINK],
  ];
  return (
    <section id="contacto" style={{ background: 'var(--surface-sunken)', scrollMarginTop: '72px' }}>
      <Reveal className="mc-contact" style={{ maxWidth: 'var(--container-max)', margin: '0 auto', padding: '72px 24px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'start' }}>
        <div>
          <SectionHead eyebrow={t.contact.eyebrow} title={t.contact.title} sub={t.contact.sub} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '8px' }}>
            {channels.map(([ic, name, label, href]) => (
              <a key={name} href={href} target="_blank" rel="noopener" style={{ display: 'flex', alignItems: 'center', gap: '14px', textDecoration: 'none', color: 'var(--text-strong)' }}>
                <span style={{ width: '44px', height: '44px', borderRadius: 'var(--radius-md)', background: 'var(--mc-charcoal)', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}>
                  <Icon name={ic} size={20} color="#fff" />
                </span>
                <span>
                  <span style={{ display: 'block', fontFamily: 'var(--font-eyebrow)', textTransform: 'uppercase', letterSpacing: '0.06em', fontSize: '12px', color: 'var(--text-muted)' }}>{name}</span>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '15px', fontWeight: 600 }}>{label}</span>
                </span>
              </a>
            ))}
          </div>
        </div>
        <div style={{ background: 'var(--surface-card)', border: '1px solid var(--border-default)', borderRadius: 'var(--radius-md)', padding: '28px' }}>
          {sent ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '12px', padding: '32px 0' }}>
              <Icon name="CheckCircle2" size={44} color="var(--mc-success)" />
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '22px', color: 'var(--text-strong)' }}>{t.contact.thanksTitle}</div>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--text-muted)', margin: 0 }}>{t.contact.thanksMsg}</p>
              <Button variant="primary" onClick={onQuote} iconLeft={<Icon name="MessageCircle" size={16} color="#fff" />}>{t.contact.thanksBtn}</Button>
            </div>
          ) : (
            <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <Input label={t.contact.formName} placeholder={t.contact.phName} required value={form.nombre} onChange={setField('nombre')} />
              <Input label={t.contact.formBusiness} placeholder={t.contact.phBusiness} required value={form.negocio} onChange={setField('negocio')} />
              <Input label={t.contact.formPhone} placeholder={WA_DISPLAY} required type="tel" value={form.telefono} onChange={setField('telefono')} />
              <Input label={t.contact.formInterest} placeholder={t.contact.phInterest} value={form.interes} onChange={setField('interes')} />
              <Button variant="primary" size="lg" fullWidth type="submit">{t.contact.submit}</Button>
            </form>
          )}
        </div>
      </Reveal>
    </section>
  );
}

/* ===== Botón flotante de WhatsApp ===== */
function WhatsAppFab() {
  const { t } = useLang();
  const SIZE = 58, PAD = 22, EDGE = 8, THRESHOLD = 6;
  const clamp = (x, y) => ({
    x: Math.max(EDGE, Math.min(x, window.innerWidth - SIZE - EDGE)),
    y: Math.max(EDGE, Math.min(y, window.innerHeight - SIZE - EDGE)),
  });
  const [pos, setPos] = React.useState(() => {
    try { const s = JSON.parse(localStorage.getItem('mc_wa_pos')); if (s && typeof s.x === 'number' && typeof s.y === 'number') return clamp(s.x, s.y); } catch (e) {}
    return { x: window.innerWidth - SIZE - PAD, y: window.innerHeight - SIZE - PAD };
  });
  const [dragging, setDragging] = React.useState(false);
  const drag = React.useRef(null);

  React.useEffect(() => {
    const onResize = () => setPos((p) => clamp(p.x, p.y));
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const onPointerDown = (e) => {
    try { e.currentTarget.setPointerCapture(e.pointerId); } catch (err) {}
    drag.current = { sx: e.clientX, sy: e.clientY, ox: pos.x, oy: pos.y, moved: false };
  };
  const onPointerMove = (e) => {
    const d = drag.current; if (!d) return;
    const dx = e.clientX - d.sx, dy = e.clientY - d.sy;
    if (!d.moved && Math.hypot(dx, dy) > THRESHOLD) { d.moved = true; setDragging(true); }
    if (d.moved) setPos(clamp(d.ox + dx, d.oy + dy));
  };
  const onPointerUp = (e) => {
    const d = drag.current; drag.current = null;
    try { e.currentTarget.releasePointerCapture(e.pointerId); } catch (err) {}
    if (!d) return;
    setDragging(false);
    if (!d.moved) {
      window.open(waHref(getStrings().wa.quote), '_blank', 'noopener');
    } else {
      setPos((p) => { try { localStorage.setItem('mc_wa_pos', JSON.stringify(p)); } catch (err) {} return p; });
    }
  };

  return (
    <button type="button" aria-label={t.fab.aria} title={t.fab.title}
      onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={onPointerUp}
      onMouseEnter={(e) => { if (!dragging) { e.currentTarget.style.transform = 'scale(1.1)'; e.currentTarget.style.background = '#1ebe5a'; e.currentTarget.style.boxShadow = '0 10px 28px rgba(37,211,102,0.45)'; } }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.background = '#25D366'; e.currentTarget.style.boxShadow = 'var(--shadow-lg)'; }}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); window.open(waHref(getStrings().wa.quote), '_blank', 'noopener'); } }}
      style={{ position: 'fixed', left: pos.x + 'px', top: pos.y + 'px', width: SIZE + 'px', height: SIZE + 'px', borderRadius: '999px', border: 'none', padding: 0, background: '#25D366', boxShadow: 'var(--shadow-lg)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 45, cursor: dragging ? 'grabbing' : 'grab', touchAction: 'none', userSelect: 'none', WebkitTapHighlightColor: 'transparent', transition: 'transform var(--dur-fast) var(--ease-out), background var(--dur-fast) var(--ease-out), box-shadow var(--dur-fast) var(--ease-out)' }}>
      <Icon name="MessageCircle" size={28} color="#fff" />
    </button>
  );
}

/* ===== Scroll reveal: slides up from below as it enters the viewport ===== */
function Reveal({ children, style, className }) {
  const ref = React.useRef(null);
  const [shown, setShown] = React.useState(false);
  React.useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') { setShown(true); return; }
    const io = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) { setShown(true); io.disconnect(); }
    }, { threshold: 0.2, rootMargin: '0px 0px -10% 0px' });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={className} style={{ ...style,
      transform: shown ? 'translateY(0)' : 'translateY(56px)',
      opacity: shown ? 1 : 0,
      transition: 'transform 0.8s var(--ease-out), opacity 0.8s var(--ease-out)',
      willChange: 'transform, opacity' }}>
      {children}
    </div>
  );
}

/* ===== Image scroll reveal: gentle zoom-out + fade as it enters the viewport ===== */
function RevealImg({ src, alt, imgStyle = {}, frameStyle = {}, ...rest }) {
  const ref = React.useRef(null);
  const [shown, setShown] = React.useState(false);
  React.useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') { setShown(true); return; }
    const io = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) { setShown(true); io.disconnect(); }
    }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ overflow: 'hidden', ...frameStyle }}>
      <img src={src} alt={alt} {...rest} style={{ ...imgStyle,
        transform: shown ? 'scale(1)' : 'scale(1.12)',
        opacity: shown ? 1 : 0,
        transition: 'transform 1s var(--ease-out), opacity 0.7s var(--ease-out)',
        willChange: 'transform, opacity' }} />
    </div>
  );
}

/* ===== Paleta showcase ===== */
function MarbleShowcase({ onShop }) {
  const { Button } = window.MeatConnectionDesignSystem_3e7a26;
  const { t } = useLang();
  return (
    <section style={{ background: 'var(--surface-page)' }}>
      <div className="mc-showcase" style={{ maxWidth: 'var(--container-max)', margin: '0 auto', padding: '72px 24px', display: 'grid', gridTemplateColumns: '0.95fr 1.05fr', gap: '48px', alignItems: 'center' }}>
        <Reveal>
          <img src={window.MC_DESTACADO} alt={t.showcase.alt} loading="lazy" decoding="async"
            style={{ width: '100%', height: 'auto', display: 'block', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-md)' }} />
        </Reveal>
        <div>
          <SectionHead eyebrow={t.showcase.eyebrow} title={t.showcase.title} sub={t.showcase.sub} />
          <Button variant="primary" size="lg" onClick={onShop} iconRight={<Icon name="ArrowRight" size={18} color="#fff" />}>{t.showcase.cta}</Button>
        </div>
      </div>
    </section>
  );
}

/* ===== Testimonios / prueba social =====
   PLACEHOLDER — reemplaza estas citas con testimonios reales (con permiso) en src/i18n.jsx. */
function Testimonials() {
  const { Card } = window.MeatConnectionDesignSystem_3e7a26;
  const { t } = useLang();
  return (
    <section style={{ background: 'var(--surface-sunken)' }}>
      <Reveal style={{ maxWidth: 'var(--container-max)', margin: '0 auto', padding: '72px 24px' }}>
        <SectionHead eyebrow={t.testimonials.eyebrow} title={t.testimonials.title} sub={t.testimonials.sub} />
        <div className="mc-testimonials" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
          {t.testimonials.items.map((item, i) => (
            <Card key={i} variant="default" style={{ padding: '28px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <Icon name="Quote" size={26} color="var(--mc-red)" />
              <div style={{ color: 'var(--mc-red)', letterSpacing: '2px', fontSize: '15px' }}>★★★★★</div>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', lineHeight: 1.65, color: 'var(--text-body)', margin: 0, flex: 1 }}>“{item.quote}”</p>
              <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '14px' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '14px', color: 'var(--text-strong)' }}>{item.who}</div>
                <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '2px' }}>{item.biz}</div>
              </div>
            </Card>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

function App() {
  const { t } = useLang();
  const [view, setView] = React.useState('home');
  const [active, setActive] = React.useState(null);
  const [cat, setCat] = React.useState('all');
  const [cartOpen, setCartOpen] = React.useState(false);
  const [cart, setCart] = React.useState([]);
  function add(product, qty = 1, saleType = 'mayoreo') {
    setCart((c) => { const ex = c.find((i) => i.id === product.id);
      if (ex) return c.map((i) => i.id === product.id ? { ...i, qty: i.qty + qty, saleType } : i);
      return [...c, { ...product, qty, saleType }]; });
    setCartOpen(true);
  }
  function changeQty(item, d) { setCart((c) => c.map((i) => i.id === item.id ? { ...i, qty: Math.max(1, i.qty + d) } : i)); }
  function remove(item) { setCart((c) => c.filter((i) => i.id !== item.id)); }
  function open(product) { setActive(product); setView('product'); window.scrollTo(0, 0); }
  function nav(v) { setView(v); window.scrollTo(0, 0); }
  function goAnchor(id) { setView('home'); setTimeout(() => { const el = document.getElementById(id); if (el) el.scrollIntoView({ behavior: 'smooth' }); }, 60); }
  function quote() { openWhatsApp(getStrings().wa.quote); }
  const count = cart.reduce((s, i) => s + i.qty, 0);
  const filtered = cat === 'all' ? PRODUCTS : PRODUCTS.filter((p) => p.cat === cat);
  return (
    <div style={{ background: 'var(--surface-page)', minHeight: '100vh' }}>
      <Header cartCount={count} onCart={() => setCartOpen(true)} onNav={nav} onAnchor={goAnchor} onReorder={reorderWhatsApp} overHero={view === 'home'} />
      {view === 'home' && (<>
        <Hero onShop={() => nav('shop')} onQuote={quote} />
        <Services />
        <MarbleShowcase onShop={() => nav('shop')} />
        <Reveal style={{ maxWidth: 'var(--container-max)', margin: '0 auto', padding: '64px 24px' }}>
          <div className="mc-feature-head" style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '28px' }}>
            <div>
              <div style={{ fontFamily: 'var(--font-eyebrow)', textTransform: 'uppercase', letterSpacing: '0.18em', fontWeight: 600, fontSize: '13px', color: 'var(--accent-gold-ink)' }}>{t.bestsellers.eyebrow}</div>
              <h2 className="mc-section-title" style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '40px', margin: '6px 0 0', color: 'var(--text-strong)' }}>{t.bestsellers.title}</h2>
            </div>
            <button onClick={() => nav('shop')} style={{ border: 'none', background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontFamily: 'var(--font-eyebrow)', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600, fontSize: '14px', color: 'var(--text-strong)' }}>{t.bestsellers.seeAll} <Icon name="ArrowRight" size={16} /></button>
          </div>
          <ProductGrid products={PRODUCTS.slice(0, 4)} onOpen={open} />
        </Reveal>
        <Partners />
        <Clients />
        <Testimonials />
        <ContactSection onQuote={quote} />
      </>)}
      {view === 'shop' && (
        <section style={{ maxWidth: 'var(--container-max)', margin: '0 auto', padding: '40px 24px 80px' }}>
          <h1 className="mc-page-title" style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '48px', margin: '0 0 8px', color: 'var(--text-strong)' }}>{t.shop.title}</h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '16px', color: 'var(--text-muted)', margin: '0 0 28px' }}>{fmt(t.shop.count, { n: filtered.length })}</p>
          <ShopToolbar active={cat} onPick={setCat} />
          <ProductGrid products={filtered} onOpen={open} />
        </section>
      )}
      {view === 'product' && active && (<ProductDetail product={active} onAdd={add} onBack={() => nav('shop')} />)}
      <Footer onCategory={(c) => { setCat(c); nav('shop'); }} onAnchor={goAnchor} />
      <CartDrawer open={cartOpen} items={cart} onClose={() => setCartOpen(false)} onQty={changeQty} onRemove={remove} onReorder={reorderWhatsApp} />
      <WhatsAppFab />
    </div>
  );
}
/* The storefront and the catalog admin are mutually exclusive renders.
   /admin is served the same index.html via a Vercel rewrite; admin is not linked publicly. */
const isAdmin = typeof window !== 'undefined' && window.location.pathname.replace(/\/+$/, '').endsWith('/admin');
ReactDOM.createRoot(document.getElementById('root')).render(
  isAdmin
    ? <LangProvider><AdminApp /></LangProvider>
    : <LangProvider><App /><Analytics /></LangProvider>
);
