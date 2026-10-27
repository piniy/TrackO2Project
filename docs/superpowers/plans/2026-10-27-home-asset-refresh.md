# Homepage Asset Refresh Implementation Plan

> **For agentic workers:** Implement the following tasks in this session with separate ownership for asset research and journey changes. Review and integrate each deliverable before browser verification.

**Goal:** Apply the eight browser comments with a photographic hero, playful downloaded 3D service assets, natural journey objects, and focused cinematic lighting.

**Architecture:** Keep the existing Vite multipage site and Alpine journey controller. Serve downloaded raster assets locally; retain SVG only as the journey camera/routes container. Scope home styling to the hero/services and journey styling to its existing component.

**Tech Stack:** Vite 8, Alpine.js 3, Inter, plain CSS, local WebP/PNG assets, Node tests, browser checks.

## Global Constraints

- User confirmed playful 3D service icons with original colors and an interior data-center hero photo.
- Preserve the original logo, site navigation, calculator behavior, and cinematic scroll sequence.
- Retain Indonesian/English switching, accessible navigation, reduced motion, and no-JavaScript content.
- Download publicly available assets with documented reuse terms; no new hand-drawn object illustrations.
- No new runtime dependencies or deployment is needed.

## Design

Keep forest `#103f35`, leaf `#579f3f`, lime `#b9ef78`, paper `#f5f6f7`, ink `#202b2a`, and white `#ffffff`. Inter remains the display/body face to preserve the site's identity. The hero uses a full-bleed data-center photo with a dark left scrim and the hierarchy `Selamat datang di TraCkO2` → current title → description → two existing actions. The services use four open silhouettes above their names; no surrounding pastel cards. The signature remains the cinematic camera, now moving between physical-looking objects under a focused vignette with a dark text area.

```text
HERO:      [welcome / title / description / actions]  [full-bleed server photo]
SERVICES:                  Jelajahi Layanan
                 [book] [calculator] [game] [team]
                  name      name     name   name
JOURNEY:   [lit active physical object] [dark side: stage title / explanation]
                         four existing chapter controls
```

### Task 1: Download and prepare reusable assets

**Files:** create `public/assets/images/services/*`, `public/assets/images/journey/*`, `public/assets/images/data-center-hero.webp`; update `docs/asset-sources.md`.

**Interfaces:** component URLs are root-relative local paths. Asset research provides original source URLs, license URLs, and native dimensions. Image optimization preserves transparency and natural colors.

- [x] Select one cohesive playful 3D service kit and physical journey assets from primary sources.
- [x] Download originals, convert delivery copies to WebP at useful sizes, and retain applicable license text.
- [x] Record file → author → original URL → license in `docs/asset-sources.md`.

### Task 2: Hero and services

**Files:** modify `index.html`, `src/styles/welcome.css`, `src/styles/content-additions.css`, `src/i18n/catalogue.js`.

**Interfaces:** keep `#welcome-heading`, `#layanan`, existing service destinations and hero action destinations.

- [x] Move the hero image outside the content grid and render it full bleed:

```html
<img class="welcome-photo" src="/assets/images/data-center-hero.webp" alt="Deretan rak server di dalam pusat data" width="1920" height="1280" fetchpriority="high">
<div class="container welcome-layout"><div class="welcome-copy">
  <p class="welcome-label">Selamat datang di <span data-i18n-ignore>TraCkO2</span></p>
  <h1 id="welcome-heading">AI membantu belajarmu.<br>Kenali juga <span>jejaknya.</span></h1>
</div></div>
```

- [x] Apply `position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover` to the photograph, an opaque left-to-transparent right scrim, and white content with lime title emphasis.
- [x] Center `Jelajahi Layanan`, remove card backgrounds/descriptions, and use four local raster asset compositions above existing names.
- [x] Add hover/focus lift with a small rotation to the image wrapper and a reduced-motion rule that removes the transform.
- [x] Add ID/EN entries for the new welcome line, services heading, and image alt text.

### Task 3: Physical journey objects and vignette

**Files:** modify `src/components/journey.html`, `src/styles/journey.css`; modify `src/features/journey.js` only for layout geometry if needed.

**Interfaces:** preserve `promptJourney`, `cameraTransform`, `nodeTransform`, route/signal methods, stage controls, and typing bindings.

- [x] Replace drawn laptop/server/electricity/emissions objects with local raster `<image>` objects. Overlay the existing live prompt text in the MacBook screen opening.
- [x] Keep the current forward-moving timeline and use the current object position as the light focus.
- [x] Place explanation on a dark right side on desktop and below the art on mobile; preserve all four explanations in the static fallback.
- [x] Verify all four chapter controls still scroll to their intended stage and the final calculator action remains reachable.

### Task 4: Review and verify

**Files:** create `docs/verification-home-assets-2026-10-27.md`; update this checklist with actual results.

- [x] Run `npm.cmd test` and `npm.cmd run build`; expect all tests and six Vite pages to succeed.
- [x] Inspect desktop at 1324×742 and mobile at 390×844 and 320×700. Check no horizontal overflow, all images loaded, hero hierarchy, icon hover/focus, and each journey object plus side copy.
- [x] Switch ID/EN, test reduced motion and no JavaScript, inspect console/network failures, and exercise the calculator handoff.
- [x] Review the final diff for unrelated changes and record results plus any remaining limitation.

