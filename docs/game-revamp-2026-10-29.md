# Misi Jejak AI — three solo games

Implemented locally on 29 October 2026 (Asia/Jakarta), following the supplied TRACKO2_GAME_DEVELOPER_HANDOFF.md and its interactive visual reference. No publication, commit, push, or deployment was performed.

## Experience

Three independent five-round games replace the previous five-question mission:

- **Tebak Energinya:** select the higher electricity use; confirm to reveal two bars with a shared, unmodified scale, Wh values, ratio, and difference.
- **Pilih Cara yang Tepat:** meet the stated task goal; reveal qualified simulated savings against a visible baseline and a 9 W LED equivalent. Inadequate choices and the qualitative typo round have null savings. Valid baseline choices can have zero savings.
- **Isi Botolnya:** choose the closest relative-distance bucket; reveal consumption, a fixed-capacity 500 mL bottle, total bottle equivalents, and the cooling/electricity split. Amounts over one bottle are explicitly labeled.

Selections remain editable until confirmation. Answers commit once, cannot be skipped, and feed answer-derived scores and totals. Results include review, source access, replay and a game-picker action. No session persistence or remote AI calls were added.

ID/EN switching preserves tentative selections, locked answers, progress, methods-open state and raw quantities. The source document's scope labels remain: study means, authored simulation assumptions, and projected Indonesia water scenario.

## Ownership

- `game.html`: hub, shared play surface, distinct reveals, results/review, no-JS fallback.
- `src/content/game-cards.js`: 15 rounds, stable IDs, numerical inputs reusing education exports, shared source/version/scope/assumption metadata, explicitly registered bilingual authored content.
- `src/features/game-math.js`: comparison, signed savings, water buckets, raw totals, locale number formatting and LED duration.
- `src/features/game.js`: guarded session transitions, derived summaries, language-aware presentation, focus management.
- `src/styles/game.css`: new scoped game styles appended while preserving the homepage invitation and existing local edits.
- `src/i18n/catalogue.js`, `game-messages.js`, `content-en.js`: explicit registration replacing legacy positional game mapping.
- `index.html`, `edukasi.html`, `README.md`: three-game invitations and route description.
- Tests: migrated game/domain/i18n/learning coverage and added `tests/game-math.test.js`.
- `scripts/verify-game-browser.mjs`: optional repeatable browser matrix using an existing Playwright installation and installed Chrome.

Unrelated pre-existing team, education, photo, and style changes were preserved. Existing education research values and calculator factors were not changed.

## Sources and boundaries

[Luccioni et al., arXiv v3, Table 2](https://arxiv.org/html/2311.16863v3) provides mean task energy and the 22 Wh phone-charge reference. Devices use explicitly assumed constant power. [Li et al., arXiv v5, Table 1](https://arxiv.org/html/2304.03271v5#S3.T1) provides location-specific water scenarios. These source pages were inspected during implementation.

The choice game uses task means as fixed teaching proxies. Success of the specified task is assumed by the authored scenario; no quality measurement is inferred. No personal emissions or real-world savings are measured. Water estimates are consumption, never water saved.

All-best task choices aggregate raw values to **38.190 Wh**, four quantified rounds, five best decisions. The raw LED equivalent is **254.6 minutes**, formatted after rounding once as **4 hours 15 minutes**. Water round 1 is **507.120 mL = 66.000 + 441.120 mL**; Indonesia projection is **391.840 mL**.

## Verification

Baseline: 54 tests passed and production build succeeded.

Final checks:

- `npm.cmd test`: **63 passed, 0 failed**.
- `npm.cmd run build`: passed; all five routes emitted.
- `git diff --check`: passed.
- Browser matrix: 30 complete standard-motion sessions / 150 rounds across **320, 390, 768, 1024 and 1440 px**, in both Indonesian and English.
- Each matrix session exercised tentative selection, explicit confirmation, locked answers, switching both directions before confirmation / after reveal / on results, source details, five-item review, replay, and return to picker.
- Additional complete reduced-motion sessions for all three games at 320 px.
- Mixed task path: inadequate illustration skip, valid qualitative correction, partial summary saving, correct caption choice and partial visual saving; result **1/5**, three qualified numerical choices, raw **11.929 Wh**.
- Keyboard-only energy session: start, select using Space, confirm/advance using Enter, source details, all five rounds, review and replay. Focus remains beneath the sticky header.
- Final production preview: all five routes, English titles and calculator KaTeX render; an additional 30 rounds at desktop/320 px and 15 reduced-motion rounds passed. No page errors or failed asset responses in this final build check.
- The saved browser script was then run successfully against the final production preview: **33 sessions, 165 rounds, 363 overflow checks, 0 page errors, 0 failed responses**. This repeats the full five-width, two-language matrix plus reduced motion on the completed build.
- Language switching did not restart the energy-bar animation.
- No-JavaScript fallback and its education/references links were verified.
- Reloads reset sessions; language preference remains the existing site preference.

A keyboard check found an Alpine keyed-template focus issue. The fix captures the connected root before the invoking button is removed and resolves the rendered heading after the next render. Two focused regression tests cover stale refs and root capture.

One development-server route check encountered a stale optimized KaTeX dependency response (504). Final checks used a fresh production preview on port 5178; calculator rendering and assets passed there. No application workaround or calculator changes were needed.

## Repeatable browser check

Start a production preview after building, then run the optional script with the already bundled Playwright package:

```powershell
npm.cmd run build
npm.cmd run preview -- --port 5178
```

In another terminal:

```powershell
$env:PLAYWRIGHT_MODULE = 'C:\Users\DELL\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\node_modules\playwright'
node scripts/verify-game-browser.mjs
```

Set `GAME_QA_URL` to use another local server. The script installs nothing. Interactive keyboard checks and screenshot inspection are described above; they supplement the scripted matrix.

## Screenshots

Final production screenshots are in `docs/screenshots/game-2026-10-29/`:

- `hub-desktop.png`
- `hub-preview.png` (compact hub crop)
- `hub-mobile.png`
- `energy-desktop.png`
- `choice-desktop.png`
- `water-mobile.png`
- `results-desktop.png`

## Remaining limits

Automated browser verification used installed Chrome, including emulated mobile viewports and reduced motion. Real phone hardware, other browser engines, and screen-reader audio were not tested. Values are bounded teaching scenarios, not provider telemetry.
