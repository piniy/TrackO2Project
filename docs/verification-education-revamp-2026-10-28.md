# Education page revamp — 28 October 2026

Implemented the user's latest browser comments and visual direction. This revision supersedes the initial Kenali/Pahami/Pilih/Ajak page structure and the earlier six-task default.

## Current page

1. A centered, bold, near-black **Edukasi** heading (English: **Education**), the campaign subtitle, a clearly labeled video placeholder, a short description, and one action to the existing motion graphic.
2. The existing cinematic prompt journey, directly after the opening section.
3. Connected core concepts about computation, electricity, emissions and water. A real CERN server-room photograph and familiar 3D illustrations make the physical process visible before the research examples.
4. A narrative research section: all ten task bars appear immediately, sorted by energy; selecting a task updates its illustrated explanation. Energy/carbon controls, Li request/location controls, Gemini energy components, and historical task choices remain interactive and source-specific.
5. An invitation to test understanding on the existing game page.
6. The original further-reading library.

The Ajak section, introductory navigation, separate Kenali introduction, requested eyebrow and chatbot-factor sentence, and task-expansion button are removed. The previously deleted numerical tables and callouts were not restored.

The video is an intentional placeholder: there is no fake player, missing video URL or replacement video asset. Its container is `.education-video-slot` in `edukasi.html`, ready to replace with the user's video later.

## References and assets

The design uses the existing homepage palette, Inter typography and 3D illustration language. Online references informed the presentation:

- [NASA Kids Science: Earth](https://science.nasa.gov/kids/earth/) — familiar, illustrated explanations and clear purposes for watching, reading and playing.
- [Our World in Data: Energy Production and Consumption](https://ourworldindata.org/energy-production-consumption) — a brief narrative before a chart, with units and source context beside it.
- [Google Data Centers: Operating sustainably](https://www.datacenters.google/operating-sustainably/) — infrastructure photography and explanations connecting heat, electricity and cooling. Provider marketing claims were not adopted as universal study results.

New local assets include Florian Hirzinger's CERN server-room photograph (CC BY-SA 3.0), Fadillah Jafar's Koto Panjang reservoir photograph (CC BY 3.0), and Microsoft's Fluent Emoji 3D droplet (MIT). Visible credits accompany the images; source, license and preparation details are in [the media reference note](education-design-references-2026-10-27.md) and `public/assets/images/education/credits.json`. The photos illustrate infrastructure and local water context; they are not measurements of the services in the studies.

## Actual verification

| Command / check | Result |
| --- | --- |
| `npm.cmd test` | 46 passed, 0 failed |
| `npm.cmd run build` | Passed; all six HTML entry pages emitted |
| `node docs/verify-education-campaign.mjs` | 48 production browser layout/locale/study checks and six no-JS route checks passed |
| `git diff --check` | Passed |
| Built HTML internal-anchor check | Six pages checked; no missing internal fragment targets |

Browser checks used the production preview at `http://127.0.0.1:4173/`, isolated bundled Playwright and installed Chromium. They covered ID/EN at 1440, 390 and 320 px; all three study views with metadata open at narrow widths; keyboard focus and anchor activation; ten visible task bars without an expansion step; source/metric/location/request selections surviving language changes; Gemini's absence of request multiplication; historical email/report selection; the direct opening-to-journey flow; no Ajak; and a working game invitation.

The home calculator dialog and count-only handoff still recalculate the sample counts as **13.2 g CO₂e**. The numerical regressions remain **865.1232 g CO₂e per 1,000 study inferences** and **391.84 mL** for the Indonesia 20-request scenario, with matching component sums. Proposal factors and calculator behavior are unchanged.

No page exceptions, console errors, failed assets, duplicate IDs, extra/missing H1s or document overflow were found. Production CSS and static source summaries remain available without JavaScript. The English H1 was explicitly checked; image proportions were visually reviewed after the final CSS fixes.

## Further-reading preservation

The user requested no changes to Materi lanjutan. Its HTML, `src/content/articles.js`, and `src/i18n/content-en.js` match their pre-revamp checksums byte for byte:

- Library HTML: `19A48918C43124D7EF5D4184B216FAAEF1722C907D481D5CF401B017842E3541`
- Article data: `866B87E693A3F7A31E0B288B409BC7588C461C5B0A6A7E398D908438E89497D0`
- English collection content: `659C68D1C3B744E410149D3A4F080314CBC82EC464D7AFFFADF96B56C2B357B8`

## Screenshots and evidence

- [Opening, desktop](screenshots/education-revamp-2026-10-28/education-introduction.png)
- [Opening, Indonesian at 320 px](screenshots/education-revamp-2026-10-28/education-intro-id-320.png), [English at 320 px](screenshots/education-revamp-2026-10-28/education-intro-en-320.png)
- [Illustrated core concepts](screenshots/education-revamp-2026-10-28/education-principles.png)
- [All ten energy tasks](screenshots/education-revamp-2026-10-28/research-luccioni.png)
- [Li water scenarios](screenshots/education-revamp-2026-10-28/research-li.png), [Gemini](screenshots/education-revamp-2026-10-28/research-gemini.png), [historical scenarios](screenshots/education-revamp-2026-10-28/research-shumba.png)
- [Game invitation](screenshots/education-revamp-2026-10-28/education-knowledge.png), [complete education page](screenshots/education-revamp-2026-10-28/education-flow.png)
- [Browser results](screenshots/education-revamp-2026-10-28/browser-results.json)

Captures use reduced motion for settled graphics. Section-only captures temporarily hide the sticky header and skip link so they do not cover the captured content; product navigation remains unchanged.

## Limits

This is local implementation and verification, with no commit, push or deployment. The video content awaits the user's asset. Browser QA used Chromium emulation, not physical phones or a screen-reader session. The design references and interface do not establish a measured learning outcome or verified emissions reduction.
