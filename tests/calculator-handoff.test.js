import test from 'node:test';
import assert from 'node:assert/strict';
import { activities } from '../src/content/activities.js';
import { estimate } from '../src/features/calculation.js';
import { buildCalculatorUrl, parseCalculatorHandoff } from '../src/features/calculator-handoff.js';

const sample = { chat: 10, summary: 3, longText: 1, image: 2 };
const searchFor = counts => new URL(buildCalculatorUrl(counts), 'http://localhost/').search;

test('Home trial handoff retains every count and recomputes the same result', () => {
  assert.equal(buildCalculatorUrl(sample), './kalkulator.html?from=home&chat=10&summary=3&longText=1&image=2#hasil');
  const counts = parseCalculatorHandoff(searchFor(sample));
  assert.deepEqual(counts, sample);
  assert.equal(estimate(counts).total, 13.2);
  assert.deepEqual(parseCalculatorHandoff(searchFor({ chat: '10', summary: '3', longText: '1', image: '2' })), sample);
  const maximum = Object.fromEntries(activities.map(({ id }) => [id, 10000]));
  assert.deepEqual(parseCalculatorHandoff(searchFor(maximum)), maximum);
  assert.equal(estimate(parseCalculatorHandoff(searchFor(maximum))).total, 70000);
});

test('handoff links reject empty or invalid usage and serialize missing categories as zero', () => {
  for (const counts of [null, undefined, [], {}, { chat: 0 }, { chat: -1 }, { image: .5 }, { image: 10001 }, { chat: NaN }, { chat: Infinity }]) {
    assert.throws(() => buildCalculatorUrl(counts), RangeError);
  }
  assert.deepEqual(parseCalculatorHandoff(searchFor({ image: 1 })), { chat: 0, summary: 0, longText: 0, image: 1 });
});

test('destination accepts only one Home marker and one valid count for every category', () => {
  const valid = searchFor(sample);
  for (const search of [null, undefined, '', '?chat=10', valid.replace('from=home', 'from=other'), `${valid}&from=home`, `${valid}&chat=2`, valid.replace('&summary=3', '')]) {
    assert.equal(parseCalculatorHandoff(search), null);
  }
  for (const value of ['-1', '0.5', '1e2', '+2', ' 2 ', '10001', '999999999999999999', 'NaN', 'Infinity', '<script>alert(1)</script>', '']) {
    const params = new URLSearchParams(valid);
    params.set('image', value);
    assert.equal(parseCalculatorHandoff(`?${params}`), null, value);
  }
  assert.equal(parseCalculatorHandoff('?from=home&chat=0&summary=0&longText=0&image=0'), null);
});

test('unrelated tracking or fake totals never alter the transferred counts', () => {
  const search = `${searchFor(sample)}&utm_source=example&total=9999&redirect=https%3A%2F%2Fexample.com`;
  const counts = parseCalculatorHandoff(search);
  assert.deepEqual(counts, sample);
  assert.equal(estimate(counts).total, 13.2);
  assert.deepEqual(Object.keys(counts), activities.map(item => item.id));
});
