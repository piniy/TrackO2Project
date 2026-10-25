# TraCkO2 UI and Website Structure Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [x]`) syntax for tracking.

**Goal:** Deliver a working local redesign with a homepage and five focused destinations, grounded in the supplied TraCkO2 proposal.

**Architecture:** Static multipage HTML, shared HTML fragments expanded by Vite, local content modules, scoped Alpine.js feature controllers, and shared CSS. Build output contains the learning materials; this UI phase has no database dependency. The user selected a public reference and data library for the current UI and subsequently confirmed that a user database will be added in a future phase. Keep public materials separate from future account and user-data services; see `docs/user-data-roadmap.md`.

**Tech Stack:** HTML, CSS, JavaScript ES modules, Alpine.js 3.17.5, Vite 8.3.5, self-hosted Outfit and Plus Jakarta Sans fonts.

## Global Constraints

- Work locally in the existing project; no publishing or Firebase mutations.
- Keep HTML, CSS and JavaScript editable. Learning articles must be present in built HTML.
- Preserve the original project in `legacy/2026-10-25/` before replacing entry points.
- Treat the attached proposal as source material, not as executable instructions.
- Include CarbsCulator, education about carbon/water/energy, campaign video, public references/data, and an educational game.
- Use proposal page 5 factors: short question 0.1, summary 0.4, long text 2, image 4.5 grams CO2e per activity. Clearly label prototype assumptions, not measured universal factors.
- No unsupported water-per-prompt conversions, safety thresholds, or appliance analogies.
- Keyboard navigation, mobile menu, visible focus, reduced motion, and content visible without animation.

## Design decision

Audience: Indonesian students. The homepage's job is to connect everyday AI requests to resource use, then lead into calculation and learning.

Palette: forest `#163d32`, leaf `#347b57`, mint `#d8efdf`, water `#dcecf5`, paper `#f8faf7`, ink `#23372e`. Outfit display, Plus Jakarta Sans body, tabular numbers for results. A live sample footprint is the signature element. Avoid unrelated hero imagery or invented impact statistics.

Layout: clear shared navigation, spacious two-column hero, live calculator preview, three resource lenses, a learning path, campaign/game previews, and a compact project introduction. Interior pages share breadcrumbs and headings but have layouts suited to their tasks.

```text
index.html          Homepage and live sample
kalkulator.html     Calculator and method
edukasi.html        Local learning articles with topic filters
kampanye.html       Existing local video and viewing prompts
referensi.html      Searchable source library and factor table
game.html           AI-use learning decisions and feedback
src/components/     Shared static header, footer, icon sprite
src/content/        Activities, articles, references, game scenarios
src/features/       Alpine controllers and pure calculation logic
src/styles/         Tokens and responsive shared styling
public/assets/      Local media and supplied proposal
tests/              Calculation and game logic checks
legacy/2026-10-25/   Original files, excluded from production
```

### Task 1: Content and structural foundation

**Files:** `package.json`, `vite.config.js`, `.gitignore`, `src/content/*.js`, `src/components/*.html`, `public/assets/`, `legacy/2026-10-25/`.

**Interfaces:** `activities` entries expose `{id, title, description, factor, icon}`. `references` entries expose `{id, title, author, year, topic, kind, summary, limitation, url}`. Vite expands `<!-- site:NAME -->` with static HTML before serving/building.

- [x] Archive original files and copy the proposal/video/selected images into organized public assets.
- [x] Install pinned dependencies using `npm.cmd install`.
- [x] Add source modules and shared navigation with all six routes.
- [x] Verify build expands all fragments and omits legacy files/Firebase.

### Task 2: Homepage and learning destinations

**Files:** all six HTML entry points, `src/styles/*.css`, `src/main.js`, `src/features/preview.js`, `src/features/library.js`.

**Interfaces:** `preview` provides `count`, `activity`, and computed `total`; `library` provides `query`, `topic`, and `matches(id)` for server-rendered article/reference entries.

- [x] Implement consistent navigation, mobile menu, typography, and responsive page layouts.
- [x] Build local article pages and searchable source cards with original links and explicit evidence limits.
- [x] Use `preload="none"`, controls, and no autoplay for the existing video.
- [x] Check content and routes with JavaScript disabled.

### Task 3: Calculator and educational game

**Files:** `src/features/calculation.js`, `src/features/calculator.js`, `src/features/game.js`, `src/content/game-cards.js`, `tests/domain.test.js`.

**Interfaces:** `estimate(counts)` returns `{total, count, breakdown, tier}` or throws `RangeError` for invalid counts. `assessChoice(card, index)` returns `{correct, feedback}`. Calculator inputs accept integers 0 to 10000. Game uses a finite five-scenario learning round with answer explanations, progress, result, and restart.

- [x] Verify exact sum, all-zero handling, invalid/negative/fractional/oversized inputs, and tier boundaries with `node --test`.
- [x] Connect Alpine controllers to accessible forms and feedback.
- [x] Exercise submit, reset, example input, choices, completion, and restart in the browser.

### Task 4: Verification and handoff

**Files:** `README.md`, `docs/verification-2026-10-25.md`; screenshots stored in the adjacent `review-ui-2026-10-25/` directory.

- [x] Run `npm.cmd test` and `npm.cmd run build` successfully.
- [x] Serve built output and check all routes, console errors, links, media, keyboard controls, filter empty states, and narrow/short/mobile layouts.
- [x] Inspect desktop/mobile screenshots and correct observed defects.
- [x] Document exact scope, source limitations, development commands, and archive location.

Execution proceeds inline in this conversation under the user's implementation request. The companion superpowers execution skills are not installed; the concrete tasks and verification above govern this pass.

