import { activities } from '../content/activities.js';
import { estimate } from './calculation.js';

const canonicalCounts = result => Object.fromEntries(result.breakdown.map(item => [item.id, item.count]));

// Only activity counts travel between pages. The destination recomputes every
// result from its own authoritative factors rather than trusting a URL total.
export function buildCalculatorUrl(counts) {
  if (!counts || typeof counts !== 'object' || Array.isArray(counts)) {
    throw new RangeError('Activity counts are required.');
  }
  const result = estimate(counts);
  if (!result.count) throw new RangeError('At least one activity is required.');
  const params = new URLSearchParams({ from: 'home' });
  for (const [id, count] of Object.entries(canonicalCounts(result))) params.set(id, String(count));
  return `./kalkulator.html?${params.toString()}#hasil`;
}

export function parseCalculatorHandoff(search) {
  if (typeof search !== 'string') return null;
  const params = new URLSearchParams(search);
  if (params.getAll('from').length !== 1 || params.get('from') !== 'home') return null;

  const counts = {};
  for (const { id } of activities) {
    const values = params.getAll(id);
    if (values.length !== 1 || !/^\d{1,5}$/.test(values[0])) return null;
    counts[id] = Number(values[0]);
  }
  try {
    const result = estimate(counts);
    return result.count ? canonicalCounts(result) : null;
  } catch {
    return null;
  }
}
