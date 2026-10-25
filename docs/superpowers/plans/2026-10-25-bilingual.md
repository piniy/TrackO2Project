# Indonesian / English Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Provide a persistent ID/EN switch across all six pages, including educational content, calculator output, game feedback, and accessibility labels.

**Architecture:** Keep Indonesian HTML as the readable fallback. A local translation catalogue and a shared Alpine store update existing static text nodes and translated attributes, while Alpine expressions translate dynamic content through `$t`. Switching language keeps inputs, filters, story position, and game state intact.

**Tech Stack:** Existing HTML/CSS/JavaScript, Alpine.js, Vite, Intl.NumberFormat, Node test runner.

## Global Constraints

- Indonesian remains the default. Persist only the language preference in `tracko2-language`; blocked storage must not break the site.
- Retain existing working changes and all scientific qualifications, identifiers, factors, source titles, media, and linked documents.
- Translate the interface and on-site text; the supplied Indonesian video and proposal retain their original language with a visible language note.
- No new dependencies, remote translation service, publishing, or database changes.

### Task 1: Locale catalogue and state

**Files:** Create `src/i18n/catalogue.js`, `src/i18n/index.js`, `tests/i18n.test.js`; modify `src/main.js`.

**Interfaces:** `translate(text, locale = 'id', values = {})` returns plain text, falling back to the Indonesian source. `readLocale(storage)` accepts only `id` or `en`. `createI18n(root, storage)` exposes `locale`, `t(text, values)`, and `setLocale(locale)`. Register this store before `Alpine.start()` and expose `Alpine.magic('t', () => (text, values) => Alpine.store('i18n').t(text, values))`.

- [x] Test translation, interpolation, unsupported locales, blocked storage, and translated search before connecting the UI.
- [x] Add English translations for static text, source summaries, articles, and all five game scenarios.
- [x] Cache original text nodes and attributes once, skipping Alpine-owned text, templates, scripts, and styles. Update their text/attribute values without replacing HTML or interactive DOM.
- [x] Initialize locale and document language before Alpine starts; handle storage failure with an in-memory preference.

### Task 2: Shared controls and feature localization

**Files:** Modify `src/components/header.html`, `src/components/calculator.html`, `src/build/content.js`, `src/features/calculator.js`, `src/features/library.js`, `game.html`, `kampanye.html`, `src/styles/main.css`.

**Interfaces:** A shared `role="group"` with ID and EN buttons calls `$store.i18n.setLocale('id' | 'en')`; each button exposes reactive `aria-pressed`. Dynamic feature text calls `$t`, and numeric output uses `Intl.NumberFormat` with `id-ID` or `en-US`. Search indexes translated visible content while topic IDs stay unchanged.

- [x] Add keyboard-accessible ID/EN controls visible with the mobile menu closed.
- [x] Translate dynamic errors, captions, breakdown labels, tier explanations, game questions/options/feedback, and number formatting without changing calculation or scoring.
- [x] Mark generated parameter numbers for locale formatting; translate filter/search text and preserve current selections.
- [x] Add original-language notes for the Indonesian video and proposal.
- [x] Check header wrapping and long English headings at desktop, mobile, and short landscape sizes.

### Task 3: Verification and handoff

**Files:** Update `README.md`; create `docs/verification-bilingual-2026-10-25.md`.

- [x] Run `npm.cmd test` and `npm.cmd run build`; expect all domain, story, and localization tests to pass and all six routes to build.
- [x] Browser-check all routes in both languages, reload and cross-page persistence, state-preserving switching in calculator/game, English search, keyboard controls, and blocked localStorage.
- [x] Inspect desktop, 390px/320px mobile, and short landscape for overflow and browser errors; check the Indonesian fallback with JavaScript disabled.
- [x] Record completed local checks and the original-language media boundary; show the running site for review.
