# Developer task: TraCkO2 education campaign, structure and research data

## Objective

Update the existing website into a clear educational campaign for Indonesian youth and general-public visitors. Use the message **“Pakai AI, Pahami Jejaknya.”** and the learning sequence **Kenali → Pahami → Pilih → Ajak**. Visitors should be able to explain the physical process behind an online AI response, interpret a sourced environmental estimate, and explain one purposeful usage choice.

## Verified starting point

Checked the latest local source and rendered home/education pages at `http://127.0.0.1:5174/` on 27 October 2026. This is a local baseline, not a production deployment audit.

- Home currently has the industrial photograph `/assets/images/emissions-hero.jpg`, service illustrations, the cinematic prompt journey, the full shared education charts, the illustrated calculator trial, game/video previews and team section.
- `edukasi.html` repeats the journey and shared charts, followed by four searchable/filterable reading cards. The rendered page has a duplicate `jejak-air` ID.
- Education has six Luccioni task means; a Li/GPT-3 water simulator with four locations; GPT-4/GPT-4o options that display no-data messages; and no Gemini case study.
- Home already has a visible prototype-method note beneath the trial. The full calculator needs equally clear input/result context.
- Reference objects have `limitation` values, but their renderer omits them.
- Both home and education expand the same `education` fragment. Vite also performs an exact-text H1 replacement and a route-specific journey-link replacement. Update these deliberately when separating the page content.

## Preserve the current design and working behavior

- Retain the latest hero photograph, layout, palette, typography, service illustrations, team section and cinematic animation. Introduce the campaign message in the education preview/page; do not replace the homepage hero or revert its latest assets.
- Keep all six existing routes, the Vite/Alpine architecture, ID/EN switching, reduced-motion behavior and static educational fallbacks. Add no framework, animation dependency, authentication or backend.
- Preserve `#jejak-ai`, `#carbsculator`, `#tentang`, `kalkulator.html#hasil`, `kalkulator.html#metode`, and `edukasi.html#prompt-bijak`.
- Preserve the home calculator dialog, count-only URL handoff, full-page recalculation, formula animation and result carousel.
- Keep the four proposal factors unchanged: 0.1, 0.4, 2.0 and 4.5 g CO₂e per activity. Research examples introduced by this task must not become calculator factors.

## Task 1 — Separate the home introduction from the full education experience

- Replace the homepage's full education fragment with a compact preview in the same visual language: campaign message, three short concepts (electricity, emissions, water), one short study takeaway, and a link to `./edukasi.html`.
- Keep the home journey, calculator trial and remaining sections in their current order.
- Build the full education sequence on `edukasi.html`. Reuse small components and datasets rather than copying research values into both pages.
- Add one explicit page H1 before the education journey. Remove the fragile exact-heading-string promotion in Vite if no longer needed.
- On education, make the journey's final action lead to the next lesson. On home, retain its existing calculator destination. Avoid introducing a broken cross-page anchor.

## Task 2 — Build the education narrative

Use these sections in order:

1. **Introduction:** H1 “Pakai AI, Pahami Jejaknya.” Supporting copy: “AI bisa membantumu belajar dan berkarya. Yuk, kenali proses di balik jawabannya dan pilih cara penggunaan yang sesuai kebutuhanmu.” Primary action: “Mulai perjalanan,” linking to the existing journey.
2. **Kenali:** retain the cinematic prompt → server → electricity → associated emissions story. Identify it as an example of an online AI service. Add a short explanation distinguishing training from everyday inference.
3. **Pahami:** explain energy, emissions and water in three short, illustrated blocks. Then offer the source-specific research explorer in Tasks 3–4.
4. **Pilih:** introduce one compact choice activity and a clear link to the existing five-scenario game. Use school and everyday-work examples. Give feedback about purpose, understanding and source checking.
5. **Ajak:** show three practical actions: determine the goal before asking; request the output actually needed; check the result before regenerating. Include a class/friend discussion prompt and a link to the campaign page.
6. **Read further:** retain the searchable article library. Expand it with short readings on training/inference, interpreting estimates, and local water implications. Keep linked article IDs stable, including `prompt-bijak`.

Editorial rules: one main question and takeaway per section; everyday Indonesian first; technical definitions available nearby; concise paragraphs; no invented percentages of emissions saved. Keep essential study qualifications beside the numbers even when the full method is collapsed. Provide complete English equivalents.

## Task 3 — Revise the energy-by-task chart

- Default to energy. Retain the converted-carbon toggle and the labeled logarithmic scale.
- Keep six familiar tasks initially; provide “Semua 10 tugas” to reveal the remaining four.
- Use these mean kWh values per **1,000 study inferences**:

