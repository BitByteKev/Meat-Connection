// Manage the public category taxonomy (labels, URL slug, order) that the
// storefront filter, footer, and sitemap read from categories.json. Saves via
// /api/save-categories, which commits categories.json and triggers a rebuild.
// Category internal keys are locked once created (products reference them); a
// category still in use by products cannot be deleted.
import React from 'react'
import { CATEGORY_LIST } from '../categories.js'
import { TextField, btn, btnDanger, card, labelStyle, move } from './fields.jsx'

const PW_KEY = 'mc_admin_pw'
const clone = (x) => JSON.parse(JSON.stringify(x))
const slugify = (s) => (s || '').toString().normalize('NFD').replace(/[̀-ͯ]/g, '')
  .toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

export default function CategoriesEditor({ catalog }) {
  const [cats, setCats] = React.useState(() => clone(CATEGORY_LIST).map((c) => ({ ...c, _existing: true })))
  const [status, setStatus] = React.useState(null)
  const [saving, setSaving] = React.useState(false)

  const usage = React.useMemo(() => {
    const m = {}
    for (const p of catalog) m[p.cat] = (m[p.cat] || 0) + 1
    return m
  }, [catalog])
  const usedBy = (c) => (usage[c.key] || 0) + (c.aliases || []).reduce((n, a) => n + (usage[a] || 0), 0)

  const setCat = (i, patch) => setCats((cs) => cs.map((c, k) => (k === i ? { ...c, ...patch } : c)))
  const add = () => setCats((cs) => [...cs, { key: '', slug: '', es: '', en: '', aliases: [], _existing: false }])
  const remove = (i) => setCats((cs) => cs.filter((_, k) => k !== i))
  const moveCat = (i, d) => setCats((cs) => move(cs, i, d))

  function finalize() {
    return cats.map((c) => {
      const es = (c.es || '').trim(), en = (c.en || '').trim()
      const key = (c.key || '').trim() || slugify(en || es)
      const slug = (c.slug || '').trim() || slugify(es || en)
      return { key, slug, es, en, aliases: c.aliases || [] }
    })
  }
  function validate(list) {
    const keys = new Set(), slugs = new Set()
    for (const c of list) {
      if (!c.es || !c.en) return 'Cada categoría necesita nombre en Español e Inglés.'
      if (!c.key) return `No se pudo generar la clave de "${c.es}".`
      if (!/^[a-z0-9-]+$/.test(c.key)) return `Clave inválida: "${c.key}".`
      if (keys.has(c.key)) return `Clave duplicada: "${c.key}".`
      keys.add(c.key)
      if (!/^[a-z0-9-]+$/.test(c.slug)) return `Slug inválido: "${c.slug}".`
      if (slugs.has(c.slug)) return `Slug duplicado: "${c.slug}".`
      slugs.add(c.slug)
    }
    return null
  }

  async function save() {
    setStatus(null)
    const list = finalize()
    const err = validate(list)
    if (err) { setStatus({ ok: false, msg: err }); return }
    setSaving(true)
    let pw = ''; try { pw = sessionStorage.getItem(PW_KEY) || '' } catch {}
    try {
      const res = await fetch('/api/save-categories', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ password: pw, categories: list }) })
      if (res.ok) setStatus({ ok: true, msg: 'Categorías guardadas. El sitio se actualizará en ~1 minuto. Recarga el admin para asignar productos a categorías nuevas.' })
      else if (res.status === 401) setStatus({ ok: false, msg: 'Sesión expirada, vuelve a entrar.' })
      else { let d = ''; try { const j = await res.json(); d = j.detail || j.error || '' } catch {} setStatus({ ok: false, msg: 'No se pudo guardar.' + (d ? ` (${d})` : '') }) }
    } catch (e) { setStatus({ ok: false, msg: 'Error de red, intenta de nuevo.' }) } finally { setSaving(false) }
  }

  return (
    <div>
      <p style={{ fontSize: '13px', color: 'var(--mc-ink-700, #555)', margin: '0 0 16px', lineHeight: 1.6 }}>
        Renombra, reordena, agrega o elimina las categorías del catálogo. El orden aquí es el orden de los filtros en la tienda.
      </p>
      {cats.map((c, i) => {
        const used = usedBy(c)
        return (
          <div key={i} style={card}>
            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', alignItems: 'flex-end' }}>
              <div style={{ flex: '1 1 180px', minWidth: 0 }}><TextField label="Nombre (Español)" value={c.es} onChange={(v) => setCat(i, { es: v })} /></div>
              <div style={{ flex: '1 1 180px', minWidth: 0 }}><TextField label="Nombre (English)" value={c.en} onChange={(v) => setCat(i, { en: v })} /></div>
              <div style={{ flex: '1 1 160px', minWidth: 0 }}><TextField label="Slug (URL)" value={c.slug} onChange={(v) => setCat(i, { slug: slugify(v) })} placeholder={slugify(c.es)} /></div>
              <div style={{ display: 'flex', gap: '4px', paddingBottom: '10px' }}>
                <button type="button" style={btn} disabled={i === 0} onClick={() => moveCat(i, -1)}>↑</button>
                <button type="button" style={btn} disabled={i === cats.length - 1} onClick={() => moveCat(i, 1)}>↓</button>
                <button type="button" style={{ ...btnDanger, opacity: used ? 0.4 : 1, cursor: used ? 'not-allowed' : 'pointer' }} disabled={used > 0}
                  title={used ? `En uso por ${used} producto(s) — reasígnalos antes de eliminar` : 'Eliminar categoría'} onClick={() => remove(i)}>Eliminar</button>
              </div>
            </div>
            <div style={{ fontSize: '11px', color: 'var(--mc-ink-500, #888)', marginTop: '2px' }}>
              {c._existing ? <>clave: <code>{c.key}</code></> : <em>clave nueva: se generará al guardar</em>}
              {(c.aliases && c.aliases.length > 0) && <> · agrupa: {c.aliases.join(', ')}</>}
              {' · '}{used} producto{used === 1 ? '' : 's'}
            </div>
          </div>
        )
      })}
      <button type="button" style={{ ...btn, marginTop: '4px' }} onClick={add}>+ Agregar categoría</button>

      <div style={{ position: 'sticky', bottom: 0, marginTop: '24px', padding: '14px 0', background: 'linear-gradient(to top, var(--mc-paper, #fff) 70%, transparent)' }}>
        {status && (
          <div style={{ marginBottom: '10px', padding: '10px 12px', borderRadius: '8px', fontSize: '13px',
            background: status.ok ? '#e8f5e9' : '#fdecea', color: status.ok ? '#1b5e20' : '#9b1c1c',
            border: `1px solid ${status.ok ? '#a5d6a7' : '#f5c2c0'}` }}>{status.msg}</div>
        )}
        <button type="button" disabled={saving} onClick={save}
          style={{ fontFamily: 'var(--font-display, sans-serif)', fontWeight: 700, fontSize: '15px', cursor: saving ? 'default' : 'pointer',
            border: 'none', borderRadius: '8px', padding: '12px 22px', color: '#fff', background: saving ? 'var(--mc-ink-400, #999)' : 'var(--mc-red, #b3122a)' }}>
          {saving ? 'Guardando…' : 'Guardar categorías'}
        </button>
      </div>
    </div>
  )
}
