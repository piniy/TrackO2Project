import { estimate } from './calculation.js';
import { formatLocaleNumber } from '../i18n/index.js';
import { equivalentActivities, dominantActivity } from './result-insights.js';
import { activityAdvice, comparisonBasis } from '../content/result-insights.js';

export default () => ({
  counts: { chat: 0, summary: 0, longText: 0, image: 0 },
  result: null, error: '', dirty: false,
  resultStep: 0,
  resultTitles: ['Rincian aktivitas', 'Seperti aktivitas apa?', 'Langkah berikutnya'],
  comparisonSource: comparisonBasis.source,
  get equivalents() { return equivalentActivities(this.result?.total || 0); },
  get mainActivity() { return dominantActivity(this.result); },
  get advice() { return activityAdvice[this.mainActivity?.id] || null; },
  init() {
    let frame = 0;
    const observer = new ResizeObserver(() => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => this.measureResultSlide());
    });
    this.$nextTick(() => {
      observer.observe(this.$refs.slides);
      this.$refs.slides.querySelectorAll('.result-slide').forEach(slide => observer.observe(slide));
    });
    this._dispose = () => { observer.disconnect(); cancelAnimationFrame(frame); };
  },
  destroy() { this._dispose?.(); },
  measureResultSlide() {
    const slides = this.$refs.slides;
    if (!this.result || !slides.clientWidth) return;
    const height = Math.ceil(slides.children[this.resultStep].getBoundingClientRect().height);
    if (height > 0) slides.style.height = `${height}px`;
    if (this._resultWidth !== slides.clientWidth) {
      this._resultWidth = slides.clientWidth;
      slides.scrollTo({ left: slides.clientWidth * this.resultStep, behavior: 'auto' });
    }
  },
  goToResult(index) {
    if (!this.result) return;
    this.resultStep = Math.max(0, Math.min(2, index));
    this.$nextTick(() => {
      this.measureResultSlide();
      this.$refs.slides.scrollTo({ left: this.$refs.slides.clientWidth * this.resultStep, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
    });
  },
  syncResultSlide() {
    const slides = this.$refs.slides;
    if (!this.result || !slides.clientWidth) return;
    this.resultStep = Math.max(0, Math.min(2, Math.round(slides.scrollLeft / slides.clientWidth)));
    this.measureResultSlide();
  },
  formatNumber(number, digits = 1) { return formatLocaleNumber(number, digits, this.$store.i18n.locale); },
  adjust(id, delta) { this.counts[id] = Math.max(0, Math.min(10000, (Number(this.counts[id]) || 0) + delta)); this.dirty = true; },
  calculate() {
    try {
      const result = estimate(this.counts);
      if (!result.count) { this.error = 'Isi minimal satu aktivitas untuk melihat estimasi.'; return; }
      this.result = result; this.error = ''; this.dirty = false; this.resultStep = 0;
      this.$nextTick(() => {
        this.measureResultSlide();
        this.$refs.slides.scrollTo({ left: 0, behavior: 'auto' });
        this.$refs.result.focus({ preventScroll: true });
      });
    } catch (error) { this.error = error.message; }
  },
  example() { this.counts = { chat: 10, summary: 3, longText: 1, image: 2 }; this.calculate(); },
  reset() { this.counts = { chat: 0, summary: 0, longText: 0, image: 0 }; this.result = null; this.error = ''; this.dirty = false; this.resultStep = 0; }
});
