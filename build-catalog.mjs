// build-catalog.mjs  (v2 — marbling variants)
// One product per cut; cuts that repeat only by marbling grade become a single
// product with a `marbling.variants[]` scale. Grade-mapped photos for rib eye.
// Idempotent: strips prior "__gen" ids, then re-adds. Also patches marbling onto
// the original hand-written products in place.
//   node build-catalog.mjs
import { readFileSync, writeFileSync, readdirSync } from 'node:fs'
const PATH = './src/products.json'
const catalog = JSON.parse(readFileSync(PATH, 'utf8'))
// Photos that actually exist in /images. A generated cut only shows a real photo
// when its file is present; otherwise it falls back to the coming-soon card.
const HAVE = new Set(readdirSync('./images').filter((f) => f.endsWith('.webp')))
const PLACEHOLDER = 'placeholder-coming-soon.webp'

const SYS = { jp: 'bms', mackas: 'angus', au: 'aus', kingriver: 'aus', us: 'aus' }
const TONES = ['charcoal', 'kraft', 'cream', 'red']
const HERO = 'corte-destacado.webp'
const RIBEYE_GRADE = {
  au: { lo: 'RIB-EYE-WAGYU-AUSTRALIANO-BAJO-MARMOLEO-3-1.webp', mid: 'RIB-EYE-WAGYU-AUSTRALIANO-MEDIO-MARMOLEO.webp', hi: 'RIB-EYE-WAGYU-AUSTRALIANO-ALTO-MARMOLEO-3.webp' },
  kingriver: { lo: 'RIB-EYE-WAGYU-AUSTRALIANO-BAJO-MARMOLEO-3-1.webp', mid: 'RIB-EYE-WAGYU-AUSTRALIANO-MEDIO-MARMOLEO.webp', hi: 'RIB-EYE-WAGYU-AUSTRALIANO-ALTO-MARMOLEO-3.webp' },
}
function ribeyeImg(hi, cat) {
  const set = RIBEYE_GRADE[cat]; if (!set) return imageFor('ribeye', cat)
  return hi <= 3 ? set.lo : hi <= 7 ? set.mid : set.hi
}
function imageFor(cutKey, cat) {
  const RIBEYE = { jp: 'RIB-EYE-WAGYU-JAPONES-A5-ALTO-MARMOLEO-1.webp', au: 'RIB-EYE-WAGYU-AUSTRALIANO-MEDIO-MARMOLEO.webp', kingriver: 'RIB-EYE-WAGYU-AUSTRALIANO-MEDIO-MARMOLEO.webp', mackas: 'RIB-EYE-B.webp', us: 'RIB-EYE-B.webp' }
  const NY = { jp: 'newyork.webp', au: 'NEW-YORK-WAGYU-AUSTRALIANO-ALTO-MARMOLEO-2.webp', kingriver: 'NEW-YORK-WAGYU-AUSTRALIANO-ALTO-MARMOLEO-2.webp', mackas: 'new-york-black-angus.webp', us: 'newyork.webp' }
  switch (cutKey) {
    case 'filete': case 'kobe': return 'FILETE-WAGYU-JAPONES-A5-ALTO-MARMOLEO-2-e1749645167193.webp'
    case 'ribeye': return RIBEYE[cat] || 'ribeye.webp'
    case 'ribeyeHueso': case 'tomahawk': return 'T-BONE-WAGYU-AUSTRALIANO-ALTO-MARMOLEO.webp'
    case 'ribcap': return 'RIB-EYE-B.webp'
    case 'ny': return NY[cat] || 'newyork.webp'
    case 'picana': return 'PICANA-WAGYU-JAPONES-A5-ALTO-MARMOLEO-1.webp'
    case 'flatiron': case 'paleta': return 'PALETA-WAGYU-AUSTRALIANO-ALTO-MARMOLEO-1.webp'
    case 'diezmillo': return 'paleta.webp'
    case 'sirloin': return 'TOP-ROUND-WAGYU-AUSTRALIANO-ALTO-MARMOLEO.webp'
    case 'rostbiff': return 'topround.webp'
    case 'lengua': return 'LENGUA-WAGYU-AUSTRALIANO-ALTO-MARMOLEO-2.webp'
    default: return HERO
  }
}

