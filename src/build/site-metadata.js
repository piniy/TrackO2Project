// Public origin supplied by the site owner. Preview metadata must use absolute
// URLs because sharing crawlers do not run the app's client-side JavaScript.
export const siteOrigin = 'https://track-o2-project.vercel.app';
export const shareImageUrl = `${siteOrigin}/assets/images/brand/tracko2-share.png?v=20261029-2`;

const attribute = text => String(text).replace(/[&<>"']/g, character => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
})[character]);

export function buildSharedMetadata({ page, title, description }) {
  const pageUrl = new URL(page, `${siteOrigin}/`).href;
  const values = { title, description, pageUrl, image: shareImageUrl };
  const meta = (key, value, property = false) => `<meta ${property ? 'property' : 'name'}="${key}" content="${attribute(value)}">`;
  return [
    '<link rel="icon" type="image/png" sizes="64x64" href="/favicon.png?v=20261031-2">',
    '<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png?v=20261031-2">',
    `<link rel="canonical" href="${attribute(pageUrl)}">`,
    meta('og:type', 'website', true),
    meta('og:site_name', 'TraCkO2', true),
    meta('og:locale', 'id_ID', true),
    ...Object.entries({ title: values.title, description: values.description, url: values.pageUrl, image: values.image }).map(([key, value]) => meta(`og:${key}`, value, true)),
    meta('og:image:type', 'image/png', true),
    meta('og:image:width', '1200', true),
    meta('og:image:height', '630', true),
    meta('og:image:alt', 'Logo TraCkO2: daun hijau, O₂, dan tanda seru.', true),
    meta('twitter:card', 'summary_large_image'),
    meta('twitter:title', values.title),
    meta('twitter:description', values.description),
    meta('twitter:image', values.image),
    meta('twitter:image:alt', 'Logo TraCkO2: daun hijau, O₂, dan tanda seru.')
  ].join('\n');
}
