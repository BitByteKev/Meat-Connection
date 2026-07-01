// build-catalog.mjs
// Appends curated, distinct cuts to src/products.json for the 5 categories.
// Run once:  node build-catalog.mjs
// Re-runnable: it strips any previously generated ids (suffix "__gen") before re-adding.
import { readFileSync, writeFileSync } from 'node:fs'

const PATH = './src/products.json'
const catalog = JSON.parse(readFileSync(PATH, 'utf8'))

// ---- Per-category context -------------------------------------------------
const GRADE = {
  jp: {
    es: 'Wagyu japonés grado A5, marmoleo BMS 10–12 — la cúspide del marmoleo. Grasa intramuscular que se funde a baja temperatura para una textura mantecosa y umami profundo.',
    en: 'Japanese A5 wagyu, BMS 10–12 marbling — the peak of marbling. Intramuscular fat that melts at low temperature for a buttery texture and deep umami.',
  },
  mackas: {
    es: "Black Angus Macka's Pedigree (Australia), terminado con grano para un marmoleo parejo y un sabor robusto a res. Versátil y consistente pieza a pieza.",
    en: "Macka's Pedigree Black Angus (Australia), grain-finished for even marbling and a robust beef flavor. Versatile and consistent piece to piece.",
  },
  au: {
    es: 'Wagyu australiano L Grow, cruza terminada con grano para un marmoleo profundo (MB 8–9). Jugoso y untuoso, con el balance perfecto entre grasa y sabor a res.',
    en: 'L Grow Australian wagyu, grain-finished cross with deep marbling (MB 8–9). Juicy and rich, with the perfect balance of fat and beef flavor.',
  },
  kingriver: {
    es: 'Wagyu australiano King River, corte de exportación con marmoleo abundante. Grasa fina y entreverada que aporta jugosidad, terneza y un sabor profundo a mantequilla.',
    en: 'King River Australian wagyu, export cut with abundant marbling. Fine, interlaced fat that delivers juiciness, tenderness and a deep, buttery flavor.',
  },
  us: {
    es: 'Wagyu cross americano Abatti Ranch, criado en EE.UU. con altos estándares. Marmoleo generoso y sabor intenso, con gran versatilidad para parrilla y cocina.',
    en: 'Abatti Ranch American wagyu cross, raised in the USA to high standards. Generous marbling and intense flavor, with great versatility for grill and kitchen.',
  },
}

const ORIGIN = {
  jp: {
    es: 'Origen y distinción A5\n\nProcede de reses Wagyu Negro Japonés de raza pura, criadas en granjas certificadas de Japón con técnicas tradicionales de alimentación. El grado A5 garantiza la máxima expresión de marmoleo, ternura y sabor, totalmente trazable hasta la prefectura.',
    en: 'Origin & A5 distinction\n\nSourced from purebred Japanese Black Wagyu cattle, raised on certified Japanese farms with traditional feeding techniques. The A5 grade guarantees the fullest expression of marbling, tenderness and flavor, fully traceable to the prefecture.',
  },
  mackas: {
    es: "Origen Macka's Pedigree\n\nBlack Angus australiano de la ganadería Macka's Pedigree, criado bajo estrictos estándares de bienestar animal y terminado con grano. Trazable y consistente, ofrece el sabor clásico a res con un marmoleo confiable.",
    en: "Macka's Pedigree origin\n\nAustralian Black Angus from the Macka's Pedigree ranch, raised under strict animal-welfare standards and grain-finished. Traceable and consistent, it delivers classic beef flavor with reliable marbling.",
  },
  au: {
    es: 'Origen Wagyu Australiano L Grow\n\nWagyu australiano de la marca L Grow, cruza terminada con grano para un marmoleo profundo y parejo. Criado bajo estrictos estándares de marmoleo y totalmente trazable desde el origen.',
    en: 'L Grow Australian Wagyu origin\n\nAustralian wagyu from the L Grow brand, a grain-finished cross for deep, even marbling. Raised under strict marbling standards and fully traceable from origin.',
  },
  kingriver: {
    es: 'Origen King River\n\nWagyu australiano King River, una de las cruzas de wagyu más reconocidas de Australia. Corte de exportación con marmoleo de referencia, terminado con grano y totalmente trazable.',
    en: 'King River origin\n\nKing River Australian wagyu, one of Australia\u2019s most recognized wagyu crosses. Export cut with reference-grade marbling, grain-finished and fully traceable.',
  },
  us: {
    es: 'Origen Abatti Ranch\n\nWagyu cross americano del rancho Abatti (EE.UU.), criado con altos estándares de alimentación y bienestar. Combina la genética wagyu con la robustez de la res americana para un sabor intenso y versátil.',
    en: 'Abatti Ranch origin\n\nAmerican wagyu cross from Abatti Ranch (USA), raised with high feeding and welfare standards. It blends wagyu genetics with the robustness of American beef for an intense, versatile flavor.',
  },
}