const GRADE = {
  jp: { es: 'Wagyu japonés grado A5, marmoleo BMS 10–12 — la cúspide del marmoleo. Grasa intramuscular que se funde a baja temperatura para una textura mantecosa y umami profundo.', en: 'Japanese A5 wagyu, BMS 10–12 marbling — the peak of marbling. Intramuscular fat that melts at low temperature for a buttery texture and deep umami.' },
  mackas: { es: "Black Angus Macka's Pedigree (Australia), terminado con grano para un marmoleo parejo y un sabor robusto a res. Versátil y consistente pieza a pieza.", en: "Macka's Pedigree Black Angus (Australia), grain-finished for even marbling and a robust beef flavor. Versatile and consistent piece to piece." },
  au: { es: 'Wagyu australiano L Grow, cruza terminada con grano para un marmoleo profundo. Jugoso y untuoso, con el balance perfecto entre grasa y sabor a res.', en: 'L Grow Australian wagyu, grain-finished cross with deep marbling. Juicy and rich, with the perfect balance of fat and beef flavor.' },
  kingriver: { es: 'Wagyu australiano King River, corte de exportación con marmoleo abundante. Grasa fina y entreverada que aporta jugosidad, terneza y un sabor profundo a mantequilla.', en: 'King River Australian wagyu, export cut with abundant marbling. Fine, interlaced fat that delivers juiciness, tenderness and a deep, buttery flavor.' },
  us: { es: 'Wagyu cross americano Abatti Ranch, criado en EE.UU. con altos estándares. Marmoleo generoso y sabor intenso, con gran versatilidad para parrilla y cocina.', en: 'Abatti Ranch American wagyu cross, raised in the USA to high standards. Generous marbling and intense flavor, with great versatility for grill and kitchen.' },
}
const ORIGIN = {
  jp: { es: 'Origen y distinción A5\n\nProcede de reses Wagyu Negro Japonés de raza pura, criadas en granjas certificadas de Japón. El grado A5 garantiza la máxima expresión de marmoleo, ternura y sabor, totalmente trazable hasta la prefectura.', en: 'Origin & A5 distinction\n\nSourced from purebred Japanese Black Wagyu cattle, raised on certified Japanese farms. The A5 grade guarantees the fullest expression of marbling, tenderness and flavor, fully traceable to the prefecture.' },
  mackas: { es: "Origen Macka's Pedigree\n\nBlack Angus australiano de la ganadería Macka's Pedigree, criado bajo estrictos estándares de bienestar y terminado con grano. Trazable y consistente, con el sabor clásico a res y un marmoleo confiable.", en: "Macka's Pedigree origin\n\nAustralian Black Angus from the Macka's Pedigree ranch, raised under strict welfare standards and grain-finished. Traceable and consistent, with classic beef flavor and reliable marbling." },
  au: { es: 'Origen Wagyu Australiano L Grow\n\nWagyu australiano de la marca L Grow, cruza terminada con grano para un marmoleo profundo y parejo. Criado bajo estrictos estándares de marmoleo y totalmente trazable.', en: 'L Grow Australian Wagyu origin\n\nAustralian wagyu from the L Grow brand, a grain-finished cross for deep, even marbling. Raised under strict marbling standards and fully traceable.' },
  kingriver: { es: 'Origen King River\n\nWagyu australiano King River, una de las cruzas de wagyu más reconocidas de Australia. Corte de exportación con marmoleo de referencia, terminado con grano y totalmente trazable.', en: 'King River origin\n\nKing River Australian wagyu, one of Australia\u2019s most recognized wagyu crosses. Export cut with reference-grade marbling, grain-finished and fully traceable.' },
  us: { es: 'Origen Abatti Ranch\n\nWagyu cross americano del rancho Abatti (EE.UU.), criado con altos estándares de alimentación y bienestar. Combina genética wagyu con la robustez de la res americana para un sabor intenso y versátil.', en: 'Abatti Ranch origin\n\nAmerican wagyu cross from Abatti Ranch (USA), raised with high feeding and welfare standards. It blends wagyu genetics with the robustness of American beef for an intense, versatile flavor.' },
}
const BADGE = {
  jp: { es: 'A5 · Japón', en: 'A5 · Japan' }, mackas: { es: 'Black Angus', en: 'Black Angus' },
  au: { es: 'Australia · L Grow', en: 'Australia · L Grow' }, kingriver: { es: 'King River · Australia', en: 'King River · Australia' }, us: { es: 'Cross Americano', en: 'American Cross' },
}

