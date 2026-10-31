# Connected account implementation plan

**Goal:** Enter through the public website, retain a secure browser session, open the dashboard through a profile menu, and update phone metadata without manual refresh.

**Architecture:** The website uses same-origin `/auth` and `/v1` APIs from the existing Android Node/SQLite backend. Vite proxies these during development. An HttpOnly cookie restores browser identity; Android retains its existing device bearer credentials. Visible dashboards poll with retry backoff; Android uploads immediately after mutations with scheduled network retries.

**Tech stack:** Vite, Alpine, Node 24 SQLite, Kotlin JobScheduler.

**Constraints:** Preserve existing uncommitted work, manual activity provenance, account isolation, revisioned snapshots, and educational estimate labels. Do not deploy or publish. Keep public education available without signing in.

## Tasks

- [x] Backend: add cookie sessions and `GET /auth/session`, validate browser mutation origins, retain bearer API compatibility, and optionally serve the built public website. Test cookie restoration/logout, cross-origin rejection and device isolation in `../TrackO2Android/backend/server.test.mjs` using `node --test backend/server.test.mjs` from the Android repository.
- [x] Website: add `src/services/account.js`, `src/features/account.js`, account styles, `login.html`, and `dashboard.html`; register Alpine components and shared profile navigation, plus Vite routes/proxies. Use existing forest, lime, paper, white and slate tokens. Login uses a compact form beside a forest panel; dashboard uses activity metrics, pairing and chronological history. Verify registration, sign-out, session restoration and mobile layout in a browser.
- [x] Android: trigger immediate sync after metadata mutations and app resume, coalesce queued work, and retain JobScheduler retries. Run `:app:assembleDebug :app:testDebugUnitTest :app:lintDebug`; verify uploads against the backend where a device is available.
- [x] Documentation: describe same-origin hosting, local start commands, automatic update cadence and offline limitations. Run website tests/build and backend tests. Record actual verification and remaining deployment/device limitations.
