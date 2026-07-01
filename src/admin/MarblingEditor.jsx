// Marbling editor for the product form. Lets the owner pick a scale (BMS / MB /
// Angus) and manage the grade variants the storefront renders (MarblingScale +
// MarblingPill). Each variant has a low/high grade, an optional label, an image
// chosen from the product's own photos, and an optional SKU.
import React from 'react'
import { imageUrl } from '../products.js'
import { labelStyle, btn, btnDanger, move } from './fields.jsx'
import { UPLOADED_PREVIEWS } from './uploads.js'

// value → { label, max } for the three scales the storefront knows how to draw.
const SYSTEMS = [
  { value: '', label: 'Sin marmoleo', max: 0 },
  { value: 'bms', label: 'BMS · Japonés (1–12)', max: 12 },
  { value: 'aus', label: 'Marble Score · Australiano (1–9+)', max: 10 },
  { value: 'angus', label: 'Marble Score · Angus (1–9)', max: 9 },
]
const maxFor = (sys) => (SYSTEMS.find((s) => s.value === sys) || {}).max || 12
const previewSrc = (f) => imageUrl(f) || UPLOADED_PREVIEWS.get(f)

const cell = { padding: '6px 8px', border: '1px solid var(--mc-ink-300, #cfcbc4)', borderRadius: '6px', fontSize: '13px', background: '#fff', width: '100%', boxSizing: 'border-box' }
const num = { ...cell, width: '58px', textAlign: 'center' }
const mini = { fontFamily: 'var(--font-display, sans-serif)', textTransform: 'uppercase', letterSpacing: '0.04em', fontSize: '10px', fontWeight: 700, color: 'var(--mc-ink-600, #777)', margin: '0 0 3px', display: 'block' }

function Variant({ v, i, images, system, canMove, onChange, onMove, onRemove }) {
  const max = maxFor(system)
  const set = (patch) => onChange({ ...v, ...patch })
  const setNum = (key, raw) => { const n = parseInt(raw, 10); set({ [key]: Number.isFinite(n) ? n : '' }) }
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'flex-end', padding: '10px', border: '1px solid var(--mc-ink-200, #e3e0da)', borderRadius: '8px', marginBottom: '8px', background: 'var(--mc-cream, #faf8f4)' }}>
      <div style={{ width: '46px', height: '38px', borderRadius: '6px', overflow: 'hidden', background: '#f4f1ec', flex: 'none', border: '1px solid var(--mc-ink-200, #e3e0da)' }}>
        {v.image && previewSrc(v.image) && <img src={previewSrc(v.image)} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
      </div>
      <label style={{ flex: 'none' }}><span style={mini}>Desde</span>
        <input type="number" min={1} max={max} value={v.lo ?? ''} onChange={(e) => setNum('lo', e.target.value)} style={num} /></label>
      <label style={{ flex: 'none' }}><span style={mini}>Hasta</span>
        <input type="number" min={1} max={max} value={v.hi ?? ''} onChange={(e) => setNum('hi', e.target.value)} style={num} /></label>
      <label style={{ flex: '1 1 120px', minWidth: 0 }}><span style={mini}>Etiqueta (opcional)</span>
        <input value={v.label || ''} placeholder={v.lo === v.hi ? String(v.lo ?? '') : `${v.lo ?? ''}-${v.hi ?? ''}`} onChange={(e) => set({ label: e.target.value })} style={cell} /></label>
      <label style={{ flex: '1 1 150px', minWidth: 0 }}><span style={mini}>Foto del grado</span>
        <select value={v.image || ''} onChange={(e) => set({ image: e.target.value })} style={cell}>
          <option value="">(portada)</option>
          {images.map((f) => <option key={f} value={f}>{f}</option>)}
        </select></label>
      <label style={{ flex: '1 1 110px', minWidth: 0 }}><span style={mini}>SKU (opcional)</span>
        <input value={v.sku || ''} onChange={(e) => set({ sku: e.target.value })} style={cell} /></label>
      <div style={{ display: 'flex', gap: '3px' }}>
        <button type="button" style={{ ...btn, padding: '4px 7px' }} disabled={!canMove || i === 0} onClick={() => onMove(-1)}>↑</button>
        <button type="button" style={{ ...btn, padding: '4px 7px' }} disabled={!canMove} onClick={() => onMove(1)}>↓</button>
        <button type="button" style={{ ...btnDanger, padding: '4px 7px' }} onClick={onRemove}>✕</button>
      </div>
    </div>
  )
}

export default function MarblingEditor({ product, onChange }) {
  const m = product.marbling
  const system = m ? m.system : ''
  const variants = (m && m.variants) || []
  const cover = (product.images || [])[0] || ''

  const setSystem = (sys) => {
    if (!sys) return onChange({ ...product, marbling: null })
    const kept = variants.length ? variants : [{ label: '', lo: 1, hi: 1, image: cover }]
    onChange({ ...product, marbling: { system: sys, variants: kept } })
  }
  const setVariants = (next) => onChange({ ...product, marbling: { system, variants: next } })
  const addVariant = () => setVariants([...variants, { label: '', lo: 1, hi: 1, image: cover }])

  return (
    <div style={{ margin: '4px 0 14px' }}>
      <span style={labelStyle}>Marmoleo</span>
      <select value={system} onChange={(e) => setSystem(e.target.value)} style={{ ...cell, width: 'auto', minWidth: '240px', marginBottom: variants.length ? '10px' : 0 }}>
        {SYSTEMS.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
      </select>
      {system && (
        <>
          {variants.map((v, i) => (
            <Variant key={i} v={v} i={i} images={product.images || []} system={system} canMove={variants.length > 1}
              onChange={(nv) => setVariants(variants.map((x, k) => (k === i ? nv : x)))}
              onMove={(d) => setVariants(move(variants, i, d))}
              onRemove={() => setVariants(variants.filter((_, k) => k !== i))} />
          ))}
          <button type="button" style={btn} onClick={addVariant}>+ Agregar grado</button>
          <p style={{ fontSize: '11px', color: 'var(--mc-ink-600, #777)', margin: '8px 0 0' }}>
            Un solo grado con “Desde” = “Hasta” se muestra como un número (9 → “9+” en escalas no japonesas). Varios grados activan el selector de grado en la ficha.
          </p>
        </>
      )}
    </div>
  )
}
