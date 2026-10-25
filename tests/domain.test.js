import test from 'node:test';
import assert from 'node:assert/strict';
import { estimate } from '../src/features/calculation.js';
import { gameCards, assessChoice } from '../src/content/game-cards.js';

test('proposal factors produce consistent totals and breakdown', () => {
  const result = estimate({ chat: 10, summary: 3, longText: 1, image: 2 });
  assert.equal(result.total, 13.2);
  assert.equal(result.count, 16);
  assert.deepEqual(result.breakdown.map(item => item.emission), [1, 1.2, 2, 9]);
  assert.equal(result.tier.label, 'Moderate usage');
});
test('empty counts have no invented usage classification', () => {
  assert.deepEqual([estimate({}).total, estimate({}).tier], [0, null]);
  assert.equal(estimate({ chat: 1 }).tier.label, 'Di bawah rentang klasifikasi');
});
test('classification respects proposal boundaries without rounding drift', () => {
  for (const [count, label] of [[2, 'Micro usage'], [20, 'Micro usage'], [21, 'Low usage'], [50, 'Low usage'], [51, 'Moderate usage'], [150, 'Moderate usage'], [151, 'High usage'], [400, 'High usage'], [401, 'Extreme usage']]) {
    assert.equal(estimate({ chat: count }).tier.label, label);
  }
});
test('invalid, negative, fractional, and oversized activity counts are rejected', () => {
  for (const value of [-1, 0.5, 10001, Infinity, NaN, 'abc']) assert.throws(() => estimate({ image: value }), RangeError);
  assert.equal(estimate({ image: 10000 }).total, 45000);
});
test('every learning scenario offers exactly one explainable best answer', () => {
  assert.equal(gameCards.length, 5);
  for (const card of gameCards) {
    assert.equal(card.options.filter(item => item.correct).length, 1);
    assert.ok(assessChoice(card, 0).feedback.length > 20);
    assert.ok(assessChoice(card, 1).feedback.length > 20);
    assert.throws(() => assessChoice(card, 2), RangeError);
  }
});
