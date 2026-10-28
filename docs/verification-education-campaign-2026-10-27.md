# Education campaign verification — 27 October 2026

Implemented the authorized brief in `docs/superpowers/plans/2026-10-27-education-campaign-dev-task.md`. Verification is against the local production build, not a deployed service.

## Browser-comment revision

The later user review requested removal of 16 selected elements. All 16 are removed: the introductory learning-sequence eyebrow; four numbered lesson eyebrows; the training/inference disclosure; three selected takeaway paragraphs; the Pahami instruction paragraph; Luccioni and water-panel eyebrows; the two numerical-table disclosures; the selected Luccioni methods paragraph; and the visible Indonesia projection callout. These explicit edits supersede the initial brief's table/callout requirements. The four-link learning navigation and unmarked Pilih takeaway remain.

After this revision, `npm.cmd test` passed 46/46, `npm.cmd run build` passed for all six entry pages, and `node docs/verify-education-campaign.mjs` passed 48 browser checks plus six no-JS route checks without errors, failed assets, duplicate IDs or horizontal overflow. The open-details check now uses source methods rather than the deleted tables. Education screenshots and browser-results.json were refreshed. The open in-app education tab was reloaded and its updated content inspected. The initial-delivery description below records the earlier implementation; the removed tables and callouts are no longer part of the current page.

## Delivered behavior

- Home retains its photograph, service illustrations, cinematic journey, calculator trial/dialog and team. Its education section is now a compact preview using shared concept cards. The full research/narrative appears on education only.
- Education follows introduction → Kenali → Pahami → Pilih → Ajak → searchable readings. It has one explicit H1. The education journey continues to `#pahami`; home continues to `#carbsculator`.
- Luccioni defaults to energy, retains the six familiar tasks and reveals all ten. The carbon conversion, labeled log scale, concrete examples and numerical table have visible study qualifications.
- Li requests and training, Google/Gemini product medians and optional historical Shumba scenarios retain independent controls, units, denominators and source boundaries. English table decimals follow the selected locale.
- Seven readings and seven reference records include complete English equivalents, rendered limitations and source metadata. Water reading `#jejak-air` and `#prompt-bijak` remain stable; the research panel uses `#water-research`.
- Game progress, last question and score denominator derive from `cards.length`. Campaign includes a claim check, qualified source text, selectable clipboard fallback and personal/class/provider discussion actions.
- Calculator form and result visibly explain the proposal-defined simulation. The four proposal factors remain 0.1, 0.4, 2.0 and 4.5 g CO₂e/activity.

## Actual commands and results

| Command | Result |
| --- | --- |
| `npm.cmd test` | 46 tests passed, 0 failed |
| `npm.cmd run build` | Vite production build passed; all six HTML entry pages emitted |
| `npm.cmd run preview -- --port 4173` | Production preview served at `http://127.0.0.1:4173/` |
| `node docs/verify-education-campaign.mjs` | 48 browser layout/locale/view checks plus six production no-JS route checks passed; no page/console errors or failed assets |
| `node docs/qa-library-campaign-2026-10-27.mjs` | Keyboard game, article/reference search, language-state retention, campaign claim/copy fallback and narrow layouts passed |
| `git diff --check` | Passed; Git printed only Windows LF/CRLF conversion notices |

The browser scripts use bundled Playwright and the installed isolated Chromium executable; they add no application dependencies. A shared browser-tool profile was busy, so verification used independent headless contexts. Early QA-script assertions were adjusted to wait for Alpine's asynchronous visibility updates; the final complete run passed.

## Numerical and interaction evidence

