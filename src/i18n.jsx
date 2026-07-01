import React from 'react'
import { PRODUCT_STRINGS } from './products.js'

/* ============================================================================
   Bilingual strings — Spanish (default) + English.
   Each language has the same shape. To edit copy, edit the matching key in
   both `es` and `en`. Product names/descriptions live under `products` keyed
   by product id. WhatsApp message templates live under `wa`.
   ========================================================================== */
export const STRINGS = {
  es: {
    nav: { catalog: 'Catálogo', services: 'Servicios', brands: 'Marcas', clients: 'Clientes', contact: 'Contacto' },
    header: {
      reorder: 'Reordenar', reorderOrder: 'Reordenar pedido', reorderAria: 'Reordenar pedido',
      reorderTitle: 'Reordena tu pedido habitual en un toque', quoteWhatsApp: 'Cotizar por WhatsApp',
      openMenu: 'Abrir menú', closeMenu: 'Cerrar menú', cartAria: 'Carrito', navAria: 'Menú de navegación',
    },
    hero: {
      tag: 'Wagyu Japón · Australia · Carne Americana',
      title1: 'El Marmoleo que', title2: 'Distingue al Wagyu',
      para: 'Distribuimos wagyu japonés A5, wagyu australiano de alto marmoleo y carne americana selecta para tu negocio en México. Importación directa y envíos express con cadena de frío garantizada.',
      ctaCatalog: 'Ver Catálogo', ctaQuote: 'Cotizar por WhatsApp',
      stats: [['A5', 'grado japonés'], ['Directo', 'importación'], ['Express', 'envíos nacionales']],
    },
    categories: { all: 'Todos', jp: 'A5 Japonés', au: 'Wagyu Australiano', us: 'Wagyu Americano', mackas: 'Black Angus' },
    products: PRODUCT_STRINGS.es,
    card: { readMore: 'Leer más' },
    notice: {
      processed: 'El producto se muestra ya procesado y empaquetado para una mejor visualización en nuestro sitio. Si lo prefiere en pieza base o desea recibirlo porcionado y empacado según sus necesidades, contamos con ese servicio adicional.',
      extraCost: 'Nota: El servicio de porcionado y empaque puede tener un costo extra.',
      wholesale: 'Solo ofrecemos ventas mayoristas.',
    },
    pdp: {
      back: 'Volver al catálogo', available: 'Disponible', presentation: 'Presentación',
      qtyLabel: 'Cantidad (kg)', saleType: 'Tipo de venta', mayoreo: 'Mayoreo', menudeo: 'Menudeo',
      addToOrder: 'Agregar {qty} kg a la cotización',
      trust: [['Truck', 'Envíos express a todo México'], ['ShieldCheck', 'Grado y trazabilidad'], ['Snowflake', 'Cadena de frío garantizada']],
      tabs: [{ id: 'desc', label: 'Descripción' }, { id: 'origin', label: 'Origen' }, { id: 'cooking', label: 'Cómo Cocinar' }],
      descSuffix: ' Cortado a mano a pedido y empacado al vacío para conservar su frescura.',
      originJP: 'Wagyu Negro Japonés de raza pura, grado A5 — el máximo grado de rendimiento y marmoleo que otorga Japón. Totalmente trazable hasta la prefectura.',
      originAU: 'Wagyu australiano, terminado con grano para un marmoleo profundo y parejo. Criado bajo estrictos estándares de marmoleo y totalmente trazable.',
      originUS: 'Carne americana selecta — Black Angus y wagyu americano, criados con altos estándares. Sabor robusto y gran versatilidad para tu cocina.',
      cooking: 'El Wagyu se cocina rápido y a fuego alto. Llévalo a temperatura ambiente, sálalo justo antes de sellar y mantén las porciones pequeñas — la grasa hace el trabajo. Deja reposar y córtalo fino en contra de la fibra.',
      reviews: '★★★★★ «Marmoleo de restaurante en casa.» — Comprador verificado',
      marbling: {
        title: 'Marmoleo', choose: 'Elige el grado de marmoleo', of: 'de',
        systems: {
          bms:   { name: 'Escala japonesa BMS', unit: 'BMS', lo: 'Menos', hi: 'Más' },
          aus:   { name: 'Marble Score (Australia)', unit: 'MB', lo: 'Menos', hi: 'Más' },
          angus: { name: 'Marble Score Angus', unit: 'MS', lo: 'Menos', hi: 'Más' },
        },
      },
    },
    cart: {
      title: 'Tu Cotización', empty: 'Tu cotización está vacía.', reorderPrev: 'Reordenar pedido anterior',
      frequentHint: '¿Cliente frecuente? Reenvía tu pedido habitual por WhatsApp en un toque.',
      freeShip: 'Agrega {amount} más para envío gratis', subtotal: 'Subtotal',
      requestWhatsApp: 'Solicitar cotización por WhatsApp', close: 'Cerrar',
    },
    services: {
      eyebrow: 'Por qué Meat Connection', title: 'Carne premium, lista para tu negocio',
      sub: 'Importación directa, logística en frío y servicio a la medida para restaurantes, hoteles y carnicerías en todo México.',
      main: [
        ['Truck', 'Envíos Express', 'Entregas a todo México con logística en frío y los tiempos que tu operación necesita.'],
        ['Plane', 'Importadores Directos', 'Traemos wagyu de Japón, Australia y carne selecta de Estados Unidos directo del origen, sin intermediarios.'],
        ['Snowflake', 'Conservación Total', 'Cadena de frío continua garantizada, desde el origen hasta la puerta de tu cocina.'],
      ],
      sub2: [['Slice', 'Porcionado y etiquetado a la medida'], ['Package', 'Empacado al vacío profesional'], ['UtensilsCrossed', 'Presentación impecable en charolas']],
    },
    partners: { eyebrow: 'Marcas que distribuimos', title: 'Las mejores ganaderías del mundo', sub: 'Trabajamos directo con productores certificados de Japón, Australia y Estados Unidos.' },
    clients: {
      eyebrow: 'Para quién', title: 'Aliados de los mejores del sector', sub: 'Abastecemos a negocios que no negocian la calidad de su carne.',
      list: [
        ['UtensilsCrossed', 'Restaurantes de alta cocina'], ['BedDouble', 'Hoteles de lujo'], ['Store', 'Carnicerías gourmet'],
        ['Flag', 'Clubes privados y campos de golf'], ['ChefHat', 'Caterers corporativos'], ['PartyPopper', 'Organizadores de eventos exclusivos'],
      ],
    },
    contact: {
      eyebrow: 'Cotiza / Catálogos', title: 'Hablemos de tu negocio',
      sub: 'Solicita catálogos, precios de mayoreo y tiempos de entrega. Te atendemos de forma personalizada.',
      formName: 'Nombre completo', phName: 'Tu nombre',
      formBusiness: 'Nombre del negocio', phBusiness: 'Restaurante, hotel, carnicería…',
      formPhone: 'WhatsApp / Teléfono',
      formInterest: '¿Qué te interesa?', phInterest: 'Cuéntanos qué cortes o catálogos buscas',
      submit: 'Enviar solicitud',
      thanksTitle: '¡Gracias!', thanksMsg: 'Recibimos tu solicitud. Para atención inmediata, escríbenos por WhatsApp.', thanksBtn: 'Abrir WhatsApp',
    },
    testimonials: {
      eyebrow: 'Lo que dicen nuestros clientes', title: 'Confianza de los mejores',
      sub: 'Restaurantes, hoteles y carnicerías premium que ya sirven nuestro wagyu.',
      items: [
        { quote: 'El marmoleo llega impecable y consistente en cada entrega. Mis comensales notan la diferencia y el ticket promedio subió.', who: 'Chef Ejecutivo', biz: 'Restaurante de alta cocina · CDMX' },
        { quote: 'La cadena de frío nunca ha fallado y los tiempos de entrega son exactos. Es el proveedor de wagyu en el que confío para el hotel.', who: 'Gerente de Alimentos y Bebidas', biz: 'Hotel de lujo · Los Cabos' },
        { quote: 'Cortes trazables y de grado real. Volver a pedir por WhatsApp me toma diez segundos.', who: 'Comprador', biz: 'Carnicería gourmet · Monterrey' },
      ],
    },
    showcase: {
      eyebrow: 'Corte destacado', title: 'King River MB4-5',
      sub: 'Wagyu australiano King River con marmoleo MB4-5 — equilibrio perfecto entre grasa y sabor a res. Jugoso, untuoso y versátil, rinde excelente en parrilla, sellado y cortes finos. Porcionado a tu medida y empacado al vacío.',
      cta: 'Ver Catálogo', alt: 'King River MB4-5, wagyu australiano de marmoleo MB4-5, empacado al vacío',
    },
    bestsellers: { eyebrow: 'Del Mostrador', title: 'Cortes Más Vendidos', seeAll: 'Ver Todo' },
    shop: { title: 'El Catálogo', count: '{n} cortes · mayoreo y menudeo' },
    footer: {
      catalogTitle: 'Catálogo', catalogItems: ['A5 Japonés', 'Wagyu Australiano', 'Wagyu Americano', 'Black Angus'],
      servicesTitle: 'Servicios', servicesItems: ['Envíos Express', 'Importación Directa', 'Cadena de Frío', 'Porcionado al Vacío'],
      contactTitle: 'Contacto', quoteCatalogs: 'Cotizar / Catálogos',
      tagline: 'Distribuidor de carne premium en México. Wagyu japonés, wagyu australiano y carne americana — importación directa con envíos express y cadena de frío garantizada.',
    },
    fab: { aria: 'Cotizar por WhatsApp', title: 'Cotizar por WhatsApp — arrastra para mover' },
    wa: {
      quote: 'Hola Meat Connection, me interesa cotizar carne premium para mi negocio.',
      reorderIntro: 'Hola Meat Connection, soy cliente y quiero volver a pedir:',
      reorderGeneric: 'Hola Meat Connection, soy cliente y quiero volver a pedir mi pedido habitual.',
      orderIntro: 'Hola Meat Connection, quiero solicitar este pedido:',
      subtotal: 'Subtotal', contactIntro: 'Hola Meat Connection, quiero cotizar.',
      name: 'Nombre', business: 'Negocio', phone: 'WhatsApp/Teléfono', interest: 'Me interesa',
    },
  },

  en: {
    nav: { catalog: 'Catalog', services: 'Services', brands: 'Brands', clients: 'Clients', contact: 'Contact' },
    header: {
      reorder: 'Reorder', reorderOrder: 'Reorder order', reorderAria: 'Reorder',
      reorderTitle: 'Reorder your usual order in one tap', quoteWhatsApp: 'Quote on WhatsApp',
      openMenu: 'Open menu', closeMenu: 'Close menu', cartAria: 'Cart', navAria: 'Navigation menu',
    },
    hero: {
      tag: 'Wagyu Japan · Australia · American Beef',
      title1: 'The Marbling that', title2: 'Sets Wagyu Apart',
      para: 'We distribute Japanese A5 wagyu, high-marbled Australian wagyu, and select American beef for your business in Mexico. Direct import and express shipping with a guaranteed cold chain.',
      ctaCatalog: 'View Catalog', ctaQuote: 'Quote on WhatsApp',
      stats: [['A5', 'Japanese grade'], ['Direct', 'import'], ['Express', 'nationwide shipping']],
    },
    categories: { all: 'All', jp: 'A5 Japanese', au: 'Australian Wagyu', us: 'American Wagyu', mackas: 'Black Angus' },
    products: PRODUCT_STRINGS.en,
    card: { readMore: 'Read more' },
    notice: {
      processed: 'The product is shown already processed and packaged for better display on our site. If you prefer a base cut or would like it portioned and packed to your needs, we offer that additional service.',
      extraCost: 'Note: The portioning and packing service may carry an extra cost.',
      wholesale: 'We only offer wholesale sales.',
    },
    pdp: {
      back: 'Back to catalog', available: 'Available', presentation: 'Format',
      qtyLabel: 'Quantity (kg)', saleType: 'Sale type', mayoreo: 'Wholesale', menudeo: 'Retail',
      addToOrder: 'Add {qty} kg to quote',
      trust: [['Truck', 'Express shipping nationwide'], ['ShieldCheck', 'Grade & traceability'], ['Snowflake', 'Guaranteed cold chain']],
      tabs: [{ id: 'desc', label: 'Description' }, { id: 'origin', label: 'Origin' }, { id: 'cooking', label: 'How to Cook' }],
      descSuffix: ' Hand-cut to order and vacuum-packed to preserve freshness.',
      originJP: 'Purebred Japanese Black wagyu, A5 grade — the highest yield and marbling grade Japan awards. Fully traceable to the prefecture.',
      originAU: 'Australian wagyu, grain-finished for deep, even marbling. Raised under strict marbling standards and fully traceable.',
      originUS: 'Select American beef — Black Angus and American wagyu, raised to high standards. Robust flavor and great versatility for your kitchen.',
      cooking: 'Wagyu cooks fast and hot. Bring it to room temperature, salt just before searing and keep portions small — the fat does the work. Let it rest and slice thin against the grain.',
      reviews: '★★★★★ "Restaurant-grade marbling at home." — Verified buyer',
      marbling: {
        title: 'Marbling', choose: 'Choose the marbling grade', of: 'of',
        systems: {
          bms:   { name: 'Japanese BMS scale', unit: 'BMS', lo: 'Less', hi: 'More' },
          aus:   { name: 'Marble Score (Australia)', unit: 'MB', lo: 'Less', hi: 'More' },
          angus: { name: 'Angus Marble Score', unit: 'MS', lo: 'Less', hi: 'More' },
        },
      },
    },
    cart: {
      title: 'Your Quote', empty: 'Your quote is empty.', reorderPrev: 'Reorder previous order',
      frequentHint: 'Regular client? Resend your usual order on WhatsApp in one tap.',
      freeShip: 'Add {amount} more for free shipping', subtotal: 'Subtotal',
      requestWhatsApp: 'Request a quote on WhatsApp', close: 'Close',
    },
    services: {
      eyebrow: 'Why Meat Connection', title: 'Premium meat, ready for your business',
      sub: 'Direct import, cold logistics and tailored service for restaurants, hotels and butcher shops across Mexico.',
      main: [
        ['Truck', 'Express Shipping', 'Deliveries across Mexico with cold logistics and the lead times your operation needs.'],
        ['Plane', 'Direct Importers', 'We bring wagyu from Japan, Australia and select beef from the United States straight from the source, no middlemen.'],
        ['Snowflake', 'Total Preservation', 'A continuous, guaranteed cold chain from origin to your kitchen door.'],
      ],
      sub2: [['Slice', 'Custom portioning and labeling'], ['Package', 'Professional vacuum packing'], ['UtensilsCrossed', 'Impeccable presentation on trays']],
    },
    partners: { eyebrow: 'Brands we distribute', title: "The world's finest ranches", sub: 'We work directly with certified producers in Japan, Australia and the United States.' },
    clients: {
      eyebrow: "Who it's for", title: 'Trusted by the best in the industry', sub: "We supply businesses that don't compromise on the quality of their meat.",
      list: [
        ['UtensilsCrossed', 'Fine-dining restaurants'], ['BedDouble', 'Luxury hotels'], ['Store', 'Gourmet butcher shops'],
        ['Flag', 'Private clubs & golf courses'], ['ChefHat', 'Corporate caterers'], ['PartyPopper', 'Exclusive event planners'],
      ],
    },
    contact: {
      eyebrow: 'Quote / Catalogs', title: "Let's talk about your business",
      sub: "Request catalogs, wholesale pricing and delivery times. We'll take care of you personally.",
      formName: 'Full name', phName: 'Your name',
      formBusiness: 'Business name', phBusiness: 'Restaurant, hotel, butcher shop…',
      formPhone: 'WhatsApp / Phone',
      formInterest: 'What are you interested in?', phInterest: "Tell us which cuts or catalogs you're looking for",
      submit: 'Send request',
      thanksTitle: 'Thank you!', thanksMsg: 'We received your request. For immediate assistance, message us on WhatsApp.', thanksBtn: 'Open WhatsApp',
    },
    testimonials: {
      eyebrow: 'What our clients say', title: 'Trusted by the best',
      sub: 'Premium restaurants, hotels and butcher shops already serving our wagyu.',
      items: [
        { quote: 'The marbling arrives flawless and consistent in every delivery. My guests notice the difference and the average check went up.', who: 'Executive Chef', biz: 'Fine-dining restaurant · Mexico City' },
        { quote: "The cold chain has never failed and delivery times are exact. It's the wagyu supplier I trust for the hotel.", who: 'Food & Beverage Manager', biz: 'Luxury hotel · Los Cabos' },
        { quote: 'Traceable, truly graded cuts. Reordering on WhatsApp takes me ten seconds.', who: 'Buyer', biz: 'Gourmet butcher shop · Monterrey' },
      ],
    },
    showcase: {
      eyebrow: 'Featured cut', title: 'King River MB4-5',
      sub: 'Australian King River wagyu with MB4-5 marbling — the perfect balance of fat and beef flavor. Juicy, buttery and versatile, it performs beautifully on the grill, seared or thinly sliced. Portioned to your spec and vacuum-packed.',
      cta: 'View Catalog', alt: 'King River MB4-5, Australian MB4-5 marbled wagyu, vacuum-packed',
    },
    bestsellers: { eyebrow: 'From the Counter', title: 'Best-Selling Cuts', seeAll: 'View All' },
    shop: { title: 'The Catalog', count: '{n} cuts · wholesale & retail' },
    footer: {
      catalogTitle: 'Catalog', catalogItems: ['A5 Japanese', 'Australian Wagyu', 'American Wagyu', 'Black Angus'],
      servicesTitle: 'Services', servicesItems: ['Express Shipping', 'Direct Import', 'Cold Chain', 'Vacuum Portioning'],
      contactTitle: 'Contact', quoteCatalogs: 'Quote / Catalogs',
      tagline: 'Premium meat distributor in Mexico. Japanese wagyu, Australian wagyu and American beef — direct import with express shipping and a guaranteed cold chain.',
    },
    fab: { aria: 'Quote on WhatsApp', title: 'Quote on WhatsApp — drag to move' },
    wa: {
      quote: "Hi Meat Connection, I'd like a quote for premium meat for my business.",
      reorderIntro: "Hi Meat Connection, I'm a client and I'd like to reorder:",
      reorderGeneric: "Hi Meat Connection, I'm a client and I'd like to reorder my usual order.",
      orderIntro: "Hi Meat Connection, I'd like to place this order:",
      subtotal: 'Subtotal', contactIntro: "Hi Meat Connection, I'd like a quote.",
      name: 'Name', business: 'Business', phone: 'WhatsApp/Phone', interest: 'Interested in',
    },
  },
}

/* Active language tracked at module scope so non-component helpers
   (e.g. WhatsApp message builders) can read the current translations. */
let activeLang = 'es'
export const getStrings = () => STRINGS[activeLang] || STRINGS.es
export const getLang = () => activeLang

/* simple {placeholder} interpolation */
export const fmt = (tpl, vars) => tpl.replace(/\{(\w+)\}/g, (_, k) => (vars && k in vars ? vars[k] : ''))

const LangContext = React.createContext(null)

export function LangProvider({ children }) {
  const [lang, setLangState] = React.useState(() => {
    try { const s = localStorage.getItem('mc_lang'); if (s === 'es' || s === 'en') return s } catch (e) {}
    return 'es'
  })
  activeLang = lang
  React.useEffect(() => {
    activeLang = lang
    try { localStorage.setItem('mc_lang', lang) } catch (e) {}
    if (typeof document !== 'undefined') document.documentElement.lang = lang
  }, [lang])
  const value = { lang, setLang: setLangState, t: STRINGS[lang] || STRINGS.es }
  return <LangContext.Provider value={value}>{children}</LangContext.Provider>
}

export function useLang() {
  return React.useContext(LangContext)
}
