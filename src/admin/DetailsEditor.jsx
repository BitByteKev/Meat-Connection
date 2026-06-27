// Editor for a product's `details` array (one language).
// Section shape: { h, p?: string[], list?: string[], methods?: [{ h, p?, list? }] }
import React from 'react'
import { TextField, StringList, btn, btnDanger, labelStyle, move } from './fields.jsx'

const sectionBox = {
  border: '1px solid var(--mc-ink-200, #e3e0da)', borderLeft: '3px solid var(--mc-red, #b3122a)',
  borderRadius: '8px', padding: '12px', marginBottom: '12px', background: 'var(--mc-cream, #faf8f4)',
}
const methodBox = {
  border: '1px dashed var(--mc-ink-300, #cfcbc4)', borderRadius: '6px', padding: '10px',
  marginBottom: '8px', background: '#fff',
}
const rowBtns = { display: 'flex', gap: '6px', marginBottom: '10px', flexWrap: 'wrap' }

function MethodsEditor({ methods, onChange }) {
  const list = methods || []
  const setMethod = (i, patch) => onChange(list.map((m, k) => (k === i ? { ...m, ...patch } : m)))
  return (
    <div style={{ marginTop: '8px' }}>
      <span style={labelStyle}>Métodos de cocción (opcional)</span>
      {list.map((m, i) => (
        <div key={i} style={methodBox}>
          <div style={rowBtns}>
            <button type="button" style={btn} onClick={() => onChange(move(list, i, -1))}>↑</button>
            <button type="button" style={btn} onClick={() => onChange(move(list, i, 1))}>↓</button>
            <button type="button" style={btnDanger} onClick={() => onChange(list.filter((_, k) => k !== i))}>✕ Método</button>
          </div>
          <TextField label="Encabezado del método" value={m.h} onChange={(v) => setMethod(i, { h: v })} />
          <StringList label="Párrafos" items={m.p} onChange={(v) => setMethod(i, { p: v })} />
          <StringList label="Lista" items={m.list} onChange={(v) => setMethod(i, { list: v })} />
        </div>
      ))}
      <button type="button" style={btn} onClick={() => onChange([...list, { h: '', p: [], list: [] }])}>
        + Agregar método
      </button>
    </div>
  )
}

export default function DetailsEditor({ details, onChange }) {
  const sections = details || []
  const setSection = (i, patch) => onChange(sections.map((s, k) => (k === i ? { ...s, ...patch } : s)))
  return (
    <div>
      <span style={labelStyle}>Secciones de detalle</span>
      {sections.map((s, i) => (
        <div key={i} style={sectionBox}>
          <div style={rowBtns}>
            <button type="button" style={btn} onClick={() => onChange(move(sections, i, -1))}>↑ Subir</button>
            <button type="button" style={btn} onClick={() => onChange(move(sections, i, 1))}>↓ Bajar</button>
            <button type="button" style={btnDanger} onClick={() => onChange(sections.filter((_, k) => k !== i))}>✕ Sección</button>
          </div>
          <TextField label="Encabezado (h)" value={s.h} onChange={(v) => setSection(i, { h: v })} />
          <StringList label="Párrafos (p)" items={s.p} onChange={(v) => setSection(i, { p: v })} />
          <StringList label="Lista (list)" items={s.list} onChange={(v) => setSection(i, { list: v })} />
          <MethodsEditor methods={s.methods} onChange={(v) => setSection(i, { methods: v })} />
        </div>
      ))}
      <button type="button" style={btn} onClick={() => onChange([...sections, { h: '', p: [], list: [] }])}>
        + Agregar sección
      </button>
    </div>
  )
}
