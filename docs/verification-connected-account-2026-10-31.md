# Connected account verification — 31 October 2026

## Implemented

The shared website navigation offers sign-in/registration and becomes a profile menu with dashboard access after authentication. Login has separate modes, password confirmation at registration, appropriate autocomplete, password visibility, submit locking and form errors. The mobile form precedes the explanatory panel. Public learning content remains accessible without an account.

The Node backend in `../TrackO2Android/backend` issues a 24-hour HttpOnly SameSite=Lax cookie and restores identity through `/auth/session`. Logout invalidates the server session. Browser mutations reject foreign origins. Device uploads still require the existing device bearer token. Built website files can be served at the API origin; HTML loading scripts receive a per-response CSP nonce. Vite dev/preview proxy both API prefixes.

Visible dashboards poll every five seconds, preserve last received data during service outages, back off to a maximum of sixty seconds, and retry on visibility/online events. Hidden tabs stop polling. Session expiry clears dashboard data and redirects to sign-in. Metrics retain the educational-estimate and self-reported-activity boundaries.

Android attempts upload immediately after metadata changes and app resume. Bursts are coalesced; mutation during an in-flight upload can queue a follow-up. Network-constrained JobScheduler retries and revisioned idempotent snapshots remain in place.

## Checks completed

- Website: 68 tests passed; production build passed.
- Backend: 10 tests passed, including cookie restoration, logout invalidation, origin rejection, Secure cookie configuration, device/account separation and existing snapshot/provenance checks.
- Android: `:app:assembleDebug :app:testDebugUnitTest :app:lintDebug` succeeded.
- Browser: registration, reload/session restoration, profile menu, pairing, simulated device snapshot upload, automatic history update, sign-out, protected-dashboard redirect, ID/EN, desktop and 390px mobile layout passed. No horizontal overflow was observed.
- Browser outage test: injected a 503 for the dashboard endpoint; connection status changed, existing activity stayed visible, and automatic recovery succeeded after restoring the endpoint and dispatching an online event. The 503 console message was expected.
- Browser fixtures used an isolated in-memory server on port 8790; simulated records were not inserted into the user's persistent development account.
- Connected Samsung SM-A556E: updated debug APK installed with `adb install -r`; existing history and pairing were retained. USB reverse port 8787 was configured. Opening the app automatically produced a successful sync timestamp in Settings. Physical creation/correction/deletion and prolonged background/offline delivery were not exercised in this turn.
- Diff whitespace checks passed in both repositories. Existing unrelated edits were retained.

Screenshots: `screenshots/account-dashboard-desktop.png`, `screenshots/account-dashboard-mobile.png`, `screenshots/account-login-mobile.png`.

## Runtime and boundaries

The local persistent server runs at `http://127.0.0.1:8787/`, serving the built public website plus account APIs. USB pairing uses that same address. Without USB reverse or a reachable HTTPS deployment, the phone cannot reach a loopback server on the laptop. No public deployment was performed. Email verification, password recovery and production hosting remain outside this local account implementation. Background delivery timing is controlled by Android.
