const MC_IMG = {
  tritip: 'images/tritip.webp',
  ribeye: 'images/ribeye.webp',
  newyork: 'images/newyork.webp',
  topround: 'images/topround.webp',
  paleta: 'images/paleta.webp'
};
const MC_LOGO = 'assets/logo-white.webp';
const WA_NUMBER = '5216643131945';
const WA_DISPLAY = '+52 664 313 1945';
const WA_LINK = 'https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent('Hola Meat Connection, me interesa cotizar carne premium para mi negocio.');
const IG_LINK = 'https://instagram.com/meatconnectionmx';
const FB_LINK = 'https://facebook.com/meatconnectionmx';
const DS = window.MeatConnectionDesignSystem_3e7a26;
function Icon({
  name,
  size = 20,
  color = 'currentColor',
  strokeWidth = 2,
  style = {}
}) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (!ref.current || !window.lucide || !window.lucide[name]) return;
    ref.current.innerHTML = '';
    const el = window.lucide.createElement(window.lucide[name]);
    el.setAttribute('width', size);
    el.setAttribute('height', size);
    el.setAttribute('stroke', color);
    el.setAttribute('stroke-width', strokeWidth);
    ref.current.appendChild(el);
  });
  return React.createElement("span", {
    ref: ref,
    style: {
      display: 'inline-flex',
      ...style
    }
  });
}
const money = n => '$' + n.toFixed(2);
const PRODUCTS = [{
  id: 'tritip',
  name: 'Tri-Tip Wagyu Japonés A5',
  cat: 'Wagyu Japonés',
  price: 89.0,
  weight: '300g',
  badge: 'A5 · Japón',
  desc: 'Wagyu japonés auténtico grado A5 — el máximo del marmoleo. Mantecoso, intenso, se deshace al contacto.'
}, {
  id: 'topround',
  name: 'Top Round Wagyu Japonés',
  cat: 'Wagyu Japonés',
  price: 64.0,
  weight: '400g',
  badge: 'Más Vendido',
  desc: 'Top round de wagyu japonés — marmoleo poco común en este corte. Ideal en finas láminas, parrilla o sukiyaki.'
}, {
  id: 'ribeye',
  name: 'Rib Eye Wagyu Australiano',
  cat: 'Wagyu Australiano',
  price: 52.0,
  weight: '400g',
  badge: 'Alto Marmoleo',
  desc: 'Rib eye de wagyu australiano, marmoleo intenso a través del ojo. El corte estrella de tu menú.'
}, {
  id: 'newyork',
  name: 'New York Wagyu Australiano',
  cat: 'Wagyu Australiano',
  price: 44.0,
  weight: '350g',
  badge: 'Más Vendido',
  desc: 'Mordida firme, sabor profundo y marmoleo generoso. El clásico de steakhouse.'
}, {
  id: 'paleta',
  name: 'Paleta Wagyu Australiano',
  cat: 'Wagyu Australiano',
  price: 26.0,
  weight: '500g',
  badge: 'Versátil',
  desc: 'Paleta de wagyu australiano, marmoleada y versátil. Para estofar, asar o cortar en finas láminas.'
}];
function ProductImage({
  product,
  height = 220,
  fit = 'cover'
}) {
  return React.createElement("div", {
    style: {
      height: height + 'px',
      overflow: 'hidden',
      background: 'var(--mc-charcoal)'
    }
  }, React.createElement("img", {
    src: MC_IMG[product.id],
    alt: product.name,
    loading: "lazy",
    style: {
      width: '100%',
      height: '100%',
      objectFit: fit,
      display: 'block'
    }
  }));
}
function Header({
  cartCount,
  onCart,
  onNav,
  onAnchor
}) {
  const {
    IconButton
  } = DS;
  const links = [{
    label: 'Catálogo',
    go: () => onNav('shop')
  }, {
    label: 'Servicios',
    go: () => onAnchor('servicios')
  }, {
    label: 'Marcas',
    go: () => onAnchor('marcas')
  }, {
    label: 'Clientes',
    go: () => onAnchor('clientes')
  }, {
    label: 'Contacto',
    go: () => onAnchor('contacto')
  }];
  return React.createElement("header", {
    style: {
      background: 'var(--mc-charcoal)',
      color: 'var(--mc-paper)',
      position: 'sticky',
      top: 0,
      zIndex: 30,
      borderBottom: '3px solid var(--mc-red)'
    }
  }, React.createElement("div", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      padding: '0 24px',
      height: '72px',
      display: 'flex',
      alignItems: 'center',
      gap: '28px'
    }
  }, React.createElement("img", {
    src: MC_LOGO,
    alt: "Meat Connection",
    style: {
      height: '34px',
      cursor: 'pointer'
    },
    onClick: () => onNav('home')
  }), React.createElement("nav", {
    className: "mc-nav",
    style: {
      display: 'flex',
      gap: '4px',
      flex: 1
    }
  }, links.map(l => React.createElement("button", {
    key: l.label,
    onClick: l.go,
    style: {
      border: 'none',
      background: 'transparent',
      color: 'var(--mc-ink-200)',
      cursor: 'pointer',
      fontFamily: 'var(--font-display)',
      textTransform: 'uppercase',
      letterSpacing: '0.08em',
      fontWeight: 500,
      fontSize: '14px',
      padding: '8px 12px'
    },
    onMouseOver: e => e.currentTarget.style.color = '#fff',
    onMouseOut: e => e.currentTarget.style.color = 'var(--mc-ink-200)'
  }, l.label))), React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '6px'
    }
  }, React.createElement("button", {
    className: "mc-search",
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      border: 'none',
      background: 'var(--mc-ink-700)',
      color: 'var(--mc-ink-200)',
      borderRadius: 'var(--radius-md)',
      padding: '9px 14px',
      cursor: 'pointer',
      fontFamily: 'var(--font-body)',
      fontSize: '13px'
    }
  }, React.createElement(Icon, {
    name: "Search",
    size: 16,
    color: "var(--mc-ink-200)"
  }), " Buscar cortes…"), React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, React.createElement(IconButton, {
    variant: "red",
    ariaLabel: "Cart",
    onClick: onCart
  }, React.createElement(Icon, {
    name: "ShoppingCart",
    size: 18,
    color: "#fff"
  })), cartCount > 0 && React.createElement("span", {
    style: {
      position: 'absolute',
      top: '-6px',
      right: '-6px',
      background: '#fff',
      color: 'var(--mc-charcoal)',
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: '11px',
      minWidth: '20px',
      height: '20px',
      borderRadius: '999px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '0 5px'
    }
  }, cartCount)))));
}
function Hero({
  onShop,
  onQuote,
  feature
}) {
  const {
    Button,
    Badge
  } = DS;
  return React.createElement("section", {
    style: {
      background: 'var(--mc-charcoal)',
      color: 'var(--mc-paper)'
    }
  }, React.createElement("div", {
    className: "mc-hero",
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      padding: '72px 24px',
      display: 'grid',
      gridTemplateColumns: '1.1fr 0.9fr',
      gap: '48px',
      alignItems: 'center'
    }
  }, React.createElement("div", null, React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      marginBottom: '20px'
    }
  }, React.createElement("span", {
    style: {
      height: '2px',
      width: '32px',
      background: 'var(--mc-red)'
    }
  }), React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      textTransform: 'uppercase',
      letterSpacing: '0.18em',
      fontWeight: 600,
      fontSize: '13px',
      color: 'var(--mc-red-bright)'
    }
  }, "Wagyu Japón · Australia · Carne Americana")), React.createElement("h1", {
    className: "mc-h1",
    style: {
      fontFamily: 'var(--font-display)',
      textTransform: 'uppercase',
      fontWeight: 700,
      fontSize: '76px',
      lineHeight: 0.96,
      letterSpacing: '-0.01em',
      margin: 0
    }
  }, "La Mejor Carne", React.createElement("br", null), React.createElement("span", {
    style: {
      color: 'var(--mc-red-bright)'
    }
  }, "Premium del Mundo")), React.createElement("p", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: '18px',
      lineHeight: 1.6,
      color: 'var(--mc-ink-200)',
      maxWidth: '460px',
      margin: '22px 0 32px'
    }
  }, "Distribuimos wagyu japonés A5, wagyu australiano de alto marmoleo y carne americana selecta para tu negocio en México. Importación directa y envíos express con cadena de frío garantizada."), React.createElement("div", {
    className: "mc-hero-cta",
    style: {
      display: 'flex',
      gap: '12px'
    }
  }, React.createElement(Button, {
    variant: "primary",
    size: "lg",
    onClick: onShop,
    iconRight: React.createElement(Icon, {
      name: "ArrowRight",
      size: 18,
      color: "#fff"
    })
  }, "Ver Catálogo"), React.createElement(Button, {
    variant: "secondary",
    size: "lg",
    onClick: onQuote,
    style: {
      color: 'var(--mc-paper)',
      borderColor: 'var(--mc-ink-400)'
    },
    iconLeft: React.createElement(Icon, {
      name: "MessageCircle",
      size: 18,
      color: "var(--mc-paper)"
    })
  }, "Cotizar por WhatsApp")), React.createElement("div", {
    className: "mc-stats",
    style: {
      display: 'flex',
      gap: '28px',
      marginTop: '40px'
    }
  }, [['A5', 'grado japonés'], ['Directo', 'importación'], ['Express', 'envíos nacionales']].map(([a, b]) => React.createElement("div", {
    key: a
  }, React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      textTransform: 'uppercase',
      fontWeight: 700,
      fontSize: '22px'
    }
  }, a), React.createElement("div", {
    style: {
      fontSize: '12px',
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      color: 'var(--mc-ink-400)'
    }
  }, b))))), React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, React.createElement("div", {
    style: {
      position: 'relative',
      aspectRatio: '4/5',
      overflow: 'hidden',
      borderRadius: 'var(--radius-md)',
      background: 'var(--mc-charcoal)'
    }
  }, React.createElement("img", {
    src: MC_IMG[feature.id],
    alt: feature.name,
    style: {
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    }
  }), React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'linear-gradient(to top, rgba(20,20,20,0.85) 0%, rgba(20,20,20,0.1) 45%, rgba(20,20,20,0.15) 100%)'
    }
  }), React.createElement("div", {
    style: {
      position: 'absolute',
      top: '20px',
      left: '20px'
    }
  }, React.createElement(Badge, {
    tone: "red",
    solid: true
  }, "Destacado")), React.createElement("div", {
    style: {
      position: 'absolute',
      left: '24px',
      right: '24px',
      bottom: '22px',
      color: 'var(--mc-paper)'
    }
  }, React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      textTransform: 'uppercase',
      fontWeight: 700,
      fontSize: '46px',
      lineHeight: 0.95
    }
  }, feature.name), React.createElement("div", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: '15px',
      marginTop: '8px'
    }
  }, feature.cat, " · ", feature.weight, " · ", React.createElement("strong", null, money(feature.price))))))));
}
function ProductCard({
  product,
  onAdd,
  onOpen
}) {
  const {
    Card,
    Button,
    Badge
  } = DS;
  return React.createElement(Card, {
    variant: "default",
    padding: "none",
    style: {
      display: 'flex',
      flexDirection: 'column',
      cursor: 'pointer',
      transition: 'box-shadow var(--dur-med), transform var(--dur-med)'
    },
    onMouseOver: e => {
      e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
      e.currentTarget.style.transform = 'translateY(-3px)';
    },
    onMouseOut: e => {
      e.currentTarget.style.boxShadow = 'none';
      e.currentTarget.style.transform = 'translateY(0)';
    }
  }, React.createElement("div", {
    onClick: () => onOpen(product),
    style: {
      position: 'relative'
    }
  }, React.createElement(ProductImage, {
    product: product,
    height: 210
  }), product.badge && React.createElement("div", {
    style: {
      position: 'absolute',
      top: '14px',
      left: '14px'
    }
  }, React.createElement(Badge, {
    tone: "red",
    solid: true
  }, product.badge))), React.createElement("div", {
    style: {
      padding: '18px',
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
      flex: 1
    }
  }, React.createElement("div", {
    onClick: () => onOpen(product)
  }, React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      textTransform: 'uppercase',
      fontWeight: 600,
      fontSize: '20px',
      lineHeight: 1.05,
      color: 'var(--text-strong)'
    }
  }, product.name), React.createElement("div", {
    style: {
      fontSize: '13px',
      color: 'var(--text-muted)',
      marginTop: '4px'
    }
  }, product.desc)), React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: 'auto'
    }
  }, React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: '24px',
      color: 'var(--text-strong)'
    }
  }, money(product.price), React.createElement("span", {
    style: {
      fontSize: '13px',
      color: 'var(--text-muted)',
      fontWeight: 400,
      marginLeft: '4px'
    }
  }, "/ ", product.weight)), React.createElement(Button, {
    variant: "ink",
    size: "sm",
    onClick: e => {
      e.stopPropagation();
      onAdd(product);
    },
    iconLeft: React.createElement(Icon, {
      name: "Plus",
      size: 15,
      color: "#fff"
    })
  }, "Agregar"))));
}
function ProductGrid({
  products,
  onAdd,
  onOpen
}) {
  return React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
      gap: '24px'
    }
  }, products.map(p => React.createElement(ProductCard, {
    key: p.id,
    product: p,
    onAdd: onAdd,
    onOpen: onOpen
  })));
}
const qtyBtn = {
  width: '40px',
  height: '40px',
  border: 'none',
  background: 'transparent',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'var(--mc-charcoal)'
};
function ProductDetail({
  product,
  onAdd,
  onBack
}) {
  const {
    Button,
    Badge,
    Tabs,
    Select
  } = DS;
  const [tab, setTab] = React.useState('desc');
  const [qty, setQty] = React.useState(1);
  const tabBody = {
    desc: product.desc + ' Porcionado a la medida y empacado al vacío para máxima frescura.',
    origin: product.cat === 'Wagyu Japonés' ? 'Wagyu japonés de pura raza, grado A5 — el máximo rendimiento y marmoleo que otorga Japón. Totalmente trazable hasta la prefectura de origen.' : 'Wagyu australiano, terminado en grano para un marmoleo profundo y uniforme. Criado bajo estrictos estándares de marble score y totalmente trazable.',
    cooking: 'El wagyu se cocina rápido y caliente. Atemperar, salar justo antes de sellar y mantener porciones pequeñas — la grasa hace el trabajo. Dejar reposar y cortar en finas láminas a contra hilo.',
    reviews: '★★★★★ "Marmoleo de nivel restaurante, entrega impecable y siempre en frío." — Cliente verificado'
  };
  return React.createElement("div", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      padding: '32px 24px 80px'
    }
  }, React.createElement("button", {
    onClick: onBack,
    style: {
      border: 'none',
      background: 'transparent',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      color: 'var(--text-muted)',
      fontFamily: 'var(--font-body)',
      fontSize: '14px',
      marginBottom: '24px',
      padding: 0
    }
  }, React.createElement(Icon, {
    name: "ArrowLeft",
    size: 16,
    color: "var(--text-muted)"
  }), " Volver al catálogo"), React.createElement("div", {
    className: "mc-pdp",
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '48px',
      alignItems: 'start'
    }
  }, React.createElement("div", {
    style: {
      borderRadius: 'var(--radius-md)',
      overflow: 'hidden'
    }
  }, React.createElement(ProductImage, {
    product: product,
    height: 560,
    fit: "contain"
  })), React.createElement("div", null, React.createElement("div", {
    style: {
      display: 'flex',
      gap: '8px',
      marginBottom: '14px'
    }
  }, product.badge && React.createElement(Badge, {
    tone: "red",
    solid: true
  }, product.badge), React.createElement(Badge, {
    tone: "success"
  }, "Disponible")), React.createElement("h1", {
    style: {
      fontFamily: 'var(--font-display)',
      textTransform: 'uppercase',
      fontWeight: 700,
      fontSize: '48px',
      lineHeight: 0.98,
      margin: 0,
      color: 'var(--text-strong)'
    }
  }, product.name), React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: '32px',
      color: 'var(--mc-red)',
      margin: '16px 0'
    }
  }, money(product.price), React.createElement("span", {
    style: {
      fontSize: '15px',
      color: 'var(--text-muted)',
      fontWeight: 400,
      marginLeft: '6px'
    }
  }, "/ ", product.weight)), React.createElement("div", {
    style: {
      display: 'flex',
      gap: '14px',
      alignItems: 'flex-end',
      margin: '24px 0'
    }
  }, React.createElement("div", {
    style: {
      width: '140px'
    }
  }, React.createElement(Select, {
    label: "Presentación"
  }, React.createElement("option", null, product.weight), React.createElement("option", null, "2× ", product.weight), React.createElement("option", null, "Caja mayoreo"))), React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      border: '2px solid var(--mc-charcoal)',
      borderRadius: 'var(--radius-md)',
      height: '44px'
    }
  }, React.createElement("button", {
    onClick: () => setQty(Math.max(1, qty - 1)),
    style: qtyBtn
  }, React.createElement(Icon, {
    name: "Minus",
    size: 16
  })), React.createElement("span", {
    style: {
      width: '40px',
      textAlign: 'center',
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: '18px'
    }
  }, qty), React.createElement("button", {
    onClick: () => setQty(qty + 1),
    style: qtyBtn
  }, React.createElement(Icon, {
    name: "Plus",
    size: 16
  })))), React.createElement(Button, {
    variant: "primary",
    size: "lg",
    fullWidth: true,
    onClick: () => onAdd(product, qty),
    iconLeft: React.createElement(Icon, {
      name: "ShoppingCart",
      size: 18,
      color: "#fff"
    })
  }, "Agregar ", qty, " al pedido · ", money(product.price * qty)), React.createElement("div", {
    className: "mc-trust",
    style: {
      display: 'flex',
      gap: '20px',
      margin: '20px 0 28px'
    }
  }, [['Truck', 'Envíos express a todo México'], ['ShieldCheck', 'Grado y trazabilidad'], ['Snowflake', 'Cadena de frío garantizada']].map(([ic, t]) => React.createElement("div", {
    key: t,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      fontSize: '12px',
      color: 'var(--text-muted)'
    }
  }, React.createElement(Icon, {
    name: ic,
    size: 16,
    color: "var(--mc-red)"
  }), " ", t))), React.createElement(Tabs, {
    value: tab,
    onChange: setTab,
    items: [{
      id: 'desc',
      label: 'Descripción'
    }, {
      id: 'origin',
      label: 'Origen'
    }, {
      id: 'cooking',
      label: 'Cómo Cocinar'
    }, {
      id: 'reviews',
      label: 'Reseñas'
    }]
  }), React.createElement("p", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: '15px',
      lineHeight: 1.65,
      color: 'var(--text-body)',
      marginTop: '18px'
    }
  }, tabBody[tab]))));
}
const miniBtn = {
  width: '26px',
  height: '26px',
  border: 'none',
  background: 'transparent',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'var(--mc-charcoal)'
};
function CartDrawer({
  open,
  items,
  onClose,
  onQty,
  onRemove
}) {
  const {
    Button
  } = DS;
  const subtotal = items.reduce((s, it) => s + it.price * it.qty, 0);
  const remaining = Math.max(0, 75 - subtotal);
  return React.createElement(React.Fragment, null, React.createElement("div", {
    onClick: onClose,
    style: {
      position: 'fixed',
      inset: 0,
      background: 'rgba(20,20,20,0.5)',
      opacity: open ? 1 : 0,
      pointerEvents: open ? 'auto' : 'none',
      transition: 'opacity var(--dur-med)',
      zIndex: 40
    }
  }), React.createElement("aside", {
    style: {
      position: 'fixed',
      top: 0,
      right: 0,
      height: '100%',
      width: '400px',
      maxWidth: '92vw',
      background: 'var(--surface-page)',
      boxShadow: 'var(--shadow-lg)',
      transform: open ? 'translateX(0)' : 'translateX(100%)',
      transition: 'transform var(--dur-slow) var(--ease-out)',
      zIndex: 50,
      display: 'flex',
      flexDirection: 'column'
    }
  }, React.createElement("div", {
    style: {
      background: 'var(--mc-charcoal)',
      color: 'var(--mc-paper)',
      padding: '20px 22px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  }, React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      textTransform: 'uppercase',
      letterSpacing: '0.08em',
      fontWeight: 700,
      fontSize: '20px'
    }
  }, "Tu Pedido"), React.createElement("button", {
    onClick: onClose,
    "aria-label": "Close",
    style: {
      border: 'none',
      background: 'transparent',
      color: 'var(--mc-ink-200)',
      cursor: 'pointer',
      display: 'flex'
    }
  }, React.createElement(Icon, {
    name: "X",
    size: 22,
    color: "var(--mc-ink-200)"
  }))), items.length === 0 ? React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '14px',
      color: 'var(--text-muted)'
    }
  }, React.createElement(Icon, {
    name: "ShoppingCart",
    size: 48,
    color: "var(--mc-ink-300)",
    strokeWidth: 1.4
  }), React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: '15px'
    }
  }, "Tu pedido está vacío.")) : React.createElement("div", {
    style: {
      flex: 1,
      overflowY: 'auto',
      padding: '8px 0'
    }
  }, items.map(it => React.createElement("div", {
    key: it.id,
    style: {
      display: 'flex',
      gap: '14px',
      padding: '16px 22px',
      borderBottom: '1px solid var(--border-subtle)'
    }
  }, React.createElement("div", {
    style: {
      width: '64px',
      height: '64px',
      flex: 'none',
      overflow: 'hidden',
      borderRadius: 'var(--radius-sm)',
      background: 'var(--mc-charcoal)'
    }
  }, React.createElement("img", {
    src: MC_IMG[it.id],
    alt: it.name,
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    }
  })), React.createElement("div", {
    style: {
      flex: 1
    }
  }, React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      textTransform: 'uppercase',
      fontWeight: 600,
      fontSize: '15px',
      color: 'var(--text-strong)',
      lineHeight: 1.1
    }
  }, it.name), React.createElement("div", {
    style: {
      fontSize: '12px',
      color: 'var(--text-muted)',
      margin: '2px 0 8px'
    }
  }, it.weight, " · ", money(it.price)), React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px'
    }
  }, React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      border: '1px solid var(--border-default)',
      borderRadius: 'var(--radius-sm)'
    }
  }, React.createElement("button", {
    onClick: () => onQty(it, -1),
    style: miniBtn
  }, React.createElement(Icon, {
    name: "Minus",
    size: 13
  })), React.createElement("span", {
    style: {
      width: '28px',
      textAlign: 'center',
      fontSize: '13px',
      fontWeight: 600
    }
  }, it.qty), React.createElement("button", {
    onClick: () => onQty(it, 1),
    style: miniBtn
  }, React.createElement(Icon, {
    name: "Plus",
    size: 13
  }))), React.createElement("button", {
    onClick: () => onRemove(it),
    style: {
      border: 'none',
      background: 'transparent',
      cursor: 'pointer',
      color: 'var(--text-faint)',
      display: 'flex',
      alignItems: 'center',
      gap: '4px'
    }
  }, React.createElement(Icon, {
    name: "Trash2",
    size: 14,
    color: "var(--text-faint)"
  })))), React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: '16px',
      color: 'var(--text-strong)'
    }
  }, money(it.price * it.qty))))), React.createElement("div", {
    style: {
      padding: '18px 22px',
      borderTop: '2px solid var(--mc-charcoal)',
      background: 'var(--mc-bone)'
    }
  }, items.length > 0 && remaining > 0 && React.createElement("div", {
    style: {
      fontSize: '12px',
      color: 'var(--text-muted)',
      marginBottom: '12px',
      textAlign: 'center'
    }
  }, "Agrega ", React.createElement("strong", {
    style: {
      color: 'var(--mc-red)'
    }
  }, money(remaining)), " más para envío gratis"), React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      marginBottom: '14px'
    }
  }, React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      textTransform: 'uppercase',
      letterSpacing: '0.06em',
      fontWeight: 600,
      fontSize: '14px',
      color: 'var(--text-muted)'
    }
  }, "Subtotal"), React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: '26px',
      color: 'var(--text-strong)'
    }
  }, money(subtotal))), React.createElement(Button, {
    variant: "primary",
    size: "lg",
    fullWidth: true,
    disabled: items.length === 0,
    onClick: () => {
      const lines = items.map(it => '• ' + it.qty + '× ' + it.name + ' (' + it.weight + ')').join('\n');
      const msg = 'Hola Meat Connection, quiero solicitar este pedido:\n' + lines + '\n\nSubtotal: ' + money(subtotal);
      window.open('https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(msg), '_blank');
    },
    iconLeft: React.createElement(Icon, {
      name: "MessageCircle",
      size: 18,
      color: "#fff"
    })
  }, "Solicitar por WhatsApp"))));
}
function Footer() {
  const cols = [['Catálogo', ['Wagyu Japonés A5', 'Wagyu Australiano', 'Carne Americana', 'Cajas de Mayoreo']], ['Servicios', ['Envíos Express', 'Importación Directa', 'Cadena de Frío', 'Porcionado al Vacío']], ['Contacto', ['WhatsApp', 'Instagram', 'Facebook', 'Cotizar / Catálogos']]];
  return React.createElement("footer", {
    style: {
      background: 'var(--mc-charcoal)',
      color: 'var(--mc-ink-200)'
    }
  }, React.createElement("div", {
    className: "mc-foot",
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      padding: '56px 24px 32px',
      display: 'grid',
      gridTemplateColumns: '1.4fr 1fr 1fr 1fr',
      gap: '40px'
    }
  }, React.createElement("div", null, React.createElement("img", {
    src: MC_LOGO,
    alt: "Meat Connection",
    style: {
      height: '32px',
      marginBottom: '16px'
    }
  }), React.createElement("p", {
    style: {
      fontSize: '13px',
      lineHeight: 1.6,
      color: 'var(--mc-ink-400)',
      maxWidth: '240px'
    }
  }, "Distribuidor de carne premium en México. Wagyu japonés, wagyu australiano y carne americana — importación directa con envíos express y cadena de frío garantizada.")), cols.map(([h, items]) => React.createElement("div", {
    key: h
  }, React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      textTransform: 'uppercase',
      letterSpacing: '0.1em',
      fontWeight: 600,
      fontSize: '13px',
      color: '#fff',
      marginBottom: '14px'
    }
  }, h), React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '9px'
    }
  }, items.map(i => React.createElement("a", {
    key: i,
    href: {
      WhatsApp: WA_LINK,
      Instagram: IG_LINK,
      Facebook: FB_LINK
    }[i] || '#',
    target: ({
      WhatsApp: 1,
      Instagram: 1,
      Facebook: 1
    })[i] ? '_blank' : undefined,
    style: {
      color: 'var(--mc-ink-300)',
      textDecoration: 'none',
      fontSize: '13px'
    }
  }, i)))))), React.createElement("div", {
    style: {
      borderTop: '1px solid var(--mc-ink-700)',
      padding: '18px 24px',
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      display: 'flex',
      justifyContent: 'space-between',
      fontSize: '12px',
      color: 'var(--mc-ink-500)'
    }
  }, React.createElement("span", null, "© 2026 Meat Connection · ", WA_DISPLAY), React.createElement("span", null, "Aviso de Privacidad · Términos")));
}
function ShopToolbar({
  active,
  onPick
}) {
  const {
    Tag
  } = DS;
  const cats = ['Todos', 'Wagyu Japonés', 'Wagyu Australiano'];
  return React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      flexWrap: 'wrap',
      marginBottom: '28px'
    }
  }, cats.map(c => React.createElement(Tag, {
    key: c,
    selected: active === c,
    onClick: () => onPick(c)
  }, c)));
}
function SectionHead({
  eyebrow,
  title,
  sub,
  light
}) {
  return React.createElement("div", {
    style: {
      marginBottom: '36px',
      maxWidth: '640px'
    }
  }, React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      textTransform: 'uppercase',
      letterSpacing: '0.18em',
      fontWeight: 600,
      fontSize: '13px',
      color: 'var(--mc-red-bright)'
    }
  }, eyebrow), React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-display)',
      textTransform: 'uppercase',
      fontWeight: 700,
      fontSize: '40px',
      lineHeight: 1.02,
      margin: '8px 0 0',
      color: light ? 'var(--mc-paper)' : 'var(--text-strong)'
    }
  }, title), sub && React.createElement("p", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: '16px',
      lineHeight: 1.6,
      margin: '14px 0 0',
      color: light ? 'var(--mc-ink-200)' : 'var(--text-muted)'
    }
  }, sub));
}
function Services() {
  const {
    Card
  } = DS;
  const main = [['Truck', 'Envíos Express', 'Entregas a todo México con logística en frío y los tiempos que tu operación necesita.'], ['Plane', 'Importadores Directos', 'Traemos wagyu de Japón, Australia y carne selecta de Estados Unidos directo del origen, sin intermediarios.'], ['Snowflake', 'Conservación Total', 'Cadena de frío continua garantizada, desde el origen hasta la puerta de tu cocina.']];
  const sub = [['Slice', 'Porcionado y etiquetado a la medida'], ['Package', 'Empacado al vacío profesional'], ['UtensilsCrossed', 'Presentación impecable en charolas']];
  return React.createElement("section", {
    id: "servicios",
    style: {
      background: 'var(--surface-sunken)',
      scrollMarginTop: '72px'
    }
  }, React.createElement("div", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      padding: '72px 24px'
    }
  }, React.createElement(SectionHead, {
    eyebrow: "Por qué Meat Connection",
    title: "Carne premium, lista para tu negocio",
    sub: "Importación directa, logística en frío y servicio a la medida para restaurantes, hoteles y carnicerías en todo México."
  }), React.createElement("div", {
    className: "mc-services",
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '24px'
    }
  }, main.map(([ic, t, d]) => React.createElement(Card, {
    key: t,
    variant: "default",
    style: {
      padding: '28px'
    }
  }, React.createElement("div", {
    style: {
      width: '52px',
      height: '52px',
      borderRadius: 'var(--radius-md)',
      background: 'var(--mc-red)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: '18px'
    }
  }, React.createElement(Icon, {
    name: ic,
    size: 26,
    color: "#fff"
  })), React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      textTransform: 'uppercase',
      fontWeight: 700,
      fontSize: '22px',
      color: 'var(--text-strong)'
    }
  }, t), React.createElement("p", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: '14px',
      lineHeight: 1.6,
      color: 'var(--text-muted)',
      margin: '10px 0 0'
    }
  }, d)))), React.createElement("div", {
    className: "mc-subservices",
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '20px',
      marginTop: '24px',
      padding: '24px',
      background: 'var(--mc-charcoal)',
      borderRadius: 'var(--radius-md)'
    }
  }, sub.map(([ic, t]) => React.createElement("div", {
    key: t,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px'
    }
  }, React.createElement(Icon, {
    name: ic,
    size: 22,
    color: "var(--mc-red-bright)"
  }), React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: '14px',
      color: 'var(--mc-paper)'
    }
  }, t))))));
}
function Partners() {
  const brands = ['Wagyu Japanese Beef', 'Kobe Beef', "Jack's Creek", 'Stone Axe', 'Margaret River Wagyu', 'Masami Beef'];
  return React.createElement("section", {
    id: "marcas",
    style: {
      background: 'var(--surface-page)',
      scrollMarginTop: '72px'
    }
  }, React.createElement("div", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      padding: '64px 24px'
    }
  }, React.createElement(SectionHead, {
    eyebrow: "Marcas que distribuimos",
    title: "Las mejores ganaderías del mundo",
    sub: "Trabajamos directo con productores certificados de Japón, Australia y Estados Unidos."
  }), React.createElement("div", {
    className: "mc-brands",
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '16px'
    }
  }, brands.map(b => React.createElement("div", {
    key: b,
    style: {
      border: '1px solid var(--border-default)',
      borderRadius: 'var(--radius-md)',
      background: 'var(--surface-card)',
      padding: '28px 20px',
      textAlign: 'center',
      fontFamily: 'var(--font-display)',
      textTransform: 'uppercase',
      letterSpacing: '0.04em',
      fontWeight: 600,
      fontSize: '18px',
      color: 'var(--text-strong)'
    }
  }, b)))));
}
function Clients() {
  const list = [['UtensilsCrossed', 'Restaurantes de alta cocina'], ['BedDouble', 'Hoteles de lujo'], ['Store', 'Carnicerías gourmet'], ['Flag', 'Clubes privados y campos de golf'], ['ChefHat', 'Caterers corporativos'], ['PartyPopper', 'Organizadores de eventos exclusivos']];
  return React.createElement("section", {
    id: "clientes",
    style: {
      background: 'var(--mc-charcoal)',
      color: 'var(--mc-paper)',
      scrollMarginTop: '72px'
    }
  }, React.createElement("div", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      padding: '72px 24px'
    }
  }, React.createElement(SectionHead, {
    eyebrow: "Para quién",
    title: "Aliados de los mejores del sector",
    sub: "Abastecemos a negocios que no negocian la calidad de su carne.",
    light: true
  }), React.createElement("div", {
    className: "mc-clients",
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '16px'
    }
  }, list.map(([ic, t]) => React.createElement("div", {
    key: t,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '14px',
      padding: '20px',
      border: '1px solid var(--mc-ink-700)',
      borderRadius: 'var(--radius-md)',
      background: 'var(--mc-ink-900)'
    }
  }, React.createElement(Icon, {
    name: ic,
    size: 24,
    color: "var(--mc-red-bright)"
  }), React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: '15px',
      color: 'var(--mc-paper)'
    }
  }, t))))));
}
function ContactSection({
  onQuote
}) {
  const {
    Button,
    Input
  } = DS;
  const [sent, setSent] = React.useState(false);
  function submit(e) {
    e.preventDefault();
    setSent(true);
  }
  return React.createElement("section", {
    id: "contacto",
    style: {
      background: 'var(--surface-sunken)',
      scrollMarginTop: '72px'
    }
  }, React.createElement("div", {
    className: "mc-contact",
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      padding: '72px 24px',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '48px',
      alignItems: 'start'
    }
  }, React.createElement("div", null, React.createElement(SectionHead, {
    eyebrow: "Cotiza / Catálogos",
    title: "Hablemos de tu negocio",
    sub: "Solicita catálogos, precios de mayoreo y tiempos de entrega. Te atendemos de forma personalizada."
  }), React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '14px',
      marginTop: '8px'
    }
  }, [['MessageCircle', WA_DISPLAY, 'WhatsApp', WA_LINK], ['Instagram', '@meatconnectionmx', 'Instagram', IG_LINK], ['Facebook', '@meatconnectionmx', 'Facebook', FB_LINK]].map(([ic, label, name, href]) => React.createElement("a", {
    key: name,
    href: href,
    target: "_blank",
    rel: "noopener",
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '14px',
      textDecoration: 'none',
      color: 'var(--text-strong)'
    }
  }, React.createElement("span", {
    style: {
      width: '44px',
      height: '44px',
      borderRadius: 'var(--radius-md)',
      background: 'var(--mc-charcoal)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flex: 'none'
    }
  }, React.createElement(Icon, {
    name: ic,
    size: 20,
    color: "#fff"
  })), React.createElement("span", null, React.createElement("span", {
    style: {
      display: 'block',
      fontFamily: 'var(--font-display)',
      textTransform: 'uppercase',
      letterSpacing: '0.06em',
      fontSize: '12px',
      color: 'var(--text-muted)'
    }
  }, name), React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: '15px',
      fontWeight: 600
    }
  }, label)))))), React.createElement("div", {
    style: {
      background: 'var(--surface-card)',
      border: '1px solid var(--border-default)',
      borderRadius: 'var(--radius-md)',
      padding: '28px'
    }
  }, sent ? React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      gap: '12px',
      padding: '32px 0'
    }
  }, React.createElement(Icon, {
    name: "CheckCircle2",
    size: 44,
    color: "var(--mc-success)"
  }), React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      textTransform: 'uppercase',
      fontWeight: 700,
      fontSize: '22px',
      color: 'var(--text-strong)'
    }
  }, "¡Gracias!"), React.createElement("p", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: '14px',
      color: 'var(--text-muted)',
      margin: 0
    }
  }, "Recibimos tu solicitud. Para atención inmediata, escríbenos por WhatsApp."), React.createElement(Button, {
    variant: "primary",
    onClick: onQuote,
    iconLeft: React.createElement(Icon, {
      name: "MessageCircle",
      size: 16,
      color: "#fff"
    })
  }, "Abrir WhatsApp")) : React.createElement("form", {
    onSubmit: submit,
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '16px'
    }
  }, React.createElement(Input, {
    label: "Nombre completo",
    placeholder: "Tu nombre",
    required: true
  }), React.createElement(Input, {
    label: "Nombre del negocio",
    placeholder: "Restaurante, hotel, carnicería…",
    required: true
  }), React.createElement(Input, {
    label: "WhatsApp / Teléfono",
    placeholder: WA_DISPLAY,
    required: true
  }), React.createElement(Input, {
    label: "¿Qué te interesa?",
    placeholder: "Cuéntanos qué cortes o catálogos buscas"
  }), React.createElement(Button, {
    variant: "primary",
    size: "lg",
    fullWidth: true,
    type: "submit"
  }, "Enviar solicitud")))));
}
function WhatsAppFab() {
  return React.createElement("a", {
    href: WA_LINK,
    target: "_blank",
    rel: "noopener",
    "aria-label": "Cotizar por WhatsApp",
    style: {
      position: 'fixed',
      right: '22px',
      bottom: '22px',
      width: '58px',
      height: '58px',
      borderRadius: '999px',
      background: '#25D366',
      boxShadow: 'var(--shadow-lg)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 45
    }
  }, React.createElement(Icon, {
    name: "MessageCircle",
    size: 28,
    color: "#fff"
  }));
}
function App() {
  const [view, setView] = React.useState('home');
  const [active, setActive] = React.useState(null);
  const [cat, setCat] = React.useState('Todos');
  const [cartOpen, setCartOpen] = React.useState(false);
  const [cart, setCart] = React.useState([]);
  function add(product, qty = 1) {
    setCart(c => {
      const ex = c.find(i => i.id === product.id);
      if (ex) return c.map(i => i.id === product.id ? {
        ...i,
        qty: i.qty + qty
      } : i);
      return [...c, {
        ...product,
        qty
      }];
    });
    setCartOpen(true);
  }
  function changeQty(item, d) {
    setCart(c => c.map(i => i.id === item.id ? {
      ...i,
      qty: Math.max(1, i.qty + d)
    } : i));
  }
  function remove(item) {
    setCart(c => c.filter(i => i.id !== item.id));
  }
  function open(product) {
    setActive(product);
    setView('product');
    window.scrollTo(0, 0);
  }
  function nav(v) {
    setView(v);
    window.scrollTo(0, 0);
  }
  function goAnchor(id) {
    setView('home');
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({
        behavior: 'smooth'
      });
    }, 60);
  }
  function quote() {
    window.open(WA_LINK, '_blank');
  }
  const count = cart.reduce((s, i) => s + i.qty, 0);
  const filtered = cat === 'Todos' ? PRODUCTS : PRODUCTS.filter(p => p.cat === cat);
  return React.createElement("div", {
    style: {
      background: 'var(--surface-page)',
      minHeight: '100vh'
    }
  }, React.createElement(Header, {
    cartCount: count,
    onCart: () => setCartOpen(true),
    onNav: nav,
    onAnchor: goAnchor
  }), view === 'home' && React.createElement(React.Fragment, null, React.createElement(Hero, {
    onShop: () => nav('shop'),
    onQuote: quote,
    feature: PRODUCTS[0]
  }), React.createElement(Services, null), React.createElement("section", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      padding: '64px 24px'
    }
  }, React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      marginBottom: '28px'
    }
  }, React.createElement("div", null, React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      textTransform: 'uppercase',
      letterSpacing: '0.18em',
      fontWeight: 600,
      fontSize: '13px',
      color: 'var(--mc-red)'
    }
  }, "Del mostrador"), React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-display)',
      textTransform: 'uppercase',
      fontWeight: 700,
      fontSize: '40px',
      margin: '6px 0 0',
      color: 'var(--text-strong)'
    }
  }, "Cortes Más Vendidos")), React.createElement("button", {
    onClick: () => nav('shop'),
    style: {
      border: 'none',
      background: 'transparent',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      fontFamily: 'var(--font-display)',
      textTransform: 'uppercase',
      letterSpacing: '0.06em',
      fontWeight: 600,
      fontSize: '14px',
      color: 'var(--text-strong)'
    }
  }, "Ver Todo ", React.createElement(Icon, {
    name: "ArrowRight",
    size: 16
  }))), React.createElement(ProductGrid, {
    products: PRODUCTS.slice(0, 4),
    onAdd: add,
    onOpen: open
  })), React.createElement(Partners, null), React.createElement(Clients, null), React.createElement(ContactSection, {
    onQuote: quote
  })), view === 'shop' && React.createElement("section", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      padding: '40px 24px 80px'
    }
  }, React.createElement("h1", {
    style: {
      fontFamily: 'var(--font-display)',
      textTransform: 'uppercase',
      fontWeight: 700,
      fontSize: '48px',
      margin: '0 0 8px',
      color: 'var(--text-strong)'
    }
  }, "El Catálogo"), React.createElement("p", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: '16px',
      color: 'var(--text-muted)',
      margin: '0 0 28px'
    }
  }, filtered.length, " cortes · porcionados a tu medida"), React.createElement(ShopToolbar, {
    active: cat,
    onPick: setCat
  }), React.createElement(ProductGrid, {
    products: filtered,
    onAdd: add,
    onOpen: open
  })), view === 'product' && active && React.createElement(ProductDetail, {
    product: active,
    onAdd: add,
    onBack: () => nav('shop')
  }), React.createElement(Footer, null), React.createElement(CartDrawer, {
    open: cartOpen,
    items: cart,
    onClose: () => setCartOpen(false),
    onQty: changeQty,
    onRemove: remove
  }), React.createElement(WhatsAppFab, null));
}
function mount() {
  if (window.React && window.ReactDOM && window.MeatConnectionDesignSystem_3e7a26 && window.lucide) {
    ReactDOM.createRoot(document.getElementById('root')).render(React.createElement(App, null));
  } else {
    setTimeout(mount, 25);
  }
}
mount();