const clamp = value => Math.max(0, Math.min(1, value));
const ease = value => value < .5 ? 4 * value ** 3 : 1 - (-2 * value + 2) ** 3 / 2;
const cameraFrames = [
  [0, 180, 176, 2.15], [.15, 180, 176, 2.15],
  [.23, 470, 180, 1], [.34, 868, 177, 1.65], [.44, 868, 177, 1.65],
  [.53, 1210, 178, 1], [.61, 1575, 179, 2.3], [.68, 1575, 179, 2.3],
  [.77, 1940, 170, .95], [.87, 2331, 191, 1.9], [1, 2331, 191, 2.1]
];
const routes = ['M310 190C470 140 600 240 760 185', 'M986 178H1510', 'M1632 178C1820 110 1960 110 2248 170'];
const points = [
  [[310, 190], [470, 140], [600, 240], [760, 185]],
  [[986, 178], [1160, 178], [1336, 178], [1510, 178]],
  [[1632, 178], [1820, 110], [1960, 110], [2248, 170]]
];
const flights = [[.15, .34], [.44, .61], [.68, .87]];

export function getCameraFrame(progress) {
  const p = clamp(progress);
  const index = Math.max(1, cameraFrames.findIndex(frame => frame[0] >= p));
  const start = cameraFrames[index - 1];
  const end = cameraFrames[index];
  const t = ease(clamp((p - start[0]) / (end[0] - start[0])));
  return { x: start[1] + (end[1] - start[1]) * t, y: start[2] + (end[2] - start[2]) * t, zoom: start[3] + (end[3] - start[3]) * t };
}

export function getJourneyState(sectionTop, sectionHeight, sceneHeight, stickyTop) {
  const travel = Math.max(1, sectionHeight - sceneHeight);
  const progress = clamp((stickyTop - sectionTop) / travel);
  const stage = Math.min(3, Math.floor(progress * 4));
  return { progress, stage, localProgress: clamp(progress * 4 - stage) };
}

