import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import { mkdir, writeFile } from 'node:fs/promises';

const require = createRequire(import.meta.url);
const { chromium } = require('C:/Users/DELL/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const browser = await chromium.launch({ executablePath: 'C:/Users/DELL/AppData/Local/ms-playwright/chromium-1228/chrome-win64/chrome.exe', headless: true });
const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'reduce' });
await context.addInitScript(() => Object.defineProperty(navigator, 'clipboard', { configurable: true, get: () => undefined }));
const page = await context.newPage();
const errors = [];
const failedAssets = [];
page.on('pageerror', error => errors.push(error.message));
page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
page.on('response', response => { if (response.status() >= 400) failedAssets.push({ status: response.status(), url: response.url() }); });
const base = 'http://127.0.0.1:4173';
const output = new URL('./screenshots/education-campaign-2026-10-27/', import.meta.url);
await mkdir(output, { recursive: true });
const checks = [];
async function language(lang) {
  await page.locator(`.language-switch button[lang="${lang}"]`).click();
  await page.waitForFunction(value => document.documentElement.lang === value, lang);
}
async function navigate(route) {
  await page.goto(`${base}/${route}`, { waitUntil: 'networkidle' });
  await page.waitForFunction(() => window.Alpine || document.documentElement.classList.contains('js-ready'));
}
async function overflow(label) {
  const result = await page.evaluate(() => ({ width: innerWidth, scrollWidth: document.documentElement.scrollWidth, bodyWidth: document.body.scrollWidth }));
  assert.ok(result.scrollWidth <= result.width + 1, `${label} document overflow ${JSON.stringify(result)}`);
  assert.ok(result.bodyWidth <= result.width + 1, `${label} body overflow ${JSON.stringify(result)}`);
  checks.push({ label, ...result });
}
try {
  await navigate('game.html');
  await language('id');
  const choices = page.locator('.game-choices button');
  await choices.nth(0).focus();
  await page.keyboard.press('Enter');
  assert.equal(await choices.nth(0).isDisabled(), true);
  await language('en');
  assert.equal(await choices.nth(0).isDisabled(), true);
  assert.match(await page.locator('.answer-feedback').innerText(), /goal|context/i);
  for (let index = 0; index < 5; index++) {
    if (index > 0) {
      await choices.nth([0, 1, 0, 1, 0][index]).focus();
      await page.keyboard.press('Enter');
    }
    await page.waitForFunction(expected => Number(document.querySelector('.game-progress').value) === expected, (index + 1) / 5 * 100);
    await page.locator('.answer-feedback').waitFor({ state: 'visible' });
    await page.locator('.answer-feedback button').focus();
    await page.keyboard.press('Enter');
    await page.waitForFunction(last => document.activeElement === document.querySelector(last ? '[x-ref="finish"]' : '[x-ref="question"]'), index === 4);
  }
  assert.equal(await page.locator('.game-finish').isVisible(), true);
  assert.match(await page.locator('.game-finish').innerText(), /5\s+of\s+5/);
  await language('id');
  assert.match(await page.locator('.game-finish').innerText(), /5\s+dari\s+5/);
  await page.screenshot({ path: fileURLToPath(new URL('game.png', output)), fullPage: true });
  checks.push({ label: 'game keyboard all five, final 5/5 and ID/EN state', passed: true });
  for (const width of [390, 320]) {
    await page.setViewportSize({ width, height: 900 });
    for (const lang of ['id', 'en']) { await language(lang); await overflow(`game ${width} ${lang}`); }
  }

  await navigate('edukasi.html');
  await language('en');
  const readings = page.locator('.education-reading');
  await readings.locator('input[type="search"]').fill('water withdrawal');
  await readings.locator('.filter-tabs button').nth(2).click();
  assert.equal(await readings.locator('.learning-article:visible').count(), 1);
  assert.equal(await readings.locator('.learning-article:visible').getAttribute('id'), 'jejak-air');
  await readings.locator('#jejak-air details summary').click();
  await language('id');
  assert.equal(await readings.locator('input[type="search"]').inputValue(), 'water withdrawal');
  assert.equal(await readings.locator('#jejak-air details').getAttribute('open'), '');
  await readings.locator('input[type="search"]').fill('');
  assert.equal(await readings.locator('.filter-tabs button').nth(2).getAttribute('aria-pressed'), 'true');
  checks.push({ label: 'reading English search/filter and open/query state survive language change', passed: true });
  for (const width of [390, 320]) {
    await page.setViewportSize({ width, height: 900 });
    for (const lang of ['id', 'en']) { await language(lang); await overflow(`readings ${width} ${lang}`); }
  }

  await navigate('referensi.html');
  await language('en');
  await page.locator('input[type="search"]').fill('median');
  await page.waitForFunction(() => [...document.querySelectorAll('.reference-card')].filter(element => getComputedStyle(element).display !== 'none').length === 1);
  assert.equal(await page.locator('.reference-card:visible').count(), 1);
  assert.equal(await page.locator('.reference-card:visible').getAttribute('id'), 'gemini');
  assert.match(await page.locator('#gemini .reference-limitation').innerText(), /not a mean|not.*personal totals/i);
  await page.locator('#gemini details summary').click();
  await language('id');
  assert.equal(await page.locator('#gemini details').getAttribute('open'), '');
  await page.locator('input[type="search"]').fill('');
  await page.locator('.reference-metadata').evaluateAll(nodes => nodes.forEach(node => { node.open = true; }));
  for (const width of [1440, 390, 320]) {
    await page.setViewportSize({ width, height: 900 });
    for (const lang of ['id', 'en']) { await language(lang); await overflow(`references all details open ${width} ${lang}`); }
  }
  checks.push({ label: 'reference limitations, search, metadata and open state across ID/EN', passed: true });

  await navigate('kampanye.html');
  await language('id');
  const claim = page.locator('.campaign-workshop').nth(0);
  await claim.locator('input[value="context"]').focus();
  await page.keyboard.press('Space');
  await claim.locator('button[type="submit"]').focus();
  await page.keyboard.press('Enter');
  await claim.locator('.campaign-feedback').waitFor({ state: 'visible' });
  assert.equal(await claim.locator('.campaign-feedback').isVisible(), true);
  await language('en');
  assert.equal(await claim.locator('input[value="context"]').isChecked(), true);
  assert.match(await claim.locator('.campaign-feedback').innerText(), /product|measurement|source/i);
  await page.locator('.campaign-copy-button').click();
  const selection = await page.locator('#campaign-copy').evaluate(element => ({ value: element.value, start: element.selectionStart, end: element.selectionEnd, focused: document.activeElement === element }));
  assert.equal(selection.start, 0);
  assert.equal(selection.end, selection.value.length);
  assert.equal(selection.focused, true);
  assert.match(selection.value, /median.*May 2025/);
  assert.match(await page.locator('.campaign-copy-status').innerText(), /selected|copy|available/i);
  await language('id');
  assert.match(await page.locator('#campaign-copy').inputValue(), /median.*Mei 2025/);
  assert.equal(await claim.locator('input[value="context"]').isChecked(), true);
  checks.push({ label: 'campaign keyboard claim check, translated state and clipboard-denied selectable fallback', passed: true });
  for (const width of [1440, 390, 320]) {
    await page.setViewportSize({ width, height: 900 });
    for (const lang of ['id', 'en']) { await language(lang); await overflow(`campaign ${width} ${lang}`); }
  }
  await page.setViewportSize({ width: 1440, height: 1000 });
  await language('id');
  await page.screenshot({ path: fileURLToPath(new URL('campaign.png', output)), fullPage: true });
  assert.deepEqual(errors, []);
  assert.deepEqual(failedAssets, []);
  const report = { passed: true, checks, errors, failedAssets };
  await writeFile(new URL('library-campaign-qa.json', output), JSON.stringify(report, null, 2));
  console.log(JSON.stringify(report, null, 2));
} finally { await browser.close(); }
