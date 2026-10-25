# Calculator result cards

**Goal:** Replace the single long result with three manually navigated cards: activity breakdown, everyday emission comparisons, and practical next steps. Remove the selected category disclaimer.

**Design:** Retain forest `#163d32`, green `#347b57`, mint `#d8efdf`, paper `#f8faf7`, and ink `#23372e`; Outfit headings and Plus Jakarta Sans body. Keep the total visible above a native horizontal scroll-snap carousel. Three labeled controls, previous/next arrows, a position indicator, keyboard navigation, and mobile swipe expose the sequence without autoplay. Use small line icons for the three comparisons, not stock photos. Keep the shared calculator on home and the dedicated calculator page consistent in ID/EN.

**Content basis:** Verified EPA calculations page on 25 October 2026: electricity used 394 g CO2/kWh; smartphone charging 12.4 g CO2/charge; average gasoline passenger vehicle 393 g CO2e/mile. LED comparison assumes a 9 W bulb. These are illustrative U.S. reference comparisons of emission magnitude, not measurements of the visitor's devices or a conversion to actual AI energy use. Cite the source beside the comparisons and document the equations. Tips follow the largest contribution in the submitted calculation and make no quantified savings or zero-emission promise.

## Implementation and checks

- [ ] Add tested pure equivalency calculations and stable dominant-activity selection.
- [ ] Add localized advice, comparison labels, assumptions, and source link.
- [ ] Replace result markup with three cards; remove the selected disclaimer.
- [ ] Implement scroll, buttons, keyboard controls, responsive height, recalculation, and reset behavior.
- [ ] Verify conversion units, all four advice paths, unchanged totals, and no-result behavior in automated tests.
- [ ] Build and inspect both calculator placements in ID/EN, including 320px mobile, swipe, keyboard, reduced motion, state preservation, and updated calculations.

**Files:** `src/content/result-insights.js`, `src/features/result-insights.js`, `src/features/calculator.js`, `src/components/calculator.html`, `src/components/icons.html`, `src/styles/main.css`, `src/i18n/catalogue.js`, `tests/result-insights.test.js`, `README.md`, and `docs/verification-result-cards-2026-10-25.md`.
