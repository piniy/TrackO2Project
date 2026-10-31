function coefficient(value) {
  if (typeof value !== 'string' || !value.trim()) return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : null;
}

export function readConfig(env = process.env) {
  const model = env.GEMINI_MODEL?.trim() || '';
  return {
    apiKey: env.GEMINI_API_KEY?.trim() || '', model,
    origins: (env.ALLOWED_ORIGINS || 'http://127.0.0.1:5173,http://localhost:5173,http://127.0.0.1:4173,http://localhost:4173').split(',').map(value => value.trim()),
    factors: {
      model: env.EMISSION_MODEL?.trim() || '',
      source: env.EMISSION_FACTOR_SOURCE?.trim() || '',
      version: env.EMISSION_FACTOR_VERSION?.trim() || '',
      boundary: env.EMISSION_SYSTEM_BOUNDARY?.trim() || '',
      input: coefficient(env.EMISSION_INPUT_G_PER_1K),
      output: coefficient(env.EMISSION_OUTPUT_G_PER_1K),
      thinking: coefficient(env.EMISSION_THINKING_G_PER_1K),
      cached: coefficient(env.EMISSION_CACHED_G_PER_1K)
    }
  };
}
