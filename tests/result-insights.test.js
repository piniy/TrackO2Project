import test from 'node:test';
import assert from 'node:assert/strict';
import { equivalentActivities, dominantActivity, oneFewerRequest } from '../src/features/result-insights.js';
import { comparisonBasis, activityAdvice } from '../src/content/result-insights.js';
import { estimate } from '../src/features/calculation.js';
import { translate } from '../src/i18n/index.js';

test('every equivalency independently reconstructs the submitted emission total', () => {
  const [led, phone, car] = equivalentActivities(1);
  assert.equal(led.id, 'led');
  assert.ok(Math.abs(led.value / 60 * 0.009 * 394 - 1) < 1e-12);
  assert.equal(phone.id, 'phone');
  assert.ok(Math.abs(phone.value * 12.4 - 1) < 1e-12);
  assert.equal(car.id, 'car');
  assert.ok(Math.abs(car.value / 1609.344 * 393 - 1) < 1e-12);
  assert.equal(comparisonBasis.ledWatts, 9);
});

test('comparison units stay readable from a tiny result to the maximum accepted input', () => {
  const tiny = equivalentActivities(0.1);
  assert.ok(tiny.every(item => item.value > 0));
  assert.equal(tiny[0].unit, 'menit');
  assert.equal(equivalentActivities(0.001)[0].unit, 'detik');
  const largest = estimate({ chat: 10000, summary: 10000, longText: 10000, image: 10000 });
  const items = equivalentActivities(largest.total);
  assert.equal(items[0].unit, 'hari');
  assert.equal(items[2].unit, 'km');
  assert.ok(items.every(item => Number.isFinite(item.value) && item.value > 0));
  assert.deepEqual(equivalentActivities(0), []);
  for (const value of [-1, Infinity, NaN]) assert.throws(() => equivalentActivities(value), RangeError);
});

test('advice targets the largest submitted contribution with stable tie handling', () => {
  assert.equal(dominantActivity(null), null);
  assert.equal(dominantActivity(estimate({})), null);
  for (const id of ['chat', 'summary', 'longText', 'image']) {
    const activity = dominantActivity(estimate({ [id]: 1 }));
    assert.equal(activity.id, id);
    assert.equal(activityAdvice[id].steps.length, 3);
  }
  assert.equal(dominantActivity(estimate({ chat: 4, summary: 1 })).id, 'chat');
  assert.equal(dominantActivity(estimate({ chat: 10, image: 1 })).id, 'image');
});

test('one-request simulation changes exactly one dominant activity without changing submitted data', () => {
  const result = estimate({ chat: 10, summary: 3, longText: 1, image: 2 });
  const original = structuredClone(result);
  const scenario = oneFewerRequest(result);
  assert.equal(scenario.activity.id, 'image');
  assert.equal(scenario.before, 13.2);
  assert.equal(scenario.after, 8.7);
  assert.equal(scenario.delta, 4.5);
  assert.ok(Math.abs(scenario.after + scenario.delta - scenario.before) < 1e-10);
  assert.ok(Math.abs(scenario.percent - 4.5 / 13.2 * 100) < 1e-10);
  assert.deepEqual(result, original);
  assert.equal(oneFewerRequest(estimate({ chat: 1 })).after, 0);
  assert.equal(oneFewerRequest(estimate({ chat: 1 })).percent, 100);
  assert.equal(oneFewerRequest(estimate({})), null);
  assert.equal(oneFewerRequest(null), null);
});

test('all contextual advice and comparison labels are available in English', () => {
  for (const advice of Object.values(activityAdvice)) {
    for (const text of [advice.title, ...advice.steps]) assert.notEqual(translate(text, 'en'), text);
  }
  for (const item of equivalentActivities(1)) assert.notEqual(translate(item.label, 'en'), item.label);
  assert.equal(translate('Kartu {number} dari {total}: {title}', 'en', { number: 2, total: 3, title: 'Compare' }), 'Card 2 of 3: Compare');
});
