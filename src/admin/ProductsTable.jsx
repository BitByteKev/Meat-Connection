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
