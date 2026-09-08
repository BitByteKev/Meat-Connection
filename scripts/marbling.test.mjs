import { readFileSync } from 'node:fs'
import assert from 'node:assert/strict'
import { test } from 'node:test'

// Exercise the admin's actual save normalization without loading its browser UI.
const source = readFileSync(new URL('../src/admin/AdminApp.jsx', import.meta.url), 'utf8')
const cleanMarbling = new Function('priceNum', `${source.slice(source.indexOf('function cleanMarbling('), source.indexOf('\nfunction validate('))}; return cleanMarbling`)(
  (v) => v === '' || v == null ? null : Number(v),
)

test('saving 9+ with a blank upper bound retains the grade and commercial details', () => {
  const v = { lo: 9, hi: '', label: '9+', image: '', sku: '448720', mayoreo: 500, menudeo: 800, marcas: ['kingriver'] }
  assert.deepEqual(cleanMarbling({ system: 'aus', variants: [v] }).variants, [{ ...v, hi: 10 }])
})

test('open upper bounds use the selected scale maximum', () => {
  for (const [system, hi] of [['aus', 10], ['angus', 9], ['bms', 12]]) {
    for (const blank of ['', undefined, null]) {
      const result = cleanMarbling({ system, variants: [{ lo: 9, hi: blank, label: '9+' }] })
      assert.equal(result.variants[0]?.hi, hi)
    }
  }
})

test('explicit ranges and gradeless tiers survive while empty rows are dropped', () => {
  const variants = [{ lo: 4, hi: 5, label: '4-5', image: '' }, { lo: 0, hi: 0, label: 'Clásico', image: '' }]
  assert.deepEqual(cleanMarbling({ system: 'aus', variants: [...variants, { lo: '', hi: '' }] }).variants, variants)
})