const BADGE = {
  jp: { es: 'A5 · Japón', en: 'A5 · Japan' },
  mackas: { es: 'Black Angus', en: 'Black Angus' },
  au: { es: 'Australia · L Grow', en: 'Australia · L Grow' },
  kingriver: { es: 'King River · Australia', en: 'King River · Australia' },
  us: { es: 'Cross Americano', en: 'American Cross' },
}

const TONES = ['charcoal', 'kraft', 'cream', 'red']

// ---- Image mapping (closest available photo; corte-destacado = neutral) ----
const HERO = 'corte-destacado.webp'
function imageFor(cutKey, cat) {
  const RIBEYE = {
    jp: 'RIB-EYE-WAGYU-JAPONES-A5-ALTO-MARMOLEO-1.webp',
    au: 'RIB-EYE-WAGYU-AUSTRALIANO-MEDIO-MARMOLEO.webp',
    kingriver: 'RIB-EYE-WAGYU-AUSTRALIANO-ALTO-MARMOLEO-3.webp',
    mackas: 'RIB-EYE-B.webp',
    us: 'RIB-EYE-B.webp',
  }
  const NY = {
    jp: 'newyork.webp',
    au: 'NEW-YORK-WAGYU-AUSTRALIANO-ALTO-MARMOLEO-2.webp',
    kingriver: 'NEW-YORK-WAGYU-AUSTRALIANO-ALTO-MARMOLEO-2.webp',
    mackas: 'new-york-black-angus.webp',
    us: 'newyork.webp',
  }
  switch (cutKey) {
    case 'filete':
    case 'kobe': return 'FILETE-WAGYU-JAPONES-A5-ALTO-MARMOLEO-2-e1749645167193.webp'
    case 'ribeye': return RIBEYE[cat] || 'ribeye.webp'
    case 'ribeyeHueso':
    case 'tomahawk': return 'T-BONE-WAGYU-AUSTRALIANO-ALTO-MARMOLEO.webp'
    case 'ribcap': return 'RIB-EYE-B.webp'
    case 'ny': return NY[cat] || 'newyork.webp'
    case 'picana': return 'PICANA-WAGYU-JAPONES-A5-ALTO-MARMOLEO-1.webp'
    case 'flatiron':
    case 'paleta': return 'PALETA-WAGYU-AUSTRALIANO-ALTO-MARMOLEO-1.webp'
    case 'diezmillo': return 'paleta.webp'
    case 'sirloin': return 'TOP-ROUND-WAGYU-AUSTRALIANO-ALTO-MARMOLEO.webp'
    case 'rostbiff': return 'topround.webp'
    case 'lengua': return 'LENGUA-WAGYU-AUSTRALIANO-ALTO-MARMOLEO-2.webp'
    default: return HERO // brisket, shortrib, karubi, flap, arrachera, chamorro, ribfinger, shortplate, backrib, tuetano, tablita, hanging
  }
}

