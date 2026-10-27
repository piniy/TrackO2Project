# Homepage asset refresh verification — 27 October 2026

## Delivered

- Full-bleed interior data-center photograph with dark scrim, welcome line, existing main title, description, and two actions.
- Centered `Jelajahi Layanan`; four open 3D asset compositions with names beneath and image-only hover/focus lift/rotation. The old card-wide hover shadow was removed.
- Physical MacBook frame with the original live prompt typing; charcoal server raster; 3dicons lightning; Fluent 3D factory/cloud emissions illustration.
- Existing cinematic camera and scroll controller retained. Desktop explanation is on a dark right side; mobile places it beneath the artwork. Vignette edges fade into the scene.
- Local WebP delivery, source/license documentation, retained MIT/CC0 notices, and visible Thiings attribution.

## Automated and browser checks

- `npm.cmd test`: **30/30 passed**.
- `npm.cmd run build`: **passed**, all six Vite entry pages generated. Final build includes the hover and vignette refinements.
- Independent read-only review found no actionable source regressions in journey geometry, typing, chapter targets, fallback explanations, or scoped service styles.
- Browser desktop at **1324 × 742**: full hero image and new copy hierarchy; four service links and names; all four chapter buttons reached the correct stage; active objects and side explanation fit within the pinned viewport.
- Browser mobile at **390 × 844** and **320 × 700**: no horizontal overflow; artwork/text stack; all chapter controls fit; English emissions title, explanation, and final action remain visible.
- Service hover computed a translated, rotated, scaled image matrix; parent card shadow was `none`. Keyboard focus uses the same asset effect and visible outline.
- ID/EN switched the welcome line (`Welcome to TraCkO2`), services heading (`Explore our services`), hero alt text, and journey explanations.
- Reduced motion on the built page: enhanced pinning disabled, **all four articles visible**, **zero running journey animations**.
- JavaScript disabled on the built page, 390 × 844: **all four articles visible**, hero photograph absolutely positioned, **no horizontal overflow**. Static build testing is required here because Vite's development server injects CSS through the JavaScript module graph.
- Fresh built-page browser context: **no JavaScript errors or failed HTTP responses**. New journey object URLs returned HTTP 200.
- Home calculator example transferred `chat=10`, `summary=3`, `longText=1`, `image=2` through the dialog to the full calculator, where it recomputed **13.20 g CO₂e**. No page errors or failed responses occurred during the handoff.

## Evidence and scope

Screenshots are in the project's ignored `.playwright-mcp/` directory with the `home-refresh-` prefix. The final screenshots are `hero-final`, `services-final`, `servers-final`, `electricity-final`, `emissions-final`, `mobile-hero`, `mobile-prompt`, `mobile-emissions-en`, `small-mobile`, and `no-js-built`.

Original download candidates are at `D:\Competitions\Iostc undip 2026\review-ui-2026-10-27\asset-originals`. The rejected rasterized-vector server and unused candidates are not delivered in `public/`.

Sources and reuse terms are recorded in `docs/asset-sources.md`. The Thiings server asset is used under its free noncommercial tier with attribution; commercial reuse requires a suitable license or replacing that asset. No new image was generated. Changes remain local; no deployment or Git commit was made for this request.

## Follow-up: smoke transition

The electricity-to-emissions connection now uses seven overlapping translucent raster billows that follow the camera path, spread upward, and dissolve. The former final glowing beam, bright traveling dot, and radial starburst were removed; the earlier two connections remain. A separate subtle chimney plume continues at the factory. All smoke reuses the existing licensed Fluent cloud asset, and the static cloud/CO₂ label remains for fallback rendering.

Validation: **32/32 tests passed**, including final-transition visibility, dissolution, and ordered travel; final six-page build passed. Desktop 1324 × 742 and mobile 390 × 844 screenshots showed smoke during the transition and no horizontal overflow. Reduced motion retains all four explanations. Screenshots use the `.playwright-mcp/emissions-smoke-` prefix.
