// Multi-image picker: a reorderable row of the product's chosen photos (first =
// Portada/cover), plus a toggle to add more from the existing /images grid.
// v1 selects existing files only (no uploads).
import React from 'react'
import { IMAGE_FILES, imageUrl } from '../products.js'
import { labelStyle, btn, btnDanger, move } from './fields.jsx'

export default function ImagesPicker({ images, onChange }) {
  const [open, setOpen] = React.useState(false)
  const list = images || []
  const add = (file) => { if (!list.includes(file)) onChange([...list, file]); setOpen(false) }
  const remove = (i) => onChange(list.filter((_, k) => k !== i))

  return (
    <div style={{ marginBottom: '10px' }}>
      <span style={labelStyle}>Imágenes (la primera es la portada)</span>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '8px' }}>
        {list.map((file, i) => (
          <div key={file + i} style={{ width: '110px' }}>
            <div style={{ position: 'relative', width: '110px', height: '88px', borderRadius: '6px', overflow: 'hidden',
              border: i === 0 ? '3px solid var(--mc-red, #b3122a)' : '1px solid var(--mc-ink-300, #cfcbc4)', background: 'var(--mc-cream, #f4f1ec)' }}>
              {imageUrl(file)
                ? <img src={imageUrl(file)} alt={file} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                : <div style={{ display: 'flex', width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center', fontSize: '10px', color: '#c0392b', textAlign: 'center', padding: '4px' }}>falta archivo</div>}
              {i === 0 && (
                <span style={{ position: 'absolute', top: '4px', left: '4px', background: 'var(--mc-red, #b3122a)', color: '#fff', fontSize: '9px', fontWeight: 700, padding: '2px 5px', borderRadius: '4px', letterSpacing: '0.04em' }}>PORTADA</span>
              )}
            </div>
            <div style={{ display: 'flex', gap: '3px', marginTop: '4px' }}>
              <button type="button" style={{ ...btn, padding: '3px 7px', flex: 1 }} title="Mover izquierda" disabled={i === 0} onClick={() => onChange(move(list, i, -1))}>←</button>
              <button type="button" style={{ ...btn, padding: '3px 7px', flex: 1 }} title="Mover derecha" disabled={i === list.length - 1} onClick={() => onChange(move(list, i, 1))}>→</button>
              <button type="button" style={{ ...btnDanger, padding: '3px 7px' }} title="Quitar" onClick={() => remove(i)}>✕</button>
            </div>
          </div>
        ))}
        {list.length === 0 && <div style={{ fontSize: '12px', color: '#c0392b', alignSelf: 'center' }}>Agrega al menos una imagen.</div>}
      </div>

      <button type="button" style={btn} onClick={() => setOpen((o) => !o)}>{open ? 'Cerrar' : '+ Agregar imagen'}</button>

      {open && (
        <div style={{ marginTop: '10px', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(84px, 1fr))', gap: '8px', maxHeight: '260px', overflowY: 'auto', padding: '8px', border: '1px solid var(--mc-ink-200, #e3e0da)', borderRadius: '8px', background: '#fff' }}>
          {IMAGE_FILES.map((file) => {
            const chosen = list.includes(file)
            return (
              <button key={file} type="button" title={file} disabled={chosen}
                onClick={() => add(file)}
                style={{ padding: 0, cursor: chosen ? 'default' : 'pointer', borderRadius: '6px', overflow: 'hidden', background: 'none', opacity: chosen ? 0.35 : 1,
                  border: '1px solid var(--mc-ink-300, #cfcbc4)', aspectRatio: '1 / 1' }}>
                <img src={imageUrl(file)} alt={file} loading="lazy"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
