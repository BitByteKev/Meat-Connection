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

// options: array of strings, or { value, label } objects for friendly labels.
export function Select({ label, value, options, onChange }) {
  return (
    <label style={{ display: 'block', marginBottom: '10px' }}>
      {label && <span style={labelStyle}>{label}</span>}
      <select style={inputBase} value={value} onChange={(e) => onChange(e.target.value)}>
        {options.map((o) => {
          const val = typeof o === 'object' ? o.value : o
          const lab = typeof o === 'object' ? o.label : o
          return <option key={val} value={val}>{lab}</option>
        })}
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

export { move }
