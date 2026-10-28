import { gameCards, assessChoice } from '../content/game-cards.js';
export default () => ({
  cards: gameCards, index: 0, selected: null, score: 0, finished: false,
  get card() { return this.cards[this.index]; },
  get isLast() { return this.index === this.cards.length - 1; },
  get progress() { return (this.index + (this.selected !== null ? 1 : 0)) / this.cards.length * 100; },
  get feedback() { return this.selected === null ? null : assessChoice(this.card, this.selected); },
  choose(index) { if (this.selected !== null || this.finished) return; this.selected = index; if (this.feedback.correct) this.score++; },
  next() {
    if (this.selected === null) return;
    if (this.isLast) { this.finished = true; this.$nextTick(() => this.$refs.finish.focus()); return; }
    this.index++; this.selected = null; this.$nextTick(() => this.$refs.question.focus({ preventScroll: true }));
  },
  restart() { this.index = 0; this.selected = null; this.score = 0; this.finished = false; this.$nextTick(() => this.$refs.question.focus({ preventScroll: true })); }
});
