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

test('water scenarios preserve study units, scope split, and projected Indonesia status', () => {
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

// These checks prevent source controls and figures from crossing study boundaries.
import education, { studyView } from '../src/features/education.js';
import { researchStudies, trainingWater, geminiMetrics, geminiEnergySegments } from '../src/content/education-data.js';
import { readFileSync } from 'node:fs';
import { researchMessages } from '../src/i18n/research-messages.js';

test('all ten task means remain available without an expansion step', () => {
  const state = education();
  assert.equal(state.metric, 'energy');
  assert.equal(state.tasks.length, 10);
  assert.deepEqual(inferenceTasks.map(item => item.energy).sort((a,b) => a-b), [.002, .003, .003, .004, .007, .038, .047, .049, .063, 2.907]);
  assert.throws(() => taskValue({ id: 'gemini', energy: .00024 }, 'energy'), RangeError);
  assert.throws(() => taskValue(inferenceTasks[0], 'water'), RangeError);
});

test('study changes expose independent units, controls and denominators without losing selections', () => {
  const state = education();
  state.requests = 31;
  state.location = 'texas';
  const li = state.activeStudy;
  assert.deepEqual(li.controls, ['requests', 'location']);
  assert.equal(li.unit, 'mL');
  state.selectStudy('gemini');
  assert.equal(state.activeStudy, researchStudies.gemini);
  assert.deepEqual(state.activeStudy.controls, ['energySegment']);
  assert.equal(state.activeStudy.unit, 'Wh · g CO₂e · mL');
  assert.match(state.activeStudy.denominator, /median/);
  assert.equal(Object.hasOwn(state.activeStudy, 'factor'), false);
  assert.equal(Object.hasOwn(geminiMetrics, 'mean'), false);
  assert.throws(() => waterForRequests(geminiMetrics, 20), RangeError);
  state.selectStudy('shumba');
  assert.equal(state.activeStudy.unit, 'L per skenario');
  assert.deepEqual(state.activeStudy.controls, []);
  assert.match(state.activeStudy.denominator, /5.000 token/);
  state.selectStudy('li');
  assert.equal(state.requests, 31);
  assert.equal(state.location, 'texas');
  assert.throws(() => studyView('gpt4o'), RangeError);
});

test('training and provider median keep distinct denominators and component sums', () => {
  assert.ok(Math.abs(trainingWater.onsite + trainingWater.offsite - trainingWater.total) < 1e-10);
  assert.equal(trainingWater.denominator, 'one training run');
  assert.equal(trainingWater.total, 5.439);
  assert.equal(geminiMetrics.statistic, 'median');
  assert.equal(geminiMetrics.period, 'May 2025');
  assert.ok(Math.abs(geminiEnergySegments.reduce((sum, item) => sum + item.energyWh, 0) - geminiMetrics.energyWh) < 1e-10);
  assert.equal(geminiMetrics.coolingWaterMl, .26);
  assert.equal(geminiMetrics.carbonGrams, .03);
  const state = education();
  state.requests = 100;
  assert.equal(state.training.total, 5.439);
  assert.equal(state.gemini.energyWh, .24);
});

test('research markup retains accessible figures and source-specific study context', () => {
  const html = readFileSync(new URL('../src/components/education.html', import.meta.url), 'utf8');
  assert.match(html, /id="water-research"/);
  assert.doesNotMatch(html, /id="jejak-air"/);
  assert.match(html, /<noscript>/);
  assert.match(html, /x-for="task in tasks"/);
  assert.match(html, /:aria-label="\$t\(task.label\).*formatNumber\(value\(task\), 3\)/);
  assert.match(html, /10 token baru/);
  assert.match(html, /x-text="\$t\(activeStudy.assumptionYear\)"/);
  assert.match(html, /x-show="study === 'gemini'"/);
  assert.doesNotMatch(html, /value="gpt4o"/);
  const geminiPanel = html.split('id="study-gemini"')[1].split('id="study-shumba"')[0];
  assert.match(geminiPanel, /prompt teks median pada Mei 2025/);
  assert.doesNotMatch(geminiPanel, /x-model.*requests|gemini\.[\w]+\s*\*\s*requests/);
  assert.match(researchMessages['Contoh historis — asumsi inferensi 2024; revisi paper 2026.'], /2024.*2026/);
});
