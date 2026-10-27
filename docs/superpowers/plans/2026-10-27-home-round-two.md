# Homepage Round Two Implementation Plan

**Goal:** Apply the ten browser comments to hero copy/photo, mobile service navigation, Home calculator styling, and footer.

**Architecture:** Keep the existing multipage Vite site and calculation/journey behavior. Scope Home calculator styling to the trial and add a dedicated shared footer stylesheet. Replace the attribution-required server asset before removing the visible credit row.

**Design:** Retain Inter and the established forest `#103f35`, leaf `#579f3f`, lime `#b9ef78`, paper `#f5f6f7`, white `#ffffff`, and ink `#202b2a`. Per the user's live clarification, the hero hierarchy is `Selamat datang di` → main heading `TraCkO₂` → `AI juga punya jejak karbon?` → description and calculator action. Services remain four open 3D icons, with one horizontal scroll row on mobile. CarbsCulator becomes a friendly activity console with a 3D object and clear input tiles. Footer headings use regular Inter styling and a real school map replaces the deleted note.

## Tasks and ownership

- [ ] Root: apply the clarified welcome → brand title → AI carbon question hierarchy with a clear description/CTA; install the sourced emissions photo with correct alt/caption and localized text.
- [ ] Root: make mobile `.home-service-grid` a scrollable row with native touch/keyboard scrolling, scroll snapping, a visible next item, and no body overflow. Desktop remains four columns.
- [ ] Calculator agent: restyle `src/components/calculator-trial.html` and `src/styles/calculator-trial.css`, with a trial-only activity fragment if needed. Preserve form IDs, values, factors, steppers, validation, dialog and handoff. Report new translation strings to root.
- [ ] Footer agent: remove the marked note, badge and asset credit row, use normal Inter footer headings, verify the school's address from its primary site, and add an accessible lazy Google Maps iframe plus map link. Root imports its new stylesheet and adds translations.
- [ ] Asset agent: acquire an industrial-emissions hero photograph and a proper raster/3D server replacement whose license does not require visible credit. Keep provenance and license notices. Do not acquire paid licenses.
- [ ] Root: integrate assets and translations, update asset documentation, run the existing 32 tests and six-page build, inspect desktop/mobile/ID-EN/reduced motion, exercise calculator handoff, check map identity and scroll behavior, and record actual verification results.

The comment asking for a calculator concept is implemented within the existing Home trial; no broad redesign of the full calculator or journey is needed. The footer's apparent font mismatch comes from its uppercase, wide-tracked `.eyebrow` treatment, which will be replaced with normal heading styling.
