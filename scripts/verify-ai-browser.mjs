// Optional acceptance test using an existing Playwright installation.
// Starts Vite and a real local API with a mocked Gemini transport. No paid calls.
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { createServer } from 'node:http';
import { once } from 'node:events';
import { mkdir } from 'node:fs/promises';
import { createServer as createVite } from 'vite';
import { createApi } from '../server/app.js';
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const config = { apiKey: '', model: 'test-model', origins: ['http://127.0.0.1:5173'], factors: null };
let fail = false;
const api = createServer(createApi({ config, fetchImpl: async () => fail
  ? new Response('{}', { status: 429 })
  : new Response(JSON.stringify({ candidates: [{ content: { parts: [{ text: '<script>window.injected = true</script> Jawaban uji.' }] }, finishReason: 'STOP' }], usageMetadata: { promptTokenCount: 100, candidatesTokenCount: 200, totalTokenCount: 300 } })) }));
api.listen(3001, '127.0.0.1');
await once(api, 'listening');
let vite, browser;
try {
  vite = await createVite({ server: { host: '127.0.0.1' } }); await vite.listen();
  browser = await chromium.launch({ headless: true, channel: 'chrome' });
  const page = await browser.newPage();
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('http://127.0.0.1:5173/kalkulator.html');
  const form = page.locator('.ai-calculator');
  await page.locator('#ai-prompt').fill('Jelaskan karbon.');
  await form.getByRole('button', { name: 'Kirim ke Gemini' }).click();
  await page.waitForFunction(() => document.querySelector('.ai-calculator .form-error').textContent.includes('belum dikonfigurasi'));
  config.apiKey = 'synthetic-test-only';
  await form.getByRole('button', { name: 'Kirim ke Gemini' }).click();
  await page.waitForFunction(() => document.querySelector('.ai-response > .ai-answer')?.textContent.includes('Jawaban uji'));
  assert.equal(await page.evaluate(() => window.injected), undefined);
  assert.match(await page.locator('.ai-emissions').textContent(), /belum tersedia/);
  config.factors = { model: 'test-model', source: 'Synthetic test only', version: 'test-v1', boundary: 'test only', input: 1, output: 2 };
  await form.getByRole('button', { name: 'Kirim ke Gemini' }).click();
  await page.locator('.ai-carbon').waitFor();
  assert.match(await page.locator('.ai-carbon').textContent(), /0,5/);
  fail = true;
  await form.getByRole('button', { name: 'Kirim ke Gemini' }).click();
  await page.waitForFunction(() => document.querySelector('.ai-calculator .form-error').textContent.includes('Kuota'));
  assert.match(await page.locator('.ai-carbon').textContent(), /0,5/);
  for (const width of [320, 390, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const locale of ['id', 'en']) {
      await page.getByRole('button', { name: locale === 'en' ? 'English' : 'Bahasa Indonesia', exact: true }).click();
      assert.equal(await page.locator('html').getAttribute('lang'), locale);
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `Overflow ${width}/${locale}`);
    }
  }
  await mkdir('test-results', { recursive: true });
  await page.screenshot({ path: 'test-results/ai-calculator-desktop.png', fullPage: true });
  assert.deepEqual(errors, []);
  console.log('Browser checks passed: missing key, prompt roundtrip, missing/configured factors, quota failure, retained result, escaped output, ID/EN, 320/390/1440px.');
} finally {
  await browser?.close(); await vite?.close(); api.closeAllConnections(); await new Promise(resolve => api.close(resolve));
}