// ---- Cut copy library (bilingual lead + use + cooking) --------------------
const CUT = {
  filete: {
    es: { lead: 'El filete (tenderloin) es el corte más tierno de la res: fibra fina, magro y de forma uniforme.', use: 'Ideal para medallones, tournedós y presentaciones donde la terneza manda. Corta porciones gruesas para sellar parejo.', cook: 'Atempera, seca la superficie y sella 1–2 min por lado a fuego alto. Término medio-rojo (52–54 °C). Reposa 4 min antes de cortar.' },
    en: { lead: 'The tenderloin is the most tender cut of beef: fine grain, lean and uniform in shape.', use: 'Ideal for medallions, tournedos and presentations where tenderness rules. Cut thick portions for an even sear.', cook: 'Temper, pat dry and sear 1–2 min per side over high heat. Medium-rare (52–54 °C / 126–129 °F). Rest 4 min before slicing.' },
  },
  kobe: {
    es: { lead: 'Filete tenderloin con genética Kobe — el grado más exclusivo del wagyu japonés. Terneza extrema y marmoleo que se deshace al contacto.', use: 'Reservado para la mesa de mayor nivel. Porciones pequeñas: la grasa hace el trabajo.', cook: 'Sella 60–90 seg por lado a fuego muy alto, sin aceite. Término medio-rojo. Sal en escamas al final.' },
    en: { lead: 'Tenderloin filet with Kobe genetics — the most exclusive grade of Japanese wagyu. Extreme tenderness and marbling that melts on contact.', use: 'Reserved for the highest-end table. Small portions: the fat does the work.', cook: 'Sear 60–90 sec per side over very high heat, no oil. Medium-rare. Flaky salt to finish.' },
  },
  ribeye: {
    es: { lead: 'El rib eye (cube roll) equilibra el ojo central magro y la cresta de grasa exterior — dos texturas en una pieza.', use: 'El corte rey de la parrilla. Excelente sellado, a la plancha o cortado fino para tacos premium.', cook: 'Sella 2–3 min por lado hasta costra dorada. Término medio (54–57 °C) para fundir el marmoleo. Reposa 5 min.' },
    en: { lead: 'The rib eye (cube roll) balances the lean central eye and the outer fat cap — two textures in one piece.', use: 'The king of the grill. Excellent seared, on the griddle or sliced thin for premium tacos.', cook: 'Sear 2–3 min per side until a golden crust forms. Medium (54–57 °C / 129–135 °F) to render the marbling. Rest 5 min.' },
  },
  ribeyeHueso: {
    es: { lead: 'Rib eye con hueso (export rib) — el hueso aporta sabor y una presentación imponente.', use: 'Pieza de impacto para asadores y mesas compartidas. Cocción más lenta por el hueso.', cook: 'Sella y termina a calor indirecto o en horno a 140 °C hasta 54–57 °C al centro. Reposa 6–8 min.' },
    en: { lead: 'Bone-in rib eye (export rib) — the bone adds flavor and a striking presentation.', use: 'A showpiece for grill masters and shared tables. Slower cooking due to the bone.', cook: 'Sear and finish over indirect heat or in a 140 °C oven until 54–57 °C at the center. Rest 6–8 min.' },
  },
  tomahawk: {
    es: { lead: 'Tomahawk — rib eye con el hueso de la costilla limpio y largo. Espectáculo en la mesa.', use: 'La pieza central de cualquier asado. Pensada para compartir y para fotos.', cook: 'Sella todos los lados y termina a calor indirecto/horno a 140 °C hasta 54–57 °C. Reposa 8–10 min antes de cortar.' },
    en: { lead: 'Tomahawk — rib eye with the long, frenched rib bone. A showstopper at the table.', use: 'The centerpiece of any cookout. Made for sharing and for photos.', cook: 'Sear all sides and finish over indirect heat / 140 °C oven until 54–57 °C. Rest 8–10 min before carving.' },
  },
  ribcap: {
    es: { lead: 'Rib cap (tapa de rib eye) — la parte más marmoleada y sabrosa de la costilla, muy codiciada por los conocedores.', use: 'Enróllala para medallones o ásala entera. Sabor de rib eye concentrado.', cook: 'Sella rápido y fuerte; por su grasa se cocina pronto. Término medio. Reposa 4 min.' },
    en: { lead: 'Rib cap (spinalis) — the most marbled, flavorful part of the rib, prized by connoisseurs.', use: 'Roll it for medallions or grill it whole. Concentrated rib-eye flavor.', cook: 'Sear fast and hot; its fat cooks it quickly. Medium. Rest 4 min.' },
  },
  ny: {
    es: { lead: 'New York (striploin) — equilibrio entre marmoleo y mordida firme, con su característica banda de grasa lateral.', use: 'Clásico steakhouse. Rinde excelente entero o porcionado en bistecs gruesos.', cook: 'Sella 2–3 min por lado, parando la grasa lateral hacia el calor para dorarla. Medio (54–57 °C). Reposa 5 min.' },
    en: { lead: 'New York (striploin) — balance of marbling and a firm bite, with its signature lateral fat band.', use: 'Steakhouse classic. Great whole or portioned into thick steaks.', cook: 'Sear 2–3 min per side, standing the fat band toward the heat to render it. Medium (54–57 °C). Rest 5 min.' },
  },
  picana: {
    es: { lead: 'Picaña (rump cap) — corte brasileño por excelencia, con una capa de grasa superior que se vuelve crujiente.', use: 'Estrella del asado. Córtala en C contra la fibra o ásala entera con la grasa hacia arriba.', cook: 'Marca la grasa, sella con la capa hacia el fuego y termina a calor medio. Punto medio. Reposa 5 min.' },
    en: { lead: 'Picanha (rump cap) — the quintessential Brazilian cut, with a top fat layer that turns crisp.', use: 'Star of the cookout. Slice in C against the grain or grill whole, fat-side up.', cook: 'Score the fat, sear fat-side toward the fire and finish over medium heat. Medium. Rest 5 min.' },
  },
  flatiron: {
    es: { lead: 'Flat iron (de la paleta) — corte tierno y muy marmoleado, una joya de precio inteligente.', use: 'Versátil para parrilla, fajitas o cortado fino. Gran sabor con excelente rendimiento.', cook: 'Sella 2–3 min por lado a fuego alto. Término medio-rojo. Corta fino en contra de la fibra.' },
    en: { lead: 'Flat iron (from the shoulder) — a tender, heavily marbled cut and a smart-value gem.', use: 'Versatile for grilling, fajitas or slicing thin. Big flavor with excellent yield.', cook: 'Sear 2–3 min per side over high heat. Medium-rare. Slice thin against the grain.' },
  },
  paleta: {
    es: { lead: 'Paleta (bolar blade / shoulder clod) — corte de espaldilla, sabroso y de buen rendimiento.', use: 'Excelente para braseados, mechado, fajitas y porciones de gran volumen.', cook: 'Para bistec: sella y sirve medio. Para braseado: cocción lenta 2–3 h hasta deshebrar.' },
    en: { lead: 'Shoulder clod (bolar blade) — a flavorful, high-yield shoulder cut.', use: 'Great for braises, shredded beef, fajitas and high-volume portions.', cook: 'For steak: sear and serve medium. For braising: slow-cook 2–3 h until it shreds.' },
  },
  diezmillo: {
    es: { lead: 'Diezmillo (chuck roll) — corte de cuello/espaldilla con buen marmoleo y sabor intenso a res.', use: 'Muy versátil: bistec marinado, fajitas, guisos y braseados de sabor profundo.', cook: 'Bistec fino: sella rápido y fuerte. Pieza grande: braseado lento hasta terneza total.' },
    en: { lead: 'Chuck roll (diezmillo) — a neck/shoulder cut with good marbling and intense beef flavor.', use: 'Very versatile: marinated steak, fajitas, stews and deep-flavored braises.', cook: 'Thin steak: sear fast and hot. Large piece: slow braise until fully tender.' },
  },
  brisket: {
    es: { lead: 'Brisket (pecho) — el corte del barbecue por excelencia, con su característica capa de grasa.', use: 'Ahumado lento, pastrami o braseado. La paciencia lo transforma en mantequilla.', cook: 'Ahúma a 110–120 °C hasta 92–96 °C al centro (10–14 h). Reposa 1 h envuelto antes de cortar.' },
    en: { lead: 'Brisket — the quintessential barbecue cut, with its signature fat cap.', use: 'Low-and-slow smoke, pastrami or braise. Patience turns it to butter.', cook: 'Smoke at 110–120 °C until 92–96 °C internal (10–14 h). Rest 1 h wrapped before slicing.' },
  },
  shortrib: {
    es: { lead: 'Short rib (costilla, con o sin hueso) — corte jugoso y muy marmoleado, intenso en sabor.', use: 'Rey del braseado y el ahumado. También en finas láminas para parrilla coreana.', cook: 'Braseado: 3 h a 160 °C hasta deshebrar. Parrilla (rebanado): sella 1–2 min por lado.' },
    en: { lead: 'Short rib (bone-in or boneless) — a juicy, heavily marbled cut, intense in flavor.', use: 'King of braising and smoking. Also thin-sliced for Korean BBQ.', cook: 'Braise: 3 h at 160 °C until it shreds. Grill (sliced): sear 1–2 min per side.' },
  },
  karubi: {
    es: { lead: 'Karubi (plate short rib) — costilla de plato, el corte estrella del yakiniku y la parrilla coreana.', use: 'Rebánalo fino para asar en mesa. Marmoleo abundante y sabor profundo.', cook: 'Rebana 3–5 mm y asa 30–60 seg por lado a fuego muy alto. Salsa ligera para no opacar.' },
    en: { lead: 'Karubi (plate short rib) — the star cut of yakiniku and Korean BBQ.', use: 'Slice thin for tabletop grilling. Abundant marbling and deep flavor.', cook: 'Slice 3–5 mm and grill 30–60 sec per side over very high heat. Light sauce so it doesn\u2019t mask the beef.' },
  },
  sirloin: {
    es: { lead: 'Sirloin (set / con picaña D-rump) — corte magro y firme con excelente sabor a res.', use: 'Bistec versátil, brochetas o cortado fino. Buen rendimiento para servicio.', cook: 'Sella 2–3 min por lado a fuego alto. No pases de medio para conservar jugosidad. Reposa 4 min.' },
    en: { lead: 'Sirloin (set / with picanha D-rump) — a lean, firm cut with excellent beef flavor.', use: 'Versatile steak, skewers or thin slices. Good yield for service.', cook: 'Sear 2–3 min per side over high heat. Don\u2019t go past medium to keep it juicy. Rest 4 min.' },
  },
  rostbiff: {
    es: { lead: 'Sirloin rostbiff — corte magro de cadera, ideal para roast beef y rebanadas finas.', use: 'Asado entero al horno o laminado para fríos y sándwiches gourmet.', cook: 'Sella y hornea a 160 °C hasta 52–54 °C al centro. Reposa 10 min y rebana muy fino.' },
    en: { lead: 'Sirloin rostbiff — a lean hip cut, ideal for roast beef and thin slicing.', use: 'Roast whole in the oven or shave for cold cuts and gourmet sandwiches.', cook: 'Sear and roast at 160 °C until 52–54 °C internal. Rest 10 min and slice very thin.' },
  },
  tablita: {
    es: { lead: 'Tablita (chuck tail / tira de asado) — corte de costilla cruzada, jugoso y lleno de sabor.', use: 'Clásico de la parrilla mexicana y el asado argentino. Para compartir.', cook: 'Asa a fuego medio-alto 4–6 min por lado. La grasa debe dorar bien sin quemarse.' },
    en: { lead: 'Tablita (chuck tail / short rib flap) — a cross-cut rib strip, juicy and full of flavor.', use: 'A classic of the Mexican grill and Argentine asado. Made for sharing.', cook: 'Grill over medium-high 4–6 min per side. Let the fat brown well without burning.' },
  },
  flap: {
    es: { lead: 'Vacío (flap meat) — corte de fibra abierta y suelta que absorbe marinadas y se llena de sabor.', use: 'Excelente para tacos, fajitas y parrilla rápida. Mejor en término medio-rojo.', cook: 'Sella fuerte 2–3 min por lado. Corta SIEMPRE fino y en contra de la fibra para ternura.' },
    en: { lead: 'Flap meat (vacío) — an open, loose-grain cut that soaks up marinades and packs flavor.', use: 'Excellent for tacos, fajitas and quick grilling. Best at medium-rare.', cook: 'Sear hard 2–3 min per side. ALWAYS slice thin and against the grain for tenderness.' },
  },
  arrachera: {
    es: { lead: 'Arrachera (skirt steak) — el corte clásico de la fajita mexicana, fibra marcada y mucho sabor.', use: 'Marínala y ásala rápido. Insuperable para tacos y fajitas.', cook: 'Fuego muy alto, 2–3 min por lado. Corta fino en contra de la fibra. No la sobrecocines.' },
    en: { lead: 'Skirt steak (arrachera) — the classic Mexican fajita cut, pronounced grain and big flavor.', use: 'Marinate and grill fast. Unbeatable for tacos and fajitas.', cook: 'Very high heat, 2–3 min per side. Slice thin against the grain. Don\u2019t overcook.' },
  },
  chamorro: {
    es: { lead: 'Chamorro (shin / shank) — corte rico en colágeno que se vuelve gelatinoso y tierno con cocción lenta.', use: 'Osobuco, braseados y caldos de sabor profundo. Se deshace con el tiempo.', cook: 'Brasea 2.5–3 h a fuego bajo con líquido hasta que la carne se separe del hueso.' },
    en: { lead: 'Shin / shank (chamorro) — a collagen-rich cut that turns gelatinous and tender with slow cooking.', use: 'Osso buco, braises and deep-flavored broths. Falls apart with time.', cook: 'Braise 2.5–3 h over low heat with liquid until the meat pulls from the bone.' },
  },
  ribfinger: {
    es: { lead: 'Rib finger — las tiras de carne de entre las costillas, jugosas y muy sabrosas.', use: 'Bocados premium para parrilla, brochetas o glaseados. Sabor de costilla concentrado.', cook: 'Asa a fuego medio 6–8 min girando, o brasea hasta terneza. Glasea al final.' },
    en: { lead: 'Rib fingers — the meat strips from between the ribs, juicy and very flavorful.', use: 'Premium bites for the grill, skewers or glazing. Concentrated rib flavor.', cook: 'Grill over medium 6–8 min turning, or braise until tender. Glaze at the end.' },
  },
  shortplate: {
    es: { lead: 'Short plate — corte de plato, marmoleado y económico, base del clásico "ribeye roll" laminado.', use: 'Ideal rebanado fino para hot pot, sukiyaki y parrilla coreana.', cook: 'Rebana fino (congela ligeramente para cortar mejor) y cocina 30–60 seg en caldo o plancha.' },
    en: { lead: 'Short plate — a marbled, economical plate cut, the base of the classic shaved "beef roll".', use: 'Ideal thin-sliced for hot pot, sukiyaki and Korean BBQ.', cook: 'Slice thin (semi-freeze for cleaner cuts) and cook 30–60 sec in broth or on a griddle.' },
  },
  backrib: {
    es: { lead: 'Meaty back rib — costillas de lomo con buena cobertura de carne entre los huesos.', use: 'Para el horno o el ahumador, con glaseado o salsa BBQ.', cook: 'Hornea/ahúma a 150 °C 2.5–3 h hasta que la carne ceda. Glasea en los últimos 20 min.' },
    en: { lead: 'Meaty back ribs — loin ribs with good meat coverage between the bones.', use: 'For the oven or smoker, with a glaze or BBQ sauce.', cook: 'Bake/smoke at 150 °C for 2.5–3 h until the meat gives. Glaze in the last 20 min.' },
  },
  tuetano: {
    es: { lead: 'Tuétano (femur bones) — hueso con médula, untuoso y lleno de sabor, un manjar para untar.', use: 'Al horno para untar en pan, o como base de caldos y salsas profundas.', cook: 'Hornea a 200 °C 15–20 min hasta que la médula burbujee. Sirve con sal y pan tostado.' },
    en: { lead: 'Marrow (femur bones) — bone with marrow, rich and full of flavor, a spreadable delicacy.', use: 'Roasted to spread on bread, or as a base for deep broths and sauces.', cook: 'Roast at 200 °C for 15–20 min until the marrow bubbles. Serve with salt and toasted bread.' },
  },
  hanging: {
    es: { lead: 'Hanging tender (entraña fina / solomillo de pulmón) — corte de un solo músculo, tierno y de sabor profundo.', use: 'Favorito de bistró. Marínalo y ásalo rápido; excelente en tacos y fajitas.', cook: 'Fuego alto, 2–3 min por lado a medio-rojo. Retira la membrana central y corta fino.' },
    en: { lead: 'Hanging tender (hanger steak) — a single-muscle cut, tender with deep flavor.', use: 'A bistro favorite. Marinate and grill fast; excellent in tacos and fajitas.', cook: 'High heat, 2–3 min per side to medium-rare. Remove the central membrane and slice thin.' },
  },
  lengua: {
    es: { lead: 'Lengua — corte tradicional que, bien cocido, queda suave y meloso, con sabor inconfundible.', use: 'Tacos de lengua, guisos y braseados. Un clásico mexicano de alto nivel con wagyu.', cook: 'Cuece 2.5–3 h hasta suave, retira la piel exterior y dora o brasea en su salsa.' },
    en: { lead: 'Tongue (lengua) — a traditional cut that, properly cooked, turns soft and silky with an unmistakable flavor.', use: 'Tongue tacos, stews and braises. A high-end Mexican classic done with wagyu.', cook: 'Simmer 2.5–3 h until tender, peel the outer skin and sear or braise in its sauce.' },
  },
}

