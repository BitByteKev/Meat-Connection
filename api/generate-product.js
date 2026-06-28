// Vercel serverless function — drafts a product's name + bilingual copy with Claude.
// The admin "Generar con IA" button posts the cover image, category, and optional
// notes; this returns { es, en } each with { name, description, origin, cooking }.
// Claude identifies the cut and estimates marbling from the photo, so the owner
// doesn't have to name the product first. Nothing is persisted here — the admin
// drops the text into the editor and saves via save-products.
//
// Request:  POST { password, cat, notes?, name?, image? {media_type,data} }
// Env vars: ADMIN_PASSWORD, ANTHROPIC_API_KEY
import { timingSafeEqual } from 'node:crypto'
import Anthropic from '@anthropic-ai/sdk'

export const config = { maxDuration: 30 }

const CATS = new Set(['jp', 'au', 'us'])
const ORIGIN = {
  jp: { es: 'Wagyu Japonés A5', en: 'Japanese Wagyu A5' },
  au: { es: 'Wagyu Australiano', en: 'Australian Wagyu' },
  us: { es: 'Black Angus (EE.UU.)', en: 'Black Angus (USA)' },
}
const IMG_TYPES = new Set(['image/jpeg', 'image/png', 'image/gif', 'image/webp'])

// Pull the JSON object out of the model's reply, tolerating a stray ```json
// fence or surrounding prose. Returns the parsed object or null.
function extractJson(text) {
  if (typeof text !== 'string') return null
  let s = text.trim()
  const fence = s.match(/```(?:json)?\s*([\s\S]*?)```/i)
  if (fence) s = fence[1].trim()
  try { return JSON.parse(s) } catch {}
  const first = s.indexOf('{')
  const last = s.lastIndexOf('}')
  if (first !== -1 && last > first) {
    try { return JSON.parse(s.slice(first, last + 1)) } catch {}
  }
  return null
}

// True only if the payload has both languages with all four string fields.
function validShape(d) {
  if (!d || typeof d !== 'object') return false
  for (const lang of ['es', 'en']) {
    const L = d[lang]
    if (!L || typeof L !== 'object') return false
    for (const f of ['name', 'description', 'origin', 'cooking']) {
      if (typeof L[f] !== 'string') return false
    }
  }
  return true
}

// Constant-time compare (same approach as save-products.js).
function passwordMatches(given, expected) {
  if (typeof given !== 'string' || typeof expected !== 'string' || !expected) return false
  const a = Buffer.from(given)
  const b = Buffer.from(expected)
  if (a.length !== b.length) {
    timingSafeEqual(b, b)
    return false
  }
  return timingSafeEqual(a, b)
}

