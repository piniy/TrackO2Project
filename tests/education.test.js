import test from 'node:test';
import assert from 'node:assert/strict';
import { inferenceTasks, waterLocations, studyCarbonIntensity } from '../src/content/education-data.js';
import { taskValue, taskBarWidth, waterForRequests, taskAnalogy } from '../src/features/education.js';

test('education carbon conversion retains the study grid and per-1000 scope', () => {
  assert.equal(studyCarbonIntensity, 297.6);
  const image = inferenceTasks.find(task => task.id === 'image');
  assert.equal(taskValue(image, 'energy'), 2.907);
  assert.ok(Math.abs(taskValue(image, 'carbon') - 865.1232) < 1e-8);
  assert.ok(taskBarWidth(image) < 100);
  assert.ok(taskBarWidth(inferenceTasks.find(task => task.id === 'classification')) > 0);
});

test('water scenarios preserve table units, scope split, and projected Indonesia status', () => {
  const indonesia = waterLocations.find(location => location.id === 'indonesia');
  assert.equal(indonesia.projected, true);
  const water = waterForRequests(indonesia, 20);
  assert.equal(water.total, 391.84);
  assert.ok(Math.abs(water.onsite + water.offsite - water.total) < 1e-8);
  for (const location of waterLocations) {
    assert.ok(Math.abs(location.onsite + location.offsite - location.total) < 1e-8);
    assert.throws(() => waterForRequests(location, 0), RangeError);
    assert.throws(() => waterForRequests(location, 101), RangeError);
    assert.throws(() => waterForRequests(location, 1.5), RangeError);
  }
});

test('task analogies preserve emission scope and compare energy directly with LED runtime', () => {
  const caption = inferenceTasks.find(task => task.id === 'caption');
  const carbon = taskAnalogy(caption, 'carbon');
  assert.equal(carbon.id, 'phone');
  assert.ok(Math.abs(carbon.value * 12.4 - 18.7488) < 1e-8);
  const energy = taskAnalogy(caption, 'energy');
  assert.equal(energy.unit, 'jam');
  assert.ok(Math.abs(energy.value - 7) < 1e-8);
  const tiny = taskAnalogy(inferenceTasks.find(task => task.id === 'classification'), 'energy');
  assert.equal(tiny.unit, 'menit');
  assert.ok(Math.abs(tiny.value / 60 * .009 - .002) < 1e-8);
});
