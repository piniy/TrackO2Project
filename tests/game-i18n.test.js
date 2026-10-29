import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { translations } from '../src/i18n/catalogue.js';
import { translate } from '../src/i18n/index.js';

function authoredCopy(html) {
  const sources = new Set();
  const content = html.replace(/<(script|style)\b[\s\S]*?<\/\1>/g, '').replace(/<!--[\s\S]*?-->/g, '');
  for (const token of content.matchAll(/<(?:[^"'<>]|"[^"]*"|'[^']*')*>|([^<]+)/g)) {
    if (token[1]) sources.add(token[1].trim().replace(/\s+/g, ' '));
  }
  for (const attribute of content.matchAll(/(?:aria-label|placeholder|title|alt)="([^"]*)"/g)) {
    // Alpine-bound attributes contain expressions and are covered below.
    if (!attribute[1].includes('$t(') && !attribute[1].includes('?')) sources.add(attribute[1]);
  }
  for (const binding of content.matchAll(/\$t\('([^']+)'/g)) sources.add(binding[1]);
  return [...sources].filter(source => source && !/^(?:Home|Games|Games — TraCkO2|AI|H₂O|kWh|\d+|[./↔←↗?✓●:·]|500 mL)$/u.test(source));
}

test('mission page copy, dynamic labels, and accessible names all have registered English translations', () => {
  const page = readFileSync(new URL('../game.html', import.meta.url), 'utf8');
  const sources = authoredCopy(page);
  assert.ok(sources.length > 40, 'The authored UI copy was collected');
  for (const source of sources) {
    assert.ok(translations.has(source), `Missing game translation: ${source}`);
    assert.notEqual(translate(source, 'en'), source, `Untranslated game copy: ${source}`);
    assert.equal(translate(source, 'id'), source);
  }
});

test('mission preview copy uses the same translations as the full game', () => {
  const home = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
  const preview = home.match(/<a class="mission-preview"[\s\S]*?<\/a>/)?.[0];
  assert.ok(preview, 'Homepage links to the game preview');
  for (const source of authoredCopy(preview)) {
    assert.ok(translations.has(source), `Missing game preview translation: ${source}`);
    assert.notEqual(translate(source, 'en'), source);
  }
});
