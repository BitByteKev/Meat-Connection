// Catalog admin (password-gated). Edits the product catalog and commits it to
// GitHub via /api/save-products, which triggers a Vercel rebuild (~1 min to live).
// Content admin only — not a CRM. See docs/superpowers/specs/2026-06-27-catalog-admin-simplify.md
import React from 'react'
import { RAW_CATALOG, CATEGORIES, IMAGE_FILES, imageUrl } from '../products.js'
import { CATEGORY_LIST } from '../categories.js'
import { TextField, card, btn, btnPrimary, btnDanger, move, ADMIN_FONT } from './fields.jsx'
import ProductDetail from './ProductDetail.jsx'
import MediaLibrary from './MediaLibrary.jsx'
import CategoriesEditor from './CategoriesEditor.jsx'
import { UPLOADED, UPLOADED_PREVIEWS } from './uploads.js'

const PW_KEY = 'mc_admin_pw'
const clone = (x) => JSON.parse(JSON.stringify(x))

// Labeled category options for the product dropdown/filter: the editable
// categories (key → Spanish label) plus any legacy/alias code still present on a
// product (e.g. "kingriver") so those products stay selectable.
function categoryOptions(catalog) {
  const opts = CATEGORY_LIST.map((c) => ({ value: c.key, label: c.es }))
  const known = new Set(opts.map((o) => o.value))
  for (const p of catalog) if (p.cat && !known.has(p.cat)) { known.add(p.cat); opts.push({ value: p.cat, label: p.cat }) }
  return opts
}

const page = { maxWidth: '980px', margin: '0 auto', padding: '28px 18px 120px', fontFamily: ADMIN_FONT, color: '#1a1a1a' }
const selectStyle = { padding: '8px 10px', border: '1px solid #d0d3d6', borderRadius: '8px', fontSize: '13px', background: '#fff' }

