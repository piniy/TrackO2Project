import { activities } from '../content/activities.js';
import { estimate } from './calculation.js';

let mathRuntime;
const loadMath = () => mathRuntime ??= import('katex').then(module => module.default);
const sampleCounts = () => ({ chat: 10, summary: 3, longText: 1, image: 2 });
const mathNumber = (number, digits, locale) => new Intl.NumberFormat(locale === 'en' ? 'en-US' : 'id-ID', {
  minimumFractionDigits: digits, maximumFractionDigits: digits, useGrouping: false
}).format(number).replace(',', '{,}');

export const formulaMessages = {
  'Rumus estimasi emisi': 'Emission estimate formula',
  'Putar contoh perhitungan': 'Play the calculation example',
  'Putar ulang perhitungan': 'Replay the calculation',
  'Kembali ke rumus': 'Return to the formula',
  'Tutup penjelasan simbol': 'Close symbol explanation',
  'Jelaskan total estimasi E': 'Explain the total estimate E',
  'Jelaskan simbol penjumlahan': 'Explain the summation symbol',
  'Jelaskan jumlah aktivitas nᵢ': 'Explain activity count nᵢ',
  'Jelaskan faktor emisi fᵢ': 'Explain emission factor fᵢ',
  'Total estimasi': 'Total estimate',
  'Jumlahkan empat aktivitas': 'Add the four activities',
  'Jumlah aktivitas': 'Activity count',
  'Faktor emisi': 'Emission factor',
  'E adalah jumlah emisi dari seluruh aktivitas yang dihitung, dalam gram CO₂e.': 'E is the sum of emissions from all calculated activities, in grams of CO₂e.',
  'Σ menjumlahkan hasil perkalian setiap aktivitas, dari i = 1 sampai i = 4.': 'Σ adds the product for each activity, from i = 1 to i = 4.',
  'nᵢ adalah banyaknya permintaan pada aktivitas ke-i. Angkanya berasal dari isian kalkulator.': 'nᵢ is the number of requests for activity i. Its value comes from the calculator inputs.',
  'fᵢ adalah faktor emisi per permintaan untuk aktivitas ke-i. Setiap jenis aktivitas memiliki faktor tersendiri.': 'fᵢ is the emission factor per request for activity i. Each activity type has its own factor.',
  'Jumlah permintaan dikalikan faktor aktivitas ini untuk memperoleh kontribusinya pada total.': 'The request count is multiplied by this activity’s factor to obtain its contribution to the total.',
  'Kontribusi': 'Contribution',
  'Jumlah permintaan': 'Number of requests',
  'g CO₂e per permintaan': 'g CO₂e per request',
  'Nilai dari kalkulatormu': 'Values from your calculator',
  'Substitusi jumlah dan faktor': 'Substitute the counts and factors',
  'Mengalikan: {activity}': 'Multiplying: {activity}',
  'Menjumlahkan kontribusi setiap aktivitas': 'Adding each activity’s contribution',
  'Total: {amount} g CO₂e': 'Total: {amount} g CO₂e',
  'Contoh: {amount} g CO₂e': 'Example: {amount} g CO₂e',
  'Rumus belum dapat ditampilkan.': 'The formula could not be displayed.'
};

// Kept as a pure calculation helper so every animation frame follows estimate().
export function formulaExample(counts, selectedId = 'image', locale = 'id') {
  const result = estimate(counts);
  const selected = result.breakdown.find(item => item.id === selectedId) ?? result.breakdown[0];
  const terms = result.breakdown.map(item => {
    const product = `(${mathNumber(item.count, 0, locale)} \\times ${mathNumber(item.factor, 1, locale)})`;
    return item.id === selected.id ? `\\color{#347b57}{${product}}` : product;
  });
  const total = mathNumber(result.total, 2, locale);
  const expansion = `\\begin{aligned}E &= ${terms[0]} + ${terms[1]} \\\\ &\\quad + ${terms[2]} + ${terms[3]} \\\\ &= \\mathbf{${total}}\\;\\mathrm{g\\,CO_2e}\\end{aligned}`;
  return { result, selected, expansion };
}

