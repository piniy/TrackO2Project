// Keep these styles inline: the loading state must paint before the module graph
// (including the main stylesheet) has downloaded.
export const loadingHead = `<style id="page-loading-styles">
.page-skeleton { display: none; }
html[data-page-loading] { overflow: hidden; background: #f5f6f7; }
html[data-page-loading] body { margin: 0; }
html[data-page-loading] body > :not(.page-skeleton) { visibility: hidden !important; }
html[data-page-loading] .page-skeleton {
  display: block; position: fixed; inset: 0; z-index: 1000; overflow: hidden;
  background: #f5f6f7; color: #103f35; font: 14px/1.5 system-ui, sans-serif;
}
.page-skeleton, .page-skeleton * { box-sizing: border-box; }
.page-skeleton-shell { width: min(1200px, calc(100% - 96px)); margin-inline: auto; }
.page-skeleton-header { height: 88px; border-bottom: 1px solid #103f3514; }
.page-skeleton-header .page-skeleton-shell { height: 100%; display: flex; align-items: center; justify-content: space-between; gap: 32px; }
.page-skeleton-brand { font-size: 29px; font-weight: 600; letter-spacing: -.8px; }
.page-skeleton-nav { display: flex; gap: 28px; }
.page-skeleton-block { display: block; position: relative; overflow: hidden; border-radius: 7px; background: #dfe6e1; }
.page-skeleton-block::after { content: ''; position: absolute; inset: 0; background: linear-gradient(100deg, transparent 20%, #ffffff65 50%, transparent 80%); transform: translateX(-100%); animation: skeleton-sweep 1.8s ease-in-out infinite; }
.page-skeleton-nav .page-skeleton-block { width: 68px; height: 12px; }
.page-skeleton-hero { padding-block: 90px 64px; }
.page-skeleton-copy { max-width: 620px; display: grid; gap: 20px; }
.page-skeleton-label { width: 150px; height: 12px; }
.page-skeleton-title { width: 85%; height: 58px; }
.page-skeleton-subtitle { width: 65%; height: 38px; }
.page-skeleton-lines { display: grid; gap: 12px; margin-top: 10px; }
.page-skeleton-line { height: 13px; width: 80%; }
.page-skeleton-line:last-child { width: 60%; }
.page-skeleton-actions { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 14px; }
.page-skeleton-button { width: 190px; height: 52px; border-radius: 9px; }
.page-skeleton-button:last-child { width: 160px; }
.page-skeleton-cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; padding-block: 24px; }
.page-skeleton-card { height: 180px; border-radius: 16px; }
body[data-page="home"] .page-skeleton-hero { min-height: calc(100svh - 88px); display: flex; align-items: center; background: #103f35; }
body[data-page="home"] .page-skeleton-hero .page-skeleton-block { background: #ffffff1c; }
body[data-page="home"] .page-skeleton-title { height: 88px; width: 75%; }
body[data-page="home"] .page-skeleton-hero .page-skeleton-block::after { opacity: .3; }
.page-skeleton-status { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }
@keyframes skeleton-sweep { to { transform: translateX(100%); } }
@media (max-width: 720px) {
  .page-skeleton-shell { width: calc(100% - 40px); }
  .page-skeleton-header { height: 76px; }
  .page-skeleton-nav .page-skeleton-block { display: none; }
  .page-skeleton-nav .page-skeleton-block:last-child { display: block; width: 28px; height: 22px; }
  .page-skeleton-hero { padding-block: 64px 40px; }
  .page-skeleton-title { height: 44px; width: 95%; }
  .page-skeleton-subtitle { height: 30px; width: 80%; }
  .page-skeleton-line { width: 95%; }
  .page-skeleton-cards { grid-template-columns: 1fr; gap: 16px; }
  .page-skeleton-card { height: 130px; }
  body[data-page="home"] .page-skeleton-hero { min-height: calc(100svh - 76px); }
  body[data-page="home"] .page-skeleton-title { height: 64px; width: 85%; }
}
@media (prefers-reduced-motion: reduce) { .page-skeleton-block::after { animation: none; display: none; } }
</style>
<script>
(() => {
  const root = document.documentElement;
  root.setAttribute('data-page-loading', '');
  root.setAttribute('aria-busy', 'true');
  const reveal = () => {
    clearTimeout(timeout);
    root.removeAttribute('data-page-loading');
    root.removeAttribute('aria-busy');
    document.querySelector('.page-skeleton')?.remove();
    document.removeEventListener('tracko2:ready', reveal);
  };
  // A failed module request must not leave the static page behind a loader.
  const timeout = setTimeout(reveal, 15000);
  document.addEventListener('tracko2:ready', reveal, { once: true });
})();
</script>`;

export const loadingBody = `<div class="page-skeleton" role="status" aria-live="polite">
  <span class="page-skeleton-status">Memuat halaman… / Loading page…</span>
  <div aria-hidden="true">
    <div class="page-skeleton-header"><div class="page-skeleton-shell">
      <span class="page-skeleton-brand">TraCkO₂</span>
      <div class="page-skeleton-nav"><span class="page-skeleton-block"></span><span class="page-skeleton-block"></span><span class="page-skeleton-block"></span><span class="page-skeleton-block"></span></div>
    </div></div>
    <div class="page-skeleton-hero"><div class="page-skeleton-shell"><div class="page-skeleton-copy">
      <span class="page-skeleton-block page-skeleton-label"></span>
      <span class="page-skeleton-block page-skeleton-title"></span>
      <span class="page-skeleton-block page-skeleton-subtitle"></span>
      <div class="page-skeleton-lines"><span class="page-skeleton-block page-skeleton-line"></span><span class="page-skeleton-block page-skeleton-line"></span><span class="page-skeleton-block page-skeleton-line"></span></div>
      <div class="page-skeleton-actions"><span class="page-skeleton-block page-skeleton-button"></span><span class="page-skeleton-block page-skeleton-button"></span></div>
    </div></div></div>
    <div class="page-skeleton-shell page-skeleton-cards"><span class="page-skeleton-block page-skeleton-card"></span><span class="page-skeleton-block page-skeleton-card"></span><span class="page-skeleton-block page-skeleton-card"></span></div>
  </div>
</div>`;
