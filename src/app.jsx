import React from 'react'
import * as ReactDOM from 'react-dom/client'


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
const money = (n) => '$' + Number(n).toLocaleString('es-MX', { maximumFractionDigits: 0 });

/* ===== contact / brand constants (Meat Connection — meatconnection.mx) ===== */
const WA_NUMBER = '526631082592';
const WA_DISPLAY = '+52 663 108 2592';
const WA_LINK = 'https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent('Hola Meat Connection, me interesa cotizar carne premium para mi negocio.');
const IG_LINK = 'https://instagram.com/meatconnectionmx';
const FB_LINK = 'https://facebook.com/meatconnectionmx';
const openWhatsApp = (msg) => window.open('https://wa.me/' + WA_NUMBER + (msg ? '?text=' + encodeURIComponent(msg) : ''), '_blank');

/* Catálogo de wagyu — cortes más vendidos (meatconnection.mx). Precios de referencia: edita `price`/`weight`. */
const PRODUCTS = [
  { id:'tritip',  name:'Tri-Tip Wagyu Japonés A5', cat:'Wagyu Japonés', price:850, weight:'1 kg', badge:'A5 · Japón', tone:'charcoal', img: window.MC_PRODUCT_TRITIP,
    desc:'Wagyu japonés auténtico grado A5 — la cima del marmoleo. Mantecoso, intenso, se deshace al contacto.' },
  { id:'topround',name:'Top Round Wagyu Japonés', cat:'Wagyu Japonés', price:830, weight:'1 kg', badge:'Más Vendido', tone:'kraft',
    desc:'Top Round de wagyu japonés — marmoleo poco común en este corte. Ideal en finas láminas, a la parrilla o sukiyaki.' },
  { id:'ribeye',  name:'Rib Eye Wagyu Australiano', cat:'Wagyu Australiano', price:820, weight:'1 kg', badge:'Alto Marmoleo', tone:'red',
    desc:'Rib eye de wagyu australiano, marmoleo intenso en todo el ojo. El corte estrella de tu menú.' },
  { id:'newyork', name:'New York Wagyu Australiano', cat:'Wagyu Australiano', price:800, weight:'1 kg', badge:'Más Vendido', tone:'charcoal',
    desc:'Mordida firme, sabor profundo a res y marmoleo generoso. El clásico de steakhouse.' },
  { id:'paleta',  name:'Paleta Wagyu Australiano', cat:'Wagyu Australiano', price:780, weight:'1 kg', badge:'Versátil', tone:'cream',
    desc:'Paleta de wagyu australiano, marmoleada y versátil. Para estofar, asar o cortar en finas láminas.' },
];
const TONE_BG = { charcoal:'var(--mc-charcoal)', kraft:'var(--mc-kraft)', cream:'var(--mc-cream)', red:'var(--mc-red)' };
const TONE_FG = { charcoal:'var(--mc-paper)', kraft:'var(--mc-ink-900)', cream:'var(--mc-ink-800)', red:'#fff' };

/* Real-photo product image (replaces menu-board tile). fit: cover|contain */
function ProductImage({ product, height = 220, big = false, fit = 'cover' }) {
  const src = product.img || window.MC_IMG[product.id];
  if (src) {
    return (
      <RevealImg src={src} alt={product.name} loading="lazy"
        frameStyle={{ height: height + 'px', background:'var(--mc-charcoal)' }}
        imgStyle={{ width:'100%', height:'100%', objectFit: fit, display:'block' }} />
    );
  }
  // fallback menu-board tile
  const bg = TONE_BG[product.tone] || 'var(--mc-cream)';
  const fg = TONE_FG[product.tone] || 'var(--mc-ink-800)';
  return (
    <div style={{ position:'relative', height:height+'px', background:bg, color:fg, display:'flex',
      flexDirection:'column', justifyContent:'flex-end', padding: big?'28px':'18px', overflow:'hidden' }}>
      <div style={{ position:'relative', fontFamily:'var(--font-display)', textTransform:'uppercase',
        lineHeight:0.98, fontWeight:700, fontSize: big?'54px':'30px' }}>{product.name}</div>
    </div>
  );
}