// ---- Cut copy (bilingual lead + use + cook) -------------------------------
const CUT = {
  filete:{es:{lead:'El filete (tenderloin) es el corte más tierno de la res: fibra fina, magro y de forma uniforme.',use:'Ideal para medallones, tournedós y presentaciones donde la terneza manda.',cook:'Atempera, seca la superficie y sella 1–2 min por lado a fuego alto. Término medio-rojo (52–54 °C). Reposa 4 min.'},en:{lead:'The tenderloin is the most tender cut of beef: fine grain, lean and uniform in shape.',use:'Ideal for medallions, tournedos and presentations where tenderness rules.',cook:'Temper, pat dry and sear 1–2 min per side over high heat. Medium-rare (52–54 °C). Rest 4 min.'}},
  kobe:{es:{lead:'Filete tenderloin con genética Kobe — el grado más exclusivo del wagyu japonés. Terneza extrema y marmoleo que se deshace al contacto.',use:'Reservado para la mesa de mayor nivel. Porciones pequeñas: la grasa hace el trabajo.',cook:'Sella 60–90 seg por lado a fuego muy alto, sin aceite. Medio-rojo. Sal en escamas al final.'},en:{lead:'Tenderloin filet with Kobe genetics — the most exclusive grade of Japanese wagyu. Extreme tenderness and marbling that melts on contact.',use:'Reserved for the highest-end table. Small portions: the fat does the work.',cook:'Sear 60–90 sec per side over very high heat, no oil. Medium-rare. Flaky salt to finish.'}},
  ribeye:{es:{lead:'El rib eye (cube roll) equilibra el ojo central magro y la cresta de grasa exterior — dos texturas en una pieza.',use:'El corte rey de la parrilla. Excelente sellado, a la plancha o cortado fino.',cook:'Sella 2–3 min por lado hasta costra dorada. Medio (54–57 °C) para fundir el marmoleo. Reposa 5 min.'},en:{lead:'The rib eye (cube roll) balances the lean central eye and the outer fat cap — two textures in one piece.',use:'The king of the grill. Excellent seared, on the griddle or sliced thin.',cook:'Sear 2–3 min per side until a golden crust forms. Medium (54–57 °C) to render the marbling. Rest 5 min.'}},
  ribeyeHueso:{es:{lead:'Rib eye con hueso (export rib) — el hueso aporta sabor y una presentación imponente.',use:'Pieza de impacto para asadores y mesas compartidas.',cook:'Sella y termina a calor indirecto/horno a 140 °C hasta 54–57 °C al centro. Reposa 6–8 min.'},en:{lead:'Bone-in rib eye (export rib) — the bone adds flavor and a striking presentation.',use:'A showpiece for grill masters and shared tables.',cook:'Sear and finish over indirect heat or a 140 °C oven until 54–57 °C at the center. Rest 6–8 min.'}},
  ribcap:{es:{lead:'Rib cap (tapa de rib eye) — la parte más marmoleada y sabrosa de la costilla, codiciada por los conocedores.',use:'Enróllala para medallones o ásala entera. Sabor de rib eye concentrado.',cook:'Sella rápido y fuerte; por su grasa se cocina pronto. Medio. Reposa 4 min.'},en:{lead:'Rib cap (spinalis) — the most marbled, flavorful part of the rib, prized by connoisseurs.',use:'Roll it for medallions or grill it whole. Concentrated rib-eye flavor.',cook:'Sear fast and hot; its fat cooks it quickly. Medium. Rest 4 min.'}},
  ny:{es:{lead:'New York (striploin) — equilibrio entre marmoleo y mordida firme, con su banda de grasa lateral.',use:'Clásico steakhouse. Rinde excelente entero o en bistecs gruesos.',cook:'Sella 2–3 min por lado, parando la grasa lateral hacia el calor. Medio (54–57 °C). Reposa 5 min.'},en:{lead:'New York (striploin) — balance of marbling and a firm bite, with its signature lateral fat band.',use:'Steakhouse classic. Great whole or in thick steaks.',cook:'Sear 2–3 min per side, standing the fat band toward the heat. Medium (54–57 °C). Rest 5 min.'}},
  picana:{es:{lead:'Picaña (rump cap) — corte brasileño por excelencia, con una capa de grasa superior que se vuelve crujiente.',use:'Estrella del asado. Córtala en C contra la fibra o ásala entera con la grasa hacia arriba.',cook:'Marca la grasa, sella con la capa hacia el fuego y termina a calor medio. Medio. Reposa 5 min.'},en:{lead:'Picanha (rump cap) — the quintessential Brazilian cut, with a top fat layer that turns crisp.',use:'Star of the cookout. Slice in C against the grain or grill whole, fat-side up.',cook:'Score the fat, sear fat-side toward the fire and finish over medium heat. Medium. Rest 5 min.'}},
  flatiron:{es:{lead:'Flat iron (de la paleta) — corte tierno y muy marmoleado, una joya de precio inteligente.',use:'Versátil para parrilla, fajitas o cortado fino.',cook:'Sella 2–3 min por lado a fuego alto. Medio-rojo. Corta fino en contra de la fibra.'},en:{lead:'Flat iron (from the shoulder) — a tender, heavily marbled cut and a smart-value gem.',use:'Versatile for grilling, fajitas or slicing thin.',cook:'Sear 2–3 min per side over high heat. Medium-rare. Slice thin against the grain.'}},
  paleta:{es:{lead:'Paleta (bolar blade / shoulder clod) — corte de espaldilla, sabroso y de buen rendimiento.',use:'Excelente para braseados, mechado, fajitas y porciones de volumen.',cook:'Bistec: sella y sirve medio. Braseado: cocción lenta 2–3 h hasta deshebrar.'},en:{lead:'Shoulder clod (bolar blade) — a flavorful, high-yield shoulder cut.',use:'Great for braises, shredded beef, fajitas and high-volume portions.',cook:'Steak: sear and serve medium. Braise: slow-cook 2–3 h until it shreds.'}},
  diezmillo:{es:{lead:'Diezmillo (chuck roll) — corte de cuello/espaldilla con buen marmoleo y sabor intenso a res.',use:'Muy versátil: bistec marinado, fajitas, guisos y braseados.',cook:'Bistec fino: sella rápido y fuerte. Pieza grande: braseado lento hasta terneza total.'},en:{lead:'Chuck roll (diezmillo) — a neck/shoulder cut with good marbling and intense beef flavor.',use:'Very versatile: marinated steak, fajitas, stews and braises.',cook:'Thin steak: sear fast and hot. Large piece: slow braise until fully tender.'}},
  brisket:{es:{lead:'Brisket (pecho) — el corte del barbecue por excelencia, con su característica capa de grasa.',use:'Ahumado lento, pastrami o braseado. La paciencia lo transforma en mantequilla.',cook:'Ahúma a 110–120 °C hasta 92–96 °C al centro (10–14 h). Reposa 1 h envuelto.'},en:{lead:'Brisket — the quintessential barbecue cut, with its signature fat cap.',use:'Low-and-slow smoke, pastrami or braise. Patience turns it to butter.',cook:'Smoke at 110–120 °C until 92–96 °C internal (10–14 h). Rest 1 h wrapped.'}},
  shortrib:{es:{lead:'Short rib (costilla, con o sin hueso) — corte jugoso y muy marmoleado, intenso en sabor.',use:'Rey del braseado y el ahumado. También en finas láminas para parrilla coreana.',cook:'Braseado: 3 h a 160 °C hasta deshebrar. Parrilla (rebanado): sella 1–2 min por lado.'},en:{lead:'Short rib (bone-in or boneless) — a juicy, heavily marbled cut, intense in flavor.',use:'King of braising and smoking. Also thin-sliced for Korean BBQ.',cook:'Braise: 3 h at 160 °C until it shreds. Grill (sliced): sear 1–2 min per side.'}},
  karubi:{es:{lead:'Karubi (plate short rib) — costilla de plato, el corte estrella del yakiniku.',use:'Rebánalo fino para asar en mesa. Marmoleo abundante y sabor profundo.',cook:'Rebana 3–5 mm y asa 30–60 seg por lado a fuego muy alto.'},en:{lead:'Karubi (plate short rib) — the star cut of yakiniku and Korean BBQ.',use:'Slice thin for tabletop grilling. Abundant marbling and deep flavor.',cook:'Slice 3–5 mm and grill 30–60 sec per side over very high heat.'}},
  sirloin:{es:{lead:'Sirloin (con picaña D-rump) — corte magro y firme con excelente sabor a res.',use:'Bistec versátil, brochetas o cortado fino.',cook:'Sella 2–3 min por lado a fuego alto. No pases de medio. Reposa 4 min.'},en:{lead:'Sirloin (with picanha D-rump) — a lean, firm cut with excellent beef flavor.',use:'Versatile steak, skewers or thin slices.',cook:'Sear 2–3 min per side over high heat. Don\u2019t go past medium. Rest 4 min.'}},
  rostbiff:{es:{lead:'Sirloin rostbiff — corte magro de cadera, ideal para roast beef y rebanadas finas.',use:'Asado entero al horno o laminado para fríos y sándwiches.',cook:'Sella y hornea a 160 °C hasta 52–54 °C al centro. Reposa 10 min y rebana fino.'},en:{lead:'Sirloin rostbiff — a lean hip cut, ideal for roast beef and thin slicing.',use:'Roast whole or shave for cold cuts and sandwiches.',cook:'Sear and roast at 160 °C until 52–54 °C internal. Rest 10 min and slice thin.'}},
  tablita:{es:{lead:'Tablita (chuck tail / tira de asado) — costilla cruzada, jugosa y llena de sabor.',use:'Clásico de la parrilla mexicana y el asado. Para compartir.',cook:'Asa a fuego medio-alto 4–6 min por lado.'},en:{lead:'Tablita (chuck tail / short rib flap) — a cross-cut rib strip, juicy and full of flavor.',use:'A classic of the Mexican grill and asado. Made for sharing.',cook:'Grill over medium-high 4–6 min per side.'}},
  tomahawk:{es:{lead:'Tomahawk — rib eye con el hueso de la costilla limpio y largo. Espectáculo en la mesa.',use:'La pieza central de cualquier asado. Para compartir.',cook:'Sella todos los lados y termina a calor indirecto/horno a 140 °C hasta 54–57 °C. Reposa 8–10 min.'},en:{lead:'Tomahawk — rib eye with the long, frenched rib bone. A showstopper.',use:'The centerpiece of any cookout. Made for sharing.',cook:'Sear all sides and finish over indirect heat / 140 °C oven until 54–57 °C. Rest 8–10 min.'}},
  flap:{es:{lead:'Vacío (flap meat) — fibra abierta que absorbe marinadas y se llena de sabor.',use:'Excelente para tacos, fajitas y parrilla rápida.',cook:'Sella fuerte 2–3 min por lado. Corta SIEMPRE fino y en contra de la fibra.'},en:{lead:'Flap meat (vacío) — an open, loose grain that soaks up marinades and packs flavor.',use:'Excellent for tacos, fajitas and quick grilling.',cook:'Sear hard 2–3 min per side. ALWAYS slice thin and against the grain.'}},
  arrachera:{es:{lead:'Arrachera (skirt steak) — el corte clásico de la fajita, fibra marcada y mucho sabor.',use:'Marínala y ásala rápido. Insuperable para tacos y fajitas.',cook:'Fuego muy alto, 2–3 min por lado. Corta fino en contra de la fibra.'},en:{lead:'Skirt steak (arrachera) — the classic fajita cut, pronounced grain and big flavor.',use:'Marinate and grill fast. Unbeatable for tacos and fajitas.',cook:'Very high heat, 2–3 min per side. Slice thin against the grain.'}},
  chamorro:{es:{lead:'Chamorro (shin / shank) — rico en colágeno, se vuelve gelatinoso y tierno con cocción lenta.',use:'Osobuco, braseados y caldos de sabor profundo.',cook:'Brasea 2.5–3 h a fuego bajo con líquido hasta que se separe del hueso.'},en:{lead:'Shin / shank (chamorro) — collagen-rich, turns gelatinous and tender with slow cooking.',use:'Osso buco, braises and deep-flavored broths.',cook:'Braise 2.5–3 h over low heat with liquid until it pulls from the bone.'}},
  ribfinger:{es:{lead:'Rib finger — las tiras de carne de entre las costillas, jugosas y muy sabrosas.',use:'Bocados premium para parrilla, brochetas o glaseados.',cook:'Asa a fuego medio 6–8 min girando, o brasea hasta terneza.'},en:{lead:'Rib fingers — the meat strips from between the ribs, juicy and very flavorful.',use:'Premium bites for the grill, skewers or glazing.',cook:'Grill over medium 6–8 min turning, or braise until tender.'}},
  shortplate:{es:{lead:'Short plate — corte de plato, marmoleado, base del clásico rollo laminado.',use:'Ideal rebanado fino para hot pot, sukiyaki y parrilla coreana.',cook:'Rebana fino (congela ligeramente) y cocina 30–60 seg en caldo o plancha.'},en:{lead:'Short plate — a marbled plate cut, the base of the classic shaved beef roll.',use:'Ideal thin-sliced for hot pot, sukiyaki and Korean BBQ.',cook:'Slice thin (semi-freeze) and cook 30–60 sec in broth or on a griddle.'}},
  backrib:{es:{lead:'Meaty back rib — costillas de lomo con buena cobertura de carne entre los huesos.',use:'Para el horno o el ahumador, con glaseado o salsa BBQ.',cook:'Hornea/ahúma a 150 °C 2.5–3 h. Glasea en los últimos 20 min.'},en:{lead:'Meaty back ribs — loin ribs with good meat coverage between the bones.',use:'For the oven or smoker, with a glaze or BBQ sauce.',cook:'Bake/smoke at 150 °C for 2.5–3 h. Glaze in the last 20 min.'}},
  tuetano:{es:{lead:'Tuétano (femur bones) — hueso con médula, untuoso y lleno de sabor.',use:'Al horno para untar en pan, o como base de caldos y salsas.',cook:'Hornea a 200 °C 15–20 min hasta que la médula burbujee.'},en:{lead:'Marrow (femur bones) — bone with marrow, rich and full of flavor.',use:'Roasted to spread on bread, or as a base for broths and sauces.',cook:'Roast at 200 °C for 15–20 min until the marrow bubbles.'}},
  hanging:{es:{lead:'Hanging tender (entraña fina) — corte de un solo músculo, tierno y de sabor profundo.',use:'Favorito de bistró. Marínalo y ásalo rápido.',cook:'Fuego alto, 2–3 min por lado a medio-rojo. Retira la membrana y corta fino.'},en:{lead:'Hanging tender (hanger steak) — a single-muscle cut, tender with deep flavor.',use:'A bistro favorite. Marinate and grill fast.',cook:'High heat, 2–3 min per side to medium-rare. Remove the membrane and slice thin.'}},
  lengua:{es:{lead:'Lengua — corte tradicional que, bien cocido, queda suave y meloso.',use:'Tacos de lengua, guisos y braseados.',cook:'Cuece 2.5–3 h hasta suave, retira la piel y dora o brasea en su salsa.'},en:{lead:'Tongue (lengua) — a traditional cut that, properly cooked, turns soft and silky.',use:'Tongue tacos, stews and braises.',cook:'Simmer 2.5–3 h until tender, peel the skin and sear or braise in its sauce.'}},
}

