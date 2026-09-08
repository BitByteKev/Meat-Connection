import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
// Exercise the storefront's existing pure pricing functions without mounting React.
const source = fs.readFileSync(new URL('../src/app.jsx', import.meta.url), 'utf8');
const functions = source.slice(source.indexOf('function variantPrice('), source.indexOf('function MarblingPill('));
const { priceRange } = vm.runInNewContext(`${functions}; ({priceRange})`);
test('catalog shows the full wholesale range across priced variants', () => {
  const result = priceRange({ variants: [{ mayoreo: 500 }, { mayoreo: 900 }, { menudeo: 1200 }] }, null);
  assert.equal(result?.min, 500);
  assert.equal(result?.max, 900);
});
test('unpriced products do not display a fabricated price', () => {
  assert.equal(priceRange({ variants: [{ mayoreo: null }] }, null), null);
});
test('top-level wholesale price remains available', () => {
  assert.equal(priceRange(null, 700)?.min, 700);
});

const cartFunctions = source.slice(source.indexOf('const MAYOREO_MIN'), source.indexOf('function orderLines'));
const { cartType, cartTotal } = vm.runInNewContext(`${cartFunctions}; ({cartType, cartTotal})`);
test('mixed-cut cart switches every line to wholesale at 25 kg', () => {
  const items = [{ qty: 20, unitMayoreo: 500, unitMenudeo: 800 }, { qty: 5, unitMayoreo: 300, unitMenudeo: 400 }];
  assert.equal(cartType(items), 'mayoreo');
  assert.equal(cartTotal(items), 11500);
  items[1].qty = 4;
  assert.equal(cartType(items), 'menudeo');
  assert.equal(cartTotal(items), 17600);
});