/* ===== Header ===== */
function Header({ cartCount, onCart, onNav, onAnchor }) {
  const { IconButton, Button } = window.MeatConnectionDesignSystem_3e7a26;
  const [menuOpen, setMenuOpen] = React.useState(false);
  const links = [
    { label:'Catálogo', go:() => onNav('shop') },
    { label:'Servicios', go:() => onAnchor('servicios') },
    { label:'Marcas', go:() => onAnchor('marcas') },
    { label:'Clientes', go:() => onAnchor('clientes') },
    { label:'Contacto', go:() => onAnchor('contacto') },
  ];
  React.useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);
  const goMobile = (l) => { setMenuOpen(false); l.go(); };
  return (
    <header style={{ background:'var(--mc-charcoal)', color:'var(--mc-paper)', position:'sticky', top:0, zIndex:30, borderBottom:'3px solid var(--mc-red)' }}>
      <div style={{ maxWidth:'var(--container-max)', margin:'0 auto', padding:'0 20px', height:'68px', display:'flex', alignItems:'center', gap:'24px' }}>
        <img src={window.MC_LOGO} alt="Meat Connection" style={{ height:'32px', cursor:'pointer' }} onClick={() => onNav('home')} />
        <nav className="mc-nav" style={{ display:'flex', gap:'4px', flex:1 }}>
          {links.map((l) => (
            <button key={l.label} onClick={l.go}
              style={{ border:'none', background:'transparent', color:'var(--mc-ink-200)', cursor:'pointer',
                fontFamily:'var(--font-display)', textTransform:'uppercase', letterSpacing:'0.08em', fontWeight:500, fontSize:'14px', padding:'8px 12px' }}
              onMouseOver={(e)=>e.currentTarget.style.color='#fff'} onMouseOut={(e)=>e.currentTarget.style.color='var(--mc-ink-200)'}>
              {l.label}
            </button>
          ))}
        </nav>
        <div style={{ display:'flex', alignItems:'center', gap:'6px', marginLeft:'auto' }}>
          <div style={{ position:'relative' }}>
            <IconButton variant="red" ariaLabel="Carrito" onClick={onCart}>
              <Icon name="ShoppingCart" size={18} color="#fff" />
            </IconButton>
            {cartCount > 0 && (
              <span style={{ position:'absolute', top:'-6px', right:'-6px', background:'#fff', color:'var(--mc-charcoal)', fontFamily:'var(--font-display)', fontWeight:700, fontSize:'11px', minWidth:'20px', height:'20px', borderRadius:'999px', display:'flex', alignItems:'center', justifyContent:'center', padding:'0 5px' }}>{cartCount}</span>
            )}
          </div>
          <button className="mc-menu-btn" aria-label="Abrir menú" aria-expanded={menuOpen} onClick={() => setMenuOpen(true)}
            style={{ width:'44px', height:'44px', alignItems:'center', justifyContent:'center', border:'none', background:'transparent', color:'var(--mc-paper)', cursor:'pointer' }}>
            <Icon name="Menu" size={24} color="var(--mc-paper)" />
          </button>
        </div>
      </div>

      {/* Mobile slide-in menu */}
      <div onClick={() => setMenuOpen(false)} aria-hidden="true"
        style={{ position:'fixed', inset:0, background:'rgba(20,20,20,0.6)', opacity: menuOpen?1:0, pointerEvents: menuOpen?'auto':'none', transition:'opacity var(--dur-med)', zIndex:60 }}></div>
      <aside role="dialog" aria-label="Menú de navegación" aria-modal="true"
        style={{ position:'fixed', top:0, right:0, height:'100%', width:'84vw', maxWidth:'360px', background:'var(--mc-charcoal)', color:'var(--mc-paper)', boxShadow:'var(--shadow-lg)', transform: menuOpen?'translateX(0)':'translateX(100%)', transition:'transform var(--dur-slow) var(--ease-out)', zIndex:61, display:'flex', flexDirection:'column', padding:'18px 22px calc(22px + env(safe-area-inset-bottom))' }}>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', borderBottom:'1px solid var(--mc-ink-700)', paddingBottom:'16px' }}>
          <img src={window.MC_LOGO} alt="Meat Connection" style={{ height:'30px' }} />
          <button onClick={() => setMenuOpen(false)} aria-label="Cerrar menú"
            style={{ width:'44px', height:'44px', display:'flex', alignItems:'center', justifyContent:'center', border:'none', background:'transparent', color:'var(--mc-ink-200)', cursor:'pointer' }}>
            <Icon name="X" size={24} color="var(--mc-ink-200)" />
          </button>
        </div>
        <nav style={{ display:'flex', flexDirection:'column', marginTop:'8px', flex:1 }}>
          {links.map((l) => (
            <button key={l.label} onClick={() => goMobile(l)}
              style={{ border:'none', borderBottom:'1px solid var(--mc-ink-800)', background:'transparent', color:'var(--mc-paper)', cursor:'pointer', textAlign:'left',
                fontFamily:'var(--font-display)', textTransform:'uppercase', letterSpacing:'0.06em', fontWeight:600, fontSize:'20px', padding:'18px 4px' }}>
              {l.label}
            </button>
          ))}
        </nav>
        <Button variant="primary" size="lg" fullWidth onClick={() => { setMenuOpen(false); openWhatsApp(); }}
          iconLeft={<Icon name="MessageCircle" size={18} color="#fff" />}>Cotizar por WhatsApp</Button>
      </aside>
    </header>
  );
}

