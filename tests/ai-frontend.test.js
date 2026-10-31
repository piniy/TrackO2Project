import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import aiCalculator from '../src/features/ai-calculator.js';
import { sendPrompt } from '../src/services/ai.js';

test('browser sends only the prompt; HTTP errors stay errors', async () => {
  const result = { answer: 'Hello', usage: {}, emissions: { status: 'unavailable', gramsCO2e: null } };
  assert.deepEqual(await sendPrompt('Hi', { fetchImpl: async (url, options) => {
    assert.equal(url, '/api/chat');
    assert.deepEqual(JSON.parse(options.body), { prompt: 'Hi' });
    assert.equal(options.headers['x-goog-api-key'], undefined);
    return new Response(JSON.stringify(result));
  } }), result);
  await assert.rejects(sendPrompt('Hi', { fetchImpl: async () => new Response(JSON.stringify({ error: { code: 'not_configured' } }), { status: 503 }) }), /not_configured/);
});

test('controller preserves successful result on failure and rejects duplicate submissions', async t => {
  const originalFetch = globalThis.fetch;
  t.after(() => { globalThis.fetch = originalFetch; });
  let release, calls = 0;
  globalThis.fetch = async () => { calls++; await new Promise(resolve => { release = resolve; }); return new Response(JSON.stringify({ answer: 'old result', usage: {}, emissions: { status: 'unavailable' } })); };
  const state = aiCalculator();
  state.prompt = 'first';
  const pending = state.submit();
  await state.submit();
  assert.equal(calls, 1);
  release();
  await pending;
  assert.equal(state.submittedPrompt, 'first');
  assert.equal(state.busy, false);
  globalThis.fetch = async () => { throw new Error('offline'); };
  state.prompt = 'second';
  await state.submit();
  assert.equal(state.result.answer, 'old result');
  assert.equal(state.submittedPrompt, 'first');
  assert.equal(state.error, 'network_error');
  assert.equal(state.busy, false);
  state.$store = { i18n: { locale: 'en' } };
  assert.match(state.errorMessage, /Cannot reach/);
});

test('AI response uses escaped text bindings, and absence is not formatted as zero', () => {
  const html = readFileSync(new URL('../src/components/ai-calculator.html', import.meta.url), 'utf8');
  assert.match(html, /x-text="result\?\.answer"/);
  assert.ok(!html.includes('x-html'));
  const state = aiCalculator();
  assert.equal(state.number(null), 'Tidak tersedia');
  assert.notEqual(state.number(.000000001, 8), '0');
});