const FB_LGROW = { es: 'L Grow · Fullblood', en: 'L Grow · Fullblood' }
const FB_JEWEL = { es: 'Jewel · Fullblood', en: 'Jewel · Fullblood' }

// [id, cutKey, nameES, nameEN, variants[[label,lo,hi,sku,imgOverride?]], badgeOverride?]
const MASTER = {
  jp: [
    ['diezmilloJp','diezmillo','Diezmillo Chuck Roll Wagyu A5','Chuck Roll Japanese Wagyu A5',[['10-12',10,12,'DIEZA5']]],
    ['flatironJp','flatiron','Flat Iron Wagyu A5','Flat Iron Japanese Wagyu A5',[['11-12',11,12,'FLAT']]],
    ['ribfingerJp','ribfinger','Rib Finger Wagyu A5','Rib Finger Japanese Wagyu A5',[['10-12',10,12,'FINGER']]],
    ['shortplateJp','shortplate','Short Plate Wagyu A5','Short Plate Japanese Wagyu A5',[['10-12',10,12,'SHORTP']]],
    ['shortribJp','shortrib','Short Rib Kit Wagyu A5','Short Rib Kit Japanese Wagyu A5',[['10-12',10,12,'SHORTA5']]],
    ['sirloinJp','sirloin','Sirloin Set Wagyu A5','Sirloin Set Japanese Wagyu A5',[['10-12',10,12,'SIRLOIN']]],
    ['flapJp','flap','Vacío Flap Wagyu A5','Flap Meat Japanese Wagyu A5',[['10-12',10,12,'FLAP']]],
    ['tablitaJp','tablita','Tablita Chuck Tail Wagyu A5','Chuck Tail Tablita Japanese Wagyu A5',[['11-12',11,12,'CHUCK']]],
    ['kobeFilete','kobe','Filete Tenderloin Wagyu Kobe','Tenderloin Kobe Wagyu',[['10-12',10,12,'TENDK']],{es:'Kobe · Japón',en:'Kobe · Japan'}],
  ],
  mackas: [
    ['arracheraMackas','arrachera',"Arrachera Outside Black Angus Macka's","Outside Skirt Black Angus Macka's",[]],
    ['brisketMackas','brisket',"Brisket Black Angus Macka's","Brisket Black Angus Macka's",[['4+',4,9,'390291']]],
    ['diezmilloMackas','diezmillo',"Diezmillo Chuck Roll Black Angus Macka's","Chuck Roll Black Angus Macka's",[['4+',4,9,'391648']]],
    ['hangingMackas','hanging',"Hanging Tender Black Angus Macka's","Hanging Tender Black Angus Macka's",[]],
    ['lenguaMackas','lengua',"Lengua Black Angus Macka's","Tongue Black Angus Macka's",[]],
    ['picanaMackas','picana',"Picaña Black Angus Macka's","Picanha Black Angus Macka's",[['4+',4,9,'390288'],['6+',6,9,'390295']]],
    ['ribeyeMackas','ribeye',"Rib Eye Cube Roll Lip Off Black Angus Macka's","Rib Eye Cube Roll Lip Off Black Angus Macka's",[['4+',4,9,'390290'],['6+',6,9,'390293']]],
    ['tomahawkMackas','tomahawk',"Tomahawk Black Angus Macka's","Tomahawk Black Angus Macka's",[['2+',2,9,'391644']]],
  ],
  au: [
    ['arracheraAu','arrachera','Arrachera Outside Thin Skirt L Grow','Outside Thin Skirt Wagyu L Grow',[]],
    ['fileteAu','filete','Filete Tenderloin Wagyu L Grow','Tenderloin Australian Wagyu L Grow',[['8-9',8,9,'LF8-9']]],
    ['fileteFbAu','filete','Filete Tenderloin Wagyu Fullblood L Grow','Fullblood Tenderloin Wagyu L Grow',[['9+',9,10,'LF9+']],FB_LGROW],
    ['newyorkAu','ny','New York Striploin Wagyu L Grow','New York Striploin Australian Wagyu L Grow',[['8-9',8,9,'LN8-9']]],
    ['newyorkFbAu','ny','New York Striploin Wagyu Fullblood L Grow','Fullblood New York Striploin Wagyu L Grow',[['9+',9,10,'LN9+']],FB_LGROW],
    ['picanaAu','picana','Picaña Rump Cap Wagyu L Grow','Picanha Rump Cap Australian Wagyu L Grow',[['8-9',8,9,'LP8-9']]],
    ['ribeyeAu','ribeye','Rib Eye Cube Roll Wagyu L Grow','Rib Eye Cube Roll Australian Wagyu L Grow',[['6-7',6,7,'343697'],['8-9',8,9,'LR8-9']]],
    ['flapAu','flap','Vacío Flap Meat Wagyu L Grow','Flap Meat Australian Wagyu L Grow',[['8-9',8,9,'343682']]],
  ],
  kingriver: [
    ['arracheraKr','arrachera','Arrachera Inside Skirt King River','Inside Skirt Wagyu King River',[['0-3',0,3,'448826']]],
    ['brisketKr','brisket','Brisket Deckle Off King River','Brisket Deckle Off Wagyu King River',[['9+',9,10,'448740']]],
    ['chamorroKr','chamorro','Chamorro Shin Shank King River','Shin Shank Wagyu King River',[['6-7',6,7,'448843']]],
    ['chuckshortribKr','shortrib','Chuck Short Rib King River','Chuck Short Rib Wagyu King River',[['0-3',0,3,'448825'],['4-5',4,5,'448839']]],
    ['diezmilloKr','diezmillo','Diezmillo Chuck Roll King River','Chuck Roll Wagyu King River',[['0-3',0,3,'448772'],['4-5',4,5,'448731'],['6-7',6,7,'448732']]],
    ['fileteKr','filete','Filete Tenderloin King River','Tenderloin Wagyu King River',[['0-3',0,3,'448729']]],
    ['karubiKr','karubi','Karubi Plate King River','Karubi Plate Wagyu King River',[['4-5',4,5,'448841']]],
    ['newyorkKr','ny','New York Striploin King River','New York Striploin Wagyu King River',[['2-3',2,3,'448721'],['4-5',4,5,'448701'],['9+',9,10,'416171']]],
    ['paletaKr','paleta','Paleta Bolar Blade King River','Bolar Blade Wagyu King River',[['4-5',4,5,'448824']]],
    ['picanaKr','picana','Picaña Rump Cap King River','Picanha Rump Cap Wagyu King River',[['0-3',0,3,'448827'],['9+',9,10,'448719']]],
    ['ribeyehuesoKr','ribeyeHueso','Rib Eye c/Hueso Export Rib King River','Bone-in Rib Eye Export Rib Wagyu King River',[['0-3',0,3,'448783'],['6-7',6,7,'448842']]],
    ['sirloinKr','sirloin','Sirloin c/Picaña D-Rump King River','Sirloin w/Picanha D-Rump Wagyu King River',[['2-3',2,3,'448699'],['4-5',4,5,'448700'],['6-7',6,7,'448703']]],
    ['rostbiffKr','rostbiff','Sirloin Rostbiff King River','Sirloin Rostbiff Wagyu King River',[['4-5',4,5,'448714'],['6-7',6,7,'448716']]],
    ['tablitaKr','tablita','Tablita Chuck Tail King River','Chuck Tail Tablita Wagyu King River',[['0-3',0,3,'448840']]],
    ['tomahawkKr','tomahawk','Tomahawk King River','Tomahawk Wagyu King River',[['0-3',0,3,'448741']]],
    ['flapKr','flap','Vacío Flap Meat King River','Flap Meat Wagyu King River',[['9+',9,10,'448735']]],
    ['flatironKr','flatiron','Flat Iron Purebred King River','Flat Iron Purebred Wagyu King River',[['9+',9,10,'448596']]],
    ['jewelDiezmilloKr','diezmillo','Diezmillo Chuck Roll Fullblood Jewel','Chuck Roll Fullblood Wagyu Jewel',[['9+',9,10,'448593']],FB_JEWEL],
    ['jewelNewyorkKr','ny','New York Fullblood Jewel','New York Fullblood Wagyu Jewel',[['9+',9,10,'448577']],FB_JEWEL],
    ['jewelPaletaKr','paleta','Paleta Bolar Blade Fullblood Jewel','Bolar Blade Fullblood Wagyu Jewel',[['9+',9,10,'448594']],FB_JEWEL],
    ['jewelRibeyeKr','ribeye','Rib Eye Cube Roll Fullblood Jewel','Rib Eye Cube Roll Fullblood Wagyu Jewel',[['9+',9,10,'448574']],FB_JEWEL],
  ],
  us: [
    ['arracheraUs','arrachera','Arrachera Inside Skirt Abatti Ranch','Inside Skirt Wagyu Cross Abatti Ranch',[['8+',8,10,'62195-1']]],
    ['brisketUs','brisket','Brisket Abatti Ranch','Brisket Wagyu Cross Abatti Ranch',[['6-7',6,7,'71815-1'],['8+',8,10,'61815-1']]],
    ['chuckshortribUs','shortrib','Chuck Short Rib Abatti Ranch','Chuck Short Rib Wagyu Cross Abatti Ranch',[['4-5',4,5,'83045-1']]],
    ['costillaUs','shortrib','Costilla Short Rib s/Hueso Abatti Ranch','Boneless Short Rib Wagyu Cross Abatti Ranch',[['6-7',6,7,'72395-1'],['8+',8,10,'62395-1']]],
    ['diezmilloUs','diezmillo','Diezmillo Chuck Roll Abatti Ranch','Chuck Roll Wagyu Cross Abatti Ranch',[['8+',8,10,'61655-1']]],
    ['fileteUs','filete','Filete Tenderloin Abatti Ranch','Tenderloin Wagyu Cross Abatti Ranch',[['4-5',4,5,'88935-1']]],
    ['backribUs','backrib','Meaty Back Rib Abatti Ranch','Meaty Back Rib Wagyu Cross Abatti Ranch',[['8+',8,10,'62435-3']]],
    ['newyorkUs','ny','New York Striploin Abatti Ranch','New York Striploin Wagyu Cross Abatti Ranch',[['6-7',6,7,'78035-1-AB'],['8+',8,10,'68035-1']]],
    ['paletaUs','paleta','Paleta Shoulder Clod Abatti Ranch','Shoulder Clod Wagyu Cross Abatti Ranch',[['8+',8,10,'61433-1']]],
    ['picanaUs','picana','Picaña Abatti Ranch','Picanha Wagyu Cross Abatti Ranch',[['8+',8,10,'68465-1']]],
    ['ribcapUs','ribcap','Rib Cap Abatti Ranch','Rib Cap Wagyu Cross Abatti Ranch',[['4-5',4,5,'82955-1']]],
    ['ribeyeliponUs','ribeye','Rib Eye Lip On Abatti Ranch','Rib Eye Lip On Wagyu Cross Abatti Ranch',[['6-7',6,7,'71235-1'],['8+',8,10,'RBABA']]],
    ['tuetanoUs','tuetano','Tuétano Femur Bones Abatti Ranch','Marrow Femur Bones Wagyu Cross Abatti Ranch',[]],
  ],
}

