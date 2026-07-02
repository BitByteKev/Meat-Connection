// Media library: browse every image in /images, see which products use each,
// upload new ones (converted to webp client-side), and delete unused files.
import React from 'react'
import { IMAGE_FILES, imageUrl } from '../products.js'
import { btn, btnDanger } from './fields.jsx'
import { UPLOADED, UPLOADED_PREVIEWS, fileToWebpDataUrl, uploadName } from './uploads.js'

const PW_KEY = 'mc_admin_pw'
const previewSrc = (f) => imageUrl(f) || UPLOADED_PREVIEWS.get(f)
const inputStyle = { padding: '8px 10px', border: '1px solid #d0d3d6', borderRadius: '8px', fontSize: '13px', minWidth: '180px' }
const errStyle = { margin: '0 0 12px', padding: '9px 12px', borderRadius: '8px', fontSize: '13px', background: '#fdecea', color: '#9b1c1c', border: '1px solid #f5c2c0' }
const badge = (bg) => ({ position: 'absolute', top: '5px', left: '5px', background: bg, color: '#fff', fontSize: '9px', fontWeight: 700, padding: '2px 5px', borderRadius: '4px', letterSpacing: '0.04em' })

export default function MediaLibrary({ catalog }) {
  const usage = React.useMemo(() => {
    const m = {}
    for (const p of catalog) {
      const set = new Set(p.images || [])
      for (const v of (p.marbling && p.marbling.variants) || []) if (v.image) set.add(v.image)
      for (const f of set) if (f) (m[f] = m[f] || []).push((p.es && p.es.name) || p.id)
    }
    return m
  }, [catalog])
  const [extra, setExtra] = React.useState(() => [...UPLOADED])
  const all = React.useMemo(() => [...new Set([...IMAGE_FILES, ...extra])].sort(), [extra])
  const [uploading, setUploading] = React.useState(false)
  const [busy, setBusy] = React.useState(null)
  const [err, setErr] = React.useState(null)
  const [q, setQ] = React.useState('')

  const pw = () => { try { return sessionStorage.getItem(PW_KEY) || '' } catch { return '' } }

  async function upload(fileList) {
    setErr(null); setUploading(true)
    try {
      for (const file of Array.from(fileList)) {
        const dataUrl = await fileToWebpDataUrl(file)
        const filename = uploadName(file)
        const res = await fetch('/api/upload-image', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ password: pw(), filename, content: dataUrl.split(',')[1] }) })
        if (!res.ok) { let d = ''; try { const j = await res.json(); d = j.detail || j.error || '' } catch {} throw new Error('No se pudo subir' + (d ? ` (${d})` : '')) }
        UPLOADED.add(filename); UPLOADED_PREVIEWS.set(filename, dataUrl); setExtra((e) => [...new Set([...e, filename])])
      }
    } catch (e) { setErr(String(e && e.message || e)) } finally { setUploading(false) }
  }
  async function del(filename) {
    if (!window.confirm(`¿Eliminar ${filename}? No se puede deshacer.`)) return
    setErr(null); setBusy(filename)
    try {
      const res = await fetch('/api/delete-image', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ password: pw(), filename }) })
      if (!res.ok) { let d = ''; try { const j = await res.json(); d = j.detail || j.error || '' } catch {} throw new Error('No se pudo eliminar' + (d ? ` (${d})` : '')) }
      UPLOADED.delete(filename); UPLOADED_PREVIEWS.delete(filename); setExtra((e) => e.filter((x) => x !== filename))
    } catch (e) { setErr(String(e && e.message || e)) } finally { setBusy(null) }
  }

  const shown = all.filter((f) => f.toLowerCase().includes(q.toLowerCase()))
  const unused = all.filter((f) => !(usage[f] || []).length && !UPLOADED.has(f)).length
  return (
    <div>
      <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap', marginBottom: '14px' }}>
        <input placeholder="Buscar imagen…" value={q} onChange={(e) => setQ(e.target.value)} style={inputStyle} />
        <label style={{ ...btn, cursor: uploading ? 'default' : 'pointer' }}>{uploading ? 'Subiendo…' : '⬆ Subir imágenes'}
          <input type="file" accept="image/*" multiple disabled={uploading} style={{ display: 'none' }} onChange={(e) => { if (e.target.files.length) upload(e.target.files); e.target.value = '' }} />
        </label>
        <span style={{ fontSize: '12px', color: '#777' }}>{all.length} imágenes · {unused} sin uso</span>
      </div>
      {err && <div style={errStyle}>{err}</div>}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px,1fr))', gap: '12px' }}>
        {shown.map((f) => {
          const used = usage[f] || []
          const isNew = extra.includes(f) && !IMAGE_FILES.includes(f)
          return (
            <div key={f} style={{ border: '1px solid #e1e3e5', borderRadius: '8px', overflow: 'hidden', background: '#fff' }}>
              <div style={{ position: 'relative', aspectRatio: '4 / 3', background: '#f1f2f4' }}>
                {previewSrc(f)
                  ? <img src={previewSrc(f)} alt={f} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  : <div style={{ display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center', fontSize: '10px', color: '#c0392b' }}>falta archivo</div>}
                {isNew && <span style={badge('#0a7d2c')}>NUEVA</span>}
              </div>
              <div style={{ padding: '7px 8px' }}>
                <div style={{ fontSize: '10px', wordBreak: 'break-all', color: '#555' }} title={f}>{f}</div>
                <div style={{ fontSize: '11px', color: used.length ? '#1b5e20' : '#999', margin: '3px 0 6px' }}>{used.length ? `Usada en ${used.length} producto${used.length > 1 ? 's' : ''}` : (isNew ? 'Recién subida' : 'Sin uso')}</div>
                <button type="button" disabled={used.length > 0 || busy === f} title={used.length ? 'En uso — no se puede eliminar' : 'Eliminar'}
                  style={{ ...btnDanger, padding: '4px 8px', width: '100%', opacity: used.length ? 0.4 : 1, cursor: used.length ? 'not-allowed' : 'pointer' }} onClick={() => del(f)}>
                  {busy === f ? '…' : 'Eliminar'}
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
