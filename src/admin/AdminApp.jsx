// Catalog admin (password-gated). Edits the product catalog and commits it to
// GitHub via /api/save-products, which triggers a Vercel rebuild (~1 min to live).
// Content admin only — not a CRM. See docs/superpowers/specs/2026-06-27-catalog-admin-simplify.md
import React from 'react'
import { RAW_CATALOG, CATEGORIES, TONES, IMAGE_FILES, imageUrl } from '../products.js'
import { TextField, TextArea, Select, card, btn, btnDanger, labelStyle, move } from './fields.jsx'
import ImagesPicker from './ImagesPicker.jsx'
import { UPLOADED } from './uploads.js'

const PW_KEY = 'mc_admin_pw'
const clone = (x) => JSON.parse(JSON.stringify(x))

const page = { maxWidth: '980px', margin: '0 auto', padding: '28px 18px 120px', fontFamily: 'var(--font-body, sans-serif)', color: 'var(--mc-ink-900, #1a1a1a)' }
const LANG_LABEL = { es: 'Español', en: 'English' }

// Trim outer whitespace only — internal newlines are meaningful (paragraphs/bullets).
function pruneCatalog(catalog) {
  return catalog.map((p) => ({
    id: p.id.trim(),
    cat: p.cat,
    tone: p.tone,
    images: p.images,
    badge: {
      es: (p.badge.es || '').trim() || null,
      en: (p.badge.en || '').trim() || null,
    },
    es: lang(p.es),
    en: lang(p.en),
  }))
  function lang(L) {
    return {
      name: L.name.trim(),
      description: L.description.trim(),
      origin: L.origin.trim(),
      cooking: L.cooking.trim(),
    }
  }
}

function validate(catalog) {
  const seen = new Set()
  for (const p of catalog) {
    if (!p.id.trim()) return 'Cada producto necesita un id.'
    if (seen.has(p.id.trim())) return `Id duplicado: "${p.id.trim()}".`
    seen.add(p.id.trim())
    if (!CATEGORIES.includes(p.cat)) return `Categoría inválida en "${p.id}".`
    if (!p.es.name.trim()) return `Falta el nombre en Español (ES) en "${p.id}".`
    if (!p.en.name.trim()) return `Falta el nombre en Inglés (EN) en "${p.id}".`
    if (!Array.isArray(p.images) || p.images.length === 0) return `Agrega al menos una imagen en "${p.id}".`
    for (const f of p.images) if (!IMAGE_FILES.includes(f) && !UPLOADED.has(f)) return `Imagen no encontrada en "${p.id}": ${f}.`
  }
  return null
}

function newProduct() {
  const blank = () => ({ name: '', description: '', origin: '', cooking: '' })
  return {
    id: '', cat: 'jp', tone: 'charcoal', images: IMAGE_FILES[0] ? [IMAGE_FILES[0]] : [],
    badge: { es: null, en: null },
    es: blank(), en: blank(),
  }
}

function LoginGate({ onLogin }) {
  const [pw, setPw] = React.useState('')
  return (
    <div style={{ ...page, maxWidth: '380px', paddingTop: '80px' }}>
      <h1 style={{ fontFamily: 'var(--font-display, sans-serif)', fontSize: '22px', marginBottom: '4px' }}>Catálogo · Admin</h1>
      <p style={{ fontSize: '13px', color: 'var(--mc-ink-700, #555)', marginTop: 0 }}>Meat Connection</p>
      <form onSubmit={(e) => { e.preventDefault(); if (pw) onLogin(pw) }}>
        <TextField label="Contraseña" type="password" value={pw} onChange={setPw} />
        <button type="submit" style={{ ...btn, background: 'var(--mc-red, #b3122a)', color: '#fff', borderColor: 'var(--mc-red, #b3122a)', padding: '9px 16px', fontSize: '13px' }}>Entrar</button>
      </form>
    </div>
  )
}