- Image generation conversion remains **865.1232 g CO₂e per 1,000 study inferences**.
- Indonesia scenario at 20 defined requests remains **391.84 mL**: 152.00 mL direct + 239.84 mL electricity-related.
- Home handoff `{chat:10, summary:3, longText:1, image:2}` transfers counts only and recalculates **13.2 g CO₂e** on the full page. The dialog, inputs, formula tests and result carousel remain working.
- Source guards reject use of Gemini metrics as a Li request coefficient and non-Luccioni task factors. Gemini exposes no median-multiplication or expected personal-total interface. Training is separate from request counts.
- All six pages were checked in ID/EN at 1440, 390 and 320 px. All three water/production/historical source views were additionally checked at 390/320 px in both languages with source metadata expanded. No document overflow, duplicate IDs or extra/missing H1s were found.
- Task expansion, metric/task selection, requests/location, open tables, lesson choices, game answers/completion, search queries/open readings, reference details, campaign answers and calculator inputs survive language changes.
- Keyboard checks exercised visible focus, anchor activation, five game questions and completion focus, claim radio inputs/submission and the selectable copy fallback.
- Reduced-motion changes produce the static cinematic story. The original journey implementation/assets are preserved. Static tables, qualifications, reading count and no-JS study summaries were checked with JavaScript disabled against the production build at 320 px; production CSS loaded on all six routes.

## Screenshots

Captures use reduced motion to show settled figures instead of partially completed entrance animations. The ordinary-motion pages and interactions were checked before capturing.

- [Home preview](screenshots/education-campaign-2026-10-27/home-preview.png)
- [Education introduction](screenshots/education-campaign-2026-10-27/education-introduction.png), [full education flow](screenshots/education-campaign-2026-10-27/education-flow.png), [choice activity](screenshots/education-campaign-2026-10-27/education-choice.png)
- [Luccioni tasks](screenshots/education-campaign-2026-10-27/research-luccioni.png)
- [Li requests and training](screenshots/education-campaign-2026-10-27/research-li.png)
- [Google/Gemini](screenshots/education-campaign-2026-10-27/research-gemini.png), [English at 320 px](screenshots/education-campaign-2026-10-27/research-gemini-en-320.png)
- [Shumba historical detail](screenshots/education-campaign-2026-10-27/research-shumba.png)
- [Game](screenshots/education-campaign-2026-10-27/game.png), [campaign](screenshots/education-campaign-2026-10-27/campaign.png), [education without JavaScript at 320 px](screenshots/education-campaign-2026-10-27/education-no-js-320.png)
- Machine-readable evidence: [main browser results](screenshots/education-campaign-2026-10-27/browser-results.json), [library/game/campaign results](screenshots/education-campaign-2026-10-27/library-campaign-qa.json)

## Source review and limits

Primary research checked: [Luccioni v3, Table 2/methods](https://arxiv.org/html/2311.16863v3), [Li v5, Table 1](https://arxiv.org/html/2304.03271v5#S3.T1), [Google v1, Sections 3.1/3.3/3.4, Tables 1–2](https://arxiv.org/html/2508.15734v1), [Shumba v3, abstract/Section 4.1.4/limitations](https://arxiv.org/html/2412.03716v3), and [WRI Aqueduct 4.0](https://www.wri.org/research/aqueduct-40-updated-decision-relevant-global-water-risk-indicators). The narrative uses the educational approach in the [UNESCO student AI framework](https://www.unesco.org/en/articles/ai-competency-framework-students), [UNESCO greening guidance](https://www.unesco.org/en/articles/greening-curriculum-guidance-teaching-and-learning-climate-action), and [W3C clear-content guidance](https://www.w3.org/WAI/WCAG2/supplemental/objectives/o3-clear-content/). The UN communication page listed in the brief returned HTTP 403 during source review.

- This is local implementation/QA. No commit, push, deployment or external publishing was performed.
- Provider figures, modeled scenarios and historical examples retain their stated limitations; they do not measure a visitor's service or demonstrate verified carbon savings. User learning/behavior outcomes have not been tested with participants.
- No JavaScript means the original Indonesian static content; the language switch and activities require JavaScript. The existing Indonesian video is retained; no English subtitles/audio were created. This pass checked its asset/source preservation rather than playing the entire video.
- QA covered desktop Chromium emulation, not physical phones, other browser engines or a screen-reader session.
- One initial screenshot path was incorrectly URL-encoded, creating duplicate `game.png` and `campaign.png` under `D:\Competitions\Iostc%20undip%202026\TrackO2Project\docs\screenshots\education-campaign-2026-10-27`. Correct captures are in this workspace. Automatic tool policy rejected removal of the duplicate outputs with “blocked by policy”; they remain outside the workspace. No retry through another deletion mechanism was attempted.