| Task | Mean kWh |
| --- | ---: |
| Image generation | 2.907 |
| Image captioning | 0.063 |
| Summarization | 0.049 |
| Text generation | 0.047 |
| Object detection | 0.038 |
| Image classification | 0.007 |
| Token classification | 0.004 |
| Extractive question answering | 0.003 |
| Masked language modeling | 0.003 |
| Text classification | 0.002 |

- Use approachable task labels and a concrete example for each selection. Render an accessible numerical table as an alternative to reading the chart.
- Retain conversion by 297.6 g CO₂e/kWh, identifying the study's Oregon electricity intensity. Label carbon values as conversions of the table means.
- Show the tested-task/model/configuration qualification visibly. Explain that the text-generation experiment used short outputs and does not define a modern chatbot-answer factor.
- If variation is displayed, label it as standard deviation in the selected details. Do not draw negative-valued symmetric error bars on the logarithmic chart.

Source: https://arxiv.org/html/2311.16863v3, Table 2 and methods.

## Task 4 — Add source-specific research views

Provide three clearly labeled study views. Their controls, units and qualifications must change with the selected study. Do not display a combined cross-study model ranking.

### Li / GPT-3: modeled water scenarios

- Preserve the request slider and the current direct/electricity split. Per defined request, use mL:

| Location | Onsite | Electricity-related | Total |
| --- | ---: | ---: | ---: |
| Texas | 1.000 | 6.590 | 7.590 |
| US average | 2.200 | 14.704 | 16.904 |
| Indonesia projection | 7.600 | 11.992 | 19.592 |
| Washington | 3.800 | 43.706 | 47.506 |

- Display: 0.004 kWh/request; input ≤800 words; output 150–300 words; modeled consumption includes onsite cooling and electricity-related water.
- For Indonesia, visibly explain that the source uses facilities under construction as of July 2023 with projected PUE/WUE; it is not a measurement of present-day Indonesian ChatGPT use.
- Add a separately labeled training example: **0.708 million L onsite + 4.731 million L electricity-related = 5.439 million L operational water**, the study's US-average scenario. Use a two-part stacked bar. Keep its “one training run” denominator separate from the request slider. Note that the actual training location was not public and this case excludes embodied water.

Source: https://arxiv.org/html/2304.03271v5#S3.T1.

### Google / Gemini Apps: provider-reported production case study

- Show three metrics for the **median Gemini Apps text prompt in May 2025**: **0.24 Wh**, **0.03 g CO₂e**, **0.26 mL cooling water**.
- Add a clickable energy breakdown: active accelerators **0.14 Wh**; CPU/DRAM **0.06 Wh**; idle machines **0.02 Wh**; facility overhead **0.02 Wh**. Explain each segment's role. Values are rounded.
- Identify this as a provider-authored study of a product serving multiple models. Water covers data-center cooling; emissions use the paper's market-based method and allocated serving-hardware contributions. It is not a present-day measurement for every named Gemini model or an Indonesia-specific factor.
- Give this view no prompt-count multiplication or expected personal-total output. Do not call the median an arithmetic mean.

Source: https://arxiv.org/html/2508.15734v1, Sections 3.1/3.3/3.4 and Tables 1–2.

### Shumba / GPT-4 and Llama: historical examples

- Put this in optional further detail, labeled **“Contoh historis — asumsi inferensi 2024; revisi paper 2026.”**
- Show the paper's headline scenarios: 5,000-token report, approximately up to **59 L GPT-4 / 0.66 L Llama-3-70B**; 250-token email, approximately **2.9 L GPT-4 / 0.13 L Llama-3-70B**.
- Identify these as modeled scenario figures, not global averages or universal ranges. Explain onsite/electricity-related boundaries, separately depicted leakage, and the proprietary-model assumptions.
- Add no country-specific numerical bars without obtaining the underlying numerical dataset. Do not infer exact data from chart pixels. Provide no fabricated GPT-4o value or control that suggests it is covered.

Source: https://arxiv.org/html/2412.03716v3, abstract, Section 4.1.4, limitations and Figures 2–3.

## Task 5 — Update readings, references, game and campaign page

