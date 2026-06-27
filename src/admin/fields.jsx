// Small reusable form controls for the catalog admin. Plain inputs styled with
// the site's CSS variables so the admin matches the storefront without pulling
// in the design-system bundle.
import React from 'react'

export const card = {
  background: '#fff', border: '1px solid var(--mc-ink-200, #e3e0da)', borderRadius: '10px',
  padding: '16px', marginBottom: '14px',
}
export const labelStyle = {
  display: 'block', fontFamily: 'var(--font-display, sans-serif)', textTransform: 'uppercase',
  letterSpacing: '0.04em', fontSize: '11px', fontWeight: 700, color: 'var(--mc-ink-700, #555)',
  margin: '0 0 5px',
}
const inputBase = {
  width: '100%', boxSizing: 'border-box', fontFamily: 'var(--font-body, sans-serif)', fontSize: '14px',
  padding: '8px 10px', border: '1px solid var(--mc-ink-300, #cfcbc4)', borderRadius: '6px',
  background: '#fff', color: 'var(--mc-ink-900, #1a1a1a)',
}
export const btn = {
  fontFamily: 'var(--font-display, sans-serif)', fontSize: '12px', fontWeight: 700, cursor: 'pointer',
  border: '1px solid var(--mc-ink-300, #cfcbc4)', borderRadius: '6px', background: '#fff',
  color: 'var(--mc-ink-800, #2a2a2a)', padding: '6px 10px',
}
export const btnDanger = { ...btn, color: 'var(--mc-red, #b3122a)', borderColor: 'var(--mc-red, #b3122a)' }

export function TextField({ label, value, onChange, placeholder, type = 'text' }) {
  return (
    <label style={{ display: 'block', marginBottom: '10px' }}>
      {label && <span style={labelStyle}>{label}</span>}
      <input type={type} style={inputBase} value={value ?? ''} placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)} />
    </label>
  )
}

export function TextArea({ label, value, onChange, rows = 3 }) {
  return (
    <label style={{ display: 'block', marginBottom: '10px' }}>
      {label && <span style={labelStyle}>{label}</span>}
      <textarea style={{ ...inputBase, resize: 'vertical', lineHeight: 1.5 }} rows={rows}
        value={value ?? ''} onChange={(e) => onChange(e.target.value)} />
    </label>
  )
}

export function Select({ label, value, options, onChange }) {
  return (
    <label style={{ display: 'block', marginBottom: '10px' }}>
      {label && <span style={labelStyle}>{label}</span>}
      <select style={inputBase} value={value} onChange={(e) => onChange(e.target.value)}>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </label>
  )
}

const move = (arr, i, d) => {
  const j = i + d
  if (j < 0 || j >= arr.length) return arr
  const next = arr.slice()
  ;[next[i], next[j]] = [next[j], next[i]]
  return next
}

// Editable list of plain strings (used for paragraphs `p[]` and bullets `list[]`).
export function StringList({ label, items, onChange, rows = 2 }) {
  const list = items || []
  const set = (i, v) => onChange(list.map((x, k) => (k === i ? v : x)))
  return (
    <div style={{ marginBottom: '10px' }}>
      {label && <span style={labelStyle}>{label}</span>}
      {list.map((item, i) => (
        <div key={i} style={{ display: 'flex', gap: '6px', alignItems: 'flex-start', marginBottom: '6px' }}>
          <textarea style={{ ...inputBase, resize: 'vertical', lineHeight: 1.45 }} rows={rows} value={item}
            onChange={(e) => set(i, e.target.value)} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
            <button type="button" style={btn} title="Subir" onClick={() => onChange(move(list, i, -1))}>↑</button>
            <button type="button" style={btn} title="Bajar" onClick={() => onChange(move(list, i, 1))}>↓</button>
            <button type="button" style={btnDanger} title="Eliminar"
              onClick={() => onChange(list.filter((_, k) => k !== i))}>✕</button>
          </div>
        </div>
      ))}
      <button type="button" style={btn} onClick={() => onChange([...list, ''])}>+ Agregar línea</button>
    </div>
  )
}

export { move }