// Marbling added onto original hand-written products (patched in place).
const PATCH = {
  tritip:{cat:'jp',v:[['11-12',11,12,'TRI TIP']]},
  filete:{cat:'jp',v:[['10-12',10,12,'PLUS']]},
  ribeyeJp:{cat:'jp',v:[['10-12',10,12,'RBA5']]},
  picana:{cat:'jp',v:[['11-12',11,12,'COULOTT']]},
  topround:{cat:'jp',v:[['10-12',10,12,null]]},
  nyangus:{cat:'mackas',v:[['6+',6,9,'390292']]},
  ribeye:{cat:'au',v:[['4-5',4,5,null]]},
  ribeyeLow:{cat:'au',v:[['0-3',0,3,null]]},
  newyork:{cat:'au',v:[['8-9',8,9,null]]},
  tbone:{cat:'au',v:[['8-9',8,9,null]]},
  paleta:{cat:'au',v:[['8-9',8,9,null]]},
  denver:{cat:'au',v:[['8-9',8,9,null]]},
  'king-river':{cat:'kingriver',ribeyeImgs:true,v:[['0-3',0,3,'448730'],['4-5',4,5,'448702'],['6-7',6,7,'448705'],['8-9',8,9,'448708'],['9+',9,10,'416172']]},
}

