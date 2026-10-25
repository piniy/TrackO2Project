import { estimate } from './calculation.js';
import { formatLocaleNumber } from '../i18n/index.js';
import { equivalentActivities, dominantActivity, oneFewerRequest } from './result-insights.js';
import { activityAdvice, comparisonBasis } from '../content/result-insights.js';
import { buildCalculatorUrl, parseCalculatorHandoff } from './calculator-handoff.js';

export default (mode = 'full') => ({
  mode, trialResultUrl: './kalkulator.html',
  counts: { chat: 0, summary: 0, longText: 0, image: 0 },
  result: null, error: '', dirty: false, displayTotal: 0,
  _calculationRevision: 0,
  resultStep: 0,
  showScenario: false,
  resultTitles: ['Rincian aktivitas', 'Analogi emisi', 'Saran penggunaan AI'],
  comparisonSource: comparisonBasis.source,
  get equivalents() { return equivalentActivities(this.result?.total || 0); },
  get mainActivity() { return dominantActivity(this.result); },
  get scenario() { return oneFewerRequest(this.result); },
  get advice() { return activityAdvice[this.mainActivity?.id] || null; },
  init() {
    if (this.mode === 'trial') {
      this._dispose = () => { if (this.$refs.trialDialog?.open) this.$refs.trialDialog.close(); };
      return;
    }
    let frame = 0;
    let totalFrame = 0;
    let totalPulse;
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const cancelTotal = () => {
      cancelAnimationFrame(totalFrame);
      totalFrame = 0;
      totalPulse?.cancel();
      totalPulse = undefined;
    };
    this._cancelTotal = cancelTotal;
    this._animateTotal = target => {
      cancelTotal();
      if (motion.matches) { this.displayTotal = target; return; }
      const from = this.displayTotal;
      let started;
      const tick = timestamp => {
        started ??= timestamp;
        const progress = Math.min(1, (timestamp - started) / 1000);
        this.displayTotal = from + (target - from) * (1 - (1 - progress) ** 3);
        if (progress < 1) totalFrame = requestAnimationFrame(tick);
        else { this.displayTotal = target; totalFrame = 0; }
      };
      totalFrame = requestAnimationFrame(tick);
      try {
        totalPulse = this.$refs.result.querySelector('.result-total strong')?.animate([
          { transform: 'translateY(12px) scale(.96)', opacity: .35, textShadow: '0 0 0 transparent' },
          { transform: 'translateY(-2px) scale(1.035)', opacity: 1, textShadow: '0 0 22px #8fbd7860', offset: .65 },
          { transform: 'translateY(0) scale(1)', opacity: 1, textShadow: '0 0 0 transparent' }
        ], { duration: 1000, easing: 'cubic-bezier(.2,.7,.2,1)' });
      } catch { /* The exact result remains available if visual motion fails. */ }
    };
    const onMotionChange = () => {
      if (!motion.matches) return;
      cancelTotal();
      this.displayTotal = this.result?.total || 0;
    };
    motion.addEventListener('change', onMotionChange);
    const observer = new ResizeObserver(() => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => this.measureResultSlide());
    });
    this.$nextTick(() => {
      observer.observe(this.$refs.slides);
      this.$refs.slides.querySelectorAll('.result-slide').forEach(slide => observer.observe(slide));
    });
    this._dispose = () => {
      observer.disconnect(); cancelAnimationFrame(frame); cancelTotal();
      motion.removeEventListener('change', onMotionChange);
    };
    const handoff = parseCalculatorHandoff(window.location.search);
    if (handoff) {
      this.counts = handoff;
      this.$nextTick(() => this.calculate());
    }
  },
  destroy() { this._calculationRevision++; this._dispose?.(); },
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
      if (this.mode === 'trial') {
        this.error = ''; this.dirty = false;
        this.trialResultUrl = buildCalculatorUrl(this.counts);
        this.$nextTick(() => {
          if (!this.$refs.trialDialog.open) this.$refs.trialDialog.showModal();
        });
        return;
      }
      const revision = ++this._calculationRevision;
      this.result = result; this.error = ''; this.dirty = false; this.resultStep = 0; this.showScenario = false;
      this.$nextTick(() => {
        if (revision !== this._calculationRevision) return;
        this.measureResultSlide();
        this.$refs.slides.scrollTo({ left: 0, behavior: 'auto' });
        this.$refs.result.focus({ preventScroll: true });
        this._animateTotal?.(result.total);
        window.dispatchEvent(new CustomEvent('tracko2:calculate', { detail: { counts: Object.fromEntries(result.breakdown.map(item => [item.id, item.count])) } }));
      });
    } catch (error) { this.error = error.message; }
  },
  example() {
    this.counts = { chat: 10, summary: 3, longText: 1, image: 2 };
    if (this.mode === 'trial') { this.error = ''; this.dirty = true; }
    else this.calculate();
  },
  closeTrial() {
    if (this.$refs.trialDialog?.open) this.$refs.trialDialog.close();
    this.$refs.trialSubmit?.focus({ preventScroll: true });
  },
  onTrialBackdrop(event) {
    const dialog = this.$refs.trialDialog;
    if (event.target !== dialog) return;
    const bounds = dialog.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) this.closeTrial();
  },
  reset() {
    if (this.mode === 'trial') this.closeTrial();
    this._calculationRevision++;
    this._cancelTotal?.(); this.displayTotal = 0;
    this.counts = { chat: 0, summary: 0, longText: 0, image: 0 }; this.result = null; this.error = ''; this.dirty = false; this.resultStep = 0; this.showScenario = false;
    window.dispatchEvent(new CustomEvent('tracko2:reset'));
  }
});
