import test from 'node:test';
import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { once } from 'node:events';
import { normalizeUsage, estimateTokenEmissions } from '../server/emissions.js';
import { readConfig } from '../server/config.js';
import { generateReply } from '../server/gemini.js';
import { createApi } from '../server/app.js';

// Synthetic coefficients strictly for arithmetic tests, not Gemini research.
const factors = { model: 'test-model', source: 'Synthetic test fixture', version: 'test-v1', boundary: 'test only', input: 1, output: 2, thinking: 3, cached: .5 };
const config = { apiKey: 'test-secret', model: 'test-model', origins: ['http://localhost:5173'], factors };
const fixture = { modelVersion: 'test-model-001', candidates: [{ content: { parts: [{ text: 'hidden', thought: true }, { text: '<script>alert(1)</script>' }] }, finishReason: 'STOP' }], usageMetadata: { promptTokenCount: 1000, candidatesTokenCount: 500, thoughtsTokenCount: 200, cachedContentTokenCount: 100, totalTokenCount: 1700 } };
const upstream = async () => new Response(JSON.stringify(fixture));

test('separates cached input and thinking without double counting', () => {
  const result = estimateTokenEmissions(normalizeUsage(fixture.usageMetadata), factors, 'test-model');
  assert.equal(result.status, 'estimated');
  assert.equal(result.gramsCO2e, 2.55);
  assert.deepEqual(result.breakdown.map(row => row.tokens), [900, 500, 200, 100]);
});

test('missing, inconsistent, malformed or unsupported usage never means zero emissions', () => {
  for (const metadata of [undefined, {}, { ...fixture.usageMetadata, totalTokenCount: 1800 },
    { ...fixture.usageMetadata, cachedContentTokenCount: 1001 }, { ...fixture.usageMetadata, promptTokenCount: '1000' },
    { ...fixture.usageMetadata, toolUsePromptTokenCount: 1 }]) {
    const result = estimateTokenEmissions(normalizeUsage(metadata), factors, 'test-model');
    assert.equal(result.gramsCO2e, null);
    assert.equal(result.reason, 'usage_incomplete');
  }
});

test('absent optional counts work only when reported total reconciles', () => {
  const usage = normalizeUsage({ promptTokenCount: 10, candidatesTokenCount: 20, totalTokenCount: 30 });
  assert.equal(estimateTokenEmissions(usage, factors, 'test-model').gramsCO2e, .05);
});

test('blank factors, wrong model, missing provenance and missing thinking coefficient are unavailable', () => {
  const usage = normalizeUsage(fixture.usageMetadata);
  for (const item of [undefined, { ...factors, model: 'other' }, { ...factors, source: '' }, { ...factors, thinking: null }]) {
    assert.equal(estimateTokenEmissions(usage, item, 'test-model').gramsCO2e, null);
  }
  assert.equal(readConfig({}).factors.input, null);
  assert.equal(readConfig({ EMISSION_INPUT_G_PER_1K: 'NaN' }).factors.input, null);
  assert.equal(readConfig({ EMISSION_INPUT_G_PER_1K: '-1' }).factors.input, null);
});

test('provider request keeps key in header, bounds output, returns metadata but not thoughts or credentials', async () => {
  const result = await generateReply('hello', config, { fetchImpl: async (url, options) => {
    assert.ok(!url.includes(config.apiKey));
    assert.equal(options.headers['x-goog-api-key'], config.apiKey);
    const body = JSON.parse(options.body);
    assert.equal(body.contents[0].parts[0].text, 'hello');
    assert.equal(body.generationConfig.maxOutputTokens, 2048);
    return upstream();
  } });
  assert.equal(result.answer, '<script>alert(1)</script>');
  assert.equal(result.usage.inputTokens, 1000);
  assert.ok(!JSON.stringify(result).includes('test-secret'));
  assert.ok(!JSON.stringify(result).includes('hidden'));
});

test('provider failures, bad JSON, blocked response, timeout and missing config', async () => {
  await assert.rejects(generateReply('hi', { ...config, apiKey: '' }), { code: 'not_configured' });
  await assert.rejects(generateReply('hi', config, { fetchImpl: async () => new Response('secret upstream error', { status: 429 }) }), { code: 'provider_limit' });
  await assert.rejects(generateReply('hi', config, { fetchImpl: async () => new Response('invalid') }), { code: 'invalid_provider_response' });
  await assert.rejects(generateReply('hi', config, { fetchImpl: async () => { throw new DOMException('expired', 'TimeoutError'); } }), { code: 'upstream_timeout' });
  const blocked = await generateReply('hi', config, { fetchImpl: async () => new Response(JSON.stringify({ promptFeedback: { blockReason: 'SAFETY' } })) });
  assert.equal(blocked.blocked, true);
  assert.equal(blocked.emissions.gramsCO2e, null);
});

async function serve(t, options = {}) {
  const server = createServer(createApi({ config, fetchImpl: upstream, ...options }));
  server.listen(0, '127.0.0.1');
  await once(server, 'listening');
  t.after(() => { server.closeAllConnections(); server.close(); });
  const url = `http://127.0.0.1:${server.address().port}`;
  return (body, options = {}) => fetch(url + (options.path || '/api/chat'), {
    method: options.method || 'POST', headers: { 'Content-Type': 'application/json', ...options.headers },
    ...(options.method === 'GET' ? {} : { body: typeof body === 'string' ? body : JSON.stringify(body) })
  });
}

test('HTTP API validates inputs and rejects forged model/token/factor data', async t => {
  let calls = 0;
  const request = await serve(t, { fetchImpl: async () => { calls++; return upstream(); } });
  for (const body of [{}, null, [], { prompt: ' ' }, { prompt: 'a'.repeat(8001) }, { prompt: 'hi', inputTokens: 1 }, { prompt: 'hi', model: 'other' }]) {
    assert.equal((await request(body)).status, 400);
  }
  assert.equal((await request('{')).status, 400);
  assert.equal((await request('a'.repeat(33_000))).status, 413);
  assert.equal((await request({ prompt: 'hi' }, { headers: { origin: 'https://evil.example' } })).status, 403);
  assert.equal((await request({ prompt: 'hi' }, { headers: { 'Content-Type': 'text/plain' } })).status, 415);
  assert.equal((await request(null, { method: 'GET' })).status, 405);
  assert.equal(calls, 0);
  const response = await request({ prompt: 'hi' }, { headers: { origin: 'http://localhost:5173' } });
  assert.equal(response.status, 200);
  assert.equal(response.headers.get('cache-control'), 'no-store');
  assert.equal((await response.json()).emissions.gramsCO2e, 2.55);
  assert.equal(calls, 1);
});

test('API status exposes no key; rate limit stops extra provider calls and resets', async t => {
  let clock = 0, calls = 0;
  const request = await serve(t, { limit: 1, now: () => clock, fetchImpl: async () => { calls++; return upstream(); } });
  const status = await request(null, { method: 'GET', path: '/api/status' });
  assert.deepEqual(await status.json(), { provider: 'gemini', ready: true, model: 'test-model' });
  assert.equal((await request({ prompt: 'hi' })).status, 200);
  assert.equal((await request({ prompt: 'again' })).status, 429);
  assert.equal(calls, 1);
  clock = 60_000;
  assert.equal((await request({ prompt: 'again' })).status, 200);
});
