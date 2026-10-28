import test from 'node:test';
import assert from 'node:assert/strict';
import campaign, { campaignCopy, campaignSource, campaignText, copyCampaignText } from '../src/features/campaign.js';
import { campaignMessages } from '../src/i18n/campaign-messages.js';

test('campaign copy retains fact, date, median denominator and essential source boundaries', () => {
  const copy = campaignText();
  for (const text of Object.values(campaignCopy)) assert.ok(copy.includes(text));
  assert.ok(copy.includes(campaignSource));
  assert.ok(copy.includes('median prompt teks Gemini Apps pada Mei 2025'));
  assert.ok(copy.includes('bukan pengukuran setiap prompt AI'));
  const english = campaignText(text => campaignMessages[text] ?? text);
  assert.ok(english.includes('median Gemini Apps text prompt in May 2025'));
  assert.ok(english.includes('provider-authored'));
  assert.ok(english.includes('excludes user devices, external networks, and training'));
});

test('claim answers and copy content remain consistent when language changes', () => {
  const state = campaign();
  let language = 'id';
  state.$store = { i18n: { t: text => language === 'en' ? campaignMessages[text] ?? text : text } };
  state.checkClaim();
  assert.equal(state.checked, false);
  state.answer = 'context';
  state.checkClaim();
  assert.equal(state.checked, true);
  assert.match(state.feedback, /^Tepat/);
  language = 'en';
  assert.equal(state.answer, 'context');
  assert.equal(state.checked, true);
  assert.match(state.shareText, /^Google’s study/);
});

test('copy returns a usable fallback on unsupported or rejected clipboard access', async () => {
  assert.equal(await copyCampaignText('message'), false);
  assert.equal(await copyCampaignText('message', { writeText: async () => { throw new Error('denied'); } }), false);
  let received;
  assert.equal(await copyCampaignText('message', { writeText: async text => { received = text; } }), true);
  assert.equal(received, 'message');
});

test('controller selects the visible text fallback when clipboard is unavailable', async () => {
  const state = campaign();
  state.$store = { i18n: { t: text => text } };
  let focused = false;
  let selected = false;
  state.$refs = { shareText: { focus() { focused = true; }, select() { selected = true; } } };
  await state.copyText();
  assert.equal(state.copyState, 'fallback');
  assert.equal(focused, true);
  assert.equal(selected, true);
});