export default () => ({
  progress: 0, stage: 0, localProgress: 0, enhanced: false, compact: false, typedCount: 0,
  get cameraTransform() {
    if (!this.enhanced) return '';
    const camera = getCameraFrame(this.progress);
    const zoom = this.compact ? camera.zoom * 1.04 : camera.zoom;
    return `translate(${(this.compact ? 300 : 560) - camera.x * zoom} ${(this.compact ? 260 : 180) - camera.y * zoom}) scale(${zoom})`;
  },
  get burstPhase() { return clamp((this.progress - .74) / .14); },
  get burstOpacity() { return this.enhanced ? Math.sin(this.burstPhase * Math.PI) * .9 : 0; },
  get emissionReveal() { return this.enhanced ? clamp((this.progress - .8) / .07) : 1; },
  get promptLines() { return [this.$store.i18n.t('Bantu ringkas'), this.$store.i18n.t('materi ini.')]; },
  // The existing 23 typing steps cover the complete text in either language.
  get promptCharacters() { return Math.ceil(this.typedCount / 23 * this.promptLines.join('').length); },
  promptLine(index) {
    const offset = index === 0 ? 0 : this.promptLines[0].length;
    return this.promptLines[index].slice(0, Math.max(0, this.promptCharacters - offset));
  },
  get cursorX() { const length = this.promptLines[0].length; return 52 + (this.promptCharacters <= length ? this.promptCharacters : this.promptCharacters - length) * 7.1; },
  get cursorY() { return this.promptCharacters <= this.promptLines[0].length ? 62 : 81; },
  init() {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const short = window.matchMedia('(max-height: 560px)');
    const mobile = window.matchMedia('(max-width: 720px)');
    let frame = 0;
    let typeTimer = 0;
    let firstTypingStarted = false;
    const startTyping = () => {
      clearInterval(typeTimer);
      if (!this.enhanced) { this.typedCount = 23; return; }
      this.typedCount = 0;
      typeTimer = setInterval(() => {
        if (!this.enhanced || this.stage !== 0) this.typedCount = 23;
        else this.typedCount = Math.min(23, this.typedCount + 1);
        if (this.typedCount === 23) clearInterval(typeTimer);
      }, 48);
    };
    this._startTyping = startTyping;
    const update = () => {
      frame = 0;
      if (!this.enhanced) return;
      const section = this.$el.getBoundingClientRect();
      const scene = this.$refs.scene;
      const state = getJourneyState(section.top, section.height, scene.offsetHeight, parseFloat(getComputedStyle(scene).top) || 0);
      this.progress = state.progress; this.stage = state.stage; this.localProgress = state.localProgress;
      this.$el.style.setProperty('--journey-progress', this.progress);
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    const configure = () => {
      this.compact = mobile.matches;
      this.enhanced = !reduced.matches && !short.matches;
      this.$el.style.setProperty('--journey-header', `${document.querySelector('.site-header')?.offsetHeight || 0}px`);
      if (!this.enhanced) { this.progress = 1; this.stage = 3; this.localProgress = 1; this.typedCount = 23; clearInterval(typeTimer); }
      this.$nextTick(schedule);
    };
    [reduced, short, mobile].forEach(query => query.addEventListener('change', configure));
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', configure, { passive: true });
    const observer = new ResizeObserver(schedule);
    observer.observe(this.$refs.scene);
    const entrance = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting && entry.intersectionRatio >= .7) && !firstTypingStarted && this.enhanced) {
        firstTypingStarted = true;
        startTyping();
      }
    }, { threshold: .7 });
    entrance.observe(this.$refs.scene);
    configure();
    if (!this.enhanced) startTyping();
    this._dispose = () => {
      cancelAnimationFrame(frame); clearInterval(typeTimer); observer.disconnect(); entrance.disconnect();
      window.removeEventListener('scroll', schedule); window.removeEventListener('resize', configure);
      [reduced, short, mobile].forEach(query => query.removeEventListener('change', configure));
    };
  },
  destroy() { this._dispose?.(); },
  route(index) { return this.enhanced ? clamp((this.progress - flights[index][0]) / (flights[index][1] - flights[index][0])) : 1; },
  connectionPath(index) {
    if (this.enhanced) return routes[index];
    return this.compact
      ? ['M250 112H330', 'M445 205V278', 'M385 344H260'][index]
      : ['M285 190C330 190 330 180 385 180', 'M610 178H718', 'M840 178C865 178 875 170 913 170'][index];
  },
  nodeTransform(name) {
    if (this.enhanced) return { prompt: 'translate(60 100)', servers: 'translate(760 65)', electricity: 'translate(1510 120)', emissions: 'translate(2230 80)' }[name];
    return this.compact
      ? { prompt: 'translate(20 35) scale(.9)', servers: 'translate(330 10) scale(.9)', electricity: 'translate(372 280) scale(.9)', emissions: 'translate(40 278) scale(.95)' }[name]
      : { prompt: 'translate(35 105)', servers: 'translate(385 65)', electricity: 'translate(718 120)', emissions: 'translate(895 80)' }[name];
  },
  signal(index, offset = 0) {
    const t = clamp(this.route(index) - offset);
    const p = points[index];
    const coord = axis => (1 - t) ** 3 * p[0][axis] + 3 * (1 - t) ** 2 * t * p[1][axis] + 3 * (1 - t) * t ** 2 * p[2][axis] + t ** 3 * p[3][axis];
    return { x: coord(0), y: coord(1), opacity: this.enhanced && t > 0 && t < 1 ? 1 : 0 };
  },
  goTo(index) {
    if (!this.enhanced) return;
    const scene = this.$refs.scene;
    const stickyTop = parseFloat(getComputedStyle(scene).top) || 0;
    const travel = Math.max(1, this.$el.offsetHeight - scene.offsetHeight);
    const fraction = [0, .38, .64, .94][index];
    if (index === 0) this._startTyping?.();
    window.scrollTo({ top: window.scrollY + this.$el.getBoundingClientRect().top - stickyTop + travel * fraction, behavior: 'smooth' });
  }
});
