# Shopify-Style Admin Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restructure `/admin` into a Shopify-like dashboard — neutral reskin, top action bar with Save, product data table with bulk actions, and a per-product detail view — with zero backend or storefront changes.

**Architecture:** All changes live in `src/admin/`. Style tokens in `fields.jsx` retheme every component that imports them; `AdminApp.jsx` becomes shell (top bar + sidebar + view state `detailIndex`); two new components (`ProductsTable.jsx`, `ProductDetail.jsx`) replace the accordion `ProductEditor`. Save mechanics (`pruneCatalog`/`validate`/`/api/save-products`) are untouched.

**Tech Stack:** React 18 (inline styles, no CSS framework), Vite. **No test runner exists** — the gates for every task are `npm run build` and a browser check at `http://localhost:5173/admin` (run `npm run dev` once, it hot-reloads). The spec is `docs/superpowers/specs/2026-07-01-admin-shopify-redesign-design.md`.

**Verification setup (once, before Task 1):**

```bash
cd "/Users/kevincromleyii/Desktop/03 - Web Projects/wagyu-site"
npm run dev &   # serves http://localhost:5173 — /admin renders AdminApp (app.jsx:1082 pathname check)
```

Login gate accepts any password locally (it only stores it in sessionStorage; real auth happens server-side on save, and the serverless functions don't run under `vite dev` — a save attempt shows the error toast, which is itself a valid check).

**Hard rule for every task:** do NOT edit the bodies of `pruneCatalog`, `cleanMarbling`, or `validate` in `AdminApp.jsx`. Task 6 verifies they are byte-identical to the pre-redesign versions.

---

### Task 1: Retheme tokens in `fields.jsx` (+ `btnPrimary`, `Pill`, `ADMIN_FONT`)

**Files:**
- Modify: `src/admin/fields.jsx` (whole file — 71 lines)

- [ ] **Step 1: Replace the token/style section of `src/admin/fields.jsx`**

Replace everything from the top of the file through the `btnDanger` export (lines 1–25) with:

```jsx
// Small reusable form controls for the catalog admin, in a neutral
// Polaris-inspired look (gray canvas, white cards, near-black primary) that is
// deliberately NOT the storefront brand — admin chrome should read as a tool.
import React from 'react'

export const ADMIN_FONT = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"

export const card = {
  background: '#fff', border: '1px solid #e1e3e5', borderRadius: '12px',
  boxShadow: '0 1px 2px rgba(0,0,0,0.05)', padding: '16px', marginBottom: '14px',
}
export const labelStyle = {
  display: 'block', fontFamily: ADMIN_FONT, textTransform: 'uppercase',
  letterSpacing: '0.04em', fontSize: '11px', fontWeight: 600, color: '#616a75',
  margin: '0 0 5px',
}
const inputBase = {
  width: '100%', boxSizing: 'border-box', fontFamily: ADMIN_FONT, fontSize: '14px',
  padding: '8px 10px', border: '1px solid #d0d3d6', borderRadius: '8px',
  background: '#fff', color: '#1a1a1a',
}
export const btn = {
  fontFamily: ADMIN_FONT, fontSize: '13px', fontWeight: 600, cursor: 'pointer',
  border: '1px solid #d0d3d6', borderRadius: '8px', background: '#fff',
  color: '#1a1a1a', padding: '7px 12px',
}
export const btnPrimary = { ...btn, background: '#1a1a1a', borderColor: '#1a1a1a', color: '#fff' }
export const btnDanger = { ...btn, color: '#c5280c', borderColor: '#e0b3ab' }

// Status pill: green = active/available, gray = inactive/sold out.
export function Pill({ ok, children }) {
  return (
    <span style={{ display: 'inline-block', padding: '2px 10px', borderRadius: '999px',
      fontSize: '12px', fontWeight: 600, whiteSpace: 'nowrap',
      background: ok ? '#d1f0d9' : '#e8eaec', color: ok ? '#0a6c2e' : '#616a75' }}>
      {children}
    </span>
  )
}
```

Leave `TextField`, `TextArea`, `Select`, and `move` exactly as they are (they read `inputBase`/`labelStyle` and pick up the new look automatically).

- [ ] **Step 2: Build**

Run: `npm run build`
Expected: `✓ built` with no errors.

- [ ] **Step 3: Browser check**

Open `http://localhost:5173/admin`, log in with any password. Expected: cards/buttons/inputs across Productos, Categorías, and Medios now use the neutral gray-border look; no layout breakage. (The page still has the old cream sidebar and serif headings — that's Task 2.)

- [ ] **Step 4: Commit**

```bash
git add src/admin/fields.jsx
git commit -m "Admin restyle: neutral Polaris-like tokens, btnPrimary, Pill"
```

---

### Task 2: Shell — top bar (dirty indicator + Guardar + Salir), toast, sidebar restyle, gray canvas

**Files:**
- Modify: `src/admin/AdminApp.jsx` (imports, `page` const, `AdminApp` component; the sticky save footer is removed)

- [ ] **Step 1: Update imports and page const**

In `src/admin/AdminApp.jsx`, change the fields import (line 7) to include the new exports:

```jsx
import { TextField, TextArea, Select, card, btn, btnPrimary, btnDanger, labelStyle, move, ADMIN_FONT } from './fields.jsx'
```

Replace the `page` const (line 27) and `selectStyle` (line 28) with:

```jsx
const page = { maxWidth: '980px', margin: '0 auto', padding: '28px 18px 120px', fontFamily: ADMIN_FONT, color: '#1a1a1a' }
const selectStyle = { padding: '8px 10px', border: '1px solid #d0d3d6', borderRadius: '8px', fontSize: '13px', background: '#fff' }
```

- [ ] **Step 2: Add dirty tracking to the `AdminApp` component**

Inside `AdminApp()`, after the existing `const [sort, setSort] = React.useState('manual')` line, add:

```jsx
  // Snapshot of the last-saved (pruned) catalog. dirty = current prune differs.
  const [savedJson, setSavedJson] = React.useState(() => JSON.stringify(pruneCatalog(clone(RAW_CATALOG))))
  const dirty = React.useMemo(() => JSON.stringify(pruneCatalog(catalog)) !== savedJson, [catalog, savedJson])
```

In the `save()` function, inside the `if (res.ok)` branch, add one line after `setStatus(...)`:

```jsx
        setSavedJson(JSON.stringify(pruned))
```

- [ ] **Step 3: Replace the component's returned JSX shell**

Replace the entire `return (...)` of `AdminApp` (currently the `<div style={{ display: 'flex', minHeight: '100vh', ...` block through its closing `</div>`) with the following. The products/media/categories section content is IDENTICAL to today (accordion list included) — only the frame around it changes; the old sticky-footer save block is gone:

```jsx
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
          <h1 style={{ fontSize: '20px', fontWeight: 700, margin: '0 0 16px' }}>
            {section === 'products' ? 'Productos' : section === 'categories' ? 'Categorías' : 'Medios'}
          </h1>

          {section === 'products' && (<>
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
              <ProductEditor key={key(p, i)} product={p} canMove={canMove} catOptions={catOptions}
                open={openId === key(p, i)} onToggle={() => setOpenId((o) => o === key(p, i) ? null : key(p, i))}
                onChange={(next) => setProduct(i, next)} onMove={(d) => moveProduct(i, d)} onRemove={() => removeProduct(i)} />
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
```

- [ ] **Step 4: Restyle `navItem`**

Replace the `navItem` helper inside `AdminApp` with:

```jsx
  const navItem = (id, label, count) => (
    <button type="button" onClick={() => setSection(id)} style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', textAlign: 'left',
      border: 'none', borderRadius: '8px', padding: '9px 12px', marginBottom: '2px', cursor: 'pointer', fontSize: '13px',
      fontFamily: ADMIN_FONT, fontWeight: section === id ? 700 : 500,
      background: section === id ? '#e8eaec' : 'transparent', color: '#1a1a1a',
    }}>{label}{count != null && <span style={{ fontSize: '11px', color: '#616a75' }}>{count}</span>}</button>
  )
```

Also update `LoginGate`'s `h1`/`p` (lines 107–108) to drop the serif font:

```jsx
      <h1 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '4px' }}>Catálogo · Admin</h1>
      <p style={{ fontSize: '13px', color: '#616a75', marginTop: 0 }}>Meat Connection</p>
```

and its submit button style to `{ ...btnPrimary, padding: '9px 16px', fontSize: '13px' }`.

- [ ] **Step 5: Build + browser check**

Run: `npm run build` → `✓ built`.
Browser: white top bar with "Meat Connection Admin", **Guardar disabled** (clean state) + Salir; edit any field → "● Cambios sin guardar" appears and Guardar enables; click Guardar → error toast appears top-right (no API locally) with a working ✕; sidebar is white with gray active pill; canvas is light gray; the old bottom save bar is gone; switching to Categorías hides the top-bar Guardar.

- [ ] **Step 6: Commit**

```bash
git add src/admin/AdminApp.jsx
git commit -m "Admin shell: top bar with dirty-aware Guardar, toast, neutral sidebar"
```

---

### Task 3: `ProductDetail.jsx` + `detailIndex` navigation (accordion expansion removed)

**Files:**
- Create: `src/admin/ProductDetail.jsx`
- Modify: `src/admin/AdminApp.jsx` (move `LangColumn`, `imageToBase64`, `AiGenerate` out; strip `ProductEditor` to a row; add `detailIndex` state)

- [ ] **Step 1: Create `src/admin/ProductDetail.jsx`**

`LangColumn`, `imageToBase64`, and `AiGenerate` move here VERBATIM from `AdminApp.jsx` (they are only used by the detail view). Full file:

```jsx
// Product detail screen (Shopify-style): stacked section cards for one product.
// Edits flow through onChange into AdminApp's catalog state; publishing happens
// via the top-bar Guardar (whole-catalog commit), not here.
import React from 'react'
import { TONES, imageUrl } from '../products.js'
import { TextField, TextArea, Select, card, btn, btnDanger, Pill } from './fields.jsx'
import ImagesPicker from './ImagesPicker.jsx'
import MarblingEditor from './MarblingEditor.jsx'

const PW_KEY = 'mc_admin_pw'
const LANG_LABEL = { es: 'Español', en: 'English' }

function SectionCard({ title, children }) {
  return (
    <section style={{ ...card, padding: '18px' }}>
      {title && <h2 style={{ fontSize: '14px', fontWeight: 700, margin: '0 0 12px' }}>{title}</h2>}
      {children}
    </section>
  )
}

// One language's editable content (name, badge, and the three text boxes).
function LangColumn({ lang, product, onChange }) {
  const L = product[lang]
  const setL = (patch) => onChange({ ...product, [lang]: { ...L, ...patch } })
  const setBadge = (v) => onChange({ ...product, badge: { ...product.badge, [lang]: v } })
  return (
    <div style={{ flex: '1 1 340px', minWidth: 0, border: '1px solid #e1e3e5', borderRadius: '8px', padding: '14px', background: '#f9fafb' }}>
      <div style={{ fontWeight: 700, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#616a75', marginBottom: '10px' }}>
        {LANG_LABEL[lang]}
      </div>
      <TextField label="Nombre" value={L.name} onChange={(v) => setL({ name: v })} />
      <TextField label="Badge (opcional)" value={product.badge[lang] || ''} onChange={setBadge} />
      <TextArea label="Descripción" rows={7} value={L.description} onChange={(v) => setL({ description: v })} />
      <p style={{ fontSize: '11px', color: '#616a75', margin: '-6px 0 12px' }}>
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

// Optional AI notes + a button that drafts the name and all six text boxes in
// ES + EN. Claude reads the cover photo to identify the cut, so no name is
// needed first. Via /api/generate-product.
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
    <div>
      <TextArea label="Notas para la IA (opcional)" rows={3} value={notes} onChange={setNotes} />
      <p style={{ fontSize: '11px', color: '#616a75', margin: '-6px 0 10px' }}>
        La IA lee la foto de portada para nombrar el corte. Agrega detalles si los tienes (marmoleo, alimentación, marca, peso) — se usan pero no se guardan.
      </p>
      <button type="button" disabled={busy} onClick={generate}
        style={{ ...btn, opacity: busy ? 0.6 : 1, cursor: busy ? 'default' : 'pointer' }}>
        {busy ? 'Generando…' : '✨ Generar con IA (ES + EN)'}
      </button>
      {err && (
        <div style={{ marginTop: '8px', fontSize: '12px', color: '#9b1c1c' }}>{err}</div>
      )}
    </div>
  )
}

export default function ProductDetail({ product, onChange, onBack, onRemove, catOptions }) {
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px', flexWrap: 'wrap' }}>
        <button type="button" style={btn} onClick={onBack}>← Productos</button>
        <h1 style={{ fontSize: '20px', fontWeight: 700, margin: 0, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {product.es.name || product.id || '(sin nombre)'}
        </h1>
        <Pill ok={product.available !== false}>{product.available !== false ? 'Activo' : 'Agotado'}</Pill>
        <div style={{ flex: 1 }} />
        <button type="button" style={btnDanger}
          onClick={() => { if (window.confirm('¿Eliminar este producto?')) onRemove() }}>Eliminar</button>
      </div>

      <SectionCard title="Datos">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
          <TextField label="ID" value={product.id} onChange={(v) => onChange({ ...product, id: v })} />
          <Select label="Categoría" value={product.cat} options={catOptions} onChange={(v) => onChange({ ...product, cat: v })} />
          <Select label="Tono" value={product.tone} options={TONES} onChange={(v) => onChange({ ...product, tone: v })} />
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'flex-end', margin: '2px 0 0' }}>
          <label style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: 600, color: '#1a1a1a', paddingBottom: '9px' }}>
            <input type="checkbox" checked={product.available !== false} onChange={(e) => onChange({ ...product, available: e.target.checked })} />
            Disponible {product.available === false && <span style={{ color: '#c5280c', fontWeight: 700 }}>· Agotado</span>}
          </label>
          <div style={{ flex: '1 1 150px', minWidth: 0 }}><TextField label="SKU (opcional)" value={product.sku || ''} onChange={(v) => onChange({ ...product, sku: v })} /></div>
          <div style={{ flex: '1 1 200px', minWidth: 0 }}><TextField label="Peso / presentación (opcional)" value={product.weight || ''} onChange={(v) => onChange({ ...product, weight: v })} placeholder="Ej. Corte de 300 g" /></div>
        </div>
      </SectionCard>

      <SectionCard title="Imágenes">
        <ImagesPicker images={product.images} onChange={(v) => onChange({ ...product, images: v })} />
      </SectionCard>

      <SectionCard title="Marmoleo">
        <MarblingEditor product={product} onChange={onChange} />
      </SectionCard>

      <SectionCard title="Generar con IA">
        <AiGenerate product={product} onChange={onChange} />
      </SectionCard>

      <SectionCard title="Contenido (ES / EN)">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px' }}>
          <LangColumn lang="es" product={product} onChange={onChange} />
          <LangColumn lang="en" product={product} onChange={onChange} />
        </div>
      </SectionCard>
    </div>
  )
}
```

- [ ] **Step 2: Update `AdminApp.jsx` — delete moved code, strip `ProductEditor`, add `detailIndex`**

1. DELETE from `AdminApp.jsx`: the `LangColumn` function, the `imageToBase64` function, the `AiGenerate` function, and the `LANG_LABEL` const. Remove now-unused imports: `TextArea`, `Select`, `labelStyle` from the fields import; `MarblingEditor` and `ImagesPicker` imports (they render inside `ProductDetail` now); keep `imageUrl` (still used by the row thumbnail this task). Add:

```jsx
import ProductDetail from './ProductDetail.jsx'
```

2. REPLACE the whole `ProductEditor` function with a header-only row that opens the detail view:

```jsx
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
```

3. In `AdminApp()`: replace `const [openId, setOpenId] = React.useState(null)` with:

```jsx
  const [detailIndex, setDetailIndex] = React.useState(null) // index into catalog, or null = list
```

4. Change `addProduct` and `removeProduct` interplay with the detail view:

```jsx
  const removeProduct = (i) => { setCatalog((c) => c.filter((_, k) => k !== i)); setDetailIndex(null) }
  const addProduct = () => { setDetailIndex(catalog.length); setCatalog((c) => [...c, newProduct()]) }
```

5. In the products section of the returned JSX, wrap the list in a detail branch. Replace the `{section === 'products' && (<>...</>)}` block's contents with:

```jsx
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
```

Also hide the `h1` title while the detail view is open (the detail has its own header): change the `<h1>` line to

```jsx
          {!(section === 'products' && detailIndex != null) && (
            <h1 style={{ fontSize: '20px', fontWeight: 700, margin: '0 0 16px' }}>
              {section === 'products' ? 'Productos' : section === 'categories' ? 'Categorías' : 'Medios'}
            </h1>
          )}
```

6. Clear the detail view when switching sidebar sections — in `navItem`, change the onClick to:

```jsx
    <button type="button" onClick={() => { setSection(id); setDetailIndex(null) }} style={{
```

- [ ] **Step 3: Build + browser check**

Run: `npm run build` → `✓ built`.
Browser: product list shows compact rows; clicking a row (name or thumb) opens the detail screen with Datos / Imágenes / Marmoleo / IA / Contenido cards; "← Productos" returns with search/filter intact; editing any detail field lights the dirty dot; Eliminar (confirm) returns to the list; "+ Agregar producto" opens a blank detail immediately; switching to Medios and back lands on the list.

- [ ] **Step 4: Commit**

```bash
git add src/admin/ProductDetail.jsx src/admin/AdminApp.jsx
git commit -m "Admin: product detail view replaces accordion expansion"
```

---

### Task 4: `ProductsTable.jsx` — data table, bulk actions, empty state

**Files:**
- Create: `src/admin/ProductsTable.jsx`
- Modify: `src/admin/AdminApp.jsx` (replace `ProductRow` list + toolbar with the table; add selection state + bulk handlers)

- [ ] **Step 1: Create `src/admin/ProductsTable.jsx`**

```jsx
// Shopify-style product table: toolbar (search/filter/sort), selectable rows
// with a bulk-action bar, status pills, and manual reorder in unfiltered manual
// mode. Row click opens the detail view; all edits are local state until the
// top-bar Guardar publishes.
import React from 'react'
import { imageUrl } from '../products.js'
import { card, btn, btnPrimary, btnDanger, Pill } from './fields.jsx'
import { UPLOADED_PREVIEWS } from './uploads.js'

// Stable row identity even for freshly added products with an empty id.
export const rowKey = (p, i) => p.id || '#' + i

const th = { textAlign: 'left', fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em', color: '#616a75', padding: '10px', borderBottom: '1px solid #e1e3e5', whiteSpace: 'nowrap' }
const td = { padding: '8px 10px', borderBottom: '1px solid #eef0f2', fontSize: '13px', verticalAlign: 'middle' }
const toolInput = { padding: '8px 10px', border: '1px solid #d0d3d6', borderRadius: '8px', fontSize: '13px', background: '#fff' }

const marblingSummary = (m) => {
  if (!m || !Array.isArray(m.variants) || m.variants.length === 0) return '—'
  const sys = m.system === 'bms' ? 'BMS' : 'MB'
  const lo = Math.min(...m.variants.map((v) => v.lo))
  const hi = Math.max(...m.variants.map((v) => v.hi))
  return `${sys} ${lo}–${hi}`
}

export default function ProductsTable({
  rows, total, query, onQuery, filterCat, onFilterCat, sort, onSort, canMove, catOptions,
  selected, onSelected, onOpen, onMove, onBulkAvailable, onBulkDelete, onAdd, onClearFilters,
}) {
  const visibleKeys = rows.map(([p, i]) => rowKey(p, i))
  const allSelected = visibleKeys.length > 0 && visibleKeys.every((k) => selected.has(k))
  const toggleAll = () => onSelected(allSelected ? new Set() : new Set(visibleKeys))
  const toggleOne = (k) => {
    const next = new Set(selected)
    if (next.has(k)) next.delete(k); else next.add(k)
    onSelected(next)
  }
  const catLabelOf = (cat) => {
    const o = catOptions.find((x) => x.value === cat)
    return o ? o.label : cat
  }

  return (
    <div style={{ ...card, padding: 0, overflow: 'hidden' }}>
      {selected.size === 0 ? (
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center', padding: '12px 14px', borderBottom: '1px solid #e1e3e5' }}>
          <input placeholder="Buscar producto…" value={query} onChange={(e) => onQuery(e.target.value)}
            style={{ ...toolInput, minWidth: '220px' }} />
          <select value={filterCat} onChange={(e) => onFilterCat(e.target.value)} style={toolInput}>
            <option value="all">Todas las categorías</option>
            {catOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
          <select value={sort} onChange={(e) => onSort(e.target.value)} style={toolInput}>
            <option value="manual">Orden manual</option><option value="name">Por nombre</option><option value="cat">Por categoría</option>
          </select>
          <span style={{ fontSize: '12px', color: '#616a75', marginLeft: 'auto' }}>{rows.length} de {total}</span>
        </div>
      ) : (
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center', padding: '12px 14px', borderBottom: '1px solid #e1e3e5', background: '#f9fafb' }}>
          <strong style={{ fontSize: '13px' }}>{selected.size} seleccionado{selected.size === 1 ? '' : 's'}</strong>
          <button type="button" style={btn} onClick={() => onBulkAvailable(true)}>Marcar disponible</button>
          <button type="button" style={btn} onClick={() => onBulkAvailable(false)}>Marcar agotado</button>
          <button type="button" style={btnDanger} onClick={onBulkDelete}>Eliminar</button>
          <button type="button" style={{ ...btn, marginLeft: 'auto', border: 'none' }} onClick={() => onSelected(new Set())}>Cancelar</button>
        </div>
      )}

      {rows.length === 0 ? (
        <div style={{ padding: '48px 20px', textAlign: 'center' }}>
          <p style={{ margin: '0 0 12px', fontSize: '14px', color: '#616a75' }}>Sin resultados.</p>
          <button type="button" style={btn} onClick={onClearFilters}>Limpiar filtros</button>
        </div>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ ...th, width: '34px' }}>
                <input type="checkbox" checked={allSelected} onChange={toggleAll} aria-label="Seleccionar todo" />
              </th>
              <th style={{ ...th, width: '54px' }}></th>
              <th style={th}>Producto</th>
              <th style={th}>Estado</th>
              <th style={th}>Categoría</th>
              <th style={th}>Marmoleo</th>
              {canMove && <th style={{ ...th, width: '84px' }}></th>}
            </tr>
          </thead>
          <tbody>
            {rows.map(([p, i]) => {
              const k = rowKey(p, i)
              const cover = (p.images || [])[0]
              const thumb = cover && (imageUrl(cover) || UPLOADED_PREVIEWS.get(cover))
              return (
                <tr key={k} onClick={() => onOpen(i)} style={{ cursor: 'pointer' }}
                  onMouseOver={(e) => { e.currentTarget.style.background = '#f9fafb' }}
                  onMouseOut={(e) => { e.currentTarget.style.background = '' }}>
                  <td style={td} onClick={(e) => e.stopPropagation()}>
                    <input type="checkbox" checked={selected.has(k)} onChange={() => toggleOne(k)} aria-label={`Seleccionar ${p.id}`} />
                  </td>
                  <td style={td}>
                    <div style={{ width: '44px', height: '36px', borderRadius: '6px', overflow: 'hidden', background: '#f1f2f4', border: '1px solid #e1e3e5' }}>
                      {thumb && <img src={thumb} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
                    </div>
                  </td>
                  <td style={td}>
                    <div style={{ fontWeight: 600 }}>{(p.es && p.es.name) || p.id || '(sin nombre)'}</div>
                    <div style={{ fontSize: '12px', color: '#616a75' }}>{p.id}{p.sku ? ` · ${p.sku}` : ''}</div>
                  </td>
                  <td style={td}><Pill ok={p.available !== false}>{p.available !== false ? 'Activo' : 'Agotado'}</Pill></td>
                  <td style={td}>{catLabelOf(p.cat)}</td>
                  <td style={td}>{marblingSummary(p.marbling)}</td>
                  {canMove && (
                    <td style={{ ...td, whiteSpace: 'nowrap' }} onClick={(e) => e.stopPropagation()}>
                      <button type="button" style={{ ...btn, padding: '4px 8px' }} onClick={() => onMove(i, -1)}>↑</button>{' '}
                      <button type="button" style={{ ...btn, padding: '4px 8px' }} onClick={() => onMove(i, 1)}>↓</button>
                    </td>
                  )}
                </tr>
              )
            })}
          </tbody>
        </table>
      )}

      <div style={{ padding: '12px 14px', borderTop: '1px solid #e1e3e5' }}>
        <button type="button" style={btnPrimary} onClick={onAdd}>+ Agregar producto</button>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Wire the table into `AdminApp.jsx`**

1. DELETE the `ProductRow` function and the `key` helper line (`const key = (p, i) => p.id || '#' + i`). Remove the now-unused `imageUrl` from the products.js import and `UPLOADED_PREVIEWS` if imported. Remove `selectStyle` (toolbar moved into the table). Also drop `card` and `btnDanger` from the fields import if nothing in `AdminApp.jsx` still references them (after this task, AdminApp uses only `TextField`, `btn`, `btnPrimary`, `move`, `ADMIN_FONT`). Add the import:

```jsx
import ProductsTable, { rowKey } from './ProductsTable.jsx'
```

2. Add selection state + bulk handlers inside `AdminApp()` (after `detailIndex`):

```jsx
  const [selected, setSelected] = React.useState(() => new Set())
  React.useEffect(() => { setSelected(new Set()) }, [query, filterCat, sort, section])

  const bulkAvailable = (val) => {
    setCatalog((c) => c.map((p, i) => (selected.has(rowKey(p, i)) ? { ...p, available: val } : p)))
    setSelected(new Set())
  }
  const bulkDelete = () => {
    if (!window.confirm(`¿Eliminar ${selected.size} producto(s)?`)) return
    setCatalog((c) => c.filter((p, i) => !selected.has(rowKey(p, i))))
    setSelected(new Set())
    setDetailIndex(null)
  }
  const clearFilters = () => { setQuery(''); setFilterCat('all'); setSort('manual') }
```

3. The `rows` computation stays as-is but uses `rowKey` nowhere (it already carries `[p, i]` pairs). Replace the entire products **list** branch (toolbar + `ProductRow` map + empty text + add button from Task 3 Step 2.5) with:

```jsx
          {section === 'products' && (detailIndex == null || !catalog[detailIndex]) && (
            <ProductsTable
              rows={rows} total={catalog.length}
              query={query} onQuery={setQuery}
              filterCat={filterCat} onFilterCat={setFilterCat}
              sort={sort} onSort={setSort}
              canMove={canMove} catOptions={catOptions}
              selected={selected} onSelected={setSelected}
              onOpen={(i) => setDetailIndex(i)}
              onMove={(i, d) => moveProduct(i, d)}
              onBulkAvailable={bulkAvailable} onBulkDelete={bulkDelete}
              onAdd={addProduct} onClearFilters={clearFilters}
            />
          )}
```

The detail branch from Task 3 is unchanged.

- [ ] **Step 3: Build + browser check**

Run: `npm run build` → `✓ built`.
Browser checks:
- Table renders: checkbox / thumb / Producto (+ id·SKU subtext) / Estado pill / Categoría label / Marmoleo summary; ↑↓ column only in "Orden manual" with no search/filter.
- Row click opens detail; checkbox and ↑↓ clicks do NOT open detail.
- Header checkbox selects exactly the visible (filtered) rows.
- Selecting rows swaps the toolbar for the bulk bar; "Marcar agotado" flips pills to gray + lights dirty; "Eliminar" confirms then removes; "Cancelar" clears selection.
- Changing search/filter/sort clears selection.
- Search for gibberish → "Sin resultados." + "Limpiar filtros" restores.
- "+ Agregar producto" (table footer) opens a blank detail.

- [ ] **Step 4: Commit**

```bash
git add src/admin/ProductsTable.jsx src/admin/AdminApp.jsx
git commit -m "Admin: Shopify-style product table with bulk actions and empty state"
```

---

### Task 5: Restyle pass — CategoriesEditor, MediaLibrary, ImagesPicker, MarblingEditor

**Files:**
- Modify: `src/admin/CategoriesEditor.jsx`
- Modify: `src/admin/MediaLibrary.jsx`
- Modify: `src/admin/ImagesPicker.jsx`
- Modify: `src/admin/MarblingEditor.jsx`

- [ ] **Step 1: CategoriesEditor — primary save button, no sticky footer**

In `src/admin/CategoriesEditor.jsx`:

1. Add `btnPrimary` to the fields import:

```jsx
import { TextField, btn, btnPrimary, btnDanger, card, labelStyle, move } from './fields.jsx'
```

2. Replace the sticky footer block (the `<div style={{ position: 'sticky', bottom: 0, ... }}>` wrapper at the end) with a plain row using `btnPrimary`:

```jsx
      <div style={{ marginTop: '24px' }}>
        {status && (
          <div style={{ marginBottom: '10px', padding: '10px 12px', borderRadius: '8px', fontSize: '13px',
            background: status.ok ? '#d1f0d9' : '#fdecea', color: status.ok ? '#0a6c2e' : '#9b1c1c',
            border: `1px solid ${status.ok ? '#a3d9b1' : '#f5c2c0'}` }}>{status.msg}</div>
        )}
        <button type="button" disabled={saving} onClick={save}
          style={{ ...btnPrimary, fontSize: '14px', padding: '10px 18px', opacity: saving ? 0.6 : 1, cursor: saving ? 'default' : 'pointer' }}>
          {saving ? 'Guardando…' : 'Guardar categorías'}
        </button>
      </div>
```

3. Normalize gray text colors in this file: replace `color: 'var(--mc-ink-700, #555)'` with `color: '#616a75'` and `color: 'var(--mc-ink-500, #888)'` with `color: '#616a75'` (2 occurrences).

- [ ] **Step 2: Normalize hardcoded grays in the other three files**

In `src/admin/MediaLibrary.jsx`, `src/admin/ImagesPicker.jsx`, and `src/admin/MarblingEditor.jsx`, apply these literal replacements everywhere they appear (they are style values only — verify each occurrence is inside a style object before replacing):

- `1px solid #cfcbc4` → `1px solid #d0d3d6`
- `1px solid var(--mc-ink-300, #cfcbc4)` → `1px solid #d0d3d6`
- `var(--mc-ink-600, #777)` → `#616a75`
- `var(--mc-ink-700, #555)` → `#616a75`
- `var(--mc-cream, #faf8f4)` → `#f9fafb`
- `var(--mc-red, #b3122a)` → `#c5280c`

Run to find them: `grep -n "cfcbc4\|mc-ink\|mc-cream\|mc-red" src/admin/MediaLibrary.jsx src/admin/ImagesPicker.jsx src/admin/MarblingEditor.jsx`

Expected after the pass: that grep returns nothing.

- [ ] **Step 3: Build + browser check**

Run: `npm run build` → `✓ built`.
Browser: Categorías — cards restyled, save button is near-black, saving shows the in-page banner (error locally, expected), and the top-bar Guardar is absent on this section. Medios — grid renders, upload/delete buttons styled. Product detail — image picker and marbling editor read consistently with the rest.

- [ ] **Step 4: Commit**

```bash
git add src/admin/CategoriesEditor.jsx src/admin/MediaLibrary.jsx src/admin/ImagesPicker.jsx src/admin/MarblingEditor.jsx
git commit -m "Admin restyle: categories, media, image picker, marbling editor"
```

---

### Task 6: Regression guard + full walkthrough + push

**Files:** none (verification only)

- [ ] **Step 1: Verify the save-path functions are byte-identical**

The marbling-wipe bug class must stay closed — the three pure functions must not have changed:

```bash
cd "/Users/kevincromleyii/Desktop/03 - Web Projects/wagyu-site"
for fn in pruneCatalog cleanMarbling validate; do
  diff <(git show 192e9aa:src/admin/AdminApp.jsx | awk "/^function $fn\(/,/^}/") \
       <(awk "/^function $fn\(/,/^}/" src/admin/AdminApp.jsx) \
    && echo "$fn OK (unchanged)"
done
```

Expected: three `OK (unchanged)` lines, no diff output. If any differ, STOP and restore the original function body before proceeding.

- [ ] **Step 2: Verify the save payload still carries every field**

In the browser (dev server), open DevTools → Network. Edit one product in the detail view (change its name), click the top-bar **Guardar**, and inspect the request to `/api/save-products` (it will 404 locally — the request body is what matters). Confirm the edited product object in the JSON payload contains: `id, cat, tone, images, badge{es,en}, es{name,description,origin,cooking}, en{...}`, and — for a product that has them — `marbling{system,variants[{lo,hi,image,label,sku?}]}`, `sku`, `weight`, and `available: false` on a sold-out product.

- [ ] **Step 3: Full walkthrough**

At `http://localhost:5173/admin`:

1. Login → table view, Guardar disabled, no dirty dot.
2. Search + category filter + all three sort modes; reorder arrows only in manual/unfiltered; counts correct.
3. Select 2 rows → Marcar agotado → pills flip, dirty dot on; select same → Marcar disponible → pills back.
4. Select 1 row → Eliminar → confirm dialog → row gone.
5. Row click → detail: edit every card (Datos incl. available/SKU/peso, Imágenes add/remove/reorder, Marmoleo add variant, Contenido ES+EN); back link preserves the active filter.
6. + Agregar producto → blank detail opens; back → new row present ("(sin nombre)").
7. Guardar → error toast (no API locally) with working ✕; state intact.
8. Categorías: rename/reorder works; delete disabled on in-use rows; own save button present; top-bar Guardar hidden.
9. Medios: grid, usage badges, upload picker opens.
10. Salir → login gate.

- [ ] **Step 4: Final build + push**

```bash
npm run build   # expect ✓ built
git fetch origin && git rev-list --left-right --count HEAD...origin/main   # rebase first if right column > 0
git push origin main
```

Vercel deploys in ~1 min; spot-check `https://meat-connection.vercel.app/admin` renders the new shell (login gate restyled).
