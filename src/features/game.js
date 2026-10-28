import { gameCards, assessChoice } from '../content/game-cards.js';

function focusAfterRender(game, target) {
  game.$nextTick?.(() => {
    const element = game.$refs?.[target];
    element?.focus({ preventScroll: true });
    const view = element?.ownerDocument?.defaultView;
    if (!view) return;
    const bounds = element.getBoundingClientRect();
    const headerBottom = element.ownerDocument.querySelector('.site-header')?.getBoundingClientRect().bottom ?? 0;
    if (bounds.top < headerBottom + 20 || bounds.bottom > view.innerHeight - 20) {
      element.scrollIntoView({ block: 'start', behavior: 'instant' });
    }
  });
}

export default () => ({
  cards: gameCards, index: 0, selected: null, score: 0, started: false, finished: false, answers: [],
  get card() { return this.cards[this.index]; },
  get isLast() { return this.index === this.cards.length - 1; },
  get answeredCount() { return this.answers.length; },
  get progress() { return this.answeredCount / this.cards.length * 100; },
  get feedback() { return this.selected === null ? null : assessChoice(this.card, this.selected); },
  get review() {
    return this.answers.map((selected, index) => ({
      card: this.cards[index], index, selected, option: this.cards[index].options[selected],
      ...assessChoice(this.cards[index], selected)
    }));
  },
  start() {
    if (this.started) return;
    this.started = true;
    focusAfterRender(this, 'question');
  },
  choose(index) {
    if (!this.started || this.finished || this.selected !== null || !Number.isInteger(index) || !this.card.options[index]) return;
    this.selected = index;
    this.answers.push(index);
    if (this.feedback.correct) this.score++;
  },
  next() {
    if (!this.started || this.finished || this.selected === null) return;
    if (this.isLast) {
      this.finished = true;
      focusAfterRender(this, 'finish');
      return;
    }
    this.index++;
    this.selected = null;
    focusAfterRender(this, 'question');
  },
  restart() {
    this.index = 0;
    this.selected = null;
    this.score = 0;
    this.started = true;
    this.finished = false;
    this.answers = [];
    focusAfterRender(this, 'question');
  }
});
