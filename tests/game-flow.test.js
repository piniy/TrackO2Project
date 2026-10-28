import test from 'node:test';
import assert from 'node:assert/strict';
import createGame from '../src/features/game.js';

function setupGame() {
  const game = createGame();
  const focused = [];
  game.$nextTick = callback => callback();
  game.$refs = {
    question: { focus: options => focused.push({ target: 'question', ...options }) },
    finish: { focus: options => focused.push({ target: 'finish', ...options }) }
  };
  return { game, focused };
}

function play(game, choices) {
  game.start();
  for (const choice of choices) {
    game.choose(choice);
    game.next();
  }
}

test('mission waits for start and cannot skip an unanswered scenario', () => {
  const { game, focused } = setupGame();
  game.choose(0);
  game.next();
  assert.equal(game.started, false);
  assert.equal(game.progress, 0);
  assert.equal(game.selected, null);
  assert.deepEqual(game.answers, []);
  game.start();
  game.next();
  assert.equal(game.started, true);
  assert.equal(game.index, 0);
  assert.deepEqual(focused, [{ target: 'question', preventScroll: true }]);
});

test('invalid choices leave mission state intact', () => {
  const { game } = setupGame();
  game.start();
  for (const choice of [-1, 2, 0.5, '0', null, undefined, NaN, Infinity]) game.choose(choice);
  assert.equal(game.selected, null);
  assert.equal(game.score, 0);
  assert.equal(game.progress, 0);
  assert.deepEqual(game.review, []);
});

test('each scenario records one answer and progress survives moving to the next scenario', () => {
  const { game, focused } = setupGame();
  game.start();
  game.choose(0);
  game.choose(1);
  game.start();
  assert.equal(game.score, 1);
  assert.equal(game.selected, 0);
  assert.equal(game.answeredCount, 1);
  assert.equal(game.progress, 20);
  assert.equal(game.feedback.correct, true);
  game.next();
  assert.equal(game.index, 1);
  assert.equal(game.selected, null);
  assert.equal(game.progress, 20);
  assert.equal(game.feedback, null);
  assert.equal(focused.at(-1).target, 'question');
});

test('five mixed answers produce an accurate, explainable review and a stable finished result', () => {
  const { game, focused } = setupGame();
  play(game, [0, 0, 0, 0, 0]);
  assert.equal(game.finished, true);
  assert.equal(game.score, 3);
  assert.equal(game.progress, 100);
  assert.equal(game.answeredCount, 5);
  assert.deepEqual(game.review.map(row => row.correct), [true, false, true, false, true]);
  for (const [index, row] of game.review.entries()) {
    assert.equal(row.card, game.cards[index]);
    assert.equal(row.selected, 0);
    assert.equal(row.option, game.cards[index].options[0]);
    assert.ok(row.feedback.length > 20);
  }
  assert.deepEqual(focused.at(-1), { target: 'finish', preventScroll: true });
  const focusCount = focused.length;
  game.choose(1);
  game.next();
  game.start();
  assert.equal(game.score, 3);
  assert.equal(game.index, 4);
  assert.equal(game.answers.length, 5);
  assert.equal(focused.length, focusCount);
});

test('all best choices produce full marks and restart begins a fresh playable mission', () => {
  const { game, focused } = setupGame();
  play(game, game.cards.map(card => card.options.findIndex(option => option.correct)));
  assert.equal(game.score, 5);
  assert.equal(game.finished, true);
  game.restart();
  assert.equal(game.started, true);
  assert.equal(game.finished, false);
  assert.equal(game.index, 0);
  assert.equal(game.score, 0);
  assert.equal(game.progress, 0);
  assert.equal(game.selected, null);
  assert.deepEqual(game.answers, []);
  assert.deepEqual(game.review, []);
  assert.deepEqual(focused.at(-1), { target: 'question', preventScroll: true });
  game.choose(1);
  assert.equal(game.answeredCount, 1);
  assert.equal(game.score, 0);
});

test('question focus scrolls only when the heading falls outside the visible area below the header', () => {
  const cases = [
    { top: 100, bottom: 150, shouldScroll: false },
    { top: 730, bottom: 780, shouldScroll: false },
    { top: 99, bottom: 149, shouldScroll: true },
    { top: 731, bottom: 781, shouldScroll: true }
  ];
  for (const { top, bottom, shouldScroll } of cases) {
    const { game, focused } = setupGame();
    const scrollCalls = [];
    Object.assign(game.$refs.question, {
      ownerDocument: {
        defaultView: { innerHeight: 800 },
        querySelector: selector => {
          assert.equal(selector, '.site-header');
          return { getBoundingClientRect: () => ({ bottom: 80 }) };
        }
      },
      getBoundingClientRect: () => ({ top, bottom }),
      scrollIntoView: options => scrollCalls.push(options)
    });
    game.start();
    assert.deepEqual(focused, [{ target: 'question', preventScroll: true }]);
    assert.deepEqual(scrollCalls, shouldScroll ? [{ block: 'start', behavior: 'instant' }] : [], `Heading bounds ${top}–${bottom}`);
  }
});