// ---- helpers --------------------------------------------------------------
function variantImage(cutKey, cat, hi, override) {
  if (override) return override
  if (cutKey === 'ribeye' && (cat === 'au' || cat === 'kingriver')) return ribeyeImg(hi, cat)
  return imageFor(cutKey, cat)
}
function buildVariants(cutKey, cat, rows) {
  return rows.map(([label, lo, hi, sku, img]) => {
    const v = { label, lo, hi, image: variantImage(cutKey, cat, hi, img) }
    if (sku) v.sku = sku
    return v
  })
}
function marblingFrom(cat, variants) {
  return variants.length ? { system: SYS[cat], variants } : null
}

// ---- build ----------------------------------------------------------------
// Real L Grow (Australian) product photos, by cut. Cover first, then gallery.
// Applied to Australian/cross cuts; A5 (jp) keeps its own photos, and cuts that
// already carry real low/med/high marbling photos are left untouched.
const APPLY_CATS = new Set(['au', 'kingriver', 'us', 'mackas'])
const PHOTOS = {
  filete: ['lgrow-tenderloin-top.webp', 'lgrow-tenderloin-side.webp', 'lgrow-tenderloin-hero.webp'],
  ribeye: ['lgrow-cube-roll-top.webp', 'lgrow-cube-roll-side.webp', 'lgrow-cube-roll-hero.webp'],
  ny: ['lgrow-striploin-top.webp', 'lgrow-striploin-side.webp', 'lgrow-striploin-hero.webp'],
  flatiron: ['lgrow-oyster-blade-top.webp', 'lgrow-oyster-blade-side.webp', 'lgrow-oyster-blade-hero.webp'],
  paleta: ['lgrow-bolar-blade-top.webp', 'lgrow-bolar-blade-side.webp'],
  diezmillo: ['lgrow-chuck-eye-roll-top.webp', 'lgrow-chuck-eye-roll-side.webp'],
  tablita: ['lgrow-chuck-tail-flap-top.webp', 'lgrow-chuck-tail-flap-side.webp'],
  flap: ['lgrow-flap-meat-top.webp', 'lgrow-flap-meat-side.webp'],
  chamorro: ['lgrow-shin-shank-top.webp', 'lgrow-shin-shank-side.webp'],
  arrachera: ['lgrow-inside-skirt-top.webp', 'lgrow-inside-skirt-side.webp'],
  karubi: ['lgrow-karubi-plate-top.webp', 'lgrow-karubi-plate-side.webp'],
  brisket: ['lgrow-pe-brisket-top.webp', 'lgrow-pe-brisket-side.webp'],
  ribcap: ['lgrow-rib-cap-meat-top.webp', 'lgrow-rib-cap-meat-side.webp'],
  ribfinger: ['lgrow-rib-fingers-top.webp', 'lgrow-rib-fingers-side.webp'],
  rostbiff: ['lgrow-rostbiff-top.webp', 'lgrow-rostbiff-side.webp'],
  picana: ['lgrow-rump-cap-top.webp', 'lgrow-rump-cap-side.webp'],
  shortrib: ['lgrow-short-rib-meat-top.webp', 'lgrow-short-rib-meat-side.webp'],
}

