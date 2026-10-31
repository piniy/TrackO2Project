import { randomUUID } from 'node:crypto';
import { readConfig } from './config.js';
import { ApiError, generateReply } from './gemini.js';

const BODY_LIMIT = 32_768;
async function readBody(req) {
  // Serverless hosts can supply an already parsed body.
  if (req.body !== undefined) {
    const body = typeof req.body === 'string' ? req.body : JSON.stringify(req.body);
    if (Buffer.byteLength(body) > BODY_LIMIT) throw new ApiError(413, 'prompt_too_large');
    try { return JSON.parse(body); } catch { throw new ApiError(400, 'invalid_json'); }
  }
  let size = 0;
  const chunks = [];
  for await (const chunk of req) {
    size += chunk.length;
    if (size > BODY_LIMIT) throw new ApiError(413, 'prompt_too_large');
    chunks.push(chunk);
  }
  try { return JSON.parse(Buffer.concat(chunks).toString('utf8')); }
  catch { throw new ApiError(400, 'invalid_json'); }
}

export function createApi({ config = readConfig(), fetchImpl = fetch, now = Date.now, limit = 30 } = {}) {
  // Shared instance ceiling, including failed calls. A gateway quota is needed
  // when deploying multiple workers/serverless instances (see docs).
  let windowStart = now(), requests = 0, active = 0;
  return async function handler(req, res) {
    const requestId = randomUUID();
    const send = (status, body) => {
      if (res.destroyed || res.writableEnded) return;
      res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff', 'X-Request-Id': requestId });
      res.end(JSON.stringify(body));
    };
    try {
      const path = new URL(req.url, 'http://localhost').pathname;
      if (path === '/api/status' && req.method === 'GET') {
        send(200, { provider: 'gemini', ready: Boolean(config.apiKey && /^[a-zA-Z0-9._-]+$/.test(config.model)), model: config.model || null });
        return;
      }
      if (path !== '/api/chat') throw new ApiError(404, 'not_found');
      if (req.method !== 'POST') { res.setHeader('Allow', 'POST'); throw new ApiError(405, 'method_not_allowed'); }
      if (req.headers.origin && !config.origins.includes(req.headers.origin)) throw new ApiError(403, 'origin_not_allowed');
      if (req.headers['sec-fetch-site'] === 'cross-site') throw new ApiError(403, 'origin_not_allowed');
      if (!/^application\/json(?:\s*;|$)/i.test(req.headers['content-type'] || '')) throw new ApiError(415, 'json_required');
      if (Number(req.headers['content-length']) > BODY_LIMIT) throw new ApiError(413, 'prompt_too_large');
      if (now() - windowStart >= 60_000) { windowStart = now(); requests = 0; }
      if (requests >= limit || active >= 3) { res.setHeader('Retry-After', '60'); throw new ApiError(429, 'rate_limited'); }
      requests++;
      active++;
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 60_000);
      const onClose = () => { if (!res.writableEnded) controller.abort(); };
      res.on('close', onClose);
      try {
        const body = await readBody(req);
        if (!body || typeof body !== 'object' || Array.isArray(body) || typeof body.prompt !== 'string'
          || !body.prompt.trim() || body.prompt.length > 8000 || Object.keys(body).some(key => key !== 'prompt')) {
          throw new ApiError(400, 'invalid_prompt');
        }
        const result = await generateReply(body.prompt.trim(), config, { fetchImpl, signal: controller.signal });
        send(200, { ...result, requestId });
      } finally { clearTimeout(timer); res.off('close', onClose); active--; }
    } catch (error) {
      send(error instanceof ApiError ? error.status : 500, { error: { code: error instanceof ApiError ? error.code : 'internal_error', requestId } });
    }
  };
}
