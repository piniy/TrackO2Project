# Misi Jejak AI — design and verification

Implemented locally on 28 October 2026. No commit, push, or deployment was performed.

## Design

The game helps students practise decisions about everyday AI use through the existing five educational scenarios. The main visual is an illustrated island; a connected route shows completed lessons. Forest `#103f35`, leaf `#579f3f`, lime `#b9ef78`, sage `#e9f0e3`, paper `#f5f6f7`, and white form the palette. Inter remains the shared display and body family, with weight and scale separating titles, questions, and utility labels.

Desktop pairs the mission map with a start panel, question, or result. On mobile the map contains the start action, and contracts to a progress strip during play. Choices reveal an explanation and identify the best answer with text and a check mark. Results include all chosen answers, their explanations, replay, and a link to education. The homepage has a matching full-width game invitation.

Scores represent the scenario learning goals. Neither the island nor the score represents measured infrastructure, emissions, or savings. Questions and answer order are retained from `src/content/game-cards.js`. Progress stays in the current page and resets on reload; the ID/EN switch preserves active progress.

## Owning files

- `game.html`: intro, mission map, choices, feedback, result, review, instructions, and no-JavaScript education link.
- `src/styles/game.css`: game and homepage invitation styling, responsive layout, focus indicators, and reduced-motion support.
- `src/features/game.js`: start, validated choices, progress, review, completion, replay, and focus visibility.
- `src/i18n/game-messages.js`: mission UI translations, registered by `src/i18n/catalogue.js`.
- `index.html`: homepage invitation; `src/main.js`: shared stylesheet import.
- `public/assets/images/game/mission-island.webp`: delivered image, 1024 × 1024, 199,058 bytes with transparency. See [art provenance and exact generation prompt](game-art-2026-10-28.md).

## Verification

- `npm.cmd test`: 54/54 tests pass, including answer validation, duplicate-answer prevention, correct scoring, collection-length progress, replay, focus visibility boundaries, and translated authored UI copy.
- `npm.cmd run build`: passes.
- Targeted `git diff --check`: passes.
- Isolated Chrome/Playwright at `http://127.0.0.1:5173/game.html`: five-question playthroughs at 320, 390, 768, 1024, and 1440 pixels; keyboard start and answer selection; correct result counts; answer review; ID/EN switch after selection and on results; replay; no horizontal overflow.
- Homepage illustration loads and its invitation opens the game. The no-JavaScript notice and education link are available. Browser page errors: none.
- At 390 pixels, the initial mobile start button fits within an 844-pixel-high viewport. Questions outside the viewport scroll below the sticky navigation when advanced.
- Motion follows `prefers-reduced-motion`. Browser checks used reduced motion; the original game illustration has only a subtle CSS float in the default preference.

Screenshots and browser verification data are in [screenshots/game-2026-10-28](screenshots/game-2026-10-28/verification.json). The local verification script is `D:\Competitions\Iostc undip 2026\review-game-2026-10-28\verify-game.cjs`.
