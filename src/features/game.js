import { games, gameSources } from '../content/game-cards.js';
import { evaluateRound, summarizeAnswers, formatQuantity, formatWh, formatWater, durationParts } from './game-math.js';
import { translate } from '../i18n/index.js';

function focusAfterRender(game, target) {
  // Capture while the invoking button is still connected. Alpine's $root magic
  // is relative to that button, which keyed round replacement will remove.
  const root = game.$root;
  game.$nextTick?.(() => {
    // Keyed Alpine templates can clean up an old x-ref after its replacement
    // mounts. Resolve the rendered heading first so advancing keeps focus.
    const element = root?.querySelector(`[x-ref="${target}"]`) ?? game.$refs?.[target];
    element?.focus({ preventScroll: true });
    const view = element?.ownerDocument?.defaultView;
    if (!view) return;
    const bounds = element.getBoundingClientRect();
    const headerBottom = element.ownerDocument.querySelector('.site-header')?.getBoundingClientRect().bottom ?? 0;
    if (bounds.top < headerBottom + 20 || bounds.bottom > view.innerHeight - 20) element.scrollIntoView({ block: 'start', behavior: 'instant' });
  });
}
export default () => ({
  games, activeGameId: null, phase: 'hub', roundIndex: 0, selectedOptionId: null, answers: [],
  get locale() { return this.$store?.i18n?.locale ?? 'id'; },
  t(text, values) { return translate(text, this.locale, values); },
  num(value, digits = 1) { return formatQuantity(value, this.locale, digits); },
  wh(value) { return formatWh(value, this.locale); },
  water(value) { return formatWater(value, this.locale); },
  duration(minutes) {
    const parts = durationParts(minutes);
    if (parts.lessThanMinute) return this.t('kurang dari 1 menit');
    if (parts.hours) return this.t('{hours} jam {minutes} menit', parts);
    return this.t('{minutes} menit', parts);
  },
  get activeGame() { return this.games.find(game => game.id === this.activeGameId) ?? null; },
  get rounds() { return this.activeGame?.rounds ?? []; },
  get round() { return this.rounds[this.roundIndex] ?? null; },
  get isLast() { return this.roundIndex === this.rounds.length - 1; },
  get progress() { return this.rounds.length ? this.answers.length / this.rounds.length * 100 : 0; },
  get totals() { return summarizeAnswers(this.answers); },
  get outcome() { return this.phase === 'reveal' ? this.answers.at(-1)?.outcome : null; },
  get source() { return this.round ? gameSources[this.round.sourceId] : null; },
  sourceFor(round) { return gameSources[round.sourceId]; },
  optionText(round, optionId) {
    const option = round.options.find(item => item.id === optionId);
    return option ? (round.type === 'water' ? this.water(option.ml) : this.t(option.text)) : '';
  },
  context(round) {
    return round.type === 'water' ? this.t('GPT-3 · {location} · {count} permintaan', { location: this.t(round.location.label), count: this.num(round.requestCount, 0) }) : this.t(round.context);
  },
  feedback(outcome, round) {
    if (round.type === 'choice') {
      if (!outcome.meetsGoal) return this.t('Kebutuhan tugas belum terpenuhi.');
      if (outcome.correct) return this.t('Pas dengan kebutuhanmu!');
      return this.t('Tugas terpenuhi. Masih bisa lebih terarah.');
    }
    return this.t(outcome.correct ? 'Tebakanmu tepat!' : 'Jumlahnya mungkin mengejutkan.');
  },
  amountSummary(round, outcome) {
    if (round.type === 'energy') return this.wh(outcome.leftWh) + ' / ' + this.wh(outcome.rightWh);
    if (round.type === 'water') return '≈ ' + this.water(outcome.totalMl) + ' · ' + this.t('{count} botol × 500 mL', { count: this.num(outcome.bottles, 2) });
    if (outcome.savedWh !== null) return this.wh(outcome.savedWh) + ' · ' + this.t('dihemat dalam simulasi');
    return this.t(outcome.reason === 'inadequate' ? 'Tidak dihitung: kebutuhan tugas belum terpenuhi.' : 'Skenario kualitatif · tanpa angka energi');
  },
  get review() {
    return this.answers.map(answer => ({ ...answer, round: this.rounds.find(round => round.id === answer.roundId) }));
  },
  get memorable() {
    const rows = this.review;
    if (this.activeGameId === 'energy') {
      const missed = rows.filter(row => !row.outcome.correct);
      return [...(missed.length ? missed : rows)].sort((a, b) => b.outcome.ratio - a.outcome.ratio)[0];
    }
    const under = rows.filter(row => row.outcome.chosenMl < row.outcome.totalMl);
    return [...(under.length ? under : rows)].sort((a, b) => b.outcome.totalMl / b.outcome.chosenMl - a.outcome.totalMl / a.outcome.chosenMl)[0];
  },
  get announcement() {
    if (!this.outcome) return '';
    return this.feedback(this.outcome, this.round) + ' ' + this.t('Jawaban terbaik:') + ' ' + this.optionText(this.round, this.outcome.correctOptionId) + '. ' + this.amountSummary(this.round, this.outcome);
  },
  start(gameId) {
    if (!this.games.some(game => game.id === gameId)) return;
    this.activeGameId = gameId;
    this.roundIndex = 0;
    this.selectedOptionId = null;
    this.answers = [];
    this.phase = 'question';
    focusAfterRender(this, 'question');
  },
  select(optionId) {
    if (this.phase !== 'question' || !this.round?.options.some(option => option.id === optionId)) return;
    this.selectedOptionId = optionId;
  },
  confirm() {
    if (this.phase !== 'question' || !this.round?.options.some(option => option.id === this.selectedOptionId)) return;
    const outcome = evaluateRound(this.round, this.selectedOptionId);
    this.answers.push({ roundId: this.round.id, optionId: this.selectedOptionId, outcome });
    this.phase = 'reveal';
    focusAfterRender(this, 'reveal');
  },
  next() {
    if (this.phase !== 'reveal') return;
    if (this.isLast) {
      this.phase = 'results';
      focusAfterRender(this, 'finish');
    } else {
      this.roundIndex++;
      this.selectedOptionId = null;
      this.phase = 'question';
      focusAfterRender(this, 'question');
    }
  },
  replay() { if (this.activeGame) this.start(this.activeGameId); },
  hub() {
    this.phase = 'hub';
    this.activeGameId = null;
    this.roundIndex = 0;
    this.selectedOptionId = null;
    this.answers = [];
    focusAfterRender(this, 'hubHeading');
  }
});
