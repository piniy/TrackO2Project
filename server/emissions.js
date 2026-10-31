// Coefficients are g CO2e per 1,000 tokens, supplied by the site operator.
// No published per-prompt median is converted into a per-token coefficient.
const tokenCount = value => Number.isSafeInteger(value) && value >= 0 ? value : null;

export function normalizeUsage(metadata = {}) {
  return {
    inputTokens: tokenCount(metadata?.promptTokenCount),
    outputTokens: tokenCount(metadata?.candidatesTokenCount),
    thinkingTokens: metadata?.thoughtsTokenCount === undefined ? 0 : tokenCount(metadata.thoughtsTokenCount),
    cachedTokens: metadata?.cachedContentTokenCount === undefined ? 0 : tokenCount(metadata.cachedContentTokenCount),
    toolTokens: metadata?.toolUsePromptTokenCount === undefined ? 0 : tokenCount(metadata.toolUsePromptTokenCount),
    totalTokens: tokenCount(metadata?.totalTokenCount)
  };
}

export function estimateTokenEmissions(usage, factors, model) {
  const unavailable = (reason, missing = []) => ({ status: 'unavailable', reason, gramsCO2e: null, missing });
  if (Object.values(usage).some(value => !Number.isSafeInteger(value) || value < 0)
    || usage.cachedTokens > usage.inputTokens || usage.toolTokens !== 0
    || usage.totalTokens !== usage.inputTokens + usage.outputTokens + usage.thinkingTokens) {
    return unavailable('usage_incomplete');
  }
  if (!factors || factors.model !== model || !factors.source || !factors.version || !factors.boundary) {
    return unavailable('factors_not_configured');
  }
  const counts = {
    input: usage.inputTokens - usage.cachedTokens,
    output: usage.outputTokens,
    thinking: usage.thinkingTokens,
    cached: usage.cachedTokens
  };
  const missing = Object.keys(counts).filter(key => counts[key] > 0 &&
    (typeof factors[key] !== 'number' || !Number.isFinite(factors[key]) || factors[key] < 0));
  if (missing.length) return unavailable('factors_not_configured', missing);
  const breakdown = Object.entries(counts).map(([type, tokens]) => ({
    type, tokens, gramsPerThousandTokens: factors[type] ?? null,
    gramsCO2e: tokens === 0 ? 0 : tokens / 1000 * factors[type]
  }));
  const gramsCO2e = breakdown.reduce((sum, item) => sum + item.gramsCO2e, 0);
  if (!Number.isFinite(gramsCO2e)) return unavailable('factors_not_configured');
  return {
    status: 'estimated', gramsCO2e, breakdown,
    method: 'token-linear-scenario-v1', factorVersion: factors.version,
    source: factors.source, boundary: factors.boundary, model: factors.model,
    qualification: 'scenario_not_measurement'
  };
}
