import { inferenceTasks, studyCarbonIntensity, waterLocations, journeyStages, researchStudies, trainingWater, geminiMetrics, geminiEnergySegments, historicalWaterScenarios } from '../content/education-data.js';
import { formatLocaleNumber } from '../i18n/index.js';
import { equivalentActivities } from './result-insights.js';
import { comparisonBasis } from '../content/result-insights.js';

export function taskValue(task, metric) {
  if (!['energy', 'carbon'].includes(metric) || !inferenceTasks.some(item => item.id === task?.id && item.energy === task.energy)) {
    throw new RangeError('Task values require a Luccioni task and its energy or carbon metric.');
  }
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
  if (!waterLocations.some(item => item.id === location?.id && item.onsite === location.onsite && item.offsite === location.offsite && item.total === location.total)) {
    throw new RangeError('Request totals require a defined Li/GPT-3 location scenario.');
  }
  const requests = Number(count);
  if (!Number.isInteger(requests) || requests < 1 || requests > 100) throw new RangeError('Request count must be an integer between 1 and 100.');
  return { onsite: location.onsite * requests, offsite: location.offsite * requests, total: location.total * requests };
}

// Source selection exposes only its own controls and denominator.
// A median has no personal-total multiplication API.
export function studyView(id) {
  if (!Object.hasOwn(researchStudies, id)) throw new RangeError('Unknown research study.');
  return researchStudies[id];
}

export default () => ({
  tasks: [...inferenceTasks].sort((a, b) => b.energy - a.energy), locations: waterLocations, stages: journeyStages,
  metric: 'energy', study: 'li', selectedSegment: 'accelerators', selectedTask: 'image', historicalScenario: 'report', requests: 20,
  location: 'indonesia', stage: 0, playing: false, _timer: null,
  studies: researchStudies, training: trainingWater, gemini: geminiMetrics, segments: geminiEnergySegments, historical: historicalWaterScenarios,
  get activeStudy() { return studyView(this.study); },
  get activeSegment() { return this.segments.find(item => item.id === this.selectedSegment); },
  selectStudy(id) { studyView(id); this.study = id; },
  get activeTask() { return this.tasks.find(task => task.id === this.selectedTask); },
  get taskImage() {
    const file = ['image', 'object', 'image-classification', 'caption'].includes(this.selectedTask)
      ? 'image' : this.selectedTask === 'summary' ? 'summary' : this.selectedTask === 'text' ? 'writing' : 'chat';
    return `/assets/images/calculator/${file}.webp`;
  },
  get activeHistorical() { return this.historical.find(item => item.id === this.historicalScenario); },
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
  waterAmount(amount) { return amount < 1000 ? `${this.formatNumber(amount, 2)} mL` : `${this.formatNumber(amount / 1000, 2)} L`; },
  historicalAmount(amount) { return `${this.formatNumber(amount, Number.isInteger(amount) ? 0 : amount < 1 ? 2 : 1)} L`; },
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
