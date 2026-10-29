# Three solo games Implementation Plan

> **For agentic workers:** Execute inline in this session. The supplied implementation request authorizes the work; no additional execution-choice gate is needed.

**Goal:** Replace the five-question mission with three independent, sourced five-round games following TRACKO2_GAME_DEVELOPER_HANDOFF.md and its UI reference.

**Architecture:** One Alpine session controller owns hub/question/reveal/results transitions. Stable IDs connect typed content, pure evaluators, translated copy, and review. Raw arithmetic is separate from locale formatting.

**Tech Stack:** Existing Vite 8, Alpine 3, vanilla ES modules, Inter, Node test runner.

## Global constraints

- Preserve unrelated working-tree changes, including homepage and game preview CSS.
- No new backend, storage, accounts, remote AI calls, framework, publication, or deployment.
- Five rounds per game; selected answers remain editable until explicit confirmation.
- Research estimates and authored simulations are labeled; calculator factors remain unchanged.
- ID/EN switching preserves session state; keyboard, reduced motion, 320 px and no-JS fallback work.

### Task 1: Content and arithmetic

Files: `src/content/game-cards.js`, `src/features/game-math.js`, `src/i18n/game-messages.js`, `src/i18n/catalogue.js`, `src/i18n/content-en.js`, `tests/game-math.test.js`, `tests/domain.test.js`, `tests/i18n.test.js`.

- [x] Replace legacy positional game translations with explicitly registered bilingual game content.
- [x] Export `games`, `gameSources`, and `evaluateRound(round, optionId)`; reuse education task/water exports.
- [x] Test positive finite operands, tie handling, unique relative-distance water buckets, source metadata, goal failure/null vs valid zero, and signed differences.
- [x] Assert all-best raw saving is 38.190 Wh, 4 quantified rounds, and 255 rounded LED minutes; assert all five water totals/buckets and energy pairs.

### Task 2: Shared session and UI

Files: `src/features/game.js`, `game.html`, `src/styles/game.css`, `tests/game-flow.test.js`, `tests/game-i18n.test.js`, `tests/learning-content.test.js`.

- [x] Add `start(gameId)`, `select(optionId)`, `confirm()`, `next()`, `replay()`, `hub()` with phase guards and answer-derived totals.
- [x] Verify tentative edits, duplicate confirmation, invalid IDs, no skipping, results lock, game changes, actual collection lengths, and focus geometry.
- [x] Implement three-card picker, shared question/reveal shell, energy bars, lamp equivalent, fixed 500 mL bottle, results and per-round source review.
- [x] Use conditional template mounting to reset details and animations on round/replay; focus question/reveal/results headings and announce concise final feedback.
- [x] Translate content, dynamic quantities, assumptions, actions, accessible labels and title without mutating raw state.

### Task 3: Integration and verification

Files: `index.html`, `edukasi.html`, `README.md`, `docs/game-revamp-2026-10-29.md`.

- [x] Update invitation copy and README while retaining existing links and preview styling.
- [x] Run `npm.cmd test`, `npm.cmd run build`, `git diff --check`; baseline is 54 passing tests and successful build.
- [x] Browser-play all 15 rounds and additional partial/inadequate choices, review, replay, language switching and keyboard flow.
- [x] Inspect desktop/mobile screenshots, widths 320/390/768/1024/1440, reduced motion, no-JS fallback and all five routes for errors/assets.
- [x] Record verification and limitations; leave changes local and uncommitted.
