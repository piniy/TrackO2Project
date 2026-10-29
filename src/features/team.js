import { teamMembers } from '../content/team.js';

const smoothstep = value => {
  const progress = Math.max(0, Math.min(1, value));
  return progress * progress * (3 - 2 * progress);
};

export default () => ({
  members: teamMembers.map(member => ({ ...member })),
  activeIndex: null,

  init() {
    const view = this.$el.ownerDocument.defaultView;
    if (!view?.matchMedia) return;
    const section = this.$el;
    const portraits = section.querySelector('.team-portraits');
    const preference = view.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;
    const render = () => {
      frame = 0;
      const height = Math.max(1, view.innerHeight);
      const entrance = smoothstep((height * 1.3 - section.getBoundingClientRect().top) / (height * .4));
      // Clear by the time portraits reach the central reading area, at any screen size.
      const cleared = smoothstep((height * .94 - portraits.getBoundingClientRect().top) / (height * .42));
      const opacity = preference.matches ? 0 : entrance * (1 - cleared) * .78;
      section.style.setProperty('--team-smoke-opacity', String(opacity));
      section.style.setProperty('--team-smoke-rise', `${-100 * cleared}px`);
      section.classList.toggle('is-smoke-active', opacity > 0);
    };
    const schedule = () => {
      if (!frame) frame = view.requestAnimationFrame(render);
    };
    render();
    view.addEventListener('scroll', schedule, { passive: true });
    view.addEventListener('resize', schedule, { passive: true });
    preference.addEventListener('change', schedule);
    // Font and portrait layout changes can shift the point at which the smoke clears.
    const observer = new ResizeObserver(schedule);
    observer.observe(section);
    observer.observe(portraits);
    this._disposeSmoke = () => {
      view.removeEventListener('scroll', schedule);
      view.removeEventListener('resize', schedule);
      preference.removeEventListener('change', schedule);
      observer.disconnect();
      view.cancelAnimationFrame(frame);
    };
  },
  destroy() { this._disposeSmoke?.(); }
});
