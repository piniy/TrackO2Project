# Prompt-to-Emissions Story Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Start the homepage with a scroll-driven motion graphic tracing an AI prompt through processing, electricity use, and associated emissions, followed immediately by a usable CarbsCulator.

**Architecture:** One sticky, naturally scrolling story with inline SVG and a small Alpine controller driven by requestAnimationFrame. Calculator markup becomes a shared build-time HTML component used on both the homepage and calculator page. No animation library, backend dependency, autoplay video, scroll interception, or login requirement.

**Tech Stack:** Existing HTML/CSS/JavaScript, Alpine.js, Vite, native SVG, matchMedia, and ResizeObserver.

## Global Constraints

- User selected a scroll-driven story, with the calculator as the next section.
- Keep previous requested reference-page and footer deletions.
- Explain emissions associated with electricity supply; do not imply that server processing directly converts prompts into CO2 gas or that every prompt has the same measured footprint.
- Preserve public content and the future user-database boundary.
- Natural scrolling, keyboard stage controls, direct calculator link, and visible readable content without JavaScript.
- Reduced-motion mode uses the complete static diagram and descriptions in normal document flow; no sticky scrolling sequence.
- Short landscape screens use a compact, nonsticky version so the story cannot trap or obscure content.
- No publishing, dependency additions, or Firebase changes.

## Design

The user refined the brief to a dramatic, cinematic sequence. Keep Outfit and Plus Jakarta Sans, with a deep forest stage, soft mint objects, and warm energy highlights. Keyframed camera positions give each shot its own focus: typed prompt, traveling signal, processing server racks, electricity, a stylized energy burst, and the emissions cloud. Scroll position controls the playhead, while brief typing and low-frequency processing indicators animate locally. Four chapter controls reflect the real explanatory sequence. The burst is a graphic transition, with the narrative attributing emissions to electricity supply.

```text
Shared navigation
Sticky story
  Heading + direct calculator link
  Close-up camera shots and glowing data flights
  Four stage controls + current explanation
Calculator introduction
  Shared four-activity form + result
Existing learning and campaign sections
```

### Task 1: Shared calculator and homepage flow

**Files:** `src/components/calculator.html`, `kalkulator.html`, `index.html`, `vite.config.js`.

**Interfaces:** `<!-- site:calculator -->` expands into the existing calculator controller markup. Recursive fragment expansion also resolves its nested `activity-inputs` fragment. One calculator per page keeps input and result IDs unique.

- [x] Extract the current calculator markup without changing factors or calculation behavior.
- [x] Expand shared fragments recursively with a cycle guard.
- [x] Put the complete calculator directly after the new story; retain the dedicated calculator page and method links.

### Task 2: Motion graphic and interaction

**Files:** `src/components/journey.html`, `src/features/journey.js`, `src/styles/journey.css`, `src/main.js`, `src/styles/main.css`.

**Interfaces:** `getJourneyState(sectionTop, sectionHeight, sceneHeight, stickyTop)` returns clamped `{progress, stage, localProgress}`; `promptJourney` exposes this state, `enhanced`, and `goTo(index)` for stage controls. Media-query and resize listeners are removed by `destroy()`.

- [x] Implement the four-stage inline SVG and static HTML descriptions.
- [x] Compute progress from geometry in a single animation frame per scroll update.
- [x] Draw route segments, move signal particles, highlight active nodes, and expose stage controls.
- [x] Add mobile, reduced-motion, no-JavaScript, and short-screen layouts.
- [x] Replace the old homepage sample and remove its unused controller and styles.

### Task 3: Validate the full transition

**Files:** `tests/journey.test.js`, `docs/verification-2026-10-25.md`, `README.md`.

- [x] Verify progress at the first and last stage, all chapter boundaries, and overscroll clamping with Node tests.
- [x] Run the complete unit tests and production build.
- [x] In the built site, scroll through all stages, use keyboard controls and the direct calculator link, and calculate the existing 13.20g example on both pages.
- [x] Check desktop, narrow mobile, landscape, reduced motion, and no-JavaScript fallback. Inspect stage and calculator screenshots.
- [x] Document scope and observed results. Execute inline under the user's request; companion superpowers execution skills are unavailable.

