import { comparisonBasis as basis } from '../content/result-insights.js';

export function equivalentActivities(grams) {
  if (!Number.isFinite(grams) || grams < 0) throw new RangeError('Emission total must be finite and nonnegative.');
  if (grams === 0) return [];
  const minutes = grams / (basis.electricityGramsPerKwh * basis.ledWatts / 1000) * 60;
  const distance = grams / basis.carGramsPerMile * basis.metersPerMile;
  const charges = grams / basis.phoneGramsPerCharge;
  const led = minutes < 1 ? { value: minutes * 60, unit: 'detik' }
    : minutes < 60 ? { value: minutes, unit: 'menit' }
      : minutes < 1440 ? { value: minutes / 60, unit: 'jam' } : { value: minutes / 1440, unit: 'hari' };
  return [
    { id: 'led', icon: 'bulb', label: 'Menyalakan lampu LED 9 W', ...led, digits: 1 },
    { id: 'phone', icon: 'phone', label: 'Mengisi penuh baterai HP', value: charges, unit: 'kali', digits: charges < .1 ? 3 : charges < 1 ? 2 : 1 },
    { id: 'car', icon: 'car', label: 'Berkendara dengan mobil bensin', value: distance >= 1000 ? distance / 1000 : distance, unit: distance >= 1000 ? 'km' : 'm', digits: 1 }
  ];
}

export function dominantActivity(result) {
  return (result?.breakdown || []).reduce((largest, activity) => {
    if (activity.emission <= 0 || (largest && activity.emission <= largest.emission)) return largest;
    return activity;
  }, null);
}

// A comparison within the prototype's own parameters. This is a hypothetical
// change to a count, not a measurement of emissions avoided in the real world.
export function oneFewerRequest(result) {
  const activity = dominantActivity(result);
  if (!activity || !Number.isSafeInteger(activity.count) || activity.count < 1) return null;
  const delta = activity.factor;
  return {
    activity,
    before: result.total,
    after: Math.max(0, Math.round((result.total - delta) * 10) / 10),
    delta,
    percent: delta / result.total * 100
  };
}