// ---- Items per category (curated distinct cuts) ---------------------------
// Existing ids kept: jp(tritip,filete,ribeyeJp,picana,topround) au(...) mackas(nyangus) us(salchicha) kingriver(king-river)
const ITEMS = {
  jp: [
    ['diezmilloJp', 'diezmillo', 'Diezmillo Chuck Roll Wagyu A5', 'Chuck Roll Japanese Wagyu A5'],
    ['flatironJp', 'flatiron', 'Flat Iron Wagyu A5', 'Flat Iron Japanese Wagyu A5'],
    ['ribfingerJp', 'ribfinger', 'Rib Finger Wagyu A5', 'Rib Finger Japanese Wagyu A5'],
    ['shortplateJp', 'shortplate', 'Short Plate Wagyu A5', 'Short Plate Japanese Wagyu A5'],
    ['shortribJp', 'shortrib', 'Short Rib Kit Wagyu A5', 'Short Rib Kit Japanese Wagyu A5'],
    ['sirloinJp', 'sirloin', 'Sirloin Set Wagyu A5', 'Sirloin Set Japanese Wagyu A5'],
    ['flapJp', 'flap', 'Vacío Flap Wagyu A5', 'Flap Meat Japanese Wagyu A5'],
    ['tablitaJp', 'tablita', 'Tablita Chuck Tail Wagyu A5', 'Chuck Tail Tablita Japanese Wagyu A5'],
    ['kobeFilete', 'kobe', 'Filete Tenderloin Wagyu Kobe', 'Tenderloin Kobe Wagyu'],
  ],
  mackas: [
    ['arracheraMackas', 'arrachera', "Arrachera Outside Black Angus Macka's", "Outside Skirt Black Angus Macka's"],
    ['brisketMackas', 'brisket', "Brisket Black Angus Macka's", "Brisket Black Angus Macka's"],
    ['diezmilloMackas', 'diezmillo', "Diezmillo Chuck Roll Black Angus Macka's", "Chuck Roll Black Angus Macka's"],
    ['hangingMackas', 'hanging', "Hanging Tender Black Angus Macka's", "Hanging Tender Black Angus Macka's"],
    ['lenguaMackas', 'lengua', "Lengua Black Angus Macka's", "Tongue Black Angus Macka's"],
    ['picanaMackas', 'picana', "Picaña Black Angus Macka's", "Picanha Black Angus Macka's"],
    ['ribeyeMackas', 'ribeye', "Rib Eye Cube Roll Black Angus Macka's", "Rib Eye Cube Roll Black Angus Macka's"],
    ['tomahawkMackas', 'tomahawk', "Tomahawk Black Angus Macka's", "Tomahawk Black Angus Macka's"],
  ],
  au: [
    ['arracheraAu', 'arrachera', 'Arrachera Outside Thin Skirt L Grow', 'Outside Thin Skirt Wagyu L Grow'],
    ['fileteAu', 'filete', 'Filete Tenderloin Wagyu L Grow', 'Tenderloin Australian Wagyu L Grow'],
    ['picanaAu', 'picana', 'Picaña Rump Cap Wagyu L Grow', 'Picanha Rump Cap Australian Wagyu L Grow'],
    ['flapAu', 'flap', 'Vacío Flap Meat Wagyu L Grow', 'Flap Meat Australian Wagyu L Grow'],
    ['fileteFbAu', 'filete', 'Filete Tenderloin Wagyu Fullblood L Grow', 'Fullblood Tenderloin Wagyu L Grow'],
  ],
  kingriver: [
    ['arracheraKr', 'arrachera', 'Arrachera Inside Skirt King River', 'Inside Skirt Wagyu King River'],
    ['brisketKr', 'brisket', 'Brisket Deckle Off King River', 'Brisket Deckle Off Wagyu King River'],
    ['chamorroKr', 'chamorro', 'Chamorro Shin Shank King River', 'Shin Shank Wagyu King River'],
    ['chuckshortribKr', 'shortrib', 'Chuck Short Rib King River', 'Chuck Short Rib Wagyu King River'],
    ['diezmilloKr', 'diezmillo', 'Diezmillo Chuck Roll King River', 'Chuck Roll Wagyu King River'],
    ['fileteKr', 'filete', 'Filete Tenderloin King River', 'Tenderloin Wagyu King River'],
    ['karubiKr', 'karubi', 'Karubi Plate King River', 'Karubi Plate Wagyu King River'],
    ['newyorkKr', 'ny', 'New York Striploin King River', 'New York Striploin Wagyu King River'],
    ['paletaKr', 'paleta', 'Paleta Bolar Blade King River', 'Bolar Blade Wagyu King River'],
    ['picanaKr', 'picana', 'Picaña Rump Cap King River', 'Picanha Rump Cap Wagyu King River'],
    ['ribeyehuesoKr', 'ribeyeHueso', 'Rib Eye c/Hueso Export Rib King River', 'Bone-in Rib Eye Export Rib Wagyu King River'],
    ['ribeyeKr', 'ribeye', 'Rib Eye Cube Roll King River', 'Rib Eye Cube Roll Wagyu King River'],
    ['sirloinKr', 'sirloin', 'Sirloin c/Picaña D-Rump King River', 'Sirloin w/Picanha D-Rump Wagyu King River'],
    ['rostbiffKr', 'rostbiff', 'Sirloin Rostbiff King River', 'Sirloin Rostbiff Wagyu King River'],
    ['tablitaKr', 'tablita', 'Tablita Chuck Tail King River', 'Chuck Tail Tablita Wagyu King River'],
    ['tomahawkKr', 'tomahawk', 'Tomahawk King River', 'Tomahawk Wagyu King River'],
    ['flapKr', 'flap', 'Vacío Flap Meat King River', 'Flap Meat Wagyu King River'],
    ['flatironKr', 'flatiron', 'Flat Iron Purebred King River', 'Flat Iron Purebred Wagyu King River'],
  ],
  us: [
    ['arracheraUs', 'arrachera', 'Arrachera Inside Skirt Abatti Ranch', 'Inside Skirt Wagyu Cross Abatti Ranch'],
    ['brisketUs', 'brisket', 'Brisket Abatti Ranch', 'Brisket Wagyu Cross Abatti Ranch'],
    ['chuckshortribUs', 'shortrib', 'Chuck Short Rib Abatti Ranch', 'Chuck Short Rib Wagyu Cross Abatti Ranch'],
    ['costillaUs', 'shortrib', 'Costilla Short Rib s/Hueso Abatti Ranch', 'Boneless Short Rib Wagyu Cross Abatti Ranch'],
    ['diezmilloUs', 'diezmillo', 'Diezmillo Chuck Roll Abatti Ranch', 'Chuck Roll Wagyu Cross Abatti Ranch'],
    ['fileteUs', 'filete', 'Filete Tenderloin Abatti Ranch', 'Tenderloin Wagyu Cross Abatti Ranch'],
    ['backribUs', 'backrib', 'Meaty Back Rib Abatti Ranch', 'Meaty Back Rib Wagyu Cross Abatti Ranch'],
    ['newyorkUs', 'ny', 'New York Striploin Abatti Ranch', 'New York Striploin Wagyu Cross Abatti Ranch'],
    ['paletaUs', 'paleta', 'Paleta Shoulder Clod Abatti Ranch', 'Shoulder Clod Wagyu Cross Abatti Ranch'],
    ['picanaUs', 'picana', 'Picaña Abatti Ranch', 'Picanha Wagyu Cross Abatti Ranch'],
    ['ribcapUs', 'ribcap', 'Rib Cap Abatti Ranch', 'Rib Cap Wagyu Cross Abatti Ranch'],
    ['ribeyelipoffUs', 'ribeye', 'Rib Eye Lip Off Abatti Ranch', 'Rib Eye Lip Off Wagyu Cross Abatti Ranch'],
    ['ribeyeliponUs', 'ribeye', 'Rib Eye Lip On Abatti Ranch', 'Rib Eye Lip On Wagyu Cross Abatti Ranch'],
    ['tuetanoUs', 'tuetano', 'Tuétano Femur Bones Abatti Ranch', 'Marrow Femur Bones Wagyu Cross Abatti Ranch'],
  ],
}

