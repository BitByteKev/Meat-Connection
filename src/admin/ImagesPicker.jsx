// Multi-image picker: a reorderable row of the product's chosen photos (first =
// Portada/cover), plus a toggle to add more from the existing /images grid.
// v1 selects existing files only (no uploads).
import React from 'react'
import { IMAGE_FILES, imageUrl } from '../products.js'
import { labelStyle, btn, btnDanger, move } from './fields.jsx'
import { UPLOADED, UPLOADED_PREVIEWS, fileToWebpDataUrl, uploadName } from './uploads.js'

const PW_KEY = 'mc_admin_pw'
// Resolve a filename to a preview URL: the bundled asset, or a just-uploaded data URL.
const previewSrc = (file) => imageUrl(file) || UPLOADED_PREVIEWS.get(file)

export default function ImagesPicker({ images, onChange }) {
  const [open, setOpen] = React.useState(false)
  const [uploading, setUploading] = React.useState(false)
  const [upErr, setUpErr] = React.useState(null)
  const list = images || []
  const add = (file) => { if (!list.includes(file)) onChange([...list, file]); setOpen(false) }
  const remove = (i) => onChange(list.filter((_, k) => k !== i))

  async function onFiles(fileList) {
    setUpErr(null); setUploading(true)
    let pw = ''; try { pw = sessionStorage.getItem(PW_KEY) || '' } catch {}
    const added = []
    try {
      for (const file of Array.from(fileList)) {
        const dataUrl = await fileToWebpDataUrl(file)
        const content = dataUrl.split(',')[1]
        const filename = uploadName(file)
        const res = await fetch('/api/upload-image', {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ password: pw, filename, content }),
        })
        if (!res.ok) {
          if (res.status === 401) throw new Error('Sesión expirada, vuelve a entrar.')
          let d = ''; try { const j = await res.json(); d = j.detail || j.error || '' } catch {}
          throw new Error('No se pudo subir' + (d ? ` (${d})` : ''))
        }
        UPLOADED.add(filename); UPLOADED_PREVIEWS.set(filename, dataUrl); added.push(filename)
      }
      if (added.length) onChange([...list, ...added.filter((f) => !list.includes(f))])
    } catch (e) { setUpErr(String(e && e.message || e)) }
    finally { setUploading(false) }
  }

  return (
    <div style={{ marginBottom: '10px' }}>
      <span style={labelStyle}>Imágenes (la primera es la portada)</span>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '8px' }}>
        {list.map((file, i) => (
          <div key={file + i} style={{ width: '110px' }}>
            <div style={{ position: 'relative', width: '110px', height: '88px', borderRadius: '6px', overflow: 'hidden',
              border: i === 0 ? '3px solid #1a1a1a' : '1px solid #d0d3d6', background: '#f1f2f4' }}>
              {previewSrc(file)
                ? <img src={previewSrc(file)} alt={file} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                : <div style={{ display: 'flex', width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center', fontSize: '10px', color: '#c0392b', textAlign: 'center', padding: '4px' }}>falta archivo</div>}
              {i === 0 && (
                <span style={{ position: 'absolute', top: '4px', left: '4px', background: '#1a1a1a', color: '#fff', fontSize: '9px', fontWeight: 700, padding: '2px 5px', borderRadius: '4px', letterSpacing: '0.04em' }}>PORTADA</span>
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

      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        <button type="button" style={btn} onClick={() => setOpen((o) => !o)}>{open ? 'Cerrar' : '+ Elegir de la galería'}</button>
        <label style={{ ...btn, cursor: uploading ? 'default' : 'pointer' }}>
          {uploading ? 'Subiendo…' : '⬆ Subir imagen'}
          <input type="file" accept="image/*" multiple disabled={uploading} style={{ display: 'none' }}
            onChange={(e) => { if (e.target.files && e.target.files.length) onFiles(e.target.files); e.target.value = '' }} />
        </label>
      </div>
      {upErr && <div style={{ fontSize: '12px', color: '#9b1c1c', marginTop: '6px' }}>{upErr}</div>}

      {open && (
        <div style={{ marginTop: '10px', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(84px, 1fr))', gap: '8px', maxHeight: '260px', overflowY: 'auto', padding: '8px', border: '1px solid #e1e3e5', borderRadius: '8px', background: '#fff' }}>
          {IMAGE_FILES.map((file) => {
            const chosen = list.includes(file)
            return (
              <button key={file} type="button" title={file} disabled={chosen}
                onClick={() => add(file)}
                style={{ padding: 0, cursor: chosen ? 'default' : 'pointer', borderRadius: '6px', overflow: 'hidden', background: 'none', opacity: chosen ? 0.35 : 1,
                  border: '1px solid #d0d3d6', aspectRatio: '1 / 1' }}>
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
