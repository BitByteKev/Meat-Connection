// Thumbnail grid for choosing a product photo from the images already in /images.
// v1 selects existing files only (no uploads).
import React from 'react'
import { IMAGE_FILES, imageUrl } from '../products.js'
import { labelStyle as lbl } from './fields.jsx'

export default function ImagePicker({ value, onChange }) {
  const [open, setOpen] = React.useState(false)
  return (
    <div style={{ marginBottom: '10px' }}>
      <span style={lbl}>Imagen</span>
      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        <div style={{ width: '64px', height: '64px', borderRadius: '6px', overflow: 'hidden',
          border: '1px solid var(--mc-ink-300, #cfcbc4)', background: 'var(--mc-cream, #f4f1ec)', flex: 'none' }}>
          {imageUrl(value)
            ? <img src={imageUrl(value)} alt={value} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            : <div style={{ display: 'flex', width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center', fontSize: '10px', color: '#999', textAlign: 'center', padding: '4px' }}>sin imagen</div>}
        </div>
        <div style={{ minWidth: 0 }}>
          <div style={{ fontFamily: 'var(--font-body, sans-serif)', fontSize: '12px', color: 'var(--mc-ink-700, #555)', wordBreak: 'break-all' }}>{value || '—'}</div>
          <button type="button" onClick={() => setOpen((o) => !o)}
            style={{ marginTop: '4px', fontFamily: 'var(--font-display, sans-serif)', fontSize: '12px', fontWeight: 700, cursor: 'pointer', border: '1px solid var(--mc-ink-300, #cfcbc4)', borderRadius: '6px', background: '#fff', padding: '5px 10px' }}>
            {open ? 'Cerrar' : 'Cambiar imagen'}
          </button>
        </div>
      </div>
      {open && (
        <div style={{ marginTop: '10px', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(84px, 1fr))', gap: '8px', maxHeight: '260px', overflowY: 'auto', padding: '8px', border: '1px solid var(--mc-ink-200, #e3e0da)', borderRadius: '8px', background: '#fff' }}>
          {IMAGE_FILES.map((file) => {
            const selected = file === value
            return (
              <button key={file} type="button" title={file}
                onClick={() => { onChange(file); setOpen(false) }}
                style={{ padding: 0, cursor: 'pointer', borderRadius: '6px', overflow: 'hidden', background: 'none',
                  border: selected ? '3px solid var(--mc-red, #b3122a)' : '1px solid var(--mc-ink-300, #cfcbc4)', aspectRatio: '1 / 1' }}>
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