- Rewrite the water article's fixed-conversion sentence to explain that coefficients apply only within the selected study scenario.
- Give the water research panel and reading article unique IDs. Preserve an intentional destination for existing `#jejak-air` links.
- Render source limitations. Add source version, underlying data/assumption year, task/unit, geographic scope, evidence type and included/excluded environmental pathways to the relevant research details and reference records. “Not reported” must not become zero.
- Add Gemini, Shumba and selected local-impact reading sources to the reference collection; use one Shumba source record for its duplicate local PDFs. Update the actual review date and collection counts.
- Keep five revised game scenarios: purposeful learning use; reuse of suitable visual material; water/source scope; interpretation of a prototype result; and AI versus whole-data-center figures. Score understanding only. Make progress, final denominator and last-question checks derive from `cards.length` rather than literal 5/4 values.
- Enhance `kampanye.html` with one claim-check exercise and a source-backed campaign text card with “fact + essential qualification + source.” A copy-text button may use the clipboard with a visible/selectable-text fallback. Keep the existing Indonesian video and language disclosure; do not fabricate English subtitles or new video assets.
- Include individual and shared responsibility: purposeful use, school discussions, and informed questions about provider efficiency/transparency. No account, leaderboard, external publishing, or verified-carbon-savings claim.
- At the full calculator form/result, visibly identify proposal-based estimates and label the usage categories as proposal-defined simulation categories. Preserve the existing home prototype note and calculation behavior.

## Integration map

Paths below are relative to `D:/Competitions/Iostc undip 2026/TrackO2Project`.

| Responsibility | Existing files / proposed additions |
| --- | --- |
| Page structure and route-aware fragments | `index.html`, `edukasi.html`, `kampanye.html`, `referensi.html`, `game.html`, `vite.config.js` |
| Compact homepage education preview | Create `src/components/education-preview.html`; register it in Vite's component whitelist |
| Full narrative and research rendering | `src/components/education.html`; add focused fragments if needed and register them explicitly |
| Source-specific numbers and state | `src/content/education-data.js`, `src/features/education.js`; keep new study records separate from the existing proposal factors |
| Readings, source metadata and game | `src/content/articles.js`, `src/content/references.js`, `src/content/game-cards.js`, `src/build/content.js`, `src/features/game.js` |
| Calculator qualification copy | `src/components/calculator.html`, `src/components/calculator-trial.html`, `referensi.html` |
| Translations and styling | `src/i18n/catalogue.js`, `src/i18n/content-en.js`, `src/i18n/portal-messages.js`, `src/styles/education.css`, `src/styles/content-additions.css` |
| Component registration if new controllers are introduced | `src/main.js` |

Follow the existing patterns. Indonesian strings are translation keys, article/reference translations are keyed by ID, and game translations are currently index-aligned. Update changed strings and collection translations together; check override order in `portal-messages.js`. Language switching must preserve selections, answers, inputs and open details.

## Acceptance criteria

- Run `npm.cmd test` and `npm.cmd run build`; all six entry pages must build and load. Do not claim success based on an old build.
- Retain meaningful existing numerical regressions: image conversion **865.1232 g CO₂e per 1,000**; Indonesia 20 requests **391.84 mL**; direct + electricity-related components equal the total; sample calculator handoff `{chat:10, summary:3, longText:1, image:2}` recalculates **13.2 g CO₂e**.
- Add checks that study changes cannot inherit another dataset's factor, controls, unit or denominator; Gemini cannot produce an expected total by multiplying its median; source/version/historical/projection qualifications render.
- Verify updated ID/EN content and dynamic labels, with interaction state retained across language changes.
- Verify keyboard access, visible focus, sensible heading hierarchy, working preserved anchors, unique IDs, meaningful no-data states and accessible numerical alternatives.
- Check desktop and 390 px / 320 px widths in both languages, reduced motion, no console errors or failed assets, and no horizontal overflow. Test no-JS educational fallbacks against the production build because development CSS is injected through JavaScript.
- Confirm the current hero, illustrations, cinematic motion, team content and calculator handoff remain intact. New full education sections must not be unintentionally duplicated on home.
- Deliver screenshots of home preview, education flow and each research view, plus a short verification note with actual commands/results and remaining limitations.

## Communication and educational basis

These sources inform the proposed learning structure; they do not establish a guaranteed completion time, behavior change or emissions reduction for this website.

- UNESCO AI Competency Framework: understanding, application, creation and critical judgment — https://www.unesco.org/en/articles/ai-competency-framework-students
- UNESCO Greening Curriculum Guidance: action-oriented, scientifically accurate education — https://www.unesco.org/en/articles/greening-curriculum-guidance-teaching-and-learning-climate-action
- UN climate communication: relatable stories, solutions, agency and youth participation — https://www.un.org/en/climatechange/communicating-climate-change
- W3C clear content: familiar wording, short text blocks and understandable numerical explanations — https://www.w3.org/WAI/WCAG2/supplemental/objectives/o3-clear-content/

Implementation is the next developer task. This handoff adds the brief only; it does not implement, commit, push or deploy the website changes.
