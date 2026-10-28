import { createRequire } from 'node:module';
import { mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import assert from 'node:assert/strict';
const require = createRequire(import.meta.url);
const { chromium } = require('C:/Users/DELL/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const output = fileURLToPath(new URL('./screenshots/education-revamp-2026-10-28/', import.meta.url));
await mkdir(output, { recursive: true });
const browser = await chromium.launch({ headless: true, executablePath: 'C:/Users/DELL/AppData/Local/ms-playwright/chromium-1228/chrome-win64/chrome.exe' });
const results = { matrix: [], errors: [], failedAssets: [], interactions: [], noJS: [] };
const routes = ['index.html', 'edukasi.html', 'kalkulator.html', 'kampanye.html', 'referensi.html', 'game.html'];
const base = 'http://127.0.0.1:4173/';
async function captureSection(locator, filename) {
  await locator.screenshot({ path: output + '/' + filename, style: '.site-header,.skip-link{visibility:hidden!important}' });
}
try {
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
  const page = await context.newPage();
  page.on('pageerror', error => results.errors.push(error.message));
  page.on('console', message => { if (message.type() === 'error') results.errors.push(message.text()); });
  page.on('response', response => { if (response.status() >= 400) results.failedAssets.push(`${response.status()} ${response.url()}`); });
  page.on('requestfailed', request => { if (!request.failure()?.errorText.includes('ERR_ABORTED')) results.failedAssets.push(`${request.failure()?.errorText} ${request.url()}`); });
  for (const width of [1440, 390, 320]) {
    await page.setViewportSize({ width, height: 1000 });
    for (const language of ['id', 'en']) {
      for (const route of routes) {
        await page.goto(base + route);
        await page.locator(`.language-switch button[lang="${language}"]`).click();
        await page.evaluate(() => document.fonts.ready);
        if (route === 'edukasi.html') await page.waitForFunction(expected => document.querySelector('#education-heading')?.textContent === expected, language === 'en' ? 'Education' : 'Edukasi');
        const state = await page.evaluate(() => {
          const ids = [...document.querySelectorAll('[id]')].map(node => node.id);
          return { lang: document.documentElement.lang, width: innerWidth, documentWidth: document.documentElement.scrollWidth, h1s: document.querySelectorAll('h1').length, duplicateIds: ids.filter((id, i) => ids.indexOf(id) !== i) };
        });
        results.matrix.push({ route, language, ...state });
        if (width === 320 && route === 'edukasi.html') await captureSection(page.locator('.education-intro'), `education-intro-${language}-320.png`);
      }
    }
  }
  await writeFile(output + '/browser-results.json', JSON.stringify(results, null, 2));
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto(base + 'edukasi.html');
  await page.locator('.language-switch button[lang="id"]').click();
  const chart = page.locator('.ed-task-chart');
  assert.equal(await chart.locator('.ed-bar-row').count(), 10);
  assert.equal(await page.locator('.ed-metric-switch button').first().getAttribute('aria-pressed'), 'true');
  await chart.locator('.ed-bar-row').last().click();
  await page.locator('.ed-metric-switch button').last().click();
  await page.locator('.ed-data-panel > details.ed-method summary').first().click();
  await page.locator('#ed-request-count').fill('37');
  await page.locator('.ed-water-chart .ed-bar-row').first().click();
  assert.equal(await page.locator('#pilih a[href="./game.html"]').count(), 1);
  await page.locator('.language-switch button[lang="en"]').click();
  assert.equal(await chart.locator('.ed-bar-row').count(), 10);
  assert.equal(await page.locator('#ed-request-count').inputValue(), '37');
  assert.equal(await page.locator('.ed-water-chart .ed-bar-row').first().getAttribute('aria-pressed'), 'true');
  assert.equal(await page.locator('.ed-data-panel > details.ed-method').first().getAttribute('open'), '');
  assert.match(await page.locator('.ed-task-detail').innerText(), /g CO₂e/);
  results.interactions.push('all10 tasks immediately visible; selected task/carbon metric, source details, Li request/location survive language switch; knowledge invitation opens game');
  await page.locator('.ed-study-switch button').nth(1).click();
  await page.locator('#study-li').waitFor({ state: 'hidden' });
  assert.equal(await page.locator('#study-gemini input').count(), 0);
  assert.equal(await page.locator('#ed-request-count').isVisible(), false);
  await page.locator('.ed-energy-breakdown button').nth(1).click();
  await page.locator('.language-switch button[lang="id"]').click();
  assert.equal(await page.locator('.ed-energy-breakdown button').nth(1).getAttribute('aria-pressed'), 'true');
  results.interactions.push('Gemini view has no prompt slider or total; breakdown choice survives translation');
  // Freeze progressive entrance effects for readable, deterministic captures.
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await captureSection(page.locator('#water-research'), 'research-gemini.png');
  await page.locator('.ed-study-switch button').nth(2).click();
  await page.locator('#study-shumba').waitFor({ state: 'visible' });
  await page.locator('.ed-history-scenarios button').nth(1).click();
  await page.waitForFunction(() => document.querySelectorAll('.ed-history-scenarios button')[1]?.getAttribute('aria-pressed') === 'true');
  assert.match(await page.locator('.ed-history-values').innerText(), /2,9/);
  assert.match(await page.locator('.ed-history-values').innerText(), /0,13/);
  await page.locator('.language-switch button[lang="en"]').click();
  assert.equal(await page.locator('.ed-history-scenarios button').nth(1).getAttribute('aria-pressed'), 'true');
  assert.match(await page.locator('.ed-history-values').innerText(), /2.9/);
  await page.locator('.language-switch button[lang="id"]').click();
  await captureSection(page.locator('#water-research'), 'research-shumba.png');
  await page.locator('.ed-study-switch button').first().click();
  await page.locator('#study-li').waitFor({ state: 'visible' });
  assert.equal(await page.locator('#ed-request-count').inputValue(), '37');
  await page.locator('#ed-request-count').fill('20');
  await page.locator('.ed-water-chart .ed-bar-row').nth(2).click();
  await captureSection(page.locator('#water-research'), 'research-li.png');
  await page.locator('.ed-metric-switch button').first().click();
  await chart.locator('.ed-bar-row').first().click();
  await page.locator('.ed-data-panel > details.ed-method').first().evaluate(el => { el.open = false; });
  await captureSection(page.locator('.ed-data-panel').first(), 'research-luccioni.png');
  await captureSection(page.locator('.education-intro'), 'education-introduction.png');
  await captureSection(page.locator('.education-principles'), 'education-principles.png');
  await captureSection(page.locator('#pilih'), 'education-knowledge.png');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  await page.screenshot({ path: output + '/education-flow.png', fullPage: true, style: '.skip-link{visibility:hidden!important}' });
  const reduced = await page.locator('.prompt-journey').evaluate(node => ({ height: node.getBoundingClientRect().height, enhanced: node.classList.contains('is-enhanced') }));
  assert.equal(reduced.enhanced, false);
  results.interactions.push('reduced-motion journey renders static learning story');
  await page.goto(base + 'index.html');
  await page.locator('.language-switch button[lang="id"]').click();
  await captureSection(page.locator('.education-preview'), 'home-preview.png');
  assert.equal(await page.locator('#water-research').count(), 0);
  assert.equal(await page.locator('.journey-next').getAttribute('href'), '#carbsculator');
  for (const [id, count] of Object.entries({ chat: 10, summary: 3, longText: 1, image: 2 })) await page.locator(`#count-${id}`).fill(String(count));
  await page.locator('.calculator-form button[type="submit"]').click();
  await page.locator('.trial-dialog').waitFor({ state: 'visible' });
  assert.equal(await page.locator('.trial-dialog').isVisible(), true);
  const href = await page.locator('.trial-dialog a').getAttribute('href');
  assert.match(href, /from=home&chat=10&summary=3&longText=1&image=2#hasil/);
  await page.locator('.trial-dialog a').click();
  await page.waitForURL('**/kalkulator.html?**');
  await page.waitForFunction(() => document.querySelector('.result-total .sr-only')?.textContent === '13,20');
  assert.match(await page.locator('.result-total .sr-only').innerText(), /13,20/);
  await page.locator('.language-switch button[lang="en"]').click();
  await page.waitForFunction(() => document.querySelector('.result-total .sr-only')?.textContent === '13.20');
  assert.equal(await page.locator('#count-chat').inputValue(), '10');
  assert.match(await page.locator('.result-total .sr-only').innerText(), /13.20/);
  await page.locator('.result-tabs button').nth(1).click();
  await page.waitForFunction(() => document.querySelectorAll('.result-tabs button')[1]?.getAttribute('aria-pressed') === 'true');
  assert.equal(await page.locator('.result-tabs button').nth(1).getAttribute('aria-pressed'), 'true');
  results.interactions.push('home modal/count-only handoff recalculates 13.2 g; form values/result carousel survive translation');
  await page.goto(base + 'edukasi.html');
  await page.locator('.language-switch button[lang="id"]').click();
  await page.waitForFunction(() => document.documentElement.lang === 'id');
  assert.equal(await page.locator('.journey-next').getAttribute('href'), '#pahami');
  for (const id of ['jejak-ai','pahami','pilih','jejak-air','prompt-bijak']) assert.equal(await page.locator(`[id="${id}"]`).count(), 1);
  const intro = await page.locator('.education-intro').evaluate(node => {
    const heading = node.querySelector('h1');
    const style = getComputedStyle(heading);
    return { title: heading.textContent.trim(), weight: Number(style.fontWeight), align: style.textAlign, color: style.color, nextSection: node.nextElementSibling?.id, hasVideoSource: !!node.querySelector('video source, video[src], iframe'), hasNavigation: !!node.querySelector('nav') };
  });
  assert.equal(intro.title, 'Edukasi');
  assert.ok(intro.weight >= 700);
  assert.equal(intro.align, 'center');
  assert.ok(intro.color.match(/\d+/g).slice(0, 3).every(channel => Number(channel) < 40));
  assert.equal(intro.nextSection, 'jejak-ai');
  assert.equal(intro.hasVideoSource, false);
  assert.equal(intro.hasNavigation, false);
  assert.equal(await page.locator('#ajak').count(), 0);
  assert.equal(await page.locator('.ed-expand').count(), 0);
  await page.keyboard.press('Tab');
  await page.locator('.education-intro a[href="#jejak-ai"]').focus();
  assert.ok(await page.locator('.education-intro a[href="#jejak-ai"]').evaluate(el => getComputedStyle(el).outlineStyle !== 'none'));
  await page.keyboard.press('Enter');
  assert.equal(new URL(page.url()).hash, '#jejak-ai');
  results.interactions.push('centered bold black education intro, video placeholder and direct motion link; Ajak removed; preserved anchors unique and keyboard focus visible');
  await page.locator('#water-research > details.ed-method summary').click();
  for (const width of [390, 320]) {
    await page.setViewportSize({ width, height: 1000 });
    for (const language of ['id', 'en']) {
      await page.locator(`.language-switch button[lang="${language}"]`).click();
      for (let study = 0; study < 3; study++) {
        await page.locator('.ed-study-switch button').nth(study).click();
        await page.locator(['#study-li', '#study-gemini', '#study-shumba'][study]).waitFor({ state: 'visible' });
        const state = await page.evaluate(() => ({ width: innerWidth, documentWidth: document.documentElement.scrollWidth, h1s: document.querySelectorAll('h1').length }));
        results.matrix.push({ route: 'edukasi.html', language, study, openMetadata: true, ...state });
        if (width === 320 && language === 'en' && study === 1) await captureSection(page.locator('#water-research'), 'research-gemini-en-320.png');
      }
    }
  }
  results.interactions.push('all three study views with open metadata checked in ID/EN at 390/320 px');
  await context.close();
  const noJSContext = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 320, height: 900 } });
  const noJS = await noJSContext.newPage();
  for (const route of routes) {
    await noJS.goto(base + route);
    const check = await noJS.evaluate(() => ({ width: innerWidth, documentWidth: document.documentElement.scrollWidth, css: document.styleSheets.length, h1s: document.querySelectorAll('h1').length }));
    results.noJS.push({ route, ...check });
    if (route === 'edukasi.html') {
      await noJS.locator('.ed-data-panel > details.ed-method summary').first().click();
      assert.equal(await noJS.getByText('2311.16863v3 · 2024-10-15', { exact: true }).isVisible(), true);
      assert.equal(await noJS.getByText('Google / Gemini Apps · Mei 2025', { exact: true }).isVisible(), true);
      assert.equal(await noJS.locator('.collection-count').innerText(), '7 materi untuk dijelajahi');
      await noJS.screenshot({ path: output + '/education-no-js-320.png', fullPage: true });
    }
  }
  await noJSContext.close();
  await writeFile(output + '/browser-results.json', JSON.stringify(results, null, 2));
  const bad = [...results.matrix, ...results.noJS].filter(row => row.documentWidth > row.width + 1 || row.h1s !== 1 || row.duplicateIds?.length);
  console.log(JSON.stringify({ matrixChecks: results.matrix.length, noJSChecks: results.noJS.length, failures: bad, errors: results.errors, failedAssets: results.failedAssets, interactions: results.interactions }, null, 2));
  assert.deepEqual(bad, []);
  assert.deepEqual(results.errors, []);
  assert.deepEqual(results.failedAssets, []);
} finally { await browser.close(); }