/* ===== Hero ===== */
function Hero({ onShop, onQuote, feature }) {
  const { Button, Badge } = window.MeatConnectionDesignSystem_3e7a26;
  return (
    <section style={{ background:'var(--mc-charcoal)', color:'var(--mc-paper)' }}>
      <div className="mc-hero" style={{ maxWidth:'var(--container-max)', margin:'0 auto', padding:'72px 24px', display:'grid', gridTemplateColumns:'1.1fr 0.9fr', gap:'48px', alignItems:'center' }}>
        <div>
          <div style={{ display:'flex', alignItems:'center', gap:'12px', marginBottom:'20px' }}>
            <span style={{ height:'2px', width:'32px', background:'var(--mc-red)' }}></span>
            <span style={{ fontFamily:'var(--font-display)', textTransform:'uppercase', letterSpacing:'0.18em', fontWeight:600, fontSize:'13px', color:'var(--mc-red-bright)' }}>Wagyu Japón · Australia · Carne Americana</span>
          </div>
          <h1 className="mc-h1" style={{ fontFamily:'var(--font-display)', textTransform:'uppercase', fontWeight:700, fontSize:'76px', lineHeight:0.96, letterSpacing:'-0.01em', margin:0 }}>
            El Marmoleo que<br /><span style={{ color:'var(--mc-red-bright)' }}>Distingue al Wagyu</span>
          </h1>
          <p style={{ fontFamily:'var(--font-body)', fontSize:'18px', lineHeight:1.6, color:'var(--mc-ink-200)', maxWidth:'460px', margin:'22px 0 32px' }}>
            Distribuimos wagyu japonés A5, wagyu australiano de alto marmoleo y carne americana selecta para tu negocio en México. Importación directa y envíos express con cadena de frío garantizada.
          </p>
          <div className="mc-hero-cta" style={{ display:'flex', gap:'12px' }}>
            <Button variant="primary" size="lg" onClick={onShop} iconRight={<Icon name="ArrowRight" size={18} color="#fff" />}>Ver Catálogo</Button>
            <Button variant="secondary" size="lg" onClick={onQuote} style={{ color:'var(--mc-paper)', borderColor:'var(--mc-ink-400)' }} iconLeft={<Icon name="MessageCircle" size={18} color="var(--mc-paper)" />}>Cotizar por WhatsApp</Button>
          </div>
          <div className="mc-stats" style={{ display:'flex', gap:'28px', marginTop:'40px' }}>
            {[['A5','grado japonés'], ['Directo','importación'], ['Express','envíos nacionales']].map(([a,b]) => (
              <div key={a}>
                <div style={{ fontFamily:'var(--font-display)', textTransform:'uppercase', fontWeight:700, fontSize:'22px' }}>{a}</div>
                <div style={{ fontSize:'12px', letterSpacing:'0.12em', textTransform:'uppercase', color:'var(--mc-ink-400)' }}>{b}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ position:'relative', display:'flex', alignItems:'center', justifyContent:'center' }}>
          <RevealImg src={window.MC_PALETA} alt="Paleta de wagyu australiano de alto marmoleo, empacada al vacío" fetchpriority="high" decoding="async"
            frameStyle={{ width:'100%' }}
            imgStyle={{ width:'100%', height:'auto', display:'block' }} />
        </div>
      </div>
    </section>
  );
}

/* ===== Product grid ===== */
function ProductCard({ product, onAdd, onOpen }) {
  const { Card, Button, Badge } = window.MeatConnectionDesignSystem_3e7a26;
  return (
    <Card variant="default" padding="none" style={{ display:'flex', flexDirection:'column', cursor:'pointer', transition:'box-shadow var(--dur-med), transform var(--dur-med)' }}
      onMouseOver={(e)=>{ e.currentTarget.style.boxShadow='var(--shadow-lg)'; e.currentTarget.style.transform='translateY(-3px)'; }}
      onMouseOut={(e)=>{ e.currentTarget.style.boxShadow='none'; e.currentTarget.style.transform='translateY(0)'; }}>
      <div onClick={() => onOpen(product)} style={{ position:'relative' }}>
        <ProductImage product={product} height={210} />
        {product.badge && (<div style={{ position:'absolute', top:'14px', left:'14px' }}><Badge tone="red" solid>{product.badge}</Badge></div>)}
      </div>
      <div style={{ padding:'18px', display:'flex', flexDirection:'column', gap:'12px', flex:1 }}>
        <div onClick={() => onOpen(product)}>
          <div style={{ fontFamily:'var(--font-display)', textTransform:'uppercase', fontWeight:600, fontSize:'20px', lineHeight:1.05, color:'var(--text-strong)' }}>{product.name}</div>
          <div style={{ fontSize:'13px', color:'var(--text-muted)', marginTop:'4px' }}>{product.desc}</div>
        </div>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginTop:'auto' }}>
          <div style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:'24px', color:'var(--text-strong)' }}>{money(product.price)}<span style={{ fontSize:'13px', color:'var(--text-muted)', fontWeight:400, marginLeft:'4px' }}>MXN / kg</span></div>
          <Button variant="ink" size="sm" onClick={(e)=>{ e.stopPropagation(); onAdd(product); }} iconLeft={<Icon name="Plus" size={15} color="#fff" />}>Agregar</Button>
        </div>
      </div>
    </Card>
  );
}
function ProductGrid({ products, onAdd, onOpen }) {
  return (
    <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(260px, 1fr))', gap:'24px' }}>
      {products.map((p) => <ProductCard key={p.id} product={p} onAdd={onAdd} onOpen={onOpen} />)}
    </div>
  );
}

/* ===== Product detail ===== */
const qtyBtn = { width:'40px', height:'40px', border:'none', background:'transparent', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', color:'var(--mc-charcoal)' };
function ProductDetail({ product, onAdd, onBack }) {
  const { Button, Badge, Tabs, Select } = window.MeatConnectionDesignSystem_3e7a26;
  const [tab, setTab] = React.useState('desc');
  const [qty, setQty] = React.useState(1);
  const tabBody = {
    desc: product.desc + ' Cortado a mano a pedido y empacado al vacío para conservar su frescura.',
    origin: product.cat === 'Wagyu Japonés'
      ? 'Wagyu Negro Japonés de raza pura, grado A5 — el máximo grado de rendimiento y marmoleo que otorga Japón. Totalmente trazable hasta la prefectura.'
      : 'Wagyu australiano, terminado con grano para un marmoleo profundo y parejo. Criado bajo estrictos estándares de marmoleo y totalmente trazable.',
    cooking: 'El Wagyu se cocina rápido y a fuego alto. Llévalo a temperatura ambiente, sálalo justo antes de sellar y mantén las porciones pequeñas — la grasa hace el trabajo. Deja reposar y córtalo fino en contra de la fibra.',
    reviews: '★★★★★ «Marmoleo de restaurante en casa.» — Comprador verificado',
  };
  return (
    <div style={{ maxWidth:'var(--container-max)', margin:'0 auto', padding:'32px 24px 80px' }}>
      <button onClick={onBack} style={{ border:'none', background:'transparent', cursor:'pointer', display:'flex', alignItems:'center', gap:'8px', color:'var(--text-muted)', fontFamily:'var(--font-body)', fontSize:'14px', marginBottom:'24px', padding:0 }}>
        <Icon name="ArrowLeft" size={16} color="var(--text-muted)" /> Volver al catálogo
      </button>
      <div className="mc-pdp" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'48px', alignItems:'start' }}>
        <div style={{ borderRadius:'var(--radius-md)', overflow:'hidden' }}>
          <ProductImage product={product} height={560} fit="contain" big />
        </div>
        <div>
          <div style={{ display:'flex', gap:'8px', marginBottom:'14px' }}>
            {product.badge && <Badge tone="red" solid>{product.badge}</Badge>}
            <Badge tone="success">Disponible</Badge>
          </div>
          <h1 className="mc-page-title" style={{ fontFamily:'var(--font-display)', textTransform:'uppercase', fontWeight:700, fontSize:'48px', lineHeight:0.98, margin:0, color:'var(--text-strong)' }}>{product.name}</h1>
          <div style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:'32px', color:'var(--mc-red)', margin:'16px 0' }}>{money(product.price)}<span style={{ fontSize:'15px', color:'var(--text-muted)', fontWeight:400, marginLeft:'6px' }}>MXN / kg</span></div>
          <div className="mc-pdp-actions" style={{ display:'flex', gap:'14px', alignItems:'flex-end', margin:'24px 0' }}>
            <div style={{ width:'170px' }}>
              <Select label="Presentación"><option>Corte al vacío · por kg</option><option>Caja de mayoreo (5 kg)</option></Select>
            </div>
            <div style={{ display:'flex', alignItems:'center', border:'2px solid var(--mc-charcoal)', borderRadius:'var(--radius-md)', height:'44px' }}>
              <button onClick={() => setQty(Math.max(1, qty-1))} style={qtyBtn}><Icon name="Minus" size={16} /></button>
              <span style={{ width:'40px', textAlign:'center', fontFamily:'var(--font-display)', fontWeight:700, fontSize:'18px' }}>{qty}</span>
              <button onClick={() => setQty(qty+1)} style={qtyBtn}><Icon name="Plus" size={16} /></button>
            </div>
          </div>
          <Button variant="primary" size="lg" fullWidth onClick={() => onAdd(product, qty)} iconLeft={<Icon name="ShoppingCart" size={18} color="#fff" />}>
            Agregar {qty} kg al pedido · {money(product.price * qty)}
          </Button>
          <div className="mc-trust" style={{ display:'flex', gap:'20px', margin:'20px 0 28px' }}>
            {[['Truck','Envíos express a todo México'], ['ShieldCheck','Grado y trazabilidad'], ['Snowflake','Cadena de frío garantizada']].map(([ic,t]) => (
              <div key={t} style={{ display:'flex', alignItems:'center', gap:'8px', fontSize:'12px', color:'var(--text-muted)' }}>
                <Icon name={ic} size={16} color="var(--mc-red)" /> {t}
              </div>
            ))}
          </div>
          <Tabs value={tab} onChange={setTab} items={[{id:'desc',label:'Descripción'},{id:'origin',label:'Origen'},{id:'cooking',label:'Cómo Cocinar'},{id:'reviews',label:'Reseñas'}]} />
          <p style={{ fontFamily:'var(--font-body)', fontSize:'15px', lineHeight:1.65, color:'var(--text-body)', marginTop:'18px' }}>{tabBody[tab]}</p>
        </div>
      </div>
    </div>
  );
}

