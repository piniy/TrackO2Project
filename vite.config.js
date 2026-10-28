import { defineConfig } from 'vite';
import { readFileSync } from 'node:fs';
import { resolve, basename } from 'node:path';
import { renderContent } from './src/build/content.js';
import { loadingHead, loadingBody } from './src/build/loading.js';

const routes = { index: 'home', kalkulator: 'calculator', edukasi: 'education', referensi: 'references', game: 'game' };

export default defineConfig({
  appType: 'mpa',
  plugins: [{
    name: 'tracko2-static-content',
    transformIndexHtml: {
      order: 'pre',
      handler(html, context) {
        const page = routes[basename(context.filename, '.html')];
        const expand = (source, stack = []) => source.replace(/<!-- site:([a-z-]+) -->/g, (_, name) => {
          if (stack.includes(name)) throw new Error(`Circular HTML fragment: ${[...stack, name].join(' -> ')}`);
          const fragment = ['header', 'footer', 'icons', 'calculator', 'calculator-trial', 'team', 'journey', 'education', 'education-preview', 'education-concepts', 'education-principles', 'formula', 'calculation-formula'].includes(name)
            ? readFileSync(resolve(import.meta.dirname, `src/components/${name}.html`), 'utf8')
            : renderContent(name);
          // Only the education route continues to the next lesson; home keeps
          // the calculator action and both use the same cinematic fragment.
          const content = name === 'journey' && page === 'education'
            ? fragment.replace('href="#carbsculator"', 'href="#pahami"').replace('Sekarang, coba hitung aktivitasmu', 'Lanjut: pahami energi, emisi, dan air')
            : fragment;
          return expand(content, [...stack, name]).replace(/data-page="([^"]+)"/g, (match, key) => `${match}${page === key ? ' aria-current="page"' : ''}`);
        });
        return expand(html
          .replace('<head>', `<head>${loadingHead}`)
          .replace(/<body\b[^>]*>/, match => `${match}${loadingBody}`)
          .replace('</head>', '<link rel="icon" type="image/svg+xml" href="/favicon.svg"></head>'));
      }
    }
  }],
  server: { port: 5173, strictPort: true },
  preview: { port: 4173, strictPort: true },
  build: {
    target: 'es2022',
    rolldownOptions: { input: Object.fromEntries(Object.keys(routes).map(name => [name, resolve(import.meta.dirname, `${name}.html`)])) }
  }
});
