import { inferenceTasks, studyCarbonIntensity, waterLocations, journeyStages } from '../content/education-data.js';
import { formatLocaleNumber } from '../i18n/index.js';
import { equivalentActivities } from './result-insights.js';
import { comparisonBasis } from '../content/result-insights.js';

export function taskValue(task, metric) {
  return task.energy * (metric === 'carbon' ? studyCarbonIntensity : 1);
}

// Each chart value covers 1,000 study inferences. Carbon comparisons reuse the
// calculator's EPA reference; energy comparisons use the explicit LED wattage.
export function taskAnalogy(task, metric) {
  if (metric === 'carbon') return equivalentActivities(taskValue(task, 'carbon')).find(item => item.id === 'phone');
  const hours = task.energy / (comparisonBasis.ledWatts / 1000);
  return hours < 1
    ? { value: hours * 60, unit: 'menit', digits: 1 }
    : hours < 24 ? { value: hours, unit: 'jam', digits: 1 }
      : { value: hours / 24, unit: 'hari', digits: 1 };
}

// Zero is not on a logarithmic scale. All study values here are above 0.001 kWh.
export function taskBarWidth(task) {
  return Math.max(0, Math.min(100, (Math.log10(task.energy) + 3) / 4 * 100));
}

export function waterForRequests(location, count) {
  const requests = Number(count);
  if (!Number.isInteger(requests) || requests < 1 || requests > 100) throw new RangeError('Request count must be an integer between 1 and 100.');
  return { onsite: location.onsite * requests, offsite: location.offsite * requests, total: location.total * requests };
}

export default () => ({
  tasks: inferenceTasks, locations: waterLocations, stages: journeyStages,
  metric: 'carbon', selectedTask: 'image', model: 'gpt3', requests: 20,
  location: 'indonesia', stage: 0, playing: false, _timer: null,
  get activeTask() { return this.tasks.find(task => task.id === this.selectedTask); },
  get analogy() { return taskAnalogy(this.activeTask, this.metric); },
  get analogyText() {
    const values = { amount: this.formatNumber(this.analogy.value, this.analogy.digits), unit: this.$store.i18n.t(this.analogy.unit) };
    return this.$store.i18n.t(this.metric === 'carbon' ? 'Sekitar {amount} kali mengisi penuh baterai HP.' : 'Setara energi LED 9 W yang menyala selama {amount} {unit}.', values);
  },
  comparisonSource: comparisonBasis.source,
  get activeLocation() { return this.locations.find(location => location.id === this.location); },
  get water() { return waterForRequests(this.activeLocation, Number(this.requests)); },
  get unit() { return this.metric === 'carbon' ? 'g CO₂e' : 'kWh'; },
  get axis() { return [0.001, 0.01, 0.1, 1, 10].map(energy => this.formatNumber(energy * (this.metric === 'carbon' ? studyCarbonIntensity : 1), this.metric === 'carbon' ? (energy < 0.01 ? 1 : 0) : (energy < 1 ? Math.abs(Math.log10(energy)) : 0))); },
  formatNumber(value, digits = 2) { return formatLocaleNumber(value, digits, this.$store.i18n.locale); },
  value(task) { return taskValue(task, this.metric); },
  barWidth(task) { return `${taskBarWidth(task)}%`; },
  waterWidth(location) { return `${location.total / 50 * 100}%`; },
  waterAmount(amount) { return amount < 1000 ? `${this.formatNumber(amount, 1)} mL` : `${this.formatNumber(amount / 1000, 2)} L`; },
  selectStage(index) { this.stopJourney(); this.stage = index; },
  playJourney() {
    this.stopJourney(); this.stage = 0;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { this.stage = 3; return; }
    this.playing = true;
    this._timer = window.setInterval(() => {
      this.stage += 1;
      if (this.stage === 3) this.stopJourney();
    }, 1300);
  },
  stopJourney() { window.clearInterval(this._timer); this._timer = null; this.playing = false; },
  destroy() { this.stopJourney(); }
});