// ---- Build ----------------------------------------------------------------
const GEN = '__gen'
// Generated cuts have no real photo yet — use a branded non-meat placeholder.
const PLACEHOLDER = 'placeholder-coming-soon.webp'
// strip previously generated entries so the script is idempotent
const base = catalog.filter((p) => !String(p.id).endsWith(GEN))
const existingIds = new Set(base.map((p) => p.id))

let toneI = 0
const generated = []
for (const cat of Object.keys(ITEMS)) {
  for (const [rawId, cutKey, nameES, nameEN] of ITEMS[cat]) {
    const id = rawId + GEN
    if (existingIds.has(id)) continue
    const cut = CUT[cutKey]
    if (!cut) throw new Error(`Missing CUT copy for "${cutKey}" (id ${rawId})`)
    const tone = TONES[toneI++ % TONES.length]
    generated.push({
      id,
      cat,
      tone,
      images: [PLACEHOLDER],
      badge: { es: BADGE[cat].es, en: BADGE[cat].en },
      es: {
        name: nameES,
        description: `${cut.es.lead}\n\n${GRADE[cat].es}\n\n${cut.es.use}`,
        origin: ORIGIN[cat].es,
        cooking: `Recomendaciones de cocción\n\n${cut.es.cook}`,
      },
      en: {
        name: nameEN,
        description: `${cut.en.lead}\n\n${GRADE[cat].en}\n\n${cut.en.use}`,
        origin: ORIGIN[cat].en,
        cooking: `Cooking recommendations\n\n${cut.en.cook}`,
      },
    })
  }
}

const out = [...base, ...generated]
writeFileSync(PATH, JSON.stringify(out, null, 2) + '\n', 'utf8')

// ---- Report ---------------------------------------------------------------
const byCat = {}
for (const p of out) byCat[p.cat] = (byCat[p.cat] || 0) + 1
console.log(`Generated ${generated.length} new products. Total now ${out.length}.`)
console.log('Per category:', byCat)
