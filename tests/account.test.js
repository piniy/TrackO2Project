import test from 'node:test';
import assert from 'node:assert/strict';
import { accountApi, accountStore } from '../src/services/account.js';
import { activityDashboard } from '../src/features/account.js';

test('account requests use same-origin cookies and preserve authentication errors', async t => {
  t.mock.method(globalThis, 'fetch', async (path, options) => {
    assert.equal(path, '/auth/session');
    assert.equal(options.credentials, 'same-origin');
    assert.equal(options.cache, 'no-store');
    assert.equal(options.headers.Authorization, undefined);
    return { ok: false, status: 401, json: async () => ({ error: 'Session expired or revoked' }) };
  });
  await assert.rejects(accountApi('/auth/session'), error => error.status === 401);
  const store = accountStore(); store.user = { email: 'old@example.com' };
  await store.restore();
  assert.equal(store.user, null); assert.equal(store.ready, true);
});

test('temporary service failure keeps known identity and reports an actionable error', async t => {
  t.mock.method(globalThis, 'fetch', async () => { throw new TypeError('Failed to fetch'); });
  const store = accountStore(), user = { email: 'local@example.com' }; store.user = user;
  await store.restore();
  assert.equal(store.user, user); assert.equal(store.ready, true);
  assert.match(store.error, /Koneksi terputus/);
});

test('dashboard retains last received data on failure and clears it when the session expires', async t => {
  const oldDocument = globalThis.document, oldLocation = globalThis.location;
  globalThis.document = { hidden: false, removeEventListener() {} };
  const redirects = []; globalThis.location = { replace: path => redirects.push(path) };
  globalThis.window = { removeEventListener() {} };
  t.after(() => { globalThis.document = oldDocument; globalThis.location = oldLocation; delete globalThis.window; });
  let code = 503;
  t.mock.method(globalThis, 'fetch', async () => ({ok:false,status:code,json:async()=>({error:'Unavailable'})}));
  const dashboard = activityDashboard(); dashboard.$store = { account: {user:{email:'local@example.com'}} };
  const last = { confirmed_count: 3 }; dashboard.data = last;
  await dashboard.refresh();
  assert.equal(dashboard.data, last); assert.equal(dashboard.connection, 'offline');
  code = 401; await dashboard.refresh();
  assert.equal(dashboard.data, null); assert.equal(dashboard.$store.account.user, null);
  assert.deepEqual(redirects, ['./login.html']); dashboard.destroy();
});