const GEN = '__gen'
const base = catalog.filter((p) => !String(p.id).endsWith(GEN))

// 1) patch originals
const byId = Object.fromEntries(base.map((p) => [p.id, p]))
for (const id in PATCH) {
  const p = byId[id]; if (!p) continue
  const cfg = PATCH[id]
  const own = (p.images || [])[0] || HERO
  // ribeyeImgs => grade-mapped photos; otherwise keep the product's own photo
  const rows = cfg.ribeyeImgs ? cfg.v : cfg.v.map(([l, lo, hi, sku]) => [l, lo, hi, sku, own])
  const variants = buildVariants('ribeye', cfg.cat, rows)
  p.marbling = marblingFrom(cfg.cat, variants)
  if (cfg.ribeyeImgs) {
    const imgs = [...new Set(variants.map((v) => v.image))]
    if (imgs.length) p.images = imgs
  }
}

// 2) generate the rest
let toneI = 0
const generated = []
for (const cat of Object.keys(MASTER)) {
  for (const [rawId, cutKey, nameES, nameEN, rows, badgeOv] of MASTER[cat]) {
    const id = rawId + GEN
    const cut = CUT[cutKey]; if (!cut) throw new Error(`Missing CUT copy "${cutKey}" (${rawId})`)
    let variants = buildVariants(cutKey, cat, rows)
    const distinctNow = new Set(variants.map((v) => v.image)).size
    const photo = APPLY_CATS.has(cat) ? PHOTOS[cutKey] : null
    const gradePhotos = [...new Set(variants.map((v) => v.image))]
    let images
    if (distinctNow > 1 && gradePhotos.every((f) => HAVE.has(f))) {
      // genuine multi-tier marbling photos that exist (e.g. rib eye) — keep them
      images = gradePhotos
    } else if (photo && photo.every((f) => HAVE.has(f))) {
      // a real L Grow photo set for this cut, and the files are present
      images = [...photo]
      variants = variants.map((v) => ({ ...v, image: photo[0] }))
    } else {
      // no real photo on disk yet — show the branded coming-soon card
      images = [PLACEHOLDER]
      variants = variants.map((v) => ({ ...v, image: PLACEHOLDER }))
    }
    const badge = badgeOv || BADGE[cat]
    generated.push({
      id, cat, tone: TONES[toneI++ % TONES.length], images,
      badge: { es: badge.es, en: badge.en },
      marbling: marblingFrom(cat, variants),
      es: { name: nameES, description: `${cut.es.lead}\n\n${GRADE[cat].es}\n\n${cut.es.use}`, origin: ORIGIN[cat].es, cooking: `Recomendaciones de cocción\n\n${cut.es.cook}` },
      en: { name: nameEN, description: `${cut.en.lead}\n\n${GRADE[cat].en}\n\n${cut.en.use}`, origin: ORIGIN[cat].en, cooking: `Cooking recommendations\n\n${cut.en.cook}` },
    })
  }
}

const out = [...base, ...generated]
writeFileSync(PATH, JSON.stringify(out, null, 2) + '\n', 'utf8')
const byCat = {}; for (const p of out) byCat[p.cat] = (byCat[p.cat] || 0) + 1
const withMarb = out.filter((p) => p.marbling).length
const multi = out.filter((p) => p.marbling && p.marbling.variants.length > 1).length
console.log(`Total ${out.length} | generated ${generated.length} | with marbling ${withMarb} | multi-variant ${multi}`)
console.log('Per category:', byCat)
