import test from 'node:test';
import assert from 'node:assert/strict';
import { buildSharedMetadata, shareImageUrl, siteOrigin } from '../src/build/site-metadata.js';

test('sharing metadata uses the supplied public origin and distinct canonical route URLs', () => {
  for (const page of ['index.html', 'edukasi.html', 'game.html', 'kalkulator.html', 'referensi.html']) {
    const html = buildSharedMetadata({ page, title: `Page ${page}`, description: 'A learning page' });
    assert.ok(html.includes(`rel="canonical" href="${siteOrigin}/${page}"`));
    assert.ok(html.includes(`property="og:url" content="${siteOrigin}/${page}"`));
    assert.ok(html.includes(`property="og:image" content="${shareImageUrl}"`));
    assert.ok(html.includes(`name="twitter:image" content="${shareImageUrl}"`));
    assert.ok(html.includes('content="summary_large_image"'));
    assert.ok(html.includes('property="og:image:width" content="1200"'));
    assert.ok(html.includes('property="og:image:height" content="630"'));
    assert.ok(html.includes('type="image/png" sizes="64x64" href="/favicon.png?v=20261029-3"'));
  }
});

test('authored titles and descriptions are escaped when copied into sharing attributes', () => {
  const html = buildSharedMetadata({ page: 'game.html', title: 'Games "AI" & learning', description: '<Example> with "quotes"' });
  assert.ok(html.includes('content="Games &quot;AI&quot; &amp; learning"'));
  assert.ok(html.includes('content="&lt;Example&gt; with &quot;quotes&quot;"'));
  assert.equal((html.match(/property="og:title"/g) ?? []).length, 1);
});