const SYSTEM = `Eres un redactor publicitario bilingüe experto para Meat Connection, importadora premium de wagyu y carnes finas en México.
Recibes una FOTO del corte (y a veces notas del dueño). A partir de la foto, identifica de qué corte se trata y estima el nivel de marmoleo (Alto, Medio o Bajo).
Escribes con precisión: nunca inventas grados, certificaciones, premios, granjas ni cifras que no veas en la foto o que no estén en las notas. Si no sabes un dato, sé general en lugar de inventarlo.

Generas contenido en dos idiomas — español de México (principal) e inglés — con cuatro campos cada uno:
- name: nombre comercial del producto siguiendo el estilo del catálogo.
  Español: "{Corte} {ORIGEN_ES} · Marmoleo {Nivel}"  (ej. "Rib Eye Wagyu Australiano · Marmoleo Medio")
  Inglés:  "{Cut} {ORIGEN_EN} · {Level} Marbling"     (ej. "Rib Eye Australian Wagyu · Medium Marbling")
- description: 2 o 3 párrafos cortos. La PRIMERA línea debe funcionar sola como un gancho de una sola oración (se muestra en la tarjeta del catálogo).
- origin: procedencia — raza, región, grado o alimentación que se conozca; si no se sabe, sé general sin inventar.
- cooking: preparación práctica (calor, tiempos, reposo, término).

Separa los párrafos con una línea en blanco. Si haces listas, inicia cada línea con "• ".

Responde ÚNICAMENTE con un objeto JSON válido, sin markdown ni texto adicional, con esta forma exacta:
{"es":{"name":"...","description":"...","origin":"...","cooking":"..."},"en":{"name":"...","description":"...","origin":"...","cooking":"..."}}
Cada valor es una sola cadena de texto; usa \\n para los saltos de línea dentro de un campo.`

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'method_not_allowed' })
  }
  if (!process.env.ADMIN_PASSWORD || !process.env.ANTHROPIC_API_KEY) {
    return res.status(500).json({ error: 'server_misconfigured' })
  }

  let body = req.body
  if (typeof body === 'string') {
    try { body = JSON.parse(body) } catch { return res.status(400).json({ error: 'bad_json' }) }
  }
  const { password, cat, notes, name, image } = body || {}

  if (!passwordMatches(password, (process.env.ADMIN_PASSWORD || '').trim())) {
    return res.status(401).json({ error: 'unauthorized' })
  }
  if (!CATS.has(cat)) {
    return res.status(400).json({ error: 'invalid_payload', detail: 'cat must be jp|au|us' })
  }

  const hasImage = image && typeof image === 'object'
    && IMG_TYPES.has(image.media_type) && typeof image.data === 'string' && image.data
  const nameHint = typeof name === 'string' && name.trim()

  const userMsg =
    `Categoría / procedencia: ${ORIGIN[cat].es} (en inglés: ${ORIGIN[cat].en}).\n` +
    (cat === 'jp'
      ? 'Es Wagyu Japonés A5, por lo que el marmoleo es Alto.\n'
      : 'Estima el nivel de marmoleo (Alto/Medio/Bajo) a partir de la foto.\n') +
    (nameHint
      ? `Nombre actual (puedes mejorarlo o reemplazarlo): ${name.trim()}\n`
      : 'Aún no hay nombre: créalo a partir de la foto.\n') +
    (typeof notes === 'string' && notes.trim()
      ? `Notas del dueño (úsalas como verdad):\n${notes.trim()}\n`
      : '') +
    (hasImage
      ? 'Usa la foto adjunta para identificar el corte y el marmoleo.'
      : '(No hay foto; infiere a partir de la categoría y las notas, sin inventar datos específicos.)') +
    '\n\nGenera el nombre, la descripción, el origen y la forma de cocinar en español e inglés.'

  const content = []
  if (hasImage) {
    content.push({ type: 'image', source: { type: 'base64', media_type: image.media_type, data: image.data } })
  }
  content.push({ type: 'text', text: userMsg })

  try {
    const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
    // Plain Messages call — the model returns the JSON object directly (the
    // system prompt fixes the shape). Avoids structured-output beta params that
    // drift between SDK and API versions; extractJson tolerates fences/prose.
    const response = await client.messages.create({
      model: 'claude-opus-4-8',
      max_tokens: 4000,
      system: SYSTEM,
      messages: [{ role: 'user', content }],
    })

    if (response.stop_reason === 'refusal') {
      return res.status(502).json({ error: 'generate_refused', detail: 'El modelo rechazó la solicitud.' })
    }
    const textBlock = response.content.find((b) => b.type === 'text')
    const data = extractJson(textBlock && textBlock.text)
    if (!validShape(data)) {
      return res.status(502).json({ error: 'generate_failed', detail: 'Respuesta no válida del modelo.' })
    }
    const pick = (L) => ({ name: L.name, description: L.description, origin: L.origin, cooking: L.cooking })
    return res.status(200).json({ es: pick(data.es), en: pick(data.en) })
  } catch (e) {
    return res.status(502).json({ error: 'generate_failed', detail: String((e && e.message) || e) })
  }
}
