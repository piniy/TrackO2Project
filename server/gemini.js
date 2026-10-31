import { normalizeUsage, estimateTokenEmissions } from './emissions.js';

export class ApiError extends Error {
  constructor(status, code) { super(code); this.status = status; this.code = code; }
}

export async function generateReply(prompt, config, { fetchImpl = fetch, signal } = {}) {
  if (!config.apiKey || !/^[a-zA-Z0-9._-]+$/.test(config.model)) throw new ApiError(503, 'not_configured');
  let response;
  try {
    response = await fetchImpl(`https://generativelanguage.googleapis.com/v1beta/models/${config.model}:generateContent`, {
      method: 'POST', signal: signal ?? AbortSignal.timeout(60_000),
      headers: { 'Content-Type': 'application/json', 'x-goog-api-key': config.apiKey },
      body: JSON.stringify({ contents: [{ role: 'user', parts: [{ text: prompt }] }],
        generationConfig: { candidateCount: 1, maxOutputTokens: 2048 } })
    });
  } catch (error) {
    if (['AbortError', 'TimeoutError'].includes(error.name)) throw new ApiError(504, 'upstream_timeout');
    throw new ApiError(502, 'upstream_unavailable');
  }
  if (!response.ok) throw new ApiError(response.status === 429 ? 429 : 502,
    response.status === 429 ? 'provider_limit' : 'upstream_unavailable');
  let data;
  try { data = await response.json(); } catch { throw new ApiError(502, 'invalid_provider_response'); }
  if (!data || typeof data !== 'object' || Array.isArray(data)) throw new ApiError(502, 'invalid_provider_response');
  const candidate = data.candidates?.[0];
  const parts = candidate?.content?.parts;
  const answer = Array.isArray(parts) ? parts.filter(part => !part.thought && typeof part.text === 'string').map(part => part.text).join('') : '';
  const usage = normalizeUsage(data.usageMetadata);
  return {
    answer, model: config.model, modelVersion: typeof data.modelVersion === 'string' ? data.modelVersion : null,
    finishReason: typeof candidate?.finishReason === 'string' ? candidate.finishReason : null,
    blocked: Boolean(data.promptFeedback?.blockReason) || (!answer && candidate?.finishReason === 'SAFETY'),
    usage, emissions: estimateTokenEmissions(usage, config.factors, config.model)
  };
}
