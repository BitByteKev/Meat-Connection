import React from 'react'

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
      heroAlt: 'Paleta de wagyu australiano de alto marmoleo, empacada al vacío',
    },
    categories: { all: 'Todos', jp: 'Wagyu Japonés', au: 'Wagyu Australiano', us: 'Carne Americana' },
    products: {
      // Wagyu Japonés A5
      tritip:   { name: 'Tri-Tip Wagyu Japonés A5 · Marmoleo Alto', badge: 'A5 · Japón', desc: 'Wagyu japonés auténtico grado A5 — la cima del marmoleo. Mantecoso, intenso, se deshace al contacto.' },
      filete:   { name: 'Filete Wagyu Japonés A5 · Marmoleo Alto', desc: 'Filete (lomo fino) de wagyu japonés A5. El corte más tierno, con marmoleo delicado y textura mantecosa.' },
      ribeyeJp: { name: 'Rib Eye Wagyu Japonés A5 · Marmoleo Alto', desc: 'Rib eye de wagyu japonés A5 — marmoleo extremo y sabor profundo. La experiencia wagyu en su máxima expresión.' },
      picana:   { name: 'Picaña Wagyu Japonés A5 · Marmoleo Alto', desc: 'Picaña de wagyu japonés A5 con su capa de grasa característica. Jugosa y llena de sabor, ideal a la parrilla.' },
      // Wagyu Australiano
      ribeye:   { name: 'Rib Eye Wagyu Australiano · Marmoleo Medio', desc: 'Rib eye de wagyu australiano de marmoleo medio — la riqueza del wagyu sin exceso de grasa, con sabor equilibrado y auténtico.',
        details: [
          { h: 'Origen y calidad equilibrada', p: ['El Rib Eye Wagyu Australiano de marmoleo medio procede de ganados criados en pasturas cuidadas de Australia. Su veteado moderado ofrece la riqueza del Wagyu sin exceso de grasa, manteniendo un perfil de sabor equilibrado y auténtico.'] },
          { h: 'Características del corte', list: [
            'Rib Eye (ojo de costilla): corte noble con proporción ideal entre músculo y grasa.',
            'Marmoleo medio: vetas moderadas que garantizan jugosidad y potencia de sabor sin ser invasivas.',
            'Grosor parejo: facilita un cocinado uniforme y resultados consistentes.',
          ] },
          { h: 'Perfil sensorial', p: ['En cada bocado destaca un umami delicado con notas ligeras a nuez y crema. La textura es jugosa y ligeramente firme, ofreciendo una experiencia equilibrada que resalta la calidad Wagyu.'] },
          { h: 'Recomendaciones de cocción', methods: [
            { h: 'Plancha o sartén de hierro fundido', list: ['Precalienta a fuego medio-alto hasta que humee.', 'Sazona con sal al gusto justo antes de sellar.', 'Cocina 2–3 minutos por lado para término medio.'] },
            { h: 'Parrilla directa', list: ['Sella 1–2 minutos por lado a fuego fuerte.', 'Reduce a calor medio y cocina 1–2 minutos adicionales.'] },
            { h: 'Reposo', p: ['Deja reposar 3–4 minutos cubierto con papel aluminio para redistribuir jugos.'] },
          ] },
          { h: 'Valor nutricional', p: ['Este corte aporta proteínas de alta calidad, vitaminas del complejo B y minerales esenciales como hierro y zinc. Su grasa monoinsaturada ofrece un perfil más ligero sin renunciar al sabor característico del Wagyu.'] },
          { h: 'Puntos clave', list: [
            'Corte: Rib Eye Wagyu Australiano',
            'Marmoleo: Medio',
            'Textura: Jugosa y ligeramente firme',
            'Sabor: Umami suave con toques a nuez',
            'Cocción: Plancha, sartén o parrilla',
            'Reposo: 3–4 minutos para máxima jugosidad',
          ] },
        ] },
      ribeyeLow: { name: 'Rib Eye Wagyu Australiano · Marmoleo Bajo', desc: 'Rib eye de wagyu australiano de bajo marmoleo — la esencia pura del wagyu con un veteado sutil y un sabor más limpio.',
        details: [
          { h: 'Origen y calidad excepcional', p: ['El Rib Eye Wagyu Australiano de bajo marmoleo proviene de ganado criado en pasturas seleccionadas de Australia, donde se combinan prácticas de bienestar animal y alimentación balanceada. Este corte ofrece la esencia pura de la carne Wagyu con un veteado sutil que aporta sabor sin exceso de grasa.'] },
          { h: 'Características del corte', list: [
            'Rib Eye (ojo de costilla): pieza con la proporción ideal entre músculo y grasa, manteniendo su perfil robusto.',
            'Marmoleo bajo: vetas finas y moderadas que aseguran jugosidad controlada y un sabor más limpio.',
            'Grosor uniforme: facilita cocciones homogéneas y resultados consistentes en cada pieza.',
          ] },
          { h: 'Perfil sensorial', p: ['Al primer bocado, destaca un sabor a carne roja bien definido, con notas terrosas y un ligero dulzor natural. La textura se siente firme pero jugosa, ofreciendo una experiencia más ligera sin renunciar al carácter Wagyu.'] },
          { h: 'Recomendaciones de cocción', methods: [
            { h: 'Plancha o sartén de hierro fundido', list: ['Precalienta a fuego medio-alto hasta que humee ligeramente.', 'Sazona con sal al gusto justo antes de sellar.', 'Cocina 2–3 minutos por lado para término medio.'] },
            { h: 'Parrilla directa', list: ['Sella 1–2 minutos por lado a fuego fuerte.', 'Reduce a calor medio y cocina 1–2 minutos adicionales.'] },
            { h: 'Reposo', p: ['Deja reposar 3–4 minutos cubierto con papel aluminio para redistribuir jugos.'] },
          ] },
          { h: 'Valor nutricional', p: ['Con un contenido de grasa controlado, este corte proporciona proteínas de alta calidad, vitaminas del complejo B y minerales esenciales como hierro y zinc. Ideal para menús que requieren opciones más ligeras sin sacrificar sabor.'] },
          { h: 'Puntos clave', list: [
            'Corte: Rib Eye Wagyu Australiano',
            'Marmoleo: Bajo',
            'Textura: Firme y jugosa',
            'Sabor: Carne roja definida con notas terrosas',
            'Cocción: Plancha, sartén o parrilla',
            'Reposo: 3–4 minutos para máxima jugosidad',
          ] },
        ] },
      newyork:  { name: 'New York Wagyu Australiano · Marmoleo Alto', badge: 'Más Vendido', desc: 'Mordida firme, sabor profundo a res y marmoleo generoso. El clásico de steakhouse.' },
      tbone:    { name: 'T-Bone Wagyu Australiano · Marmoleo Alto', desc: 'T-Bone de wagyu australiano — lomo y filete en un solo corte, con hueso para máximo sabor.',
        details: [
          { h: 'Origen y calidad suprema', p: ['El T-Bone Wagyu Australiano procede de ganado criado en pasturas selectas de Australia, con un manejo de alimentación y bienestar animal que promueven un marmoleo excepcional. Este corte combina el lomo y el solomillo, ofreciendo dos texturas en un mismo filete.'] },
          { h: 'Características del corte', list: [
            'Corte T-Bone: filete con hueso en “T” que une dos músculos: lomo (striploin) y solomillo (tenderloin).',
            'Marmoleo alto: finas vetas de grasa intramuscular (alto BMS) que se funden al cocinar, realzando jugosidad y sabor.',
            'Formato generoso: pieza amplia y uniforme, ideal para presentaciones imponentes.',
          ] },
          { h: 'Perfil sensorial', p: ['Al primer bocado, sorprende un umami concentrado con matices a nuez y crema. La combinación de dos músculos ofrece un contraste de texturas: el lomo firme y el solomillo suave, unidos por la grasa intramuscular que aporta un acabado aterciopelado.'] },
          { h: 'Recomendaciones de cocción', methods: [
            { h: 'Parrilla a fuego alto', list: ['Sella cada lado 1–2 minutos para costra dorada.', 'Cocina en zona de calor medio 3–4 minutos por lado para término medio.'] },
            { h: 'Sartén de hierro fundido', list: ['Calienta hasta que humee, sazona con sal gruesa.', 'Cocina 3 minutos por lado y deja reposar 4 minutos antes de cortar.'] },
            { h: 'Reposo', p: ['Fundamental: cubre con aluminio 4–5 minutos para conservar jugos.'] },
          ] },
          { h: 'Valor nutricional', p: ['Este corte aporta proteínas de alta calidad, vitaminas B y minerales esenciales como hierro y zinc. Su grasa monoinsaturada (ácido oleico) favorece un perfil lipídico más saludable sin comprometer el sabor.'] },
          { h: 'Puntos clave', list: [
            'Corte: T-Bone Wagyu Australiano',
            'Marmoleo: Alto (alto BMS)',
            'Textura: Contraste entre lomo firme y solomillo suave',
            'Sabor: Umami profundo con notas a nuez y crema',
            'Cocción: Parrilla o sartén de hierro a fuego alto',
            'Reposo: 4–5 minutos para máxima jugosidad',
          ] },
        ] },
      paleta:   { name: 'Paleta Wagyu Australiano · Marmoleo Alto', desc: 'Paleta de wagyu australiano, marmoleada y versátil. Para estofar, asar o cortar en finas láminas.' },
      denver:   { name: 'Denver Wagyu Australiano · Marmoleo Alto', desc: 'Denver de wagyu australiano — corte jugoso de alto marmoleo, tierno y con gran sabor. Excelente a la parrilla.' },
      topround: { name: 'Top Round Wagyu Australiano · Marmoleo Alto', desc: 'Top Round de wagyu australiano, marmoleo poco común en este corte. Ideal en finas láminas o sukiyaki.' },
      lengua:   { name: 'Lengua Wagyu Australiano · Marmoleo Alto', desc: 'Lengua de wagyu australiano de alto marmoleo. Una especialidad tersa y jugosa, perfecta para platillos de autor.' },
      // Carne Americana
      nyangus:  { name: 'New York Black Angus', desc: 'New York Black Angus americano — sabor robusto y jugosidad clásica. El steak americano por excelencia.' },
      salchicha:{ name: 'Salchicha Wagyu Americano · 4 Pack', badge: '4 Pack', desc: 'Salchicha de wagyu americano, paquete de 4. Jugosa y sabrosa, elaborada con recortes de wagyu premium.' },
    },
    card: { readMore: 'Leer más' },
    notice: {
      processed: 'El producto se muestra ya procesado y empaquetado para una mejor visualización en nuestro sitio. Si lo prefiere en pieza base o desea recibirlo porcionado y empacado según sus necesidades, contamos con ese servicio adicional.',
      extraCost: 'Nota: El servicio de porcionado y empaque puede tener un costo extra.',
      wholesale: 'Solo ofrecemos ventas mayoristas.',
    },
    pdp: {
      back: 'Volver al catálogo', available: 'Disponible', presentation: 'Presentación',
      qtyLabel: 'Cantidad (kg) · mínimo 5',
      addToOrder: 'Agregar {qty} kg a la cotización',
      trust: [['Truck', 'Envíos express a todo México'], ['ShieldCheck', 'Grado y trazabilidad'], ['Snowflake', 'Cadena de frío garantizada']],
      tabs: [{ id: 'desc', label: 'Descripción' }, { id: 'origin', label: 'Origen' }, { id: 'cooking', label: 'Cómo Cocinar' }, { id: 'reviews', label: 'Reseñas' }],
      descSuffix: ' Cortado a mano a pedido y empacado al vacío para conservar su frescura.',
      originJP: 'Wagyu Negro Japonés de raza pura, grado A5 — el máximo grado de rendimiento y marmoleo que otorga Japón. Totalmente trazable hasta la prefectura.',
      originAU: 'Wagyu australiano, terminado con grano para un marmoleo profundo y parejo. Criado bajo estrictos estándares de marmoleo y totalmente trazable.',
      originUS: 'Carne americana selecta — Black Angus y wagyu americano, criados con altos estándares. Sabor robusto y gran versatilidad para tu cocina.',
      cooking: 'El Wagyu se cocina rápido y a fuego alto. Llévalo a temperatura ambiente, sálalo justo antes de sellar y mantén las porciones pequeñas — la grasa hace el trabajo. Deja reposar y córtalo fino en contra de la fibra.',
      reviews: '★★★★★ «Marmoleo de restaurante en casa.» — Comprador verificado',
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
    shop: { title: 'El Catálogo', count: '{n} cortes · solo ventas mayoristas' },
    footer: {
      catalogTitle: 'Catálogo', catalogItems: ['Wagyu Japonés A5', 'Wagyu Australiano', 'Carne Americana', 'Cajas de Mayoreo'],
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
      heroAlt: 'High-marbled Australian wagyu shoulder, vacuum-packed',
    },
    categories: { all: 'All', jp: 'Japanese Wagyu', au: 'Australian Wagyu', us: 'American Beef' },
    products: {
      // Japanese Wagyu A5
      tritip:   { name: 'Tri-Tip Japanese Wagyu A5 · High Marbling', badge: 'A5 · Japan', desc: 'Authentic Japanese A5-grade wagyu — the peak of marbling. Buttery, intense, melts on contact.' },
      filete:   { name: 'Filet Japanese Wagyu A5 · High Marbling', desc: 'Japanese A5 wagyu filet (tenderloin). The most tender cut — delicate marbling, buttery texture.' },
      ribeyeJp: { name: 'Rib Eye Japanese Wagyu A5 · High Marbling', desc: 'Japanese A5 wagyu rib eye — extreme marbling and deep flavor. The wagyu experience at its peak.' },
      picana:   { name: 'Picanha Japanese Wagyu A5 · High Marbling', desc: 'Japanese A5 wagyu picanha with its signature fat cap. Juicy and full-flavored, ideal on the grill.' },
      // Australian Wagyu
      ribeye:   { name: 'Australian Wagyu Rib Eye · Medium Marbling', desc: 'Australian wagyu rib eye with medium marbling — wagyu richness without excess fat, balanced and authentic flavor.',
        details: [
          { h: 'Origin & balanced quality', p: ['The medium-marbled Australian Wagyu Rib Eye comes from cattle raised on well-tended Australian pastures. Its moderate marbling offers wagyu richness without excess fat, keeping a balanced, authentic flavor profile.'] },
          { h: 'Cut characteristics', list: [
            'Rib Eye: a noble cut with an ideal muscle-to-fat ratio.',
            'Medium marbling: moderate veining that ensures juiciness and bold flavor without being overwhelming.',
            'Even thickness: allows uniform cooking and consistent results.',
          ] },
          { h: 'Sensory profile', p: ['Each bite highlights a delicate umami with light notes of nuts and cream. The texture is juicy and slightly firm, offering a balanced experience that showcases wagyu quality.'] },
          { h: 'Cooking recommendations', methods: [
            { h: 'Griddle or cast-iron skillet', list: ['Preheat over medium-high heat until smoking.', 'Season with salt to taste just before searing.', 'Cook 2–3 minutes per side for medium.'] },
            { h: 'Direct grilling', list: ['Sear 1–2 minutes per side over high heat.', 'Reduce to medium heat and cook 1–2 minutes more.'] },
            { h: 'Rest', p: ['Rest 3–4 minutes tented with foil to redistribute the juices.'] },
          ] },
          { h: 'Nutritional value', p: ['This cut provides high-quality protein, B-complex vitamins and essential minerals such as iron and zinc. Its monounsaturated fat offers a lighter profile without giving up the characteristic wagyu flavor.'] },
          { h: 'Key points', list: [
            'Cut: Australian Wagyu Rib Eye',
            'Marbling: Medium',
            'Texture: Juicy and slightly firm',
            'Flavor: Mild umami with hints of nuts',
            'Cooking: Griddle, skillet or grill',
            'Rest: 3–4 minutes for maximum juiciness',
          ] },
        ] },
      ribeyeLow: { name: 'Australian Wagyu Rib Eye · Low Marbling', desc: 'Australian wagyu rib eye with low marbling — the pure essence of wagyu with subtle veining and a cleaner flavor.',
        details: [
          { h: 'Origin & exceptional quality', p: ['The low-marbled Australian Wagyu Rib Eye comes from cattle raised on select Australian pastures, combining animal-welfare practices with balanced feeding. This cut offers the pure essence of wagyu with subtle marbling that adds flavor without excess fat.'] },
          { h: 'Cut characteristics', list: [
            'Rib Eye: a piece with the ideal muscle-to-fat ratio, keeping its robust profile.',
            'Low marbling: fine, moderate veining that ensures controlled juiciness and a cleaner flavor.',
            'Uniform thickness: enables even cooking and consistent results in every piece.',
          ] },
          { h: 'Sensory profile', p: ['At first bite, a well-defined red-meat flavor stands out, with earthy notes and a slight natural sweetness. The texture feels firm yet juicy, offering a lighter experience without giving up wagyu character.'] },
          { h: 'Cooking recommendations', methods: [
            { h: 'Griddle or cast-iron skillet', list: ['Preheat over medium-high heat until lightly smoking.', 'Season with salt to taste just before searing.', 'Cook 2–3 minutes per side for medium.'] },
            { h: 'Direct grilling', list: ['Sear 1–2 minutes per side over high heat.', 'Reduce to medium heat and cook 1–2 minutes more.'] },
            { h: 'Rest', p: ['Rest 3–4 minutes tented with foil to redistribute the juices.'] },
          ] },
          { h: 'Nutritional value', p: ['With a controlled fat content, this cut provides high-quality protein, B-complex vitamins and essential minerals such as iron and zinc. Ideal for menus that call for lighter options without sacrificing flavor.'] },
          { h: 'Key points', list: [
            'Cut: Australian Wagyu Rib Eye',
            'Marbling: Low',
            'Texture: Firm and juicy',
            'Flavor: Defined red meat with earthy notes',
            'Cooking: Griddle, skillet or grill',
            'Rest: 3–4 minutes for maximum juiciness',
          ] },
        ] },
      newyork:  { name: 'Australian Wagyu New York · High Marbling', badge: 'Best Seller', desc: 'Firm bite, deep beef flavor and generous marbling. The steakhouse classic.' },
      tbone:    { name: 'Australian Wagyu T-Bone · High Marbling', desc: 'Australian wagyu T-bone — strip and tenderloin in one cut, bone-in for maximum flavor.',
        details: [
          { h: 'Origin & supreme quality', p: ['The Australian Wagyu T-Bone comes from cattle raised on select Australian pastures, with feeding and animal-welfare practices that promote exceptional marbling. This cut combines the strip loin and the tenderloin, offering two textures in a single steak.'] },
          { h: 'Cut characteristics', list: [
            'T-Bone cut: a bone-in “T”-shaped steak joining two muscles — strip loin (striploin) and tenderloin.',
            'High marbling: fine threads of intramuscular fat (high BMS) that melt as it cooks, enhancing juiciness and flavor.',
            'Generous format: a wide, uniform piece, ideal for striking presentations.',
          ] },
          { h: 'Sensory profile', p: ['At first bite, it surprises with concentrated umami and hints of nuts and cream. The combination of two muscles offers a contrast of textures: the firm strip loin and the tender tenderloin, joined by intramuscular fat that delivers a velvety finish.'] },
          { h: 'Cooking recommendations', methods: [
            { h: 'Grill over high heat', list: ['Sear each side 1–2 minutes for a golden crust.', 'Cook over medium heat 3–4 minutes per side for medium.'] },
            { h: 'Cast-iron skillet', list: ['Heat until smoking, season with coarse salt.', 'Cook 3 minutes per side and rest 4 minutes before slicing.'] },
            { h: 'Rest', p: ['Essential: tent with foil 4–5 minutes to retain the juices.'] },
          ] },
          { h: 'Nutritional value', p: ['This cut provides high-quality protein, B vitamins and essential minerals such as iron and zinc. Its monounsaturated fat (oleic acid) supports a healthier lipid profile without compromising flavor.'] },
          { h: 'Key points', list: [
            'Cut: Australian Wagyu T-Bone',
            'Marbling: High (high BMS)',
            'Texture: Contrast between firm strip loin and tender tenderloin',
            'Flavor: Deep umami with notes of nuts and cream',
            'Cooking: Grill or cast-iron skillet over high heat',
            'Rest: 4–5 minutes for maximum juiciness',
          ] },
        ] },
      paleta:   { name: 'Australian Wagyu Shoulder · High Marbling', desc: 'Australian wagyu shoulder, marbled and versatile. For braising, roasting or thin slicing.' },
      denver:   { name: 'Australian Wagyu Denver · High Marbling', desc: 'Australian wagyu Denver — a juicy, high-marbling cut, tender and full-flavored. Excellent on the grill.' },
      topround: { name: 'Australian Wagyu Top Round · High Marbling', desc: 'Australian wagyu Top Round — rare marbling for this cut. Ideal thinly sliced or in sukiyaki.' },
      lengua:   { name: 'Australian Wagyu Tongue · High Marbling', desc: 'High-marbling Australian wagyu tongue. A tender, juicy specialty, perfect for signature dishes.' },
      // American Beef
      nyangus:  { name: 'New York Black Angus', desc: 'American Black Angus New York — robust flavor and classic juiciness. The quintessential American steak.' },
      salchicha:{ name: 'American Wagyu Sausage · 4-Pack', badge: '4-Pack', desc: 'American wagyu sausage, 4-pack. Juicy and flavorful, made from premium wagyu trim.' },
    },
    card: { readMore: 'Read more' },
    notice: {
      processed: 'The product is shown already processed and packaged for better display on our site. If you prefer a base cut or would like it portioned and packed to your needs, we offer that additional service.',
      extraCost: 'Note: The portioning and packing service may carry an extra cost.',
      wholesale: 'We only offer wholesale sales.',
    },
    pdp: {
      back: 'Back to catalog', available: 'Available', presentation: 'Format',
      qtyLabel: 'Quantity (kg) · 5 min',
      addToOrder: 'Add {qty} kg to quote',
      trust: [['Truck', 'Express shipping nationwide'], ['ShieldCheck', 'Grade & traceability'], ['Snowflake', 'Guaranteed cold chain']],
      tabs: [{ id: 'desc', label: 'Description' }, { id: 'origin', label: 'Origin' }, { id: 'cooking', label: 'How to Cook' }, { id: 'reviews', label: 'Reviews' }],
      descSuffix: ' Hand-cut to order and vacuum-packed to preserve freshness.',
      originJP: 'Purebred Japanese Black wagyu, A5 grade — the highest yield and marbling grade Japan awards. Fully traceable to the prefecture.',
      originAU: 'Australian wagyu, grain-finished for deep, even marbling. Raised under strict marbling standards and fully traceable.',
      originUS: 'Select American beef — Black Angus and American wagyu, raised to high standards. Robust flavor and great versatility for your kitchen.',
      cooking: 'Wagyu cooks fast and hot. Bring it to room temperature, salt just before searing and keep portions small — the fat does the work. Let it rest and slice thin against the grain.',
      reviews: '★★★★★ "Restaurant-grade marbling at home." — Verified buyer',
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
    shop: { title: 'The Catalog', count: '{n} cuts · wholesale only' },
    footer: {
      catalogTitle: 'Catalog', catalogItems: ['Japanese Wagyu A5', 'Australian Wagyu', 'American Beef', 'Wholesale Boxes'],
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
