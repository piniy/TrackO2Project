import { teamMembers } from '../content/team.js';

export default () => ({
  members: teamMembers.map(member => ({ ...member })),
  activeIndex: 0,
  _scrollTimer: null,

  get activeMember() { return this.members[this.activeIndex]; },

  selectProfile(index, moveFocus = false) {
    if (!Number.isInteger(index) || index < 0 || index >= this.members.length) return;
    this.activeIndex = index;
    clearTimeout(this._scrollTimer);
    this.$nextTick(() => {
      if (index !== this.activeIndex) return;
      const row = this.$refs.profileRow;
      const button = row?.querySelector(`[data-profile-index="${index}"]`);
      if (moveFocus) button?.focus({ preventScroll: true });
      const view = row?.ownerDocument?.defaultView;
      if (!button || !view?.matchMedia('(max-width: 760px)').matches) return;
      const reduced = view.matchMedia('(prefers-reduced-motion: reduce)').matches;
      // Centre the final expanded width, without moving the document vertically.
      this._scrollTimer = setTimeout(() => {
        const left = button.offsetLeft - (row.clientWidth - button.offsetWidth) / 2;
        row.scrollTo({ left, behavior: reduced ? 'auto' : 'smooth' });
      }, reduced ? 0 : 620);
    });
  },

  handleProfileKeydown(event) {
    if (event.altKey || event.ctrlKey || event.metaKey) return;
    const last = this.members.length - 1;
    const destinations = {
      ArrowRight: (this.activeIndex + 1) % this.members.length,
      ArrowLeft: (this.activeIndex + last) % this.members.length,
      Home: 0,
      End: last
    };
    if (!Object.hasOwn(destinations, event.key)) return;
    event.preventDefault();
    this.selectProfile(destinations[event.key], true);
  },

  destroy() { clearTimeout(this._scrollTimer); }
});
