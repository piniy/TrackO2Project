import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import learningChoice from '../src/features/learning-choice.js';
import { translate } from '../src/i18n/index.js';

const read = path => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');

test('home preview is separate from complete education and preserves surrounding sections', () => {
  const home = read('index.html');
  assert.ok(home.indexOf('site:journey') < home.indexOf('site:education-preview'));
  assert.ok(home.indexOf('site:education-preview') < home.indexOf('id="carbsculator"'));
  assert.ok(!home.includes('<!-- site:education -->'));
  for (const asset of ['emissions-hero.jpg', 'services/notebook.webp', 'services/calculator.webp', 'services/puzzle.webp']) assert.ok(home.includes(asset));
  assert.ok(home.includes('site:team'));
  const education = read('edukasi.html');
  const steps = ['id="education-heading"', 'education-video-slot', 'site:journey', 'id="pahami"', 'site:education-principles', '<!-- site:education -->', 'id="pilih"', 'id="reading-title"'];
  let previous = -1;
  for (const step of steps) { const index = education.indexOf(step); assert.ok(index > previous, step); previous = index; }
  assert.equal((education.match(/<h1\b/g) || []).length, 1);
});

test('learning choices retain answer state while feedback translates', () => {
  const choice = learningChoice();
  choice.choose('specific');
  assert.equal(choice.answer.appropriate, true);
  assert.match(translate(choice.answer.feedback, 'en'), /trusted source/);
  assert.equal(choice.selected, 'specific');
  choice.choose('unknown');
  assert.equal(choice.selected, 'specific');
  choice.choose('repeat');
  assert.equal(choice.answer.appropriate, false);
  assert.match(translate(choice.answer.feedback, 'en'), /correct answer/);
});

test('calculator page retains its method section', () => {
  assert.match(read('kalkulator.html'), /id="metode"/);
});
