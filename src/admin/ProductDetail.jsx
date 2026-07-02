// Product detail screen (Shopify-style): stacked section cards for one product.
// Edits flow through onChange into AdminApp's catalog state; publishing happens
// via the top-bar Guardar (whole-catalog commit), not here.
import React from 'react'
import { TONES, imageUrl } from '../products.js'
import { TextField, TextArea, Select, card, btn, btnDanger, Pill } from './fields.jsx'
import ImagesPicker from './ImagesPicker.jsx'
import MarblingEditor from './MarblingEditor.jsx'

const PW_KEY = 'mc_admin_pw'
const LANG_LABEL = { es: 'Español', en: 'English' }

function SectionCard({ title, children }) {
  return (
    <section style={{ ...card, padding: '18px' }}>
      {title && <h2 style={{ fontSize: '14px', fontWeight: 700, margin: '0 0 12px' }}>{title}</h2>}
      {children}
    </section>
  )
}

// One language's editable content (name, badge, and the three text boxes).
function LangColumn({ lang, product, onChange }) {
  const L = product[lang]
  const setL = (patch) => onChange({ ...product, [lang]: { ...L, ...patch } })
  const setBadge = (v) => onChange({ ...product, badge: { ...product.badge, [lang]: v } })
  return (
    <div style={{ flex: '1 1 340px', minWidth: 0, border: '1px solid #e1e3e5', borderRadius: '8px', padding: '14px', background: '#f9fafb' }}>
      <div style={{ fontWeight: 700, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#616a75', marginBottom: '10px' }}>
        {LANG_LABEL[lang]}
      </div>
      <TextField label="Nombre" value={L.name} onChange={(v) => setL({ name: v })} />
      <TextField label="Badge (opcional)" value={product.badge[lang] || ''} onChange={setBadge} />
      <TextArea label="Descripción" rows={7} value={L.description} onChange={(v) => setL({ description: v })} />
      <p style={{ fontSize: '11px', color: '#616a75', margin: '-6px 0 12px' }}>
        La primera línea se muestra como gancho en la tarjeta del catálogo.
      </p>
      <TextArea label="Origen" rows={4} value={L.origin} onChange={(v) => setL({ origin: v })} />
      <TextArea label="Cómo cocinar" rows={5} value={L.cooking} onChange={(v) => setL({ cooking: v })} />
    </div>
  )
}

// Fetch a bundled product photo and return it as { media_type, data } base64,
// so the serverless function can hand it to Claude's vision input. Returns null
// if the file can't be read.
async function imageToBase64(url) {
  try {
    const res = await fetch(url)
    if (!res.ok) return null
    const blob = await res.blob()
    return await new Promise((resolve) => {
      const fr = new FileReader()
      fr.onload = () => {
        const [meta, data] = String(fr.result).split(',')
        const m = meta.match(/data:(.*?);base64/)
        resolve(data ? { media_type: (m && m[1]) || blob.type || 'image/webp', data } : null)
      }
      fr.onerror = () => resolve(null)
      fr.readAsDataURL(blob)
    })
  } catch { return null }
}

// Optional AI notes + a button that drafts the name and all six text boxes in
// ES + EN. Claude reads the cover photo to identify the cut, so no name is
// needed first. Via /api/generate-product.
function AiGenerate({ product, onChange }) {
  const [notes, setNotes] = React.useState('')
  const [busy, setBusy] = React.useState(false)
  const [err, setErr] = React.useState(null)

  async function generate() {
    setErr(null)
    let pw = ''
    try { pw = sessionStorage.getItem(PW_KEY) || '' } catch {}
    setBusy(true)
    try {
      const cover = (product.images || [])[0]
      const url = cover && imageUrl(cover)
      const image = url ? await imageToBase64(url) : null
      const name = (product.es.name || product.en.name || '').trim()
      const res = await fetch('/api/generate-product', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: pw, cat: product.cat, notes, name, image }),
      })
      if (!res.ok) {
        if (res.status === 401) { setErr('Sesión expirada, vuelve a entrar para usar la IA.'); return }
        let detail = ''
        try { const j = await res.json(); detail = j.detail || j.error || '' } catch {}
        setErr('No se pudo generar, intenta de nuevo.' + (detail ? ` (${detail})` : ''))
        return
      }
      const { es, en } = await res.json()
      const hasText = ['name', 'description', 'origin', 'cooking'].some(
        (f) => (product.es[f] || '').trim() || (product.en[f] || '').trim()
      )
      if (hasText && !window.confirm('¿Reemplazar el nombre y el texto actuales con lo generado por la IA?')) return
      onChange({
        ...product,
        es: { ...product.es, name: es.name, description: es.description, origin: es.origin, cooking: es.cooking },
        en: { ...product.en, name: en.name, description: en.description, origin: en.origin, cooking: en.cooking },
      })
    } catch {
      setErr('Error de red, intenta de nuevo.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div>
      <TextArea label="Notas para la IA (opcional)" rows={3} value={notes} onChange={setNotes} />
      <p style={{ fontSize: '11px', color: '#616a75', margin: '-6px 0 10px' }}>
        La IA lee la foto de portada para nombrar el corte. Agrega detalles si los tienes (marmoleo, alimentación, marca, peso) — se usan pero no se guardan.
      </p>
      <button type="button" disabled={busy} onClick={generate}
        style={{ ...btn, opacity: busy ? 0.6 : 1, cursor: busy ? 'default' : 'pointer' }}>
        {busy ? 'Generando…' : '✨ Generar con IA (ES + EN)'}
      </button>
      {err && (
        <div style={{ marginTop: '8px', fontSize: '12px', color: '#9b1c1c' }}>{err}</div>
      )}
    </div>
  )
}

export default function ProductDetail({ product, onChange, onBack, onRemove, catOptions }) {
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px', flexWrap: 'wrap' }}>
        <button type="button" style={btn} onClick={onBack}>← Productos</button>
        <h1 style={{ fontSize: '20px', fontWeight: 700, margin: 0, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {product.es.name || product.id || '(sin nombre)'}
        </h1>
        <Pill ok={product.available !== false}>{product.available !== false ? 'Activo' : 'Agotado'}</Pill>
        <div style={{ flex: 1 }} />
        <button type="button" style={btnDanger}
          onClick={() => { if (window.confirm('¿Eliminar este producto?')) onRemove() }}>Eliminar</button>
      </div>

      <SectionCard title="Datos">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
          <TextField label="ID" value={product.id} onChange={(v) => onChange({ ...product, id: v })} />
          <Select label="Categoría" value={product.cat} options={catOptions} onChange={(v) => onChange({ ...product, cat: v })} />
          <Select label="Tono" value={product.tone} options={TONES} onChange={(v) => onChange({ ...product, tone: v })} />
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'flex-end', margin: '2px 0 0' }}>
          <label style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: 600, color: '#1a1a1a', paddingBottom: '9px' }}>
            <input type="checkbox" checked={product.available !== false} onChange={(e) => onChange({ ...product, available: e.target.checked })} />
            Disponible {product.available === false && <span style={{ color: '#c5280c', fontWeight: 700 }}>· Agotado</span>}
          </label>
          <div style={{ flex: '1 1 150px', minWidth: 0 }}><TextField label="SKU (opcional)" value={product.sku || ''} onChange={(v) => onChange({ ...product, sku: v })} /></div>
          <div style={{ flex: '1 1 200px', minWidth: 0 }}><TextField label="Peso / presentación (opcional)" value={product.weight || ''} onChange={(v) => onChange({ ...product, weight: v })} placeholder="Ej. Corte de 300 g" /></div>
        </div>
      </SectionCard>

      <SectionCard title="Imágenes">
        <ImagesPicker images={product.images} onChange={(v) => onChange({ ...product, images: v })} />
      </SectionCard>

      <SectionCard title="Marmoleo">
        <MarblingEditor product={product} onChange={onChange} />
      </SectionCard>

      <SectionCard title="Generar con IA">
        <AiGenerate product={product} onChange={onChange} />
      </SectionCard>

      <SectionCard title="Contenido (ES / EN)">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px' }}>
          <LangColumn lang="es" product={product} onChange={onChange} />
          <LangColumn lang="en" product={product} onChange={onChange} />
        </div>
      </SectionCard>
    </div>
  )
}