// Trim outer whitespace only — internal newlines are meaningful (paragraphs/bullets).
// Preserves structured fields the form now edits (marbling grades, availability,
// SKU, weight) — previously these were silently dropped on every save.
function pruneCatalog(catalog) {
  return catalog.map((p) => ({
    id: p.id.trim(),
    cat: p.cat,
    tone: p.tone,
    images: p.images,
    ...(p.marbling ? { marbling: cleanMarbling(p.marbling) } : {}),
    ...(p.available === false ? { available: false } : {}),
    ...((p.sku || '').trim() ? { sku: p.sku.trim() } : {}),
    ...((p.weight || '').trim() ? { weight: p.weight.trim() } : {}),
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

// Coerce grade numbers, drop blank rows, and strip empty optional keys so the
// saved marbling matches the shape the storefront's MarblingScale expects.
function cleanMarbling(m) {
  const variants = (m.variants || [])
    .map((v) => {
      const lo = parseInt(v.lo, 10), hi = parseInt(v.hi, 10)
      if (!Number.isFinite(lo) || !Number.isFinite(hi)) return null
      const out = { lo, hi, image: v.image || '' }
      const label = (v.label || '').trim()
      out.label = label || (lo === hi ? String(lo) : `${lo}-${hi}`)
      if ((v.sku || '').trim()) out.sku = v.sku.trim()
      return out
    })
    .filter(Boolean)
  return { system: m.system, variants }
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
    marbling: null, available: true, sku: '', weight: '',
    badge: { es: null, en: null },
    es: blank(), en: blank(),
  }
}

function LoginGate({ onLogin }) {
  const [pw, setPw] = React.useState('')
  return (
    <div style={{ ...page, maxWidth: '380px', paddingTop: '80px' }}>
      <h1 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '4px' }}>Catálogo · Admin</h1>
      <p style={{ fontSize: '13px', color: '#616a75', marginTop: 0 }}>Meat Connection</p>
      <form onSubmit={(e) => { e.preventDefault(); if (pw) onLogin(pw) }}>
        <TextField label="Contraseña" type="password" value={pw} onChange={setPw} />
        <button type="submit" style={{ ...btnPrimary, padding: '9px 16px', fontSize: '13px' }}>Entrar</button>
      </form>
    </div>
  )
}

function ProductRow({ product, canMove, onOpen, onMove, onRemove }) {
  const cover = (product.images || [])[0]
  const thumb = cover && (imageUrl(cover) || UPLOADED_PREVIEWS.get(cover))
  return (
    <div style={{ ...card, padding: '10px 14px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div onClick={onOpen} style={{ width: '46px', height: '38px', borderRadius: '6px', overflow: 'hidden', background: '#f1f2f4', flex: 'none', cursor: 'pointer', border: '1px solid #e1e3e5' }}>
          {thumb && <img src={thumb} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
        </div>
        <strong onClick={onOpen} style={{ flex: 1, cursor: 'pointer', minWidth: 0, fontSize: '14px' }}>
          {product.es.name || product.id || '(sin nombre)'} <span style={{ color: '#616a75', fontWeight: 400, fontSize: '12px' }}>· {product.id} · {product.cat}</span>
        </strong>
        {canMove && <button type="button" style={btn} onClick={() => onMove(-1)}>↑</button>}
        {canMove && <button type="button" style={btn} onClick={() => onMove(1)}>↓</button>}
        <button type="button" style={btnDanger} onClick={onRemove}>Eliminar</button>
      </div>
    </div>
  )
}

export default function AdminApp() {
  const [pw, setPw] = React.useState(() => { try { return sessionStorage.getItem(PW_KEY) || '' } catch { return '' } })
  const [authed, setAuthed] = React.useState(() => { try { return !!sessionStorage.getItem(PW_KEY) } catch { return false } })
  const [catalog, setCatalog] = React.useState(() => clone(RAW_CATALOG))
  const [status, setStatus] = React.useState(null) // { ok, msg }
  const [saving, setSaving] = React.useState(false)
  const [section, setSection] = React.useState('products')
  const [detailIndex, setDetailIndex] = React.useState(null) // index into catalog, or null = list
  const [query, setQuery] = React.useState('')
  const [filterCat, setFilterCat] = React.useState('all')
  const [sort, setSort] = React.useState('manual')

  // Snapshot of the last-saved (pruned) catalog. dirty = current prune differs.
  const [savedJson, setSavedJson] = React.useState(() => JSON.stringify(pruneCatalog(clone(RAW_CATALOG))))
  const dirty = React.useMemo(() => JSON.stringify(pruneCatalog(catalog)) !== savedJson, [catalog, savedJson])

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
  const removeProduct = (i) => { setCatalog((c) => c.filter((_, k) => k !== i)); setDetailIndex(null) }
  const addProduct = () => { setDetailIndex(catalog.length); setCatalog((c) => [...c, newProduct()]) }

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
        setSavedJson(JSON.stringify(pruned))
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

  const key = (p, i) => p.id || `#${i}`
  const q = query.trim().toLowerCase()
  const rows = catalog.map((p, i) => [p, i])
    .filter(([p]) => filterCat === 'all' || p.cat === filterCat)
    .filter(([p]) => !q || `${p.id} ${(p.es && p.es.name) || ''} ${(p.en && p.en.name) || ''}`.toLowerCase().includes(q))
  if (sort === 'name') rows.sort((a, b) => ((a[0].es && a[0].es.name) || a[0].id).localeCompare((b[0].es && b[0].es.name) || b[0].id))
  else if (sort === 'cat') rows.sort((a, b) => a[0].cat.localeCompare(b[0].cat) || ((a[0].es && a[0].es.name) || '').localeCompare((b[0].es && b[0].es.name) || ''))
  const canMove = sort === 'manual' && !q && filterCat === 'all'
  const catOptions = categoryOptions(catalog)

  const navItem = (id, label, count) => (
    <button type="button" onClick={() => { setSection(id); setDetailIndex(null) }} style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', textAlign: 'left',
      border: 'none', borderRadius: '8px', padding: '9px 12px', marginBottom: '2px', cursor: 'pointer', fontSize: '13px',
      fontFamily: ADMIN_FONT, fontWeight: section === id ? 700 : 500,
      background: section === id ? '#e8eaec' : 'transparent', color: '#1a1a1a',
    }}>{label}{count != null && <span style={{ fontSize: '11px', color: '#616a75' }}>{count}</span>}</button>
  )

  return (
    <div style={{ minHeight: '100vh', fontFamily: ADMIN_FONT, color: '#1a1a1a', background: '#f1f2f4' }}>
      <header style={{ position: 'sticky', top: 0, zIndex: 20, display: 'flex', alignItems: 'center', gap: '12px',
        padding: '10px 20px', background: '#fff', borderBottom: '1px solid #e1e3e5' }}>
        <strong style={{ fontSize: '15px' }}>Meat Connection</strong>
        <span style={{ fontSize: '11px', fontWeight: 600, color: '#616a75', background: '#e8eaec', borderRadius: '6px', padding: '2px 8px' }}>Admin</span>
        <div style={{ flex: 1 }} />
        {section === 'products' && dirty && (
          <span style={{ fontSize: '12px', fontWeight: 600, color: '#8a6116' }}>● Cambios sin guardar</span>
        )}
        {section === 'products' && (
          <button type="button" disabled={saving || !dirty} onClick={save}
            style={{ ...btnPrimary, opacity: saving || !dirty ? 0.5 : 1, cursor: saving || !dirty ? 'default' : 'pointer' }}>
            {saving ? 'Guardando…' : 'Guardar'}
          </button>
        )}
        <button type="button" style={btn} onClick={logout}>Salir</button>
      </header>

      {status && (
        <div style={{ position: 'fixed', top: '62px', right: '20px', zIndex: 30, maxWidth: '420px',
          display: 'flex', gap: '10px', alignItems: 'flex-start', padding: '10px 14px', borderRadius: '10px',
          fontSize: '13px', boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
          background: status.ok ? '#d1f0d9' : '#fdecea', color: status.ok ? '#0a6c2e' : '#9b1c1c',
          border: `1px solid ${status.ok ? '#a3d9b1' : '#f5c2c0'}` }}>
          <span>{status.msg}</span>
          <button type="button" onClick={() => setStatus(null)} aria-label="Cerrar"
            style={{ border: 'none', background: 'none', cursor: 'pointer', color: 'inherit', fontSize: '14px', lineHeight: 1, padding: 0 }}>✕</button>
        </div>
      )}

      <div style={{ display: 'flex' }}>
        <aside style={{ width: '210px', flex: 'none', borderRight: '1px solid #e1e3e5', background: '#fff',
          padding: '14px 10px', position: 'sticky', top: '53px', alignSelf: 'flex-start',
          height: 'calc(100vh - 53px)', display: 'flex', flexDirection: 'column', boxSizing: 'border-box' }}>
          {navItem('products', 'Productos', catalog.length)}
          {navItem('categories', 'Categorías', CATEGORY_LIST.length)}
          {navItem('media', 'Medios', IMAGE_FILES.length)}
          <div style={{ flex: 1 }} />
        </aside>

        <main style={{ flex: 1, minWidth: 0, padding: '22px 26px 80px', maxWidth: '1080px' }}>
          {!(section === 'products' && detailIndex != null) && (
            <h1 style={{ fontSize: '20px', fontWeight: 700, margin: '0 0 16px' }}>
              {section === 'products' ? 'Productos' : section === 'categories' ? 'Categorías' : 'Medios'}
            </h1>
          )}

          {section === 'products' && detailIndex != null && catalog[detailIndex] && (
            <ProductDetail product={catalog[detailIndex]} catOptions={catOptions}
              onChange={(next) => setProduct(detailIndex, next)}
              onBack={() => setDetailIndex(null)}
              onRemove={() => removeProduct(detailIndex)} />
          )}

          {section === 'products' && (detailIndex == null || !catalog[detailIndex]) && (<>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center', marginBottom: '14px' }}>
              <input placeholder="Buscar producto…" value={query} onChange={(e) => setQuery(e.target.value)}
                style={{ ...selectStyle, minWidth: '220px' }} />
              <select value={filterCat} onChange={(e) => setFilterCat(e.target.value)} style={selectStyle}>
                <option value="all">Todas las categorías</option>
                {catOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
              <select value={sort} onChange={(e) => setSort(e.target.value)} style={selectStyle}>
                <option value="manual">Orden manual</option><option value="name">Por nombre</option><option value="cat">Por categoría</option>
              </select>
              <span style={{ fontSize: '12px', color: '#616a75', marginLeft: 'auto' }}>{rows.length} de {catalog.length}</span>
            </div>
            {rows.map(([p, i]) => (
              <ProductRow key={key(p, i)} product={p} canMove={canMove}
                onOpen={() => setDetailIndex(i)}
                onMove={(d) => moveProduct(i, d)} onRemove={() => removeProduct(i)} />
            ))}
            {rows.length === 0 && <p style={{ color: '#616a75', fontSize: '13px' }}>Sin resultados.</p>}
            <button type="button" style={{ ...btn, marginTop: '8px' }} onClick={addProduct}>+ Agregar producto</button>
          </>)}

          {section === 'media' && <MediaLibrary catalog={catalog} />}

          {section === 'categories' && <CategoriesEditor catalog={catalog} />}
        </main>
      </div>
    </div>
  )
}
