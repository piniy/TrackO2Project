export async function sendPrompt(prompt, { fetchImpl = fetch } = {}) {
  let response;
  try {
    response = await fetchImpl('/api/chat', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt }), signal: AbortSignal.timeout(65_000)
    });
  } catch (error) {
    throw new Error(['TimeoutError', 'AbortError'].includes(error.name) ? 'upstream_timeout' : 'network_error');
  }
  let data;
  try { data = await response.json(); } catch { throw new Error('network_error'); }
  if (!response.ok) throw new Error(data?.error?.code || 'network_error');
  if (typeof data?.answer !== 'string' || !data.usage || !data.emissions) throw new Error('network_error');
  return data;
}
