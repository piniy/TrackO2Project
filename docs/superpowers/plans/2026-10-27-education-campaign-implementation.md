# Education Campaign Implementation Plan

**Goal:** Implement the authorized education campaign brief while preserving the current home design, cinematic journey and proposal calculator.

**Architecture:** Keep the six-page Vite/Alpine application. Separate the home preview from the full narrative; isolate research data and controllers from proposal calculator factors. Register focused fragments and translated messages using the existing build and i18n systems.

**Tech Stack:** Vite, Alpine, static HTML/CSS, Node test runner.

## Global constraints

- Preserve the hero/assets/team, six routes, ID/EN state, reduced motion and static educational content.
- Proposal factors remain 0.1, 0.4, 2.0 and 4.5 g CO₂e/activity; research values never replace them.
- Preserve the count-only calculator handoff, formula animation and result carousel.
- No framework, animation dependency, backend, accounts, deployment or publishing.

## Deliverables and ownership

- [x] Root: replace only the home education include with `education-preview`; build introduction → Kenali/journey → Pahami/research → Pilih → Ajak → readings in `edukasi.html`. Share concept cards with the preview. Route the education journey action to `#pahami`; home retains `#carbsculator`. Add calculator qualifications at form and result.
- [x] Research worker: revise `education-data.js`, `education.js`, `education.html`, `education.css`; expose energy by task, modeled Li requests/training, Gemini median and optional historical Shumba details. Export `researchMessages`; preserve `taskValue(task, metric)` and `waterForRequests(location, count)` APIs.
- [x] Content worker: expand readings/references and translations by stable ID, render limitations/metadata, update collection counts and review date; derive game progress/finish/score denominator from `cards.length`. Export `libraryMessages`. Keep reading `#jejak-air`; research uses `#water-research`.
- [x] Campaign worker: retain video/disclosure, add claim check, sourced selectable/copyable text and shared responsibility. Export default `campaign` and `campaignMessages`; root registers them.
- [x] Root integration: register fragment whitelist/controllers/CSS and append message dictionaries after legacy overrides; add meaningful integration checks.

## Verification

- [x] Run `npm.cmd test` and `npm.cmd run build` on final source.
- [x] Validate regressions: `2.907 * 297.6 = 865.1232`; Indonesia 20 requests = 391.84 mL with components summing to total; `{chat:10, summary:3, longText:1, image:2}` = 13.2 g CO₂e.
- [x] Use a production preview for six routes in ID/EN, desktop/390/320 widths, no duplicate IDs, failed assets, page errors or horizontal overflow. Exercise research selection, table/toggle, state on translation, choice/game/campaign and calculator handoff.
- [x] Verify preserved anchors, heading hierarchy, visible keyboard focus, reduced motion and production no-JS educational fallbacks.
- [x] Save screenshots and actual commands/results/limitations in a dated verification note.

The user already authorized execution with “do this task”; this plan is executed in this chat without another approval step.
