import test from 'node:test';
import assert from 'node:assert/strict';
import katex from 'katex';
import { formulaExample, formulaFrames } from '../src/features/formula.js';

test('interactive formula reuses proposal factors and renders locale math with accessible MathML', () => {
  const example = formulaExample({ chat: 10, summary: 3, longText: 1, image: 2 }, 'image', 'id');
  assert.equal(example.result.total, 13.2);
  assert.equal(example.selected.emission, 9);
  assert.match(example.expansion, /13\{,\}20/);
  const output = katex.renderToString(example.expansion, { displayMode: true, output: 'htmlAndMathml', trust: false, strict: 'error' });
  assert.match(output, /<math/);
  assert.match(output, /13/);
  const changed = formulaExample({ chat: 10, summary: 3, longText: 1, image: 1 }, 'image', 'en');
  assert.equal(changed.result.total, 8.7);
  assert.match(changed.expansion, /8\.70/);
});

test('formula rejects invalid request counts instead of inventing a worked total', () => {
  for (const count of [-1, .5, 10001, Infinity, NaN]) assert.throws(() => formulaExample({ image: count }), RangeError);
  assert.equal(formulaExample({ image: 10000 }, 'image').result.total, 45000);
});

test('animation frames render the same products, contributions, and total at input bounds', () => {
  for (const counts of [{ chat: 10, summary: 3, longText: 1, image: 2 }, { chat: 0, summary: 0, longText: 0, image: 0 }, { chat: 10000, summary: 10000, longText: 10000, image: 10000 }]) {
    const frames = formulaFrames(counts, 'en');
    assert.equal(frames.contributions.reduce((sum, text) => sum + Number(text), 0).toFixed(2), frames.result.total.toFixed(2));
    assert.equal(frames.products.length, 4);
    for (const tex of [...frames.products, ...frames.contributions, frames.total]) {
      assert.match(katex.renderToString(tex, { throwOnError: true, strict: 'error', trust: false }), /katex-mathml/);
    }
  }
});
