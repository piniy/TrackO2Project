import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { articles } from '../src/content/articles.js';
import { references, reviewedDate } from '../src/content/references.js';
import { englishArticles, englishReferences, englishGameCards } from '../src/i18n/content-en.js';
import { renderContent, sourceMetadataLabels } from '../src/build/content.js';
import learningGame from '../src/features/game.js';

test('readings retain stable destinations and introduce source-literacy lessons', () => {
  const ids = articles.map(item => item.id);
  assert.equal(new Set(ids).size, articles.length);
  for (const id of ['jejak-air', 'prompt-bijak', 'pelatihan-inferensi', 'membaca-estimasi', 'air-dan-lokasi']) assert.ok(ids.includes(id));
  for (const article of articles) {
    assert.equal(englishArticles[article.id].paragraphs.length, article.paragraphs.length);
    article.sources.forEach(id => assert.ok(references.some(source => source.id === id), `Missing source ${id}`));
  }
  assert.match(articles.find(item => item.id === 'jejak-air').paragraphs.join(' '), /hanya berlaku di dalam skenario studi/);
});

test('source records expose limitations and fully translated provenance without duplicate Shumba entries', () => {
  assert.equal(new Set(references.map(item => item.id)).size, references.length);
  assert.equal(references.filter(item => /2412\.03716/.test(item.url)).length, 1);
  assert.equal(reviewedDate, '2026-10-27');
  for (const source of references) {
    for (const field of [...Object.keys(sourceMetadataLabels), 'summary', 'limitation', 'kind']) {
      assert.equal(typeof source[field], 'string');
      assert.ok(source[field].length > 4);
      assert.equal(typeof englishReferences[source.id][field], 'string');
    }
  }
  const html = renderContent('references');
  for (const source of references) assert.ok(html.includes(source.limitation.replace(/&/g, '&amp;')));
  for (const label of Object.values(sourceMetadataLabels)) assert.ok(html.includes(label));
  assert.match(html, /Tidak.*dilaporkan|tidak dilaporkan/);
  assert.equal(renderContent('reference-count'), String(references.length));
  assert.equal(renderContent('article-count'), String(articles.length));
  assert.match(renderContent('reviewed-date'), /datetime="2026-10-27"/);
});

test('game state and final question derive from the actual collection length', () => {
  const game = learningGame();
  game.cards = game.cards.slice(0, 2);
  game.$nextTick = callback => callback();
  let focusCount = 0;
  game.$refs = { question: { focus() { focusCount++; } }, finish: { focus() { focusCount++; } } };
  assert.equal(game.progress, 0);
  assert.equal(game.isLast, false);
  const correct = () => game.card.options.findIndex(option => option.correct);
  game.choose(correct());
  assert.equal(game.progress, 50);
  game.choose(correct());
  assert.equal(game.score, 1);
  game.next();
  assert.equal(game.isLast, true);
  game.choose(correct());
  assert.equal(game.progress, 100);
  game.next();
  assert.equal(game.finished, true);
  assert.equal(game.score, game.cards.length);
  assert.equal(focusCount, 2);
  game.restart();
  assert.deepEqual([game.index, game.score, game.selected, game.finished, game.progress], [0, 0, null, false, 0]);
  const page = readFileSync(new URL('../game.html', import.meta.url), 'utf8');
  assert.equal((page.match(/x-text="cards.length"/g) ?? []).length, 2);
  assert.match(page, /\$t\(isLast \?/);
  assert.doesNotMatch(page, /index === 4|dari 5/);
  assert.equal(englishGameCards.length, 5);
});
