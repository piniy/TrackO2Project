> Scope correction: preserve the original UI and cinematic scroll animation, as explicitly requested after reviewing the portal redesign. The existing hero/journey assets are retained. The portal-wide restyle described below is superseded.

# TraCkO2 Education Portal Implementation Plan

**Goal:** Implement the requested Home → Layanan → Tahukah Kamu? → CarbsCulator → Games → About Team structure with clear educational copy and interactive research graphics.

**Architecture:** Retain the existing Vite multi-page build, shared static fragments, Alpine state, and Indonesian/English translation system. Add a shared education fragment with an isolated data module. Keep prototype calculation parameters separate from published research chart values.

**Tech Stack:** Vite, Alpine.js, semantic HTML, CSS, existing locally bundled fonts, official Lucide assets.

## Constraints and design

- Follow the user's existing site for familiar names and the Kemendikdasmen site for a white institutional header, wide photographic banner, clear section titles, and consistent service links.
- Use supplied `data center.webp` at `public/assets/images/data-center.webp`; its cooling towers must not be described as visible carbon emissions.
- No hand-drawn SVG illustrations. Obtain official Lucide icons unchanged and document license and provenance. Use HTML/CSS for data graphics and the computer explanation.
- Avoid decorative slogans, badges, duplicated headings, and unnecessary text wrapper elements.
- Maintain bilingual navigation, calculator/game state, keyboard focus, reduced motion, and small screen readability.
- Research evidence is scoped to the measured model/task/hardware/location. Unavailable per-model ChatGPT water data must be labeled unavailable.
- Local implementation and verification only. Do not deploy or alter remote user data.

## Work packages

1. **Portal shell and Home** — root owns `index.html`, `src/components/header.html`, `src/components/footer.html`, `src/styles/tokens.css`, `src/styles/portal.css`, `edukasi.html`, `kalkulator.html`, and build integration. Replace old decorative Home content with a photographic introduction and four service links; include shared education, calculator, game access, and team sections. Update method and education headings to direct names.
2. **Education** — agent owns `src/components/education.html`, `src/features/education.js`, `src/content/education-data.js`, `src/styles/education.css`, and targeted data tests. Verify primary source units, implement selected-bar details and energy/carbon toggle, model availability and GPT-3 water location/count controls, and a four-step computer explanation.
3. **Calculator** — agent owns calculator fragment/controller/result insights and `src/styles/calculator-refresh.css`. Retain validation and factors, improve cards and analogies, and add an explicit hypothetical one-fewer-request comparison with reasons for recommendations.
4. **Support pages and copy** — agent owns game, video, references pages and initial `src/i18n/portal-messages.js`. Remove marketing filler and switch authored SVG icons to official image assets.
5. **Integration** — root registers education in `src/main.js`, expands the new fragment in `vite.config.js`, merges message maps in `src/i18n/catalogue.js`, and changes generated icons in `src/build/content.js`. Document research and asset sources in `docs/`.

## Verification

- Run `npm.cmd test` and `npm.cmd run build` after all feature modules are integrated.
- Browse production preview at desktop, 390 px mobile, and short landscape. Check overflow, image loading, navigation and active sections, both languages, graph controls, water availability states, calculator validation/results/solutions, game completion/restart, source links, and reduced motion.
- Record actual checks and limitations in `docs/verification-education-portal-2026-10-25.md`; inspect screenshots before claiming layout verified.
