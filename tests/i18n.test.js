import test from 'node:test';
import assert from 'node:assert/strict';
import { translate, readLocale, saveLocale, formatLocaleNumber } from '../src/i18n/index.js';
import { englishArticles, englishGameCards, englishReferences } from '../src/i18n/content-en.js';
import { articles } from '../src/content/articles.js';
import { gameCards } from '../src/content/game-cards.js';
import { references } from '../src/content/references.js';
import { matchesItem } from '../src/features/library.js';
import promptJourney from '../src/features/journey.js';

test('language preference defaults to Indonesian and accepts only supported languages', () => {
  assert.equal(readLocale({ getItem: () => null }), 'id');
  assert.equal(readLocale({ getItem: () => 'en' }), 'en');
  assert.equal(readLocale({ getItem: () => 'fr' }), 'id');
  const storage = { getItem() { throw new Error('blocked'); }, setItem() { throw new Error('blocked'); } };
  assert.equal(readLocale(storage), 'id');
  assert.doesNotThrow(() => saveLocale('en', storage));
  assert.equal(readLocale(null), 'id');
});

test('translations preserve the Indonesian fallback and interpolate named values', () => {
  assert.equal(translate('Beranda', 'en'), 'Home');
  assert.equal(translate('Beranda', 'id'), 'Beranda');
  assert.equal(translate('Beranda', 'fr'), 'Beranda');
  assert.equal(translate('TraCkO2', 'en'), 'TraCkO2');
  assert.equal(translate('{count} aktivitas dalam perhitungan ini', 'en', { count: 16 }), '16 activities in this calculation');
  assert.equal(translate('{count} aktivitas dalam perhitungan ini', 'id', { count: 16 }), '16 aktivitas dalam perhitungan ini');
  assert.equal(translate(undefined, 'en'), '');
});

test('numbers follow locale without changing the underlying estimate', () => {
  assert.equal(formatLocaleNumber(13.2, 2, 'id'), '13,20');
  assert.equal(formatLocaleNumber(13.2, 2, 'en'), '13.20');
  assert.equal(formatLocaleNumber(10000, 0, 'en'), '10,000');
});

test('all articles and references include complete English reading content', () => {
  for (const article of articles) {
    const english = englishArticles[article.id];
    assert.ok(english);
    assert.equal(english.paragraphs.length, article.paragraphs.length);
    for (const field of ['title', 'summary', 'readTime', 'takeaway']) {
      assert.equal(translate(article[field], 'en'), english[field]);
      assert.notEqual(english[field], article[field]);
    }
    article.paragraphs.forEach((text, index) => assert.equal(translate(text, 'en'), english.paragraphs[index]));
  }
  for (const reference of references) {
    for (const field of ['summary', 'limitation', 'kind']) assert.equal(translate(reference[field], 'en'), englishReferences[reference.id][field]);
  }
});

test('all five game scenarios translate without changing answer order or scoring', () => {
  assert.equal(englishGameCards.length, gameCards.length);
  gameCards.forEach((card, index) => {
    const english = englishGameCards[index];
    for (const field of ['title', 'question', 'topic']) assert.equal(translate(card[field], 'en'), english[field]);
    assert.equal(english.options.length, card.options.length);
    card.options.forEach((option, optionIndex) => {
      for (const field of ['text', 'feedback']) assert.equal(translate(option[field], 'en'), english.options[optionIndex][field]);
    });
  });
});

test('search follows the displayed language while keeping stable topic filters', () => {
  const water = articles.find(item => item.id === 'jejak-air');
  assert.equal(matchesItem(water, 'water withdrawal', 'air', 'en'), true);
  assert.equal(matchesItem(water, 'pengambilan air', 'air', 'id'), true);
  assert.equal(matchesItem(water, 'water withdrawal', 'karbon', 'en'), false);
  assert.equal(matchesItem(water, 'nonexistent', 'semua', 'en'), false);
  assert.equal(matchesItem(references[0], 'prototype assumptions', 'proyek', 'en'), false);
  assert.equal(matchesItem(references[0], 'prototype', 'proyek', 'en'), true);
});

test('animated prompt completes in either language and preserves typing progress on switch', () => {
  let locale = 'id';
  const journey = promptJourney();
  journey.$store = { i18n: { t: text => translate(text, locale) } };
  journey.typedCount = 23;
  assert.deepEqual([journey.promptLine(0), journey.promptLine(1)], ['Bantu ringkas', 'materi ini.']);
  locale = 'en';
  assert.deepEqual([journey.promptLine(0), journey.promptLine(1)], ['Summarize', 'this reading.']);
  journey.typedCount = 8;
  assert.equal(journey.promptLine(0).length + journey.promptLine(1).length, Math.ceil(8 / 23 * 22));
  assert.ok(Number.isFinite(journey.cursorX));
  locale = 'id';
  assert.equal(journey.typedCount, 8);
});