export function formulaFrames(counts, locale = 'id') {
  const result = estimate(counts);
  return {
    result,
    products: result.breakdown.map(item => `${mathNumber(item.count, 0, locale)} \\times ${mathNumber(item.factor, 1, locale)}`),
    contributions: result.breakdown.map(item => mathNumber(item.emission, 2, locale)),
    total: `\\mathbf{${mathNumber(result.total, 2, locale)}}\\;\\mathrm{g\\,CO_2e}`
  };
}

const symbolCopy = {
  total: ['Total estimasi', 'E adalah jumlah emisi dari seluruh aktivitas yang dihitung, dalam gram CO₂e.'],
  sum: ['Jumlahkan empat aktivitas', 'Σ menjumlahkan hasil perkalian setiap aktivitas, dari i = 1 sampai i = 4.'],
  count: ['Jumlah aktivitas', 'nᵢ adalah banyaknya permintaan pada aktivitas ke-i. Angkanya berasal dari isian kalkulator.'],
  factor: ['Faktor emisi', 'fᵢ adalah faktor emisi per permintaan untuk aktivitas ke-i. Setiap jenis aktivitas memiliki faktor tersendiri.']
};

export default (mode = 'method') => ({
  activities, mode, counts: sampleCounts(), hasData: false, fromCalculator: false, phase: 'symbolic', playing: false,
  activeSymbol: null, selectedId: 'image', activeIndex: -1, resolvedThrough: -1, pending: false,
  mathError: false, visible: false, reduced: false,
  _run: 0, _revision: 0, _disposed: false, _waiters: new Set(),
  get locale() { return this.$store.i18n.locale; },
  get frames() { return formulaFrames(this.counts, this.locale); },
  get symbolTitle() {
    return this.activeSymbol === 'activity' ? this.t(activities.find(item => item.id === this.selectedId)?.title) : this.t(symbolCopy[this.activeSymbol]?.[0] || '');
  },
  get symbolDescription() {
    return this.t(this.activeSymbol === 'activity' ? 'Jumlah permintaan dikalikan faktor aktivitas ini untuk memperoleh kontribusinya pada total.' : symbolCopy[this.activeSymbol]?.[1] || '');
  },
  get inspectionRows() {
    if (this.activeSymbol === 'count' || this.activeSymbol === 'factor') return this.frames.result.breakdown;
    if (this.activeSymbol === 'activity') return this.frames.result.breakdown.filter(item => item.id === this.selectedId);
    return [];
  },
  get inspectedTotal() { return this.t(this.fromCalculator ? 'Total: {amount} g CO₂e' : 'Contoh: {amount} g CO₂e', { amount: this.format(this.frames.result.total, 2) }); },
  get caption() {
    if (this.phase === 'substitute') return this.t('Substitusi jumlah dan faktor');
    if (this.phase === 'products' && this.activeIndex >= 0) return this.t('Mengalikan: {activity}', { activity: this.t(activities[this.activeIndex].title) });
    if (this.phase === 'sum') return this.t('Menjumlahkan kontribusi setiap aktivitas');
    if (this.phase === 'total') return this.t('Total: {amount} g CO₂e', { amount: this.format(this.frames.result.total, 2) });
    return '';
  },
  t(source, values) { return this.$store.i18n.t(source, values); },
  format(number, digits = 1) { return new Intl.NumberFormat(this.locale === 'en' ? 'en-US' : 'id-ID', { minimumFractionDigits: digits, maximumFractionDigits: digits }).format(number); },
  inspect(symbol, id = null) {
    if (id) this.selectedId = id;
    this.activeSymbol = symbol;
  },
  closeInspector() { this.activeSymbol = null; },
  init() {
    this._root = this.$refs.surface.closest('.math-explorer');
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    this.reduced = media.matches;
    const receive = event => {
      try {
        const result = estimate(event.detail?.counts || {});
        this.cancelPlayback();
        this.counts = Object.fromEntries(result.breakdown.map(item => [item.id, item.count]));
        this.hasData = true;
        this.fromCalculator = true;
        this.phase = 'symbolic';
        this.activeSymbol = null;
        this.pending = true;
        this.$nextTick(() => {
          if (this.visible || this.reduced) this.play();
          else this.renderMath();
        });
      } catch { /* Invalid form submissions do not replace the last valid formula. */ }
    };
    const reset = () => { this.cancelPlayback(); this.counts = sampleCounts(); this.hasData = false; this.fromCalculator = false; this.pending = false; this.phase = 'symbolic'; this.activeSymbol = null; this.renderMath(); };
    const onMotion = () => {
      this.reduced = media.matches;
      if (this.reduced && (this.playing || this.pending)) { this.cancelPlayback(); this.phase = 'total'; this.pending = false; this.renderMath(); }
    };
    window.addEventListener('tracko2:calculate', receive);
    window.addEventListener('tracko2:reset', reset);
    media.addEventListener('change', onMotion);
    const observer = new IntersectionObserver(entries => {
      this.visible = entries.some(entry => entry.isIntersecting);
      if (this.visible && this.pending) this.play();
    }, { threshold: .12 });
    observer.observe(this._root);
    this.$watch('$store.i18n.locale', () => this.$nextTick(() => this.renderMath()));
    for (const key of ['phase', 'resolvedThrough', 'activeIndex']) this.$watch(key, () => this.$nextTick(() => this.renderMath()));
    this._dispose = () => {
      observer.disconnect();
      window.removeEventListener('tracko2:calculate', receive);
      window.removeEventListener('tracko2:reset', reset);
      media.removeEventListener('change', onMotion);
    };
    if (this.mode !== 'result') this.$nextTick(() => this.renderMath());
  },
  async renderMath() {
    if (this.mode === 'result' && !this.hasData) return;
    const revision = ++this._revision;
    try {
      const katex = await loadMath();
      if (this._disposed || revision !== this._revision) return;
      const options = { displayMode: false, output: 'htmlAndMathml', throwOnError: true, strict: 'error', trust: false };
      const symbols = { total: 'E', equals: '=', sum: String.raw`\displaystyle\sum_{i=1}^{4}`, count: 'n_i', factor: 'f_i' };
      this._root.querySelectorAll('[data-math-symbol]').forEach(element => katex.render(symbols[element.dataset.mathSymbol], element, options));
      const frames = this.frames;
      this._root.querySelectorAll('[data-math-product]').forEach(element => {
        const index = Number(element.dataset.mathProduct);
        const expression = index <= this.resolvedThrough ? frames.contributions[index] : `(${frames.products[index]})`;
        katex.render(expression, element, options);
      });
      this._root.querySelectorAll('[data-math-total]').forEach(element => katex.render(frames.total, element, options));
      const accessible = this._root.querySelector('[data-math-accessible]');
      if (accessible) katex.render(this.phase === 'symbolic' ? String.raw`E=\sum_{i=1}^{4}n_i f_i` : this.phase === 'total' ? `E=${frames.total}` : formulaExample(this.counts, this.selectedId, this.locale).expansion, accessible, options);
      this.mathError = false;
    } catch { if (!this._disposed && revision === this._revision) this.mathError = true; }
  },
  wait(duration, run) {
    if (this._disposed || run !== this._run) return Promise.resolve(false);
    return new Promise(resolve => {
      const waiter = { id: null, resolve };
      waiter.id = window.setTimeout(() => { this._waiters.delete(waiter); resolve(!this._disposed && run === this._run); }, duration);
      this._waiters.add(waiter);
    });
  },
  cancelPlayback() {
    this._run++;
    for (const waiter of this._waiters) { window.clearTimeout(waiter.id); waiter.resolve(false); }
    this._waiters.clear();
    this.playing = false;
    this.activeIndex = -1;
  },
  async play() {
    this.cancelPlayback();
    const run = this._run;
    this.activeSymbol = null;
    this.pending = false;
    this.resolvedThrough = -1;
    this.hasData = true;
    if (this.reduced) { this.resolvedThrough = 3; this.phase = 'total'; this.renderMath(); return; }
    this.playing = true;
    this.phase = 'substitute';
    await this.$nextTick();
    await this.renderMath();
    if (!await this.wait(560, run)) return;
    this.phase = 'products';
    for (let index = 0; index < activities.length; index++) {
      this.activeIndex = index;
      if (!await this.wait(460, run)) return;
      this.resolvedThrough = index;
      if (!await this.wait(220, run)) return;
    }
    this.activeIndex = -1;
    this.phase = 'sum';
    if (!await this.wait(700, run)) return;
    this.phase = 'total';
    this.playing = false;
  },
  resetView() { this.cancelPlayback(); this.pending = false; this.phase = 'symbolic'; this.resolvedThrough = -1; this.activeSymbol = null; this.renderMath(); },
  destroy() { this._disposed = true; this._revision++; this.cancelPlayback(); this._dispose?.(); }
});