/* ===== Cart drawer ===== */
const miniBtn = { width:'26px', height:'26px', border:'none', background:'transparent', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', color:'var(--mc-charcoal)' };
function CartDrawer({ open, items, onClose, onQty, onRemove }) {
  const { Button } = window.MeatConnectionDesignSystem_3e7a26;
  const subtotal = items.reduce((s, it) => s + it.price * it.qty, 0);
  const remaining = Math.max(0, 2500 - subtotal);
  return (
    <>
      <div onClick={onClose} style={{ position:'fixed', inset:0, background:'rgba(20,20,20,0.5)', opacity: open?1:0, pointerEvents: open?'auto':'none', transition:'opacity var(--dur-med)', zIndex:40 }}></div>
      <aside style={{ position:'fixed', top:0, right:0, height:'100%', width:'400px', maxWidth:'92vw', background:'var(--surface-page)', boxShadow:'var(--shadow-lg)', transform: open?'translateX(0)':'translateX(100%)', transition:'transform var(--dur-slow) var(--ease-out)', zIndex:50, display:'flex', flexDirection:'column' }}>
        <div style={{ background:'var(--mc-charcoal)', color:'var(--mc-paper)', padding:'20px 22px', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
          <span style={{ fontFamily:'var(--font-display)', textTransform:'uppercase', letterSpacing:'0.08em', fontWeight:700, fontSize:'20px' }}>Tu Pedido</span>
          <button onClick={onClose} aria-label="Cerrar" style={{ border:'none', background:'transparent', color:'var(--mc-ink-200)', cursor:'pointer', display:'flex' }}><Icon name="X" size={22} color="var(--mc-ink-200)" /></button>
        </div>
        {items.length === 0 ? (
          <div style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:'14px', color:'var(--text-muted)' }}>
            <Icon name="ShoppingCart" size={48} color="var(--mc-ink-300)" strokeWidth={1.4} />
            <span style={{ fontFamily:'var(--font-body)', fontSize:'15px' }}>Tu carrito está vacío.</span>
          </div>
        ) : (
          <div style={{ flex:1, overflowY:'auto', padding:'8px 0' }}>
            {items.map((it) => (
              <div key={it.id} style={{ display:'flex', gap:'14px', padding:'16px 22px', borderBottom:'1px solid var(--border-subtle)' }}>
                <div style={{ width:'64px', height:'64px', flex:'none', overflow:'hidden', borderRadius:'var(--radius-sm)', background:'var(--mc-charcoal)' }}>
                  <img src={it.img || window.MC_IMG[it.id]} alt={it.name} loading="lazy" decoding="async" style={{ width:'100%', height:'100%', objectFit:'cover' }} />
                </div>
                <div style={{ flex:1 }}>
                  <div style={{ fontFamily:'var(--font-display)', textTransform:'uppercase', fontWeight:600, fontSize:'15px', color:'var(--text-strong)', lineHeight:1.1 }}>{it.name}</div>
                  <div style={{ fontSize:'12px', color:'var(--text-muted)', margin:'2px 0 8px' }}>{money(it.price)} MXN / kg</div>
                  <div style={{ display:'flex', alignItems:'center', gap:'10px' }}>
                    <div style={{ display:'flex', alignItems:'center', border:'1px solid var(--border-default)', borderRadius:'var(--radius-sm)' }}>
                      <button onClick={() => onQty(it, -1)} style={miniBtn}><Icon name="Minus" size={13} /></button>
                      <span style={{ width:'28px', textAlign:'center', fontSize:'13px', fontWeight:600 }}>{it.qty}</span>
                      <button onClick={() => onQty(it, 1)} style={miniBtn}><Icon name="Plus" size={13} /></button>
                    </div>
                    <button onClick={() => onRemove(it)} style={{ border:'none', background:'transparent', cursor:'pointer', color:'var(--text-faint)', display:'flex', alignItems:'center', gap:'4px' }}><Icon name="Trash2" size={14} color="var(--text-faint)" /></button>
                  </div>
                </div>
                <div style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:'16px', color:'var(--text-strong)' }}>{money(it.price * it.qty)}</div>
              </div>
            ))}
          </div>
        )}
        <div style={{ padding:'18px 22px', borderTop:'2px solid var(--mc-charcoal)', background:'var(--mc-bone)' }}>
          {items.length > 0 && remaining > 0 && (
            <div style={{ fontSize:'12px', color:'var(--text-muted)', marginBottom:'12px', textAlign:'center' }}>Agrega <strong style={{ color:'var(--mc-red)' }}>{money(remaining)}</strong> más para envío gratis</div>
          )}
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'baseline', marginBottom:'14px' }}>
            <span style={{ fontFamily:'var(--font-display)', textTransform:'uppercase', letterSpacing:'0.06em', fontWeight:600, fontSize:'14px', color:'var(--text-muted)' }}>Subtotal</span>
            <span style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:'26px', color:'var(--text-strong)' }}>{money(subtotal)}</span>
          </div>
          <Button variant="primary" size="lg" fullWidth disabled={items.length === 0}
            onClick={() => openWhatsApp('Hola Meat Connection, quiero solicitar este pedido:\n' + items.map((it) => '• ' + it.name + ' — ' + it.qty + ' kg (' + money(it.price) + ' MXN/kg)').join('\n') + '\n\nSubtotal: ' + money(subtotal) + ' MXN')}
            iconLeft={<Icon name="MessageCircle" size={18} color="#fff" />}>Solicitar por WhatsApp</Button>
        </div>
      </aside>
    </>
  );
}

