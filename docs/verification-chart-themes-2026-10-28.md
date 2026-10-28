# Resource chart themes — 28 October 2026

Implemented resource-specific presentation in the education research section. Electricity uses amber segmented bars and a battery icon; converted emissions uses slate dotted bars and a cloud symbol; water retains its two-component stack with blue fills and ripple texture. The same identities extend to Gemini metric cards, the hardware energy breakdown, training water, and historical scenario cards. Sources and icon license are documented in asset-sources.md.

Validation:
- Production build passed; existing unit suite passed 46/46.
- Browser layout checks at 320, 390, 600, 760, 768, 900, 1050, 1280, and 1440 pixels: no document overflow.
- Indonesian and English production layouts verified at 320, 390, 760, 768, and 1280 pixels.
- Mobile horizontal scrolling and keyboard selection passed. Metric switching updates the theme and values. Water slider at 100 requests for Washington displays 4.75 L (4,75 L in Indonesian).
- Study tabs, energy breakdown selection, training disclosure, and study selection persistence passed. New icons load locally; browser inspection reported no page errors.
- Production no-JavaScript fallback remains visible without overflow at 320 pixels. This must be checked against the production preview because the Vite development server injects CSS via JavaScript.
- Screenshots inspected under docs/screenshots/chart-themes-2026-10-28/.

The automated script initially checked a study tab before Alpine applied its update; waiting for the target panel to become visible verified the transition successfully.
