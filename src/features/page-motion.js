// Every element stays visible by default; motion is progressive enhancement.
// Never animate the grid parent or the original sticky cinematic scene.
export const pageMotionTargets = [
  '.welcome-copy', '.welcome-visual', '.home-service', '.ed-data-panel',
  '.page-heading', '.learning-article', '.reference-card', '.game-panel',
  '.experience-copy', '.about-project', '.calculator-form',
  '.calculator-form .panel-heading', '.calculator-form .activity-row',
  '.calculator-form .form-actions', '.result-panel', '.result-panel > h2',
  '.result-total', '.ed-bar', '.ed-water-bar', '.breakdown-track > span'
].join(', ');

export function initPageMotion(root = document) {
  const doc = root.ownerDocument ?? root;
  const view = doc.defaultView;
  if (!view?.IntersectionObserver || !view.matchMedia) return () => {};

  const preference = view.matchMedia('(prefers-reduced-motion: reduce)');
  const elements = new Set();
  const states = new WeakMap();
  const running = new Set();
  let entrance;
  let distance;
  let disposed = false;
  let resultFrame = 0;

  const watchAnimation = animation => {
    running.add(animation);
    animation.finished.then(() => running.delete(animation), () => running.delete(animation));
    return animation;
  };
  const animate = (element, frames, timing) => {
    if (disposed || preference.matches || typeof element.animate !== 'function') return;
    for (const previous of element.getAnimations()) {
      if (running.has(previous)) previous.cancel();
    }
    try { return watchAnimation(element.animate(frames, { fill: 'backwards', ...timing })); }
    catch { /* An unsupported effect must never hide or block content. */ }
  };
  const reveal = (element, sequence = 0) => {
    const state = states.get(element);
    if (!state?.armed || !element.getBoundingClientRect().width || !element.getBoundingClientRect().height) return;
    if (view.getComputedStyle(element).visibility === 'hidden') return;
    state.armed = false;
    state.played = true;
    const row = element.matches('.activity-row');
    const rows = row ? [...element.parentElement.querySelectorAll('.activity-row')] : [];
    const index = row ? rows.indexOf(element) : sequence;
    const delay = row ? 150 + Math.max(0, index) * 105 : Math.min(sequence, 4) * 85;
    if (element.matches('.result-panel')) {
      // The result keeps its sticky geometry: reveal its paint, not its position.
      animate(element, [
        { opacity: .08, clipPath: 'inset(0 0 92% 0 round 22px)' },
        { opacity: 1, clipPath: 'inset(0 0 0% 0 round 22px)' }
      ], { duration: 950, delay: 180, easing: 'cubic-bezier(.16,1,.3,1)' });
    } else if (element.matches('.ed-bar, .ed-water-bar, .breakdown-track > span')) {
      animate(element, [
        { transform: 'scaleX(.015)', transformOrigin: 'left center', opacity: .35 },
        { transform: 'scaleX(1)', transformOrigin: 'left center', opacity: 1 }
      ], { duration: 950, delay, easing: 'cubic-bezier(.16,1,.3,1)' });
    } else {
      const child = row || element.matches('.panel-heading, .form-actions, .result-panel > h2, .result-total');
      animate(element, [
        { opacity: .1, transform: child ? 'translateY(24px)' : 'translateY(42px) scale(.975)' },
        { opacity: 1, transform: child ? 'translateY(0)' : 'translateY(0) scale(1)' }
      ], { duration: child ? 820 : 950, delay, easing: 'cubic-bezier(.16,1,.3,1)' });
    }
  };
  const collect = () => {
    for (const element of root.querySelectorAll(pageMotionTargets)) {
      if (elements.has(element) || element.closest('.prompt-journey, .math-explorer')) continue;
      elements.add(element);
      states.set(element, { armed: true, played: false });
      entrance?.observe(element);
      distance?.observe(element);
    }
  };
  const cancelMotion = () => {
    entrance?.disconnect(); distance?.disconnect();
    entrance = undefined; distance = undefined;
    view.cancelAnimationFrame(resultFrame);
    resultFrame = 0;
    for (const animation of running) animation.cancel();
    running.clear();
  };
  const configure = () => {
    cancelMotion();
    if (disposed || preference.matches) return;
    entrance = new view.IntersectionObserver(entries => {
      if (disposed || preference.matches) return;
      let sequence = 0;
      for (const entry of entries) if (entry.isIntersecting) reveal(entry.target, sequence++);
    }, { threshold: .08, rootMargin: '0px 0px -28px 0px' });
    // Rearm only when a section is well outside the viewport. Small scrolls do
    // not repeatedly animate a card that is still being read.
    distance = new view.IntersectionObserver(entries => {
      for (const entry of entries) {
        if (entry.isIntersecting) continue;
        const state = states.get(entry.target);
        if (state && !entry.target.matches('.welcome-copy, .welcome-visual')) state.armed = true;
      }
    }, { threshold: 0, rootMargin: '180px 0px 180px 0px' });
    collect();
    for (const element of elements) { entrance.observe(element); distance.observe(element); }
  };
  const onCalculate = () => {
    view.cancelAnimationFrame(resultFrame);
    resultFrame = view.requestAnimationFrame(() => {
      resultFrame = 0;
      if (disposed || preference.matches) return;
      collect();
      // New breakdown bars appear only after a valid calculation. Let their
      // widths visibly grow even when the result panel was already on screen.
      root.querySelectorAll('.breakdown-track > span').forEach((bar, index) => {
        const state = states.get(bar);
        if (state) state.armed = true;
        const rect = bar.getBoundingClientRect();
        if (rect.bottom > 0 && rect.top < view.innerHeight) reveal(bar, index);
      });
    });
  };
  const onStep = event => {
    const button = event.target?.closest?.('.stepper button');
    if (!button || !root.contains(button)) return;
    animate(button, [
      { transform: 'scale(1)' }, { transform: 'scale(.78)', offset: .35 }, { transform: 'scale(1)' }
    ], { duration: 300, easing: 'cubic-bezier(.2,.8,.2,1)' });
    const row = button.closest('.activity-row');
    if (row) animate(row, [{ backgroundColor: '#d8efdf' }, { backgroundColor: 'transparent' }], { duration: 650, easing: 'ease-out' });
  };
  const pause = () => cancelMotion();
  const resume = event => { if (event.persisted) configure(); };
  const dispose = () => {
    if (disposed) return;
    disposed = true; cancelMotion();
    preference.removeEventListener('change', configure);
    view.removeEventListener('pagehide', pause);
    view.removeEventListener('pageshow', resume);
    view.removeEventListener('tracko2:calculate', onCalculate);
    root.removeEventListener('click', onStep);
  };
  preference.addEventListener('change', configure);
  view.addEventListener('pagehide', pause);
  view.addEventListener('pageshow', resume);
  view.addEventListener('tracko2:calculate', onCalculate);
  root.addEventListener('click', onStep);
  configure();
  return dispose;
}