/* ===== Footer + toolbar + App ===== */
function Footer() {
  const cols = [
    ['Catálogo', [['Wagyu Japonés A5','#'],['Wagyu Australiano','#'],['Carne Americana','#'],['Cajas de Mayoreo','#']]],
    ['Servicios', [['Envíos Express','#'],['Importación Directa','#'],['Cadena de Frío','#'],['Porcionado al Vacío','#']]],
    ['Contacto', [['WhatsApp',WA_LINK,'MessageCircle'],['Instagram',IG_LINK,'Instagram'],['Facebook',FB_LINK,'Facebook'],['Cotizar / Catálogos','#contacto']]],
  ];
  return (
    <footer style={{ background:'var(--mc-charcoal)', color:'var(--mc-ink-200)' }}>
      <div className="mc-foot" style={{ maxWidth:'var(--container-max)', margin:'0 auto', padding:'56px 24px 32px', display:'grid', gridTemplateColumns:'1.4fr 1fr 1fr 1fr', gap:'40px' }}>
        <div>
          <img src={window.MC_LOGO} alt="Meat Connection" style={{ height:'32px', marginBottom:'16px' }} />
          <p style={{ fontSize:'13px', lineHeight:1.6, color:'var(--mc-ink-400)', maxWidth:'240px' }}>Distribuidor de carne premium en México. Wagyu japonés, wagyu australiano y carne americana — importación directa con envíos express y cadena de frío garantizada.</p>
        </div>
        {cols.map(([h, items]) => (
          <div key={h}>
            <div style={{ fontFamily:'var(--font-display)', textTransform:'uppercase', letterSpacing:'0.1em', fontWeight:600, fontSize:'13px', color:'#fff', marginBottom:'14px' }}>{h}</div>
            <div style={{ display:'flex', flexDirection:'column', gap:'9px' }}>
              {items.map(([label, href, icon]) => <a key={label} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener" aria-label={label} style={{ display:'flex', alignItems:'center', gap:'8px', color:'var(--mc-ink-300)', textDecoration:'none', fontSize:'13px' }}>{icon && <Icon name={icon} size={16} color="currentColor" strokeWidth={1.75} />}{label}</a>)}
            </div>
          </div>
        ))}
      </div>
      <div className="mc-foot-legal" style={{ borderTop:'1px solid var(--mc-ink-700)', padding:'18px 24px', maxWidth:'var(--container-max)', margin:'0 auto', display:'flex', justifyContent:'space-between', gap:'10px', fontSize:'12px', color:'var(--mc-ink-500)' }}>
        <span>© 2026 Meat Connection · {WA_DISPLAY}</span>
      </div>
    </footer>
  );
}
function ShopToolbar({ active, onPick }) {
  const { Tag } = window.MeatConnectionDesignSystem_3e7a26;
  const cats = ['Todos', 'Wagyu Japonés', 'Wagyu Australiano'];
  return (
    <div style={{ display:'flex', alignItems:'center', gap:'10px', flexWrap:'wrap', marginBottom:'28px' }}>
      {cats.map((c) => <Tag key={c} selected={active === c} onClick={() => onPick(c)}>{c}</Tag>)}
    </div>
  );
}
/* ===== shared section heading ===== */
function SectionHead({ eyebrow, title, sub, light }) {
  return (
    <div style={{ marginBottom:'36px', maxWidth:'640px' }}>
      <div style={{ fontFamily:'var(--font-display)', textTransform:'uppercase', letterSpacing:'0.18em', fontWeight:600, fontSize:'13px', color:'var(--mc-red-bright)' }}>{eyebrow}</div>
      <h2 className="mc-section-title" style={{ fontFamily:'var(--font-display)', textTransform:'uppercase', fontWeight:700, fontSize:'40px', lineHeight:1.02, margin:'8px 0 0', color: light ? 'var(--mc-paper)' : 'var(--text-strong)' }}>{title}</h2>
      {sub && <p style={{ fontFamily:'var(--font-body)', fontSize:'16px', lineHeight:1.6, margin:'14px 0 0', color: light ? 'var(--mc-ink-200)' : 'var(--text-muted)' }}>{sub}</p>}
    </div>
  );
}

/* ===== Servicios / propuesta de valor ===== */
function Services() {
  const { Card } = window.MeatConnectionDesignSystem_3e7a26;
  const main = [
    ['Truck','Envíos Express','Entregas a todo México con logística en frío y los tiempos que tu operación necesita.'],
    ['Plane','Importadores Directos','Traemos wagyu de Japón, Australia y carne selecta de Estados Unidos directo del origen, sin intermediarios.'],
    ['Snowflake','Conservación Total','Cadena de frío continua garantizada, desde el origen hasta la puerta de tu cocina.'],
  ];
  const sub = [
    ['Slice','Porcionado y etiquetado a la medida'],
    ['Package','Empacado al vacío profesional'],
    ['UtensilsCrossed','Presentación impecable en charolas'],
  ];
  return (
    <section id="servicios" style={{ background:'var(--surface-sunken)', scrollMarginTop:'72px' }}>
      <Reveal style={{ maxWidth:'var(--container-max)', margin:'0 auto', padding:'72px 24px' }}>
        <SectionHead eyebrow="Por qué Meat Connection" title="Carne premium, lista para tu negocio"
          sub="Importación directa, logística en frío y servicio a la medida para restaurantes, hoteles y carnicerías en todo México." />
        <div className="mc-services" style={{ display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:'24px' }}>
          {main.map(([ic,t,d]) => (
            <Card key={t} variant="default" style={{ padding:'28px' }}>
              <div style={{ width:'52px', height:'52px', borderRadius:'var(--radius-md)', background:'var(--mc-red)', display:'flex', alignItems:'center', justifyContent:'center', marginBottom:'18px' }}>
                <Icon name={ic} size={26} color="#fff" />
              </div>
              <div style={{ fontFamily:'var(--font-display)', textTransform:'uppercase', fontWeight:700, fontSize:'22px', color:'var(--text-strong)' }}>{t}</div>
              <p style={{ fontFamily:'var(--font-body)', fontSize:'14px', lineHeight:1.6, color:'var(--text-muted)', margin:'10px 0 0' }}>{d}</p>
            </Card>
          ))}
        </div>
        <div className="mc-subservices" style={{ display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:'20px', marginTop:'24px', padding:'24px', background:'var(--mc-charcoal)', borderRadius:'var(--radius-md)' }}>
          {sub.map(([ic,t]) => (
            <div key={t} style={{ display:'flex', alignItems:'center', gap:'12px' }}>
              <Icon name={ic} size={22} color="var(--mc-red-bright)" />
              <span style={{ fontFamily:'var(--font-body)', fontSize:'14px', color:'var(--mc-paper)' }}>{t}</span>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

/* ===== Marcas que distribuimos ===== */
function Partners() {
  const brands = [
    { name:'Wagyu Japanese Beef', key:'wagyu',    url:null },
    { name:'Kobe Beef',           key:'kobe',     url:'https://www.kobe-niku.jp/' },
    { name:"Jack's Creek",        key:'jacks',    url:'https://jackscreek.com.au/' },
    { name:'Stone Axe',           key:'stone',    url:'https://www.stoneaxewagyu.com/' },
    { name:'Margaret River Wagyu',key:'margaret', url:'https://www.stoneaxewagyu.com/' },
    { name:'Masami Beef',         key:'masami',   url:'https://masamiranch.com/' },
  ];
  const tileStyle = { border:'1px solid var(--border-default)', borderRadius:'var(--radius-md)', background:'var(--surface-card)', padding:'28px 24px', minHeight:'132px', display:'flex', alignItems:'center', justifyContent:'center', textDecoration:'none', transition:'border-color var(--dur-med), box-shadow var(--dur-med), transform var(--dur-med)' };
  const hoverIn = (e) => { e.currentTarget.style.borderColor='var(--mc-red)'; e.currentTarget.style.boxShadow='var(--shadow-md)'; e.currentTarget.style.transform='translateY(-3px)'; };
  const hoverOut = (e) => { e.currentTarget.style.borderColor='var(--border-default)'; e.currentTarget.style.boxShadow='none'; e.currentTarget.style.transform='translateY(0)'; };
  return (
    <section id="marcas" style={{ background:'var(--surface-page)', scrollMarginTop:'72px' }}>
      <Reveal style={{ maxWidth:'var(--container-max)', margin:'0 auto', padding:'64px 24px' }}>
        <SectionHead eyebrow="Marcas que distribuimos" title="Las mejores ganaderías del mundo"
          sub="Trabajamos directo con productores certificados de Japón, Australia y Estados Unidos." />
        <div className="mc-brands" style={{ display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:'16px' }}>
          {brands.map((b) => {
            const logo = <img src={window.MC_BRAND[b.key]} alt={b.name} loading="lazy" decoding="async" style={{ maxHeight:'84px', maxWidth:'100%', width:'auto', objectFit:'contain' }} />;
            return b.url ? (
              <a key={b.key} href={b.url} target="_blank" rel="noopener" title={b.name} aria-label={b.name}
                style={tileStyle} onMouseOver={hoverIn} onMouseOut={hoverOut}>{logo}</a>
            ) : (
              <div key={b.key} title={b.name} style={tileStyle}>{logo}</div>
            );
          })}
        </div>
      </Reveal>
    </section>
  );
}

/* ===== Para quién — clientes objetivo ===== */
function Clients() {
  const list = [
    ['UtensilsCrossed','Restaurantes de alta cocina'],
    ['BedDouble','Hoteles de lujo'],
    ['Store','Carnicerías gourmet'],
    ['Flag','Clubes privados y campos de golf'],
    ['ChefHat','Caterers corporativos'],
    ['PartyPopper','Organizadores de eventos exclusivos'],
  ];
  return (
    <section id="clientes" style={{ background:'var(--mc-charcoal)', color:'var(--mc-paper)', scrollMarginTop:'72px' }}>
      <Reveal style={{ maxWidth:'var(--container-max)', margin:'0 auto', padding:'72px 24px' }}>
        <SectionHead light eyebrow="Para quién" title="Aliados de los mejores del sector"
          sub="Abastecemos a negocios que no negocian la calidad de su carne." />
        <div className="mc-clients" style={{ display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:'16px' }}>
          {list.map(([ic,t]) => (
            <div key={t} style={{ display:'flex', alignItems:'center', gap:'14px', padding:'20px', border:'1px solid var(--mc-ink-700)', borderRadius:'var(--radius-md)', background:'var(--mc-ink-900)' }}>
              <Icon name={ic} size={24} color="var(--mc-red-bright)" />
              <span style={{ fontFamily:'var(--font-body)', fontSize:'15px', color:'var(--mc-paper)' }}>{t}</span>
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
  const [sent, setSent] = React.useState(false);
  const [form, setForm] = React.useState({ nombre:'', negocio:'', telefono:'', interes:'' });
  const setField = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const submit = (e) => {
    e.preventDefault();
    const msg = 'Hola Meat Connection, quiero cotizar.\n'
      + '• Nombre: ' + form.nombre + '\n'
      + '• Negocio: ' + form.negocio + '\n'
      + '• WhatsApp/Teléfono: ' + form.telefono
      + (form.interes ? '\n• Me interesa: ' + form.interes : '');
    openWhatsApp(msg);
    setSent(true);
  };
  const channels = [
    ['MessageCircle','WhatsApp',WA_DISPLAY,WA_LINK],
    ['Instagram','Instagram','@meatconnectionmx',IG_LINK],
    ['Facebook','Facebook','@meatconnectionmx',FB_LINK],
  ];
  return (
    <section id="contacto" style={{ background:'var(--surface-sunken)', scrollMarginTop:'72px' }}>
      <Reveal className="mc-contact" style={{ maxWidth:'var(--container-max)', margin:'0 auto', padding:'72px 24px', display:'grid', gridTemplateColumns:'1fr 1fr', gap:'48px', alignItems:'start' }}>
        <div>
          <SectionHead eyebrow="Cotiza / Catálogos" title="Hablemos de tu negocio"
            sub="Solicita catálogos, precios de mayoreo y tiempos de entrega. Te atendemos de forma personalizada." />
          <div style={{ display:'flex', flexDirection:'column', gap:'14px', marginTop:'8px' }}>
            {channels.map(([ic,name,label,href]) => (
              <a key={name} href={href} target="_blank" rel="noopener" style={{ display:'flex', alignItems:'center', gap:'14px', textDecoration:'none', color:'var(--text-strong)' }}>
                <span style={{ width:'44px', height:'44px', borderRadius:'var(--radius-md)', background:'var(--mc-charcoal)', display:'flex', alignItems:'center', justifyContent:'center', flex:'none' }}>
                  <Icon name={ic} size={20} color="#fff" />
                </span>
                <span>
                  <span style={{ display:'block', fontFamily:'var(--font-display)', textTransform:'uppercase', letterSpacing:'0.06em', fontSize:'12px', color:'var(--text-muted)' }}>{name}</span>
                  <span style={{ fontFamily:'var(--font-body)', fontSize:'15px', fontWeight:600 }}>{label}</span>
                </span>
              </a>
            ))}
          </div>
        </div>
        <div style={{ background:'var(--surface-card)', border:'1px solid var(--border-default)', borderRadius:'var(--radius-md)', padding:'28px' }}>
          {sent ? (
            <div style={{ display:'flex', flexDirection:'column', alignItems:'center', textAlign:'center', gap:'12px', padding:'32px 0' }}>
              <Icon name="CheckCircle2" size={44} color="var(--mc-success)" />
              <div style={{ fontFamily:'var(--font-display)', textTransform:'uppercase', fontWeight:700, fontSize:'22px', color:'var(--text-strong)' }}>¡Gracias!</div>
              <p style={{ fontFamily:'var(--font-body)', fontSize:'14px', color:'var(--text-muted)', margin:0 }}>Recibimos tu solicitud. Para atención inmediata, escríbenos por WhatsApp.</p>
              <Button variant="primary" onClick={onQuote} iconLeft={<Icon name="MessageCircle" size={16} color="#fff" />}>Abrir WhatsApp</Button>
            </div>
          ) : (
            <form onSubmit={submit} style={{ display:'flex', flexDirection:'column', gap:'16px' }}>
              <Input label="Nombre completo" placeholder="Tu nombre" required value={form.nombre} onChange={setField('nombre')} />
              <Input label="Nombre del negocio" placeholder="Restaurante, hotel, carnicería…" required value={form.negocio} onChange={setField('negocio')} />
              <Input label="WhatsApp / Teléfono" placeholder={WA_DISPLAY} required type="tel" value={form.telefono} onChange={setField('telefono')} />
              <Input label="¿Qué te interesa?" placeholder="Cuéntanos qué cortes o catálogos buscas" value={form.interes} onChange={setField('interes')} />
              <Button variant="primary" size="lg" fullWidth type="submit">Enviar solicitud</Button>
            </form>
          )}
        </div>
      </Reveal>
    </section>
  );
}

/* ===== Botón flotante de WhatsApp ===== */
function WhatsAppFab() {
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
      window.open(WA_LINK, '_blank', 'noopener');
    } else {
      setPos((p) => { try { localStorage.setItem('mc_wa_pos', JSON.stringify(p)); } catch (err) {} return p; });
    }
  };

  return (
    <button type="button" aria-label="Cotizar por WhatsApp" title="Cotizar por WhatsApp — arrastra para mover"
      onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={onPointerUp}
      onMouseEnter={(e) => { if (!dragging) { e.currentTarget.style.transform='scale(1.1)'; e.currentTarget.style.background='#1ebe5a'; e.currentTarget.style.boxShadow='0 10px 28px rgba(37,211,102,0.45)'; } }}
      onMouseLeave={(e) => { e.currentTarget.style.transform='scale(1)'; e.currentTarget.style.background='#25D366'; e.currentTarget.style.boxShadow='var(--shadow-lg)'; }}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); window.open(WA_LINK, '_blank', 'noopener'); } }}
      style={{ position:'fixed', left:pos.x+'px', top:pos.y+'px', width:SIZE+'px', height:SIZE+'px', borderRadius:'999px', border:'none', padding:0, background:'#25D366', boxShadow:'var(--shadow-lg)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:45, cursor: dragging ? 'grabbing' : 'grab', touchAction:'none', userSelect:'none', WebkitTapHighlightColor:'transparent', transition:'transform var(--dur-fast) var(--ease-out), background var(--dur-fast) var(--ease-out), box-shadow var(--dur-fast) var(--ease-out)' }}>
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
    <div ref={ref} style={{ overflow:'hidden', ...frameStyle }}>
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
  return (
    <section style={{ background:'var(--surface-page)' }}>
      <div className="mc-showcase" style={{ maxWidth:'var(--container-max)', margin:'0 auto', padding:'72px 24px', display:'grid', gridTemplateColumns:'0.95fr 1.05fr', gap:'48px', alignItems:'center' }}>
        <Reveal>
          <img src={window.MC_IMG['tritip']} alt="King River MB4-5, wagyu australiano de marmoleo MB4-5, empacado al vacío" loading="lazy" decoding="async"
            style={{ width:'100%', height:'auto', display:'block', borderRadius:'var(--radius-md)', boxShadow:'var(--shadow-md)' }} />
        </Reveal>
        <div>
          <SectionHead eyebrow="Corte destacado" title="King River MB4-5"
            sub="Wagyu australiano King River con marmoleo MB4-5 — equilibrio perfecto entre grasa y sabor a res. Jugoso, untuoso y versátil, rinde excelente en parrilla, sellado y cortes finos. Porcionado a tu medida y empacado al vacío." />
          <Button variant="primary" size="lg" onClick={onShop} iconRight={<Icon name="ArrowRight" size={18} color="#fff" />}>Ver Catálogo</Button>
        </div>
      </div>
    </section>
  );
}

function App() {
  const [view, setView] = React.useState('home');
  const [active, setActive] = React.useState(null);
  const [cat, setCat] = React.useState('Todos');
  const [cartOpen, setCartOpen] = React.useState(false);
  const [cart, setCart] = React.useState([]);
  function add(product, qty = 1) {
    setCart((c) => { const ex = c.find((i) => i.id === product.id);
      if (ex) return c.map((i) => i.id === product.id ? { ...i, qty:i.qty+qty } : i);
      return [...c, { ...product, qty }]; });
    setCartOpen(true);
  }
  function changeQty(item, d) { setCart((c) => c.map((i) => i.id === item.id ? { ...i, qty:Math.max(1, i.qty+d) } : i)); }
  function remove(item) { setCart((c) => c.filter((i) => i.id !== item.id)); }
  function open(product) { setActive(product); setView('product'); window.scrollTo(0,0); }
  function nav(v) { setView(v); window.scrollTo(0,0); }
  function goAnchor(id) { setView('home'); setTimeout(() => { const el = document.getElementById(id); if (el) el.scrollIntoView({ behavior:'smooth' }); }, 60); }
  function quote() { openWhatsApp(); }
  const count = cart.reduce((s, i) => s + i.qty, 0);
  const filtered = cat === 'Todos' ? PRODUCTS : PRODUCTS.filter((p) => p.cat === cat);
  return (
    <div style={{ background:'var(--surface-page)', minHeight:'100vh' }}>
      <Header cartCount={count} onCart={() => setCartOpen(true)} onNav={nav} onAnchor={goAnchor} />
      {view === 'home' && (<>
        <Hero onShop={() => nav('shop')} onQuote={quote} feature={PRODUCTS[0]} />
        <Services />
        <MarbleShowcase onShop={() => nav('shop')} />
        <Reveal style={{ maxWidth:'var(--container-max)', margin:'0 auto', padding:'64px 24px' }}>
          <div className="mc-feature-head" style={{ display:'flex', alignItems:'flex-end', justifyContent:'space-between', marginBottom:'28px' }}>
            <div>
              <div style={{ fontFamily:'var(--font-display)', textTransform:'uppercase', letterSpacing:'0.18em', fontWeight:600, fontSize:'13px', color:'var(--mc-red)' }}>Del Mostrador</div>
              <h2 className="mc-section-title" style={{ fontFamily:'var(--font-display)', textTransform:'uppercase', fontWeight:700, fontSize:'40px', margin:'6px 0 0', color:'var(--text-strong)' }}>Cortes Más Vendidos</h2>
            </div>
            <button onClick={() => nav('shop')} style={{ border:'none', background:'transparent', cursor:'pointer', display:'flex', alignItems:'center', gap:'8px', fontFamily:'var(--font-display)', textTransform:'uppercase', letterSpacing:'0.06em', fontWeight:600, fontSize:'14px', color:'var(--text-strong)' }}>Ver Todo <Icon name="ArrowRight" size={16} /></button>
          </div>
          <ProductGrid products={PRODUCTS.slice(0,4)} onAdd={add} onOpen={open} />
        </Reveal>
        <Partners />
        <Clients />
        <ContactSection onQuote={quote} />
      </>)}
      {view === 'shop' && (
        <section style={{ maxWidth:'var(--container-max)', margin:'0 auto', padding:'40px 24px 80px' }}>
          <h1 className="mc-page-title" style={{ fontFamily:'var(--font-display)', textTransform:'uppercase', fontWeight:700, fontSize:'48px', margin:'0 0 8px', color:'var(--text-strong)' }}>El Catálogo</h1>
          <p style={{ fontFamily:'var(--font-body)', fontSize:'16px', color:'var(--text-muted)', margin:'0 0 28px' }}>{filtered.length} cortes · porcionados a tu medida</p>
          <ShopToolbar active={cat} onPick={setCat} />
          <ProductGrid products={filtered} onAdd={add} onOpen={open} />
        </section>
      )}
      {view === 'product' && active && (<ProductDetail product={active} onAdd={add} onBack={() => nav('shop')} />)}
      <Footer />
      <CartDrawer open={cartOpen} items={cart} onClose={() => setCartOpen(false)} onQty={changeQty} onRemove={remove} />
      <WhatsAppFab />
    </div>
  );
}
ReactDOM.createRoot(document.getElementById('root')).render(<App />);

