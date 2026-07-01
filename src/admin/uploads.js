// Session-only state + helpers for images uploaded via the admin. Uploaded files
// aren't in the build-time image glob until the next deploy, so we track them here
// for the picker preview and for save-time validation.
export const UPLOADED = new Set()
export const UPLOADED_PREVIEWS = new Map() // filename -> data: URL (CSP-friendly)

export function slugify(s) {
  return (s || '').toString().normalize('NFD').replace(/[̀-ͯ]/g, '')
    .toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

export function uploadName(file) {
  const base = slugify((file && file.name || 'img').replace(/\.[^.]+$/, '')) || 'img'
  return `${base}-${Date.now().toString(36)}${Math.floor(Math.random() * 1e4)}.webp`
}

function readDataUrl(file) {
  return new Promise((resolve, reject) => {
    const fr = new FileReader()
    fr.onload = () => resolve(String(fr.result))
    fr.onerror = () => reject(new Error('No se pudo leer el archivo'))
    fr.readAsDataURL(file)
  })
}

// Convert any image File to a resized webp data URL, entirely client-side (no
// blob: URLs, so it satisfies `img-src 'self' data:`). Returns a data:image/webp URL.
export async function fileToWebpDataUrl(file, maxDim = 1600, quality = 0.82) {
  const src = await readDataUrl(file)
  const img = await new Promise((resolve, reject) => {
    const i = new Image()
    i.onload = () => resolve(i)
    i.onerror = () => reject(new Error('No se pudo leer la imagen'))
    i.src = src
  })
  const scale = Math.min(1, maxDim / Math.max(img.width, img.height))
  const w = Math.max(1, Math.round(img.width * scale))
  const h = Math.max(1, Math.round(img.height * scale))
  const canvas = document.createElement('canvas')
  canvas.width = w; canvas.height = h
  canvas.getContext('2d').drawImage(img, 0, 0, w, h)
  const out = canvas.toDataURL('image/webp', quality)
  if (!out.startsWith('data:image/webp')) throw new Error('Este navegador no exporta webp')
  return out
}
