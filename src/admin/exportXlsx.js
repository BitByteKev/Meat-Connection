// Minimal .xlsx writer — no dependencies. An .xlsx is a zip of XML parts; we
// emit a store-only (uncompressed) zip with a single inline-string worksheet,
// the same structure Excel itself produces for simple exports.

const enc = new TextEncoder()

// CRC-32 (IEEE), required by the zip format
const CRC_TABLE = (() => {
  const t = new Uint32Array(256)
  for (let n = 0; n < 256; n++) {
    let c = n
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1
    t[n] = c >>> 0
  }
  return t
})()
const crc32 = (buf) => {
  let c = 0xffffffff
  for (let i = 0; i < buf.length; i++) c = CRC_TABLE[(c ^ buf[i]) & 0xff] ^ (c >>> 8)
  return (c ^ 0xffffffff) >>> 0
}

// files: array of [name, string] → store-only zip bytes
function zip(files) {
  const now = new Date()
  const dosTime = (now.getHours() << 11) | (now.getMinutes() << 5) | (now.getSeconds() >> 1)
  const dosDate = ((now.getFullYear() - 1980) << 9) | ((now.getMonth() + 1) << 5) | now.getDate()
  const parts = [], central = []
  let offset = 0
  for (const [name, text] of files) {
    const n = enc.encode(name), data = enc.encode(text), crc = crc32(data)
    const local = new DataView(new ArrayBuffer(30))
    local.setUint32(0, 0x04034b50, true)
    local.setUint16(4, 20, true)
    local.setUint16(10, dosTime, true)
    local.setUint16(12, dosDate, true)
    local.setUint32(14, crc, true)
    local.setUint32(18, data.length, true)
    local.setUint32(22, data.length, true)
    local.setUint16(26, n.length, true)
    parts.push(new Uint8Array(local.buffer), n, data)
    const cen = new DataView(new ArrayBuffer(46))
    cen.setUint32(0, 0x02014b50, true)
    cen.setUint16(4, 20, true)
    cen.setUint16(6, 20, true)
    cen.setUint16(12, dosTime, true)
    cen.setUint16(14, dosDate, true)
    cen.setUint32(16, crc, true)
    cen.setUint32(20, data.length, true)
    cen.setUint32(24, data.length, true)
    cen.setUint16(28, n.length, true)
    cen.setUint32(42, offset, true)
    central.push(new Uint8Array(cen.buffer), n)
    offset += 30 + n.length + data.length
  }
  const centralSize = central.reduce((s, a) => s + a.length, 0)
  const end = new DataView(new ArrayBuffer(22))
  end.setUint32(0, 0x06054b50, true)
  end.setUint16(8, files.length, true)
  end.setUint16(10, files.length, true)
  end.setUint32(12, centralSize, true)
  end.setUint32(16, offset, true)
  const all = [...parts, ...central, new Uint8Array(end.buffer)]
  const out = new Uint8Array(all.reduce((s, a) => s + a.length, 0))
  let p = 0
  for (const a of all) { out.set(a, p); p += a.length }
  return out
}

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
const colRef = (i) => { let s = ''; i++; while (i) { s = String.fromCharCode(65 + ((i - 1) % 26)) + s; i = Math.floor((i - 1) / 26) } return s }

// rows: array of arrays; numbers become numeric cells, everything else inline strings
export function buildXlsx(rows, sheetName = 'Productos') {
  const body = rows.map((cells, r) =>
    `<row r="${r + 1}">` + cells.map((v, c) => {
      const ref = colRef(c) + (r + 1)
      if (typeof v === 'number' && Number.isFinite(v)) return `<c r="${ref}"><v>${v}</v></c>`
      if (v == null || v === '') return ''
      return `<c r="${ref}" t="inlineStr"><is><t xml:space="preserve">${esc(v)}</t></is></c>`
    }).join('') + '</row>'
  ).join('')
  const files = [
    ['[Content_Types].xml', '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
      '<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">' +
      '<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>' +
      '<Default Extension="xml" ContentType="application/xml"/>' +
      '<Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/>' +
      '<Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>' +
      '</Types>'],
    ['_rels/.rels', '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
      '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">' +
      '<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/>' +
      '</Relationships>'],
    ['xl/workbook.xml', '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
      '<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">' +
      `<sheets><sheet name="${esc(sheetName)}" sheetId="1" r:id="rId1"/></sheets></workbook>`],
    ['xl/_rels/workbook.xml.rels', '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
      '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">' +
      '<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/>' +
      '</Relationships>'],
    ['xl/worksheets/sheet1.xml', '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
      '<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">' +
      `<sheetData>${body}</sheetData></worksheet>`],
  ]
  return zip(files)
}

// Keys must match BRAND_LIST in src/app.jsx — used to label the "Marca"
// column when a grade has more than one brand/price variant.
const BRAND_NAMES = {
  mackas: "Macka's",
  kingriver: 'King River',
  lgrow: "L'grow",
  anguspure: 'Angus Pure',
  wagyu: 'A5 Japonés',
  jewel: 'Jewel',
  abattiranch: 'Abatti Ranch',
}
const brandNames = (marcas) => (Array.isArray(marcas) && marcas.length ? marcas.map((k) => BRAND_NAMES[k] || k).join(' / ') : '')

// One row per grade variant (mirrors the wholesale price sheet layout).
export function productRows(catalog, catLabelOf) {
  const num = (x) => (typeof x === 'number' ? x : '')
  const rows = [['Producto', 'Categoría', 'Marmoleo', 'Marca', 'Clave/SKU', 'Mayoreo MXN/kg', 'Menudeo MXN/kg', 'Estado', 'ID']]
  for (const p of catalog) {
    const name = (p.es && p.es.name) || p.id
    const estado = p.available === false ? 'Agotado' : 'Activo'
    const vs = (p.marbling && p.marbling.variants) || []
    if (vs.length) {
      for (const v of vs) rows.push([name, catLabelOf(p.cat), v.label || '', brandNames(v.marcas), v.sku || '', num(v.mayoreo), num(v.menudeo), estado, p.id])
    } else {
      rows.push([name, catLabelOf(p.cat), '', '', p.sku || '', num(p.mayoreo), num(p.menudeo), estado, p.id])
    }
  }
  return rows
}

export function exportProductsXlsx(catalog, catLabelOf) {
  const bytes = buildXlsx(productRows(catalog, catLabelOf))
  const blob = new Blob([bytes], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
  const a = document.createElement('a')
  const d = new Date(), pad = (x) => String(x).padStart(2, '0')
  a.href = URL.createObjectURL(blob)
  a.download = `productos-${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}.xlsx`
  a.click()
  URL.revokeObjectURL(a.href)
}