// One language's editable content (name, badge, and the three text boxes).
function LangColumn({ lang, product, onChange }) {
  const L = product[lang]
  const setL = (patch) => onChange({ ...product, [lang]: { ...L, ...patch } })
  const setBadge = (v) => onChange({ ...product, badge: { ...product.badge, [lang]: v } })
  return (
    <div style={{ flex: '1 1 340px', minWidth: 0, border: '1px solid var(--mc-ink-200, #e3e0da)', borderRadius: '8px', padding: '14px', background: 'var(--mc-cream, #faf8f4)' }}>
      <div style={{ fontFamily: 'var(--font-display, sans-serif)', fontWeight: 700, fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--mc-red, #b3122a)', marginBottom: '10px' }}>
        {LANG_LABEL[lang]}
      </div>
      <TextField label="Nombre" value={L.name} onChange={(v) => setL({ name: v })} />
      <TextField label="Badge (opcional)" value={product.badge[lang] || ''} onChange={setBadge} />
      <TextArea label="Descripción" rows={7} value={L.description} onChange={(v) => setL({ description: v })} />
      <p style={{ fontSize: '11px', color: 'var(--mc-ink-600, #777)', margin: '-6px 0 12px' }}>
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

// Shared, above both language columns: optional AI notes + a button that drafts
// the name and all six text boxes in ES + EN. Claude reads the cover photo to
// identify the cut, so no name is needed first. Via /api/generate-product.
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
    <div style={{ border: '1px dashed var(--mc-ink-300, #cfcbc4)', borderRadius: '8px', padding: '12px', margin: '6px 0 14px', background: 'var(--mc-paper, #fff)' }}>
      <TextArea label="Notas para la IA (opcional)" rows={3} value={notes} onChange={setNotes} />
      <p style={{ fontSize: '11px', color: 'var(--mc-ink-600, #777)', margin: '-6px 0 10px' }}>
        La IA lee la foto de portada para nombrar el corte. Agrega detalles si los tienes (marmoleo, alimentación, marca, peso) — se usan pero no se guardan.
      </p>
      <button type="button" disabled={busy} onClick={generate}
        style={{ ...btn, background: busy ? 'var(--mc-ink-200, #e3e0da)' : 'var(--mc-cream, #faf8f4)', cursor: busy ? 'default' : 'pointer' }}>
        {busy ? 'Generando…' : '✨ Generar con IA (ES + EN)'}
      </button>
      {err && (
        <div style={{ marginTop: '8px', fontSize: '12px', color: '#9b1c1c' }}>{err}</div>
      )}
    </div>
  )
}

function ProductEditor({ product, index, total, onChange, onMove, onRemove }) {
  const [open, setOpen] = React.useState(false)
  return (
    <div style={card}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <button type="button" style={{ ...btn, border: 'none', fontSize: '15px' }} onClick={() => setOpen((o) => !o)}>
          {open ? '▾' : '▸'}
        </button>
        <strong style={{ flex: 1, fontFamily: 'var(--font-display, sans-serif)' }}>
          {product.es.name || product.id || '(sin nombre)'} <span style={{ color: 'var(--mc-ink-500, #888)', fontWeight: 400, fontSize: '12px' }}>· {product.id} · {product.cat}</span>
        </strong>
        <button type="button" style={btn} disabled={index === 0} onClick={() => onMove(-1)}>↑</button>
        <button type="button" style={btn} disabled={index === total - 1} onClick={() => onMove(1)}>↓</button>
        <button type="button" style={btnDanger} onClick={onRemove}>Eliminar</button>
      </div>

      {open && (
        <div style={{ marginTop: '14px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
            <TextField label="ID" value={product.id} onChange={(v) => onChange({ ...product, id: v })} />
            <Select label="Categoría" value={product.cat} options={CATEGORIES} onChange={(v) => onChange({ ...product, cat: v })} />
            <Select label="Tono" value={product.tone} options={TONES} onChange={(v) => onChange({ ...product, tone: v })} />
          </div>
          <ImagesPicker images={product.images} onChange={(v) => onChange({ ...product, images: v })} />
          <AiGenerate product={product} onChange={onChange} />
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', marginTop: '6px' }}>
            <LangColumn lang="es" product={product} onChange={onChange} />
            <LangColumn lang="en" product={product} onChange={onChange} />
          </div>
        </div>
      )}
    </div>
  )
}

export default function AdminApp() {
  const [pw, setPw] = React.useState(() => { try { return sessionStorage.getItem(PW_KEY) || '' } catch { return '' } })
  const [authed, setAuthed] = React.useState(() => { try { return !!sessionStorage.getItem(PW_KEY) } catch { return false } })
  const [catalog, setCatalog] = React.useState(() => clone(RAW_CATALOG))
  const [status, setStatus] = React.useState(null) // { ok, msg }
  const [saving, setSaving] = React.useState(false)

  function login(password) {
    try { sessionStorage.setItem(PW_KEY, password) } catch {}
    setPw(password); setAuthed(true)
  }
  function logout() {
    try { sessionStorage.removeItem(PW_KEY) } catch {}
    setPw(''); setAuthed(false)
  }
  const setProduct = (i, next) => setCatalog((c) => c.map((p, k) => (k === i ? next : p)))
  const moveProduct = (i, d) => setCatalog((c) => move(c, i, d))
  const removeProduct = (i) => setCatalog((c) => c.filter((_, k) => k !== i))
  const addProduct = () => setCatalog((c) => [...c, newProduct()])

  async function save() {
    setStatus(null)
    const pruned = pruneCatalog(catalog)
    const err = validate(pruned)
    if (err) { setStatus({ ok: false, msg: err }); return }
    setSaving(true)
    try {
      const res = await fetch('/api/save-products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: pw, products: pruned }),
      })
      if (res.ok) {
        setStatus({ ok: true, msg: 'Guardado. El sitio se actualizará en ~1 minuto.' })
      } else if (res.status === 401) {
        setStatus({ ok: false, msg: 'Contraseña incorrecta.' })
        logout()
      } else {
        let detail = ''
        try { const j = await res.json(); detail = j.detail || j.error || '' } catch {}
        setStatus({ ok: false, msg: 'No se pudo guardar, intenta de nuevo.' + (detail ? ` (${detail})` : '') })
      }
    } catch (e) {
      setStatus({ ok: false, msg: 'Error de red, intenta de nuevo.' })
    } finally {
      setSaving(false)
    }
  }

  if (!authed) return <LoginGate onLogin={login} />

  return (
    <div style={page}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap', marginBottom: '8px' }}>
        <h1 style={{ fontFamily: 'var(--font-display, sans-serif)', fontSize: '22px', margin: 0, flex: 1 }}>Catálogo · Admin</h1>
        <button type="button" style={btn} onClick={logout}>Salir</button>
      </div>
      <p style={{ fontSize: '13px', color: 'var(--mc-ink-700, #555)', marginTop: 0 }}>
        Edita Español e Inglés lado a lado. ID, categoría, tono e imagen son compartidos.
      </p>

      {catalog.map((p, i) => (
        <ProductEditor key={i} product={p} index={i} total={catalog.length}
          onChange={(next) => setProduct(i, next)} onMove={(d) => moveProduct(i, d)} onRemove={() => removeProduct(i)} />
      ))}

      <button type="button" style={{ ...btn, marginTop: '4px' }} onClick={addProduct}>+ Agregar producto</button>

      <div style={{ position: 'sticky', bottom: 0, marginTop: '24px', padding: '14px 0', background: 'linear-gradient(to top, var(--mc-paper, #fff) 70%, transparent)' }}>
        {status && (
          <div style={{ marginBottom: '10px', padding: '10px 12px', borderRadius: '8px', fontSize: '13px',
            background: status.ok ? '#e8f5e9' : '#fdecea', color: status.ok ? '#1b5e20' : '#9b1c1c',
            border: `1px solid ${status.ok ? '#a5d6a7' : '#f5c2c0'}` }}>
            {status.msg}
          </div>
        )}
        <button type="button" disabled={saving} onClick={save}
          style={{ fontFamily: 'var(--font-display, sans-serif)', fontWeight: 700, fontSize: '15px', cursor: saving ? 'default' : 'pointer',
            border: 'none', borderRadius: '8px', padding: '12px 22px', color: '#fff',
            background: saving ? 'var(--mc-ink-400, #999)' : 'var(--mc-red, #b3122a)' }}>
          {saving ? 'Guardando…' : 'Guardar y publicar'}
        </button>
      </div>
    </div>
  )
}
