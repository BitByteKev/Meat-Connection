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
      tritip:   { name: 'Tri-Tip Wagyu Japonés A5 · Marmoleo Alto', badge: 'A5 · Japón', desc: 'Wagyu japonés auténtico grado A5 — la cima del marmoleo. Mantecoso, intenso, se deshace al contacto.',
        details: [
          { h: 'Origen y distinción A5', p: ['El Tri-Tip Wagyu Japonés A5 proviene de reses criadas en granjas certificadas de Japón, donde técnicas ancestrales de alimentación y manejo animal dan lugar a un marmoleo BMS 8–12 excepcional. Su grado A5 garantiza la máxima expresión de sabor y ternura.'] },
          { h: 'Características del corte', list: [
            'Tri-Tip (punta de cuadril): corte triangular con fibras consistentes y forma perfecta para lonchear.',
            'Marmoleo alto: finas vetas de grasa intramuscular que se funden al cocinar, intensificando jugosidad y perfil umami.',
            'Grosor parejo: facilita cocciones uniformes y resultados reproducibles en cada pieza.',
          ] },
          { h: 'Perfil sensorial', p: ['Cada rebanada ofrece un umami concentrado con matices a nuez tostada y crema fresca. La textura es suave y aterciopelada, con una jugosidad que se libera gradualmente al morder.'] },
          { h: 'Recomendaciones de cocción', methods: [
            { h: 'Sellado en sartén de hierro fundido', list: ['Calienta a fuego medio-alto hasta que humee ligeramente.', 'Sazona con sal gruesa justo antes de sellar.', 'Sella 1–2 minutos por lado para crear costra.'] },
            { h: 'Cocción al horno', list: ['Tras sellar, lleva al horno precalentado a 140 °C y cocina 8–10 minutos según grosor.', 'Busca término medio (55 °C) para conservar jugosidad.'] },
            { h: 'Reposo', p: ['Deja reposar 4–5 minutos cubierto con papel aluminio para redistribuir jugos.'] },
          ] },
          { h: 'Valor nutricional', p: ['Este corte aporta proteínas de alta calidad, vitaminas B y minerales como hierro y zinc. Su grasa rica en ácido oleico (monoinsaturados) contribuye a un perfil lipídico más saludable sin sacrificar sabor.'] },
          { h: 'Puntos clave', list: [
            'Corte: Tri-Tip Wagyu Japonés A5',
            'Marmoleo: Alto (BMS 8–12)',
            'Textura: Suave y jugosa',
            'Sabor: Umami intenso con matices a nuez',
            'Cocción: Sellado y horno a baja temperatura',
            'Reposo: 4–5 minutos para máxima jugosidad',
          ] },
        ] },
      filete:   { name: 'Filete Wagyu Japonés A5 · Marmoleo Alto', desc: 'Filete (lomo fino) de wagyu japonés A5. El corte más tierno, con marmoleo delicado y textura mantecosa.' },
      ribeyeJp: { name: 'Rib Eye Wagyu Japonés A5 · Marmoleo Alto', desc: 'Rib eye de wagyu japonés A5 — marmoleo extremo y sabor profundo. La experiencia wagyu en su máxima expresión.',
        details: [
          { h: 'Origen y excelencia A5', p: ['El Rib Eye Wagyu Japonés A5 proviene de reses criadas en granjas certificadas de Japón, donde se combinan prácticas tradicionales y tecnología de punta para lograr un marmoleo BMS 8–12 excepcional. Este grado A5 representa la máxima calidad en textura y sabor.'] },
          { h: 'Características del corte', list: [
            'Rib Eye (ojo de costilla): corte noble con equilibrio perfecto entre músculo y grasa.',
            'Marmoleo alto: vetas de grasa intramuscular que se funden al cocinar, realzando el perfil umami.',
            'Fibra fina y uniforme: garantiza cocción pareja y reproducción exacta de resultados.',
          ] },
          { h: 'Perfil sensorial', p: ['Cada bocado despliega un umami profundo con toques a nuez y crema fresca. La grasa intramuscular se derrite de forma homogénea, dejando la carne suave y jugosa, con una sensación aterciopelada en el paladar.'] },
          { h: 'Recomendaciones de cocción', methods: [
            { h: 'Sartén de hierro fundido', list: ['Precalienta a fuego medio-alto hasta que humee ligeramente.', 'Sazona con sal gruesa justo antes de sellar.', 'Cocina 1–2 minutos por lado para término medio-rojo.'] },
            { h: 'Parrilla directa', list: ['Sella 30–45 segundos por lado a fuego muy fuerte.', 'Mueve a calor medio y cocina 1–2 minutos adicionales por lado.'] },
            { h: 'Reposo', p: ['Deja reposar 3–4 minutos cubierto con papel aluminio para redistribuir jugos.'] },
          ] },
          { h: 'Valor nutricional', p: ['Este corte aporta proteínas de alta calidad, vitaminas del complejo B y minerales como hierro y zinc. Su grasa, rica en ácidos grasos monoinsaturados (ácido oleico), contribuye a un perfil lipídico más saludable sin comprometer el sabor.'] },
          { h: 'Puntos clave', list: [
            'Corte: Rib Eye Wagyu Japonés A5',
            'Marmoleo: Alto (BMS 8–12)',
            'Textura: Aterciopelada y jugosa',
            'Sabor: Umami intenso con matices a nuez y crema',
            'Cocción: Sartén, plancha o parrilla de alta temperatura',
            'Reposo: 3–4 minutos bajo papel aluminio',
          ] },
        ] },
      picana:   { name: 'Picaña Wagyu Japonés A5 · Marmoleo Alto', desc: 'Picaña de wagyu japonés A5 con su capa de grasa característica. Jugosa y llena de sabor, ideal a la parrilla.',
        details: [
          { h: 'Origen y excelencia del A5', p: ['La Picanha Wagyu Japonés A5 proviene de reses criadas en granjas certificadas de Japón, donde métodos tradicionales de alimentación y cuidados estrictos garantizan un marmoleo BMS 8–12. Este nivel superior de grasa intramuscular es sinónimo de calidad y consistencia excepcionales.'] },
          { h: 'Características del corte', list: [
            'Picanha (tapa de cuadril): corte icónico por su forma triangular y capa de grasa uniforme que protege la carne durante la cocción.',
            'Marmoleo alto: finas vetas de grasa distribuidas homogéneamente que se funden durante el calor, aportando jugosidad y realce de sabor.',
            'Fibra fina y pareja: permite porcionados consistentes y tiempos de cocción precisos.',
          ] },
          { h: 'Perfil sensorial', p: ['Cada rebanada ofrece una explosión de umami con toques a nuez y un ligero dulzor. La grasa que se incorpora al tejido muscular al cocinarse brinda una textura casi aterciopelada que se deshace en el paladar.'] },
          { h: 'Recomendaciones de cocción', methods: [
            { h: 'Parrilla directa', list: ['Sellar a fuego alto 1–2 minutos por lado para formar costra dorada.', 'Pasar a zona de calor medio y cocinar 2–3 minutos adicionales por lado para término medio.'] },
            { h: 'Sartén de hierro fundido', list: ['Precalentar hasta que humee ligeramente, colocar la picanha con la grasa hacia abajo primero.', 'Sellar 2 minutos por lado y dejar reposar 4 minutos antes de cortar.'] },
            { h: 'Reposo obligado', p: ['Cubrir con papel aluminio suave y esperar 4–5 minutos. Esta pausa redistribuye los jugos y conserva toda la ternura.'] },
          ] },
          { h: 'Valor nutricional', p: ['La grasa del Wagyu A5 es rica en ácido oleico (monoinsaturados), favoreciendo un perfil lipídico más saludable. Además, aporta proteínas de alta calidad, vitaminas B y minerales como hierro y zinc, ideales para una propuesta de alto valor nutricional.'] },
          { h: 'Puntos clave', list: [
            'Corte: Picanha Wagyu Japonés A5 (tapa de cuadril)',
            'Marmoleo: BMS 8–12 (alto)',
            'Textura: Jugosa y aterciopelada',
            'Sabor: Umami profundo con matices a nuez y crema',
            'Cocción: Parrilla, plancha o sartén de hierro fundido',
            'Reposo: 4–5 minutos para máxima retención de jugos',
          ] },
        ] },
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
      newyork:  { name: 'New York Wagyu Australiano · Marmoleo Alto', badge: 'Más Vendido', desc: 'Mordida firme, sabor profundo a res y marmoleo generoso. El clásico de steakhouse.',
        details: [
          { h: 'Origen y calidad excepcional', p: ['El New York Wagyu Australiano proviene de ganado criado en praderas selectas de Australia, con un manejo de alimentación y bienestar animal que favorece un desarrollo óptimo de la grasa intramuscular. Su marmoleo alto le otorga una jugosidad y sabor únicos en cada bocado.'] },
          { h: 'Características del corte', list: [
            'Corte New York (entrecot): pieza noble de la parte alta del lomo, con superficie amplia que permite un sellado perfecto.',
            'Marmoleo BMS 8–12: finas vetas de grasa que se funden al cocinar, impregnando la carne de una riqueza umami sin igual.',
            'Grosor uniforme: facilita tiempos de cocción constantes y resultados reproducibles.',
          ] },
          { h: 'Perfil sensorial', p: ['Al primer bocado, despierta notas a umami intenso, con matices a nuez tostada y crema fresca. La textura se percibe casi aterciopelada, mientras la grasa intramuscular se funde lentamente, intensificando la experiencia gourmet.'] },
          { h: 'Recomendaciones de cocción', methods: [
            { h: 'Parrilla o plancha caliente', list: ['Sella 1–2 minutos por lado a fuego alto para lograr corteza dorada.', 'Baja a fuego medio y cocina 2–3 minutos más para un término medio.'] },
            { h: 'Sartén de hierro fundido', list: ['Calienta hasta que humee ligeramente, sazona con sal gruesa al poner la pieza.', 'Cocina 2 minutos por lado y deja reposar 3 minutos cubierto con aluminio.'] },
            { h: 'Reposo', p: ['Fundamental para redistribuir jugos: 3–5 minutos antes de cortar.'] },
          ] },
          { h: 'Valor nutricional', p: ['Aunque posee un marmoleo generoso, buena parte de su grasa es monoinsaturada (ácido oleico), que aporta un perfil lipídico más saludable. Además, ofrece proteínas de alta biodisponibilidad, vitaminas B y minerales como hierro y zinc.'] },
          { h: 'Puntos clave', list: [
            'Corte: New York Wagyu Australiano',
            'Marmoleo: Alto (BMS 8–12)',
            'Textura: Sedosa y jugosa',
            'Sabor: Umami profundo con notas a nuez y crema',
            'Cocción: Parrilla, plancha o sartén de hierro',
            'Reposo: 3–5 min para máxima jugosidad',
          ] },
        ] },
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
      paleta:   { name: 'Paleta Wagyu Australiano · Marmoleo Alto', desc: 'Paleta de wagyu australiano, marmoleada y versátil. Para estofar, asar o cortar en finas láminas.',
        details: [
          { h: 'Origen y calidad premium', p: ['La Paleta Wagyu Australiano se obtiene de ejemplares criados en pasturas controladas de Australia, donde la alimentación balanceada y el bienestar animal propician un desarrollo óptimo de grasa intramuscular. Su marmoleo alto garantiza una jugosidad y textura excepcionales.'] },
          { h: 'Características del corte', list: [
            'Paleta (espaldilla): pieza de fibra fina y uniforme, con un marmoleo intenso que aporta terneza y capacidad de retención de jugos.',
            'Marmoleo BMS 8–12: vetas de grasa distribuidas homogéneamente que se funden al cocinar, impregnando la carne de ricos matices umami.',
            'Grosor adaptable: permite cocciones lentas o sellados rápidos, según el estilo de preparación.',
          ] },
          { h: 'Perfil sensorial', p: ['Cada porción despliega un umami concentrado acompañado de notas a nuez y crema fresca. La textura se percibe suave y aterciopelada, con un deshielo de grasa que enriquece cada bocado.'] },
          { h: 'Recomendaciones de cocción', methods: [
            { h: 'Braseado lento', list: ['Cocinar a fuego bajo en caldo ligero o vino tinto durante 2–3 horas, hasta obtener ternura óptima.', 'Finalizar con un sellado rápido en sartén caliente para crear ligera costra.'] },
            { h: 'Selladura y horno', list: ['Sellar la pieza 1–2 minutos por lado en sartén bien caliente.', 'Terminar en horno a 160 °C durante 45–60 minutos, según el grosor.'] },
            { h: 'Reposo', p: ['Dejar reposar 5–7 minutos tapado con aluminio para redistribuir jugos y mantener la jugosidad.'] },
          ] },
          { h: 'Valor nutricional', p: ['La grasa del Wagyu es rica en ácidos grasos monoinsaturados (ácido oleico), que favorecen un perfil lipídico equilibrado. Este corte aporta proteínas de alta calidad, vitaminas del complejo B y minerales como hierro y zinc.'] },
          { h: 'Puntos clave', list: [
            'Corte: Paleta Wagyu Australiano (espaldilla)',
            'Marmoleo: Alto (BMS 8–12)',
            'Textura: Suave, jugosa y aterciopelada',
            'Sabor: Umami intenso con matices a nuez y crema',
            'Cocción: Braseado lento, sellado y horno',
            'Reposo: 5–7 min bajo aluminio para máxima jugosidad',
          ] },
        ] },
      denver:   { name: 'Denver Wagyu Australiano · Marmoleo Alto', desc: 'Denver de wagyu australiano — corte jugoso de alto marmoleo, tierno y con gran sabor. Excelente a la parrilla.',
        details: [
          { h: 'Origen y calidad excepcional', p: ['El Denver Wagyu Australiano proviene de ganado criado en praderas seleccionadas de Australia, donde se cuida cada detalle de la alimentación y el bienestar animal. Gracias a técnicas de crianza ancestrales combinadas con tecnología moderna, obtenemos un corte de alto marmoleo que se traduce en jugosidad y sabor inigualable.'] },
          { h: '¿Qué hace único al corte Denver?', list: [
            'Ubicado en la parte baja del costillar, el Denver es un corte tierno y versátil.',
            'Su alta infiltración de grasa intramuscular garantiza una textura suave, casi cremosa, que se derrite en el paladar.',
            'Ideal para quienes buscan un equilibrio perfecto entre sabor intenso y jugosidad máxima.',
          ] },
          { h: 'Sabor y experiencia gastronómica', p: ['Este corte de Wagyu Australiano despliega notas umami profundas y un retrogusto ligeramente dulce. Al cocinarlo a la parrilla o en plancha, la grasa se funde lentamente, impregnando la carne de aromas a nuez tostada y mantequilla. Cada bocado es un deleite para los amantes de la carne premium.'] },
          { h: 'Recomendaciones de cocción', methods: [
            { h: 'Parrilla a fuego medio-alto', list: ['Sella cada lado 1–2 minutos para lograr un dorado perfecto.', 'Reduce a fuego medio y cocina 3–4 minutos más según término deseado (recomendado a término medio o medio-rojo).'] },
            { h: 'Plancha o sartén de hierro fundido', list: ['Calienta sin aceite hasta que humee ligeramente.', 'Coloca el corte, sazona con sal gruesa al inicio y pimienta al final para resaltar su sabor natural.', 'Cocina 3 minutos por lado para término medio.'] },
            { h: 'Reposo final', p: ['Deja reposar la pieza 5 minutos antes de cortar. Esto maximiza la retención de jugos y garantiza una textura consistente.'] },
          ] },
          { h: 'Beneficios nutricionales', p: ['Aunque el marmoleo aporta grasa, gran parte es insaturada (ácidos oleicos) que contribuyen a un perfil lipídico más saludable en comparación con cortes convencionales. Además, el Wagyu se caracteriza por sus niveles equilibrados de vitaminas B y minerales esenciales como zinc y hierro, ideales para una dieta balanceada sin sacrificar sabor.'] },
          { h: '¿Por qué comprar en Meat Connection?', list: [
            'Frescura garantizada: entregamos cortes refrigerados desde nuestro centro de distribución, manteniendo la cadena de frío.',
            'Envío a domicilio en México: recibe tu pedido en menos de 48 horas.',
            'Atención personalizada: nuestro equipo de carniceros expertos te orienta sobre la mejor forma de conservación y preparación.',
            'Satisfacción asegurada: si no quedas satisfecho, te asesoramos para tu próxima compra o reembolsamos sin complicaciones.',
          ] },
          { h: 'Puntos clave', list: [
            'Corte: Denver (parte baja del costillar) con alto marmoleo.',
            'Origen: Wagyu Australiano certificado.',
            'Textura: Suave, jugosa y de sabor umami profundo.',
            'Peso sugerido: 200–300 g por porción individual.',
            'Término recomendado: Medio o medio-rojo para apreciar el marmoleo sin sobrecocinar.',
            'Preparación: Ideal a la parrilla, plancha o sartén de hierro fundido.',
            'Envío: Refrigerado a domicilio en México.',
            'Beneficios: Alto contenido de ácidos grasos monoinsaturados y vitaminas B.',
          ] },
        ] },
      topround: { name: 'Top Round Wagyu Japonés A5 · Marmoleo Alto', desc: 'Top Round de wagyu japonés A5, marmoleo poco común en este corte. Ideal en finas láminas o sukiyaki.',
        details: [
          { h: 'Origen y excelencia A5', p: ['El Top Round Wagyu Japonés A5 proviene de reses criadas en granjas certificadas de Japón, donde se combinan técnicas ancestrales y estándares modernos de alimentación para lograr un marmoleo alto. Este grado A5 asegura un perfil de sabor y textura inigualable.'] },
          { h: 'Características del corte', list: [
            'Top Round (nalga): pieza magra con fibras largas y consistentes.',
            'Marmoleo alto: vetas finas de grasa intramuscular que se funden durante la cocción, aportando jugosidad y riqueza de sabor.',
            'Grosor parejo: facilita cocciones uniformes y resultados reproducibles.',
          ] },
          { h: 'Perfil sensorial', p: ['En cada rebanada emerge un umami concentrado con matices a nuez y un ligero dulzor natural. La textura se percibe suave y delicada al paladar, equilibrando la firmeza de la nalga con la jugosidad del marmoleo.'] },
          { h: 'Recomendaciones de cocción', methods: [
            { h: 'Sellado en sartén de hierro fundido', list: ['Precalienta a fuego medio-alto hasta que humee ligeramente.', 'Sazona con sal gruesa antes de colocar la pieza.', 'Sella 1–2 minutos por lado para marcar la superficie.'] },
            { h: 'Cocción al horno a baja temperatura', list: ['Tras sellar, lleva al horno a 130 °C durante 10–12 minutos según grosor.', 'Alcanza término medio (55 °C) para mantener jugosidad.'] },
            { h: 'Reposo', p: ['Deja reposar 4–5 minutos cubierto con papel aluminio para redistribuir jugos.'] },
          ] },
          { h: 'Valor nutricional', p: ['Este corte aporta proteínas de alta calidad, vitaminas del complejo B y minerales como hierro y zinc. Su grasa, mayormente monoinsaturada, contribuye a un perfil más saludable sin sacrificar sabor.'] },
          { h: 'Puntos clave', list: [
            'Corte: Top Round Wagyu Japonés A5',
            'Marmoleo: Alto',
            'Textura: Suave y jugosa',
            'Sabor: Umami profundo con toques a nuez',
            'Cocción: Sellado y horno a baja temperatura',
            'Reposo: 4–5 minutos para máxima jugosidad',
          ] },
        ] },
      lengua:   { name: 'Lengua Wagyu Australiano · Marmoleo Alto', desc: 'Lengua de wagyu australiano de alto marmoleo. Una especialidad tersa y jugosa, perfecta para platillos de autor.',
        details: [
          { h: 'Origen y distinción', p: ['La Lengua Wagyu Australiano proviene de ganado criado en pasturas controladas de Australia, donde cada ejemplar recibe una alimentación balanceada que propicia un marmoleo excepcional. Con grado de marmoleo alto, este corte destaca por su riqueza de vetas intramusculares que aportan jugosidad y sabor concentrado.'] },
          { h: 'Características del corte', list: [
            'Textura refinada: fibra suave y tersa que se deshace al paladar.',
            'Marmoleo generoso: grasa intramuscular que se funde en boca, realzando la experiencia umami.',
            'Tamaño uniforme: pieza de grosor parejo, ideal para cocciones consistentes.',
          ] },
          { h: 'Perfil sensorial', p: ['Notas profundas a umami con matices ligeramente dulces y toques a nuez. La grasa se funde de manera equilibrada, impregnando cada rebanada de una jugosidad aterciopelada.'] },
          { h: 'Recomendaciones de cocción', methods: [
            { h: 'Baño de agua y sello rápido', list: ['Blanquear a 80 °C durante 10–15 min para ablandar.', 'Sellar en plancha o sartén caliente 1 min por lado para marcar la superficie.'] },
            { h: 'Braseado lento', list: ['Cocinar a fuego bajo en caldo ligero durante 2–3 h hasta obtener ternura óptima.', 'Terminación rápida en sartén caliente para generar ligera costra.'] },
            { h: 'Reposo breve', p: ['Dejar reposar 5 min antes de cortar para retener jugos.'] },
          ] },
          { h: 'Valor nutricional', p: ['Aporta proteínas de alta calidad, vitaminas del complejo B y minerales como hierro y zinc. El marmoleo contribuye con ácidos grasos monoinsaturados (ácido oleico), favoreciendo un perfil lipídico más saludable.'] },
          { h: 'Puntos clave', list: [
            'Corte: Lengua completa de Wagyu Australiano',
            'Marmoleo: Alto nivel de grasa intramuscular',
            'Textura: Ultra-fina y suave',
            'Sabor: Umami intenso con toques a nuez y crema',
            'Cocción: Blanqueo y sellado, o braseado lento',
            'Reposo: 5 min bajo papel aluminio',
          ] },
        ] },
      // Carne Americana
      nyangus:  { name: 'New York Black Angus', desc: 'New York Black Angus americano — sabor robusto y jugosidad clásica. El steak americano por excelencia.' },
      salchicha:{ name: 'Salchicha Wagyu Americano · 4 Pack', badge: '4 Pack', desc: 'Salchicha de wagyu americano, paquete de 4. Jugosa y sabrosa, elaborada con recortes de wagyu premium.',
        details: [
          { h: 'Origen y calidad superior', p: ['La Salchicha Wagyu Americano se elabora con carne de res Wagyu criada en EE. UU. bajo altos estándares de bienestar animal y alimentación controlada. Cada paquete de 4 piezas combina cortes selectos para ofrecer un producto procesado de nivel gourmet.'] },
          { h: 'Características del producto', list: [
            'Paquete de 4 piezas: formato práctico para tu cocina o servicio.',
            'Carne Wagyu: alto contenido de grasa intramuscular que aporta jugosidad y riqueza de sabor.',
            'Condimentos artesanales: mezcla equilibrada de especias que realza el perfil umami sin opacar la carne.',
          ] },
          { h: 'Perfil sensorial', p: ['Cada bocado revela un umami suave con matices a carne asada y ligeros toques herbales. La emulsión de grasa Wagyu ofrece textura jugosa y un retrogusto delicado que distingue a estas salchichas de las convencionales.'] },
          { h: 'Recomendaciones de cocción', methods: [
            { h: 'Parrilla o sartén antiadherente', list: ['Calienta a fuego medio para evitar quemar la piel.', 'Cocina 4–5 minutos por lado, girando con frecuencia para un dorado parejo.'] },
            { h: 'Horno', list: ['Precalienta a 180 °C.', 'Hornea 12–15 minutos sobre rejilla, volteando a la mitad del tiempo.'] },
            { h: 'Evitar pinchazos', p: ['No perforar la piel para conservar los jugos en su interior.'] },
          ] },
          { h: 'Valor nutricional', p: ['Ricas en proteínas de alta calidad y con grasa Wagyu rica en ácido oleico (monoinsaturados), estas salchichas aportan además vitaminas B y minerales como hierro y zinc, ideales para opciones de menú con valor añadido.'] },
          { h: 'Puntos clave', list: [
            'Formato: Pack de 4 salchichas',
            'Tipo de carne: Wagyu Americano',
            'Textura: Jugosa y aterciopelada',
            'Sabor: Umami suave con especias artesanales',
            'Cocción: Parrilla, sartén u horno',
            'Uso: Menús gourmet, eventos y servicios premium',
          ] },
        ] },
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
      tabs: [{ id: 'desc', label: 'Descripción' }, { id: 'origin', label: 'Origen' }, { id: 'cooking', label: 'Cómo Cocinar' }],
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
      tritip:   { name: 'Tri-Tip Japanese Wagyu A5 · High Marbling', badge: 'A5 · Japan', desc: 'Authentic Japanese A5-grade wagyu — the peak of marbling. Buttery, intense, melts on contact.',
        details: [
          { h: 'Origin & A5 distinction', p: ['The Tri-Tip Japanese Wagyu A5 comes from cattle raised on certified Japanese farms, where traditional feeding and animal-handling techniques produce exceptional BMS 8–12 marbling. Its A5 grade guarantees the fullest expression of flavor and tenderness.'] },
          { h: 'Cut characteristics', list: [
            'Tri-Tip (sirloin cap): a triangular cut with consistent grain and the perfect shape for slicing.',
            'High marbling: fine intramuscular fat threads that melt as it cooks, intensifying juiciness and the umami profile.',
            'Even thickness: enables uniform cooking and reproducible results in every piece.',
          ] },
          { h: 'Sensory profile', p: ['Each slice offers concentrated umami with hints of toasted nuts and fresh cream. The texture is soft and velvety, with juiciness that releases gradually as you bite.'] },
          { h: 'Cooking recommendations', methods: [
            { h: 'Sear in a cast-iron skillet', list: ['Heat over medium-high until lightly smoking.', 'Season with coarse salt just before searing.', 'Sear 1–2 minutes per side to build a crust.'] },
            { h: 'Finish in the oven', list: ['After searing, transfer to an oven preheated to 140 °C and cook 8–10 minutes depending on thickness.', 'Aim for medium (55 °C) to keep it juicy.'] },
            { h: 'Rest', p: ['Rest 4–5 minutes tented with foil to redistribute the juices.'] },
          ] },
          { h: 'Nutritional value', p: ['This cut provides high-quality protein, B vitamins and minerals such as iron and zinc. Its oleic-acid-rich (monounsaturated) fat contributes to a healthier lipid profile without sacrificing flavor.'] },
          { h: 'Key points', list: [
            'Cut: Tri-Tip Japanese Wagyu A5',
            'Marbling: High (BMS 8–12)',
            'Texture: Soft and juicy',
            'Flavor: Intense umami with hints of nuts',
            'Cooking: Sear and low-temperature oven',
            'Rest: 4–5 minutes for maximum juiciness',
          ] },
        ] },
      filete:   { name: 'Filet Japanese Wagyu A5 · High Marbling', desc: 'Japanese A5 wagyu filet (tenderloin). The most tender cut — delicate marbling, buttery texture.' },
      ribeyeJp: { name: 'Rib Eye Japanese Wagyu A5 · High Marbling', desc: 'Japanese A5 wagyu rib eye — extreme marbling and deep flavor. The wagyu experience at its peak.',
        details: [
          { h: 'Origin & A5 excellence', p: ['The Rib Eye Japanese Wagyu A5 comes from cattle raised on certified Japanese farms, combining traditional practices with cutting-edge technology to achieve exceptional BMS 8–12 marbling. This A5 grade represents the highest quality in texture and flavor.'] },
          { h: 'Cut characteristics', list: [
            'Rib Eye: a noble cut with a perfect balance of muscle and fat.',
            'High marbling: intramuscular fat veins that melt as it cooks, enhancing the umami profile.',
            'Fine, uniform grain: ensures even cooking and exact reproduction of results.',
          ] },
          { h: 'Sensory profile', p: ['Each bite unfolds deep umami with hints of nuts and fresh cream. The intramuscular fat melts evenly, leaving the meat soft and juicy, with a velvety sensation on the palate.'] },
          { h: 'Cooking recommendations', methods: [
            { h: 'Cast-iron skillet', list: ['Preheat over medium-high until lightly smoking.', 'Season with coarse salt just before searing.', 'Cook 1–2 minutes per side for medium-rare.'] },
            { h: 'Direct grilling', list: ['Sear 30–45 seconds per side over very high heat.', 'Move to medium heat and cook 1–2 minutes more per side.'] },
            { h: 'Rest', p: ['Rest 3–4 minutes tented with foil to redistribute the juices.'] },
          ] },
          { h: 'Nutritional value', p: ['This cut provides high-quality protein, B-complex vitamins and minerals such as iron and zinc. Its fat, rich in monounsaturated fatty acids (oleic acid), contributes to a healthier lipid profile without compromising flavor.'] },
          { h: 'Key points', list: [
            'Cut: Rib Eye Japanese Wagyu A5',
            'Marbling: High (BMS 8–12)',
            'Texture: Velvety and juicy',
            'Flavor: Intense umami with hints of nuts and cream',
            'Cooking: Skillet, griddle or high-heat grill',
            'Rest: 3–4 minutes under foil',
          ] },
        ] },
      picana:   { name: 'Picanha Japanese Wagyu A5 · High Marbling', desc: 'Japanese A5 wagyu picanha with its signature fat cap. Juicy and full-flavored, ideal on the grill.',
        details: [
          { h: 'Origin & A5 excellence', p: ['The Picanha Japanese Wagyu A5 comes from cattle raised on certified Japanese farms, where traditional feeding methods and strict care guarantee BMS 8–12 marbling. This superior level of intramuscular fat means exceptional quality and consistency.'] },
          { h: 'Cut characteristics', list: [
            'Picanha (rump cap): an iconic cut for its triangular shape and uniform fat cap that protects the meat during cooking.',
            'High marbling: fine, evenly distributed fat threads that melt under heat, adding juiciness and enhancing flavor.',
            'Fine, even grain: allows consistent portioning and precise cooking times.',
          ] },
          { h: 'Sensory profile', p: ['Each slice offers a burst of umami with hints of nuts and a slight sweetness. As the fat renders into the muscle while cooking, it gives an almost velvety texture that melts on the palate.'] },
          { h: 'Cooking recommendations', methods: [
            { h: 'Direct grilling', list: ['Sear over high heat 1–2 minutes per side to form a golden crust.', 'Move to a medium-heat zone and cook 2–3 minutes more per side for medium.'] },
            { h: 'Cast-iron skillet', list: ['Preheat until lightly smoking, place the picanha fat-side down first.', 'Sear 2 minutes per side and rest 4 minutes before slicing.'] },
            { h: 'Mandatory rest', p: ['Cover loosely with foil and wait 4–5 minutes. This pause redistributes the juices and preserves all the tenderness.'] },
          ] },
          { h: 'Nutritional value', p: ['A5 Wagyu fat is rich in oleic acid (monounsaturated), supporting a healthier lipid profile. It also provides high-quality protein, B vitamins and minerals such as iron and zinc — ideal for a high-nutritional-value offering.'] },
          { h: 'Key points', list: [
            'Cut: Picanha Japanese Wagyu A5 (rump cap)',
            'Marbling: BMS 8–12 (high)',
            'Texture: Juicy and velvety',
            'Flavor: Deep umami with hints of nuts and cream',
            'Cooking: Grill, griddle or cast-iron skillet',
            'Rest: 4–5 minutes for maximum juice retention',
          ] },
        ] },
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
      newyork:  { name: 'Australian Wagyu New York · High Marbling', badge: 'Best Seller', desc: 'Firm bite, deep beef flavor and generous marbling. The steakhouse classic.',
        details: [
          { h: 'Origin & exceptional quality', p: ['The Australian Wagyu New York comes from cattle raised on select Australian pastures, with feeding and animal-welfare practices that favor optimal intramuscular fat development. Its high marbling gives it unique juiciness and flavor in every bite.'] },
          { h: 'Cut characteristics', list: [
            'New York cut (strip loin): a noble cut from the upper loin, with a broad surface that allows a perfect sear.',
            'BMS 8–12 marbling: fine fat threads that melt as it cooks, infusing the meat with unmatched umami richness.',
            'Uniform thickness: enables consistent cooking times and reproducible results.',
          ] },
          { h: 'Sensory profile', p: ['At first bite, it awakens intense umami notes with hints of toasted nuts and fresh cream. The texture feels almost velvety as the intramuscular fat slowly melts, intensifying the gourmet experience.'] },
          { h: 'Cooking recommendations', methods: [
            { h: 'Grill or hot griddle', list: ['Sear 1–2 minutes per side over high heat for a golden crust.', 'Lower to medium heat and cook 2–3 minutes more for medium.'] },
            { h: 'Cast-iron skillet', list: ['Heat until lightly smoking, season with coarse salt as you lay the steak down.', 'Cook 2 minutes per side and rest 3 minutes tented with foil.'] },
            { h: 'Rest', p: ['Essential to redistribute the juices: 3–5 minutes before slicing.'] },
          ] },
          { h: 'Nutritional value', p: ['Although it has generous marbling, much of its fat is monounsaturated (oleic acid), which contributes a healthier lipid profile. It also offers highly bioavailable protein, B vitamins and minerals such as iron and zinc.'] },
          { h: 'Key points', list: [
            'Cut: Australian Wagyu New York',
            'Marbling: High (BMS 8–12)',
            'Texture: Silky and juicy',
            'Flavor: Deep umami with notes of nuts and cream',
            'Cooking: Grill, griddle or cast-iron skillet',
            'Rest: 3–5 min for maximum juiciness',
          ] },
        ] },
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
      paleta:   { name: 'Australian Wagyu Shoulder · High Marbling', desc: 'Australian wagyu shoulder, marbled and versatile. For braising, roasting or thin slicing.',
        details: [
          { h: 'Origin & premium quality', p: ['The Australian Wagyu Shoulder comes from animals raised on controlled Australian pastures, where balanced feeding and animal welfare promote optimal intramuscular fat development. Its high marbling ensures exceptional juiciness and texture.'] },
          { h: 'Cut characteristics', list: [
            'Shoulder (paleta): a fine, uniform-grained cut with intense marbling that brings tenderness and juice retention.',
            'BMS 8–12 marbling: evenly distributed fat veins that melt as it cooks, infusing the meat with rich umami notes.',
            'Adaptable thickness: allows slow cooking or quick searing, depending on your preparation style.',
          ] },
          { h: 'Sensory profile', p: ['Each portion unfolds a concentrated umami accompanied by notes of nuts and fresh cream. The texture feels soft and velvety, with melting fat that enriches every bite.'] },
          { h: 'Cooking recommendations', methods: [
            { h: 'Slow braise', list: ['Cook over low heat in a light broth or red wine for 2–3 hours, until optimal tenderness.', 'Finish with a quick sear in a hot pan to create a light crust.'] },
            { h: 'Sear & oven', list: ['Sear the piece 1–2 minutes per side in a very hot pan.', 'Finish in the oven at 160 °C for 45–60 minutes, depending on thickness.'] },
            { h: 'Rest', p: ['Rest 5–7 minutes covered with foil to redistribute the juices and keep it juicy.'] },
          ] },
          { h: 'Nutritional value', p: ['Wagyu fat is rich in monounsaturated fatty acids (oleic acid), which support a balanced lipid profile. This cut provides high-quality protein, B-complex vitamins and minerals such as iron and zinc.'] },
          { h: 'Key points', list: [
            'Cut: Australian Wagyu Shoulder (paleta)',
            'Marbling: High (BMS 8–12)',
            'Texture: Soft, juicy and velvety',
            'Flavor: Intense umami with hints of nuts and cream',
            'Cooking: Slow braise, sear and oven',
            'Rest: 5–7 min under foil for maximum juiciness',
          ] },
        ] },
      denver:   { name: 'Australian Wagyu Denver · High Marbling', desc: 'Australian wagyu Denver — a juicy, high-marbling cut, tender and full-flavored. Excellent on the grill.',
        details: [
          { h: 'Origin & exceptional quality', p: ['The Australian Wagyu Denver comes from cattle raised on select Australian pastures, where every detail of feeding and animal welfare is cared for. Thanks to traditional rearing techniques combined with modern technology, we obtain a high-marbling cut that translates into unmatched juiciness and flavor.'] },
          { h: 'What makes the Denver cut unique?', list: [
            'Located in the lower rib section, the Denver is a tender, versatile cut.',
            'Its high intramuscular fat infiltration ensures a soft, almost creamy texture that melts on the palate.',
            'Ideal for those seeking a perfect balance between intense flavor and maximum juiciness.',
          ] },
          { h: 'Flavor & dining experience', p: ['This Australian Wagyu cut unfolds deep umami notes and a slightly sweet aftertaste. Cooked on the grill or griddle, the fat melts slowly, infusing the meat with aromas of toasted nuts and butter. Every bite is a delight for premium-meat lovers.'] },
          { h: 'Cooking recommendations', methods: [
            { h: 'Grill over medium-high heat', list: ['Sear each side 1–2 minutes for a perfect golden crust.', 'Reduce to medium heat and cook 3–4 minutes more to the desired doneness (medium or medium-rare recommended).'] },
            { h: 'Griddle or cast-iron skillet', list: ['Heat with no oil until lightly smoking.', 'Add the cut, season with coarse salt at the start and pepper at the end to highlight its natural flavor.', 'Cook 3 minutes per side for medium.'] },
            { h: 'Final rest', p: ['Rest the piece 5 minutes before slicing. This maximizes juice retention and ensures a consistent texture.'] },
          ] },
          { h: 'Nutritional benefits', p: ['Although marbling adds fat, much of it is unsaturated (oleic acids) that contribute to a healthier lipid profile than conventional cuts. Wagyu is also known for its balanced levels of B vitamins and essential minerals such as zinc and iron — ideal for a balanced diet without sacrificing flavor.'] },
          { h: 'Why buy from Meat Connection?', list: [
            'Guaranteed freshness: we deliver refrigerated cuts from our distribution center, keeping the cold chain intact.',
            'Home delivery in Mexico: receive your order in under 48 hours.',
            'Personalized service: our team of expert butchers guides you on the best way to store and prepare it.',
            'Satisfaction assured: if you are not satisfied, we advise you for your next purchase or sort it out hassle-free.',
          ] },
          { h: 'Key points', list: [
            'Cut: Denver (lower rib section) with high marbling.',
            'Origin: certified Australian Wagyu.',
            'Texture: soft, juicy, deep umami flavor.',
            'Suggested weight: 200–300 g per individual portion.',
            'Recommended doneness: medium or medium-rare to appreciate the marbling without overcooking.',
            'Preparation: ideal on the grill, griddle or cast-iron skillet.',
            'Shipping: refrigerated home delivery in Mexico.',
            'Benefits: high in monounsaturated fatty acids and B vitamins.',
          ] },
        ] },
      topround: { name: 'Japanese Wagyu Top Round A5 · High Marbling', desc: 'Japanese A5 wagyu Top Round — rare marbling for this cut. Ideal thinly sliced or in sukiyaki.',
        details: [
          { h: 'Origin & A5 excellence', p: ['The Top Round Japanese Wagyu A5 comes from cattle raised on certified Japanese farms, combining traditional techniques with modern feeding standards to achieve high marbling. This A5 grade ensures an unmatched flavor and texture profile.'] },
          { h: 'Cut characteristics', list: [
            'Top Round: a lean cut with long, consistent grain.',
            'High marbling: fine intramuscular fat threads that melt during cooking, adding juiciness and rich flavor.',
            'Even thickness: enables uniform cooking and reproducible results.',
          ] },
          { h: 'Sensory profile', p: ['Each slice reveals concentrated umami with hints of nuts and a slight natural sweetness. The texture feels soft and delicate on the palate, balancing the firmness of the round with the juiciness of the marbling.'] },
          { h: 'Cooking recommendations', methods: [
            { h: 'Sear in a cast-iron skillet', list: ['Preheat over medium-high until lightly smoking.', 'Season with coarse salt before adding the cut.', 'Sear 1–2 minutes per side to mark the surface.'] },
            { h: 'Low-temperature oven', list: ['After searing, transfer to a 130 °C oven for 10–12 minutes depending on thickness.', 'Reach medium (55 °C) to keep it juicy.'] },
            { h: 'Rest', p: ['Rest 4–5 minutes tented with foil to redistribute the juices.'] },
          ] },
          { h: 'Nutritional value', p: ['This cut provides high-quality protein, B-complex vitamins and minerals such as iron and zinc. Its fat, mostly monounsaturated, contributes to a healthier profile without sacrificing flavor.'] },
          { h: 'Key points', list: [
            'Cut: Top Round Japanese Wagyu A5',
            'Marbling: High',
            'Texture: Soft and juicy',
            'Flavor: Deep umami with hints of nuts',
            'Cooking: Sear and low-temperature oven',
            'Rest: 4–5 minutes for maximum juiciness',
          ] },
        ] },
      lengua:   { name: 'Australian Wagyu Tongue · High Marbling', desc: 'High-marbling Australian wagyu tongue. A tender, juicy specialty, perfect for signature dishes.',
        details: [
          { h: 'Origin & distinction', p: ['The Australian Wagyu Tongue comes from cattle raised on controlled Australian pastures, where each animal receives balanced feeding that promotes exceptional marbling. With a high marbling grade, this cut stands out for its rich intramuscular veining that brings juiciness and concentrated flavor.'] },
          { h: 'Cut characteristics', list: [
            'Refined texture: soft, smooth fiber that melts on the palate.',
            'Generous marbling: intramuscular fat that melts in the mouth, heightening the umami experience.',
            'Uniform size: an even-thickness piece, ideal for consistent cooking.',
          ] },
          { h: 'Sensory profile', p: ['Deep umami notes with slightly sweet nuances and hints of nuts. The fat melts in a balanced way, infusing every slice with velvety juiciness.'] },
          { h: 'Cooking recommendations', methods: [
            { h: 'Water bath & quick sear', list: ['Blanch at 80 °C for 10–15 min to tenderize.', 'Sear on a hot griddle or pan 1 minute per side to mark the surface.'] },
            { h: 'Slow braise', list: ['Cook over low heat in a light broth for 2–3 h until optimal tenderness.', 'Finish quickly in a hot pan to create a light crust.'] },
            { h: 'Short rest', p: ['Rest 5 minutes before slicing to retain the juices.'] },
          ] },
          { h: 'Nutritional value', p: ['Provides high-quality protein, B-complex vitamins and minerals such as iron and zinc. The marbling contributes monounsaturated fatty acids (oleic acid), supporting a healthier lipid profile.'] },
          { h: 'Key points', list: [
            'Cut: whole Australian Wagyu tongue',
            'Marbling: high level of intramuscular fat',
            'Texture: ultra-fine and soft',
            'Flavor: intense umami with hints of nuts and cream',
            'Cooking: blanch & sear, or slow braise',
            'Rest: 5 min under foil',
          ] },
        ] },
      // American Beef
      nyangus:  { name: 'New York Black Angus', desc: 'American Black Angus New York — robust flavor and classic juiciness. The quintessential American steak.' },
      salchicha:{ name: 'American Wagyu Sausage · 4-Pack', badge: '4-Pack', desc: 'American wagyu sausage, 4-pack. Juicy and flavorful, made from premium wagyu trim.',
        details: [
          { h: 'Origin & superior quality', p: ['The American Wagyu Sausage is made with Wagyu beef raised in the USA under high animal-welfare standards and controlled feeding. Each 4-piece pack combines select cuts to deliver a gourmet-level processed product.'] },
          { h: 'Product features', list: [
            'Pack of 4: a practical format for your kitchen or service.',
            'Wagyu beef: high intramuscular fat content that brings juiciness and rich flavor.',
            'Artisan seasoning: a balanced spice blend that enhances the umami profile without overpowering the meat.',
          ] },
          { h: 'Sensory profile', p: ['Each bite reveals a mild umami with hints of grilled meat and light herbal touches. The Wagyu fat emulsion delivers a juicy texture and a delicate aftertaste that sets these sausages apart from conventional ones.'] },
          { h: 'Cooking recommendations', methods: [
            { h: 'Grill or non-stick pan', list: ['Heat over medium to avoid burning the casing.', 'Cook 4–5 minutes per side, turning often for even browning.'] },
            { h: 'Oven', list: ['Preheat to 180 °C.', 'Bake 12–15 minutes on a rack, flipping halfway through.'] },
            { h: 'Avoid piercing', p: ['Do not pierce the casing, to keep the juices inside.'] },
          ] },
          { h: 'Nutritional value', p: ['Rich in high-quality protein and with Wagyu fat high in oleic acid (monounsaturated), these sausages also provide B vitamins and minerals such as iron and zinc — ideal for value-added menu options.'] },
          { h: 'Key points', list: [
            'Format: pack of 4 sausages',
            'Meat type: American Wagyu',
            'Texture: Juicy and velvety',
            'Flavor: Mild umami with artisan spices',
            'Cooking: Grill, pan or oven',
            'Use: Gourmet menus, events and premium service',
          ] },
        ] },
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
      tabs: [{ id: 'desc', label: 'Description' }, { id: 'origin', label: 'Origin' }, { id: 'cooking', label: 'How to Cook' }],
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
