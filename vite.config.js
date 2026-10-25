import { defineConfig } from 'vite';
import { readFileSync } from 'node:fs';
import { resolve, basename } from 'node:path';
import { renderContent } from './src/build/content.js';

const routes = { index: 'home', kalkulator: 'calculator', edukasi: 'education', kampanye: 'campaign', referensi: 'references', game: 'game' };

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
          const fragment = ['header', 'footer', 'icons', 'calculator', 'journey'].includes(name)
            ? readFileSync(resolve(import.meta.dirname, `src/components/${name}.html`), 'utf8')
            : renderContent(name);
          return expand(fragment, [...stack, name]).replace(/data-page="([^"]+)"/g, (match, key) => `${match}${page === key ? ' aria-current="page"' : ''}`);
        });
        return expand(html.replace('</head>', '<link rel="icon" type="image/svg+xml" href="/favicon.svg"></head>'));
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
