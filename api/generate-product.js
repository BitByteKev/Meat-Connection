// Vercel serverless function — drafts a product's bilingual copy with Claude.
// The admin "Generar con IA" button posts a name/category/notes; this returns
// { es, en } each with { description, origin, cooking }. Nothing is persisted
// here — the admin drops the text into the editor and saves via save-products.
//
// Request:  POST { password, name, cat, notes }
// Env vars: ADMIN_PASSWORD, ANTHROPIC_API_KEY
import { timingSafeEqual } from 'node:crypto'
import Anthropic from '@anthropic-ai/sdk'

export const config = { maxDuration: 30 }

const CATS = new Set(['jp', 'au', 'us'])
const ORIGIN_LABEL = {
  jp: 'Wagyu Japonés A5',
  au: 'Wagyu Australiano',
  us: 'Black Angus (Estados Unidos)',
}

// One language's three fields.
const LANG = {
  type: 'object',
  properties: {
    description: { type: 'string' },
    origin: { type: 'string' },
    cooking: { type: 'string' },
  },
  required: ['description', 'origin', 'cooking'],
  additionalProperties: false,
}
const SCHEMA = {
  type: 'object',
  properties: { es: LANG, en: LANG },
  required: ['es', 'en'],
  additionalProperties: false,
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
Tu voz es segura, apetitosa y concreta — nunca cursi ni genérica.
Escribes con precisión: jamás inventas grados, certificaciones, premios, granjas ni cifras que no estén en las notas. Si no sabes un dato, omítelo en lugar de inventarlo.
Devuelves contenido en dos idiomas: español de México (principal) e inglés.
Para cada idioma entregas tres campos:
- description: 2 o 3 párrafos cortos. La PRIMERA línea debe funcionar sola como un gancho de una sola oración (se muestra en la tarjeta del catálogo).
- origin: procedencia — región o granja, raza, grado o alimentación cuando se conozca.
- cooking: preparación práctica (calor, tiempos, reposo, término).
Separa los párrafos con una línea en blanco. Si haces listas, inicia cada línea con "• ".`

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
  const { password, name, cat, notes } = body || {}

  if (!passwordMatches(password, (process.env.ADMIN_PASSWORD || '').trim())) {
    return res.status(401).json({ error: 'unauthorized' })
  }
  if (typeof name !== 'string' || !name.trim()) {
    return res.status(400).json({ error: 'invalid_payload', detail: 'name is required' })
  }
  if (!CATS.has(cat)) {
    return res.status(400).json({ error: 'invalid_payload', detail: 'cat must be jp|au|us' })
  }

  const noteText = typeof notes === 'string' && notes.trim()
    ? `\n\nNotas del dueño (úsalas como verdad):\n${notes.trim()}`
    : '\n\n(Sin notas adicionales — infiere a partir del nombre y la categoría, sin inventar datos específicos.)'

  const userMsg =
    `Producto: ${name.trim()}\n` +
    `Categoría / procedencia: ${ORIGIN_LABEL[cat]}` +
    noteText +
    `\n\nGenera la descripción, el origen y la forma de cocinar en español e inglés.`

  try {
    const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
    // Structured outputs guarantee the six fields come back schema-valid. In SDK
    // 0.69 this lives on the beta path as top-level `output_format`; the
    // structured-outputs beta header is only auto-added by .parse(), so pass it
    // explicitly here on .create().
    const response = await client.beta.messages.create({
      model: 'claude-opus-4-8',
      max_tokens: 4000,
      system: SYSTEM,
      output_format: { type: 'json_schema', schema: SCHEMA },
      betas: ['structured-outputs-2025-09-17'],
      messages: [{ role: 'user', content: userMsg }],
    })

    if (response.stop_reason === 'refusal') {
      return res.status(502).json({ error: 'generate_refused', detail: 'El modelo rechazó la solicitud.' })
    }
    const textBlock = response.content.find((b) => b.type === 'text')
    if (!textBlock) {
      return res.status(502).json({ error: 'generate_failed', detail: 'Respuesta vacía del modelo.' })
    }
    let data
    try { data = JSON.parse(textBlock.text) } catch {
      return res.status(502).json({ error: 'generate_failed', detail: 'Respuesta no válida del modelo.' })
    }
    return res.status(200).json({ es: data.es, en: data.en })
  } catch (e) {
    return res.status(502).json({ error: 'generate_failed', detail: String((e && e.message) || e) })
  }
}
