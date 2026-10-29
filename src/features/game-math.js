export function positive(value) {
  if (!Number.isFinite(value) || value <= 0) throw new RangeError('Expected a positive finite quantity.');
  return value;
}
export function compareEnergy(leftWh, rightWh) {
  positive(leftWh); positive(rightWh);
  const max = Math.max(leftWh, rightWh);
  return { winnerId: leftWh === rightWh ? 'equal' : leftWh > rightWh ? 'left' : 'right',
    ratio: max / Math.min(leftWh, rightWh), differenceWh: Math.abs(leftWh - rightWh),
    widths: [leftWh / max * 100, rightWh / max * 100] };
}
export function closestWaterOption(options, actualMl) {
  positive(actualMl);
  if (!options.length || new Set(options.map(option => option.id)).size !== options.length) throw new RangeError('Invalid buckets.');
  const distances = options.map(option => ({ id: option.id, distance: Math.abs(Math.log(positive(option.ml) / actualMl)) })).sort((a, b) => a.distance - b.distance);
  if (distances.length > 1 && Math.abs(distances[0].distance - distances[1].distance) < 1e-12) throw new RangeError('Ambiguous water buckets.');
  return distances[0].id;
}
export function evaluateRound(round, optionId) {
  const option = round.options.find(item => item.id === optionId);
  if (!option) throw new RangeError('Unknown answer.');
  if (round.type === 'energy') {
    const [left, right] = round.options;
    const comparison = compareEnergy(left.wh, right.wh);
    if (comparison.winnerId === 'equal' && !round.options.some(item => item.id === 'equal')) throw new RangeError('Tie needs an explicit equal option.');
    return { ...comparison, correct: optionId === comparison.winnerId, correctOptionId: comparison.winnerId, leftWh: left.wh, rightWh: right.wh };
  }
  if (round.type === 'choice') {
    const correctOptionId = round.options.find(item => item.best)?.id;
    const common = { correct: optionId === correctOptionId, correctOptionId, meetsGoal: option.meetsGoal };
    if (!option.meetsGoal) return { ...common, savedWh: null, reason: 'inadequate' };
    if (round.factorWh === null) return { ...common, savedWh: null, reason: 'qualitative' };
    positive(round.factorWh);
    for (const count of [round.baselineCount, option.inferenceCount]) if (!Number.isInteger(count) || count < 0) throw new RangeError('Invalid inference count.');
    const baselineWh = round.baselineCount * round.factorWh;
    const chosenWh = option.inferenceCount * round.factorWh;
    const savedWh = baselineWh - chosenWh;
    return { ...common, baselineWh, chosenWh, savedWh, ledMinutes: savedWh / 9 * 60, reason: 'quantified' };
  }
  if (round.type === 'water') {
    positive(round.requestCount); positive(round.location.onsite); positive(round.location.offsite);
    const onsiteMl = round.requestCount * round.location.onsite;
    const offsiteMl = round.requestCount * round.location.offsite;
    const totalMl = onsiteMl + offsiteMl;
    const correctOptionId = closestWaterOption(round.options, totalMl);
    if (round.expectedOptionId !== correctOptionId) throw new RangeError('Authored bucket does not match estimate.');
    return { correct: optionId === correctOptionId, correctOptionId, onsiteMl, offsiteMl, totalMl, chosenMl: option.ml, bottles: totalMl / 500 };
  }
  throw new RangeError('Unknown round type.');
}
export function summarizeAnswers(answers) {
  const quantified = answers.filter(answer => Number.isFinite(answer.outcome.savedWh));
  const savedWh = quantified.reduce((sum, answer) => sum + answer.outcome.savedWh, 0);
  return { savedWh, quantifiedCount: quantified.length, ledMinutes: savedWh / 9 * 60, correct: answers.filter(answer => answer.outcome.correct).length };
}
export function formatQuantity(value, locale = 'id', digits = 1) {
  return new Intl.NumberFormat(locale === 'en' ? 'en-US' : 'id-ID', { maximumFractionDigits: digits }).format(value);
}
export const formatWh = (value, locale = 'id') => `${formatQuantity(value, locale, Math.abs(value) > 0 && Math.abs(value) < 1 ? Math.max(2, 1 - Math.floor(Math.log10(Math.abs(value)))) : 1)} Wh`;
export const formatWater = (ml, locale = 'id') => ml >= 1000 ? `${formatQuantity(ml / 1000, locale, 2)} L` : `${formatQuantity(ml, locale, 0)} mL`;
export function durationParts(minutes) {
  if (!Number.isFinite(minutes) || minutes < 0) throw new RangeError('Invalid duration.');
  const rounded = Math.round(minutes);
  return { lessThanMinute: minutes > 0 && minutes < 1, hours: Math.floor(rounded / 60), minutes: rounded % 60 };
}
