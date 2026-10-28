# Education article imagery verification — 28 October 2026

This first section records the initial seven-article image replacement. The follow-up below records the user's subsequent browser-comment edits, which leave six articles.

The seven education articles now each use a distinct online-sourced visual in their card and reading view. The selection includes four photographs and three explanatory diagrams: electricity supply, cooling-tower water flow, UPS power infrastructure, planning a question, training versus inference, mean versus median, and local seasonal water conditions at Lake Sentarum.

Image selection is keyed by article ID in `src/content/article-images.js`. Captions and alt text are available in Indonesian and English. Cards and reading views include source and license links. Diagrams remain uncropped and link to the full-size local image. Delivery images are optimized local WebP files; full provenance, transformations, and contextual limits are in `public/assets/images/education/articles/credits.json` and `docs/asset-sources.md`.

## Verification

- `npm.cmd test`: 46 passed, 0 failed.
- `npm.cmd run build`: passed after the final image crop adjustment.
- Seven distinct article cover paths; all seven files loaded successfully.
- Fourteen reading-view checks (seven articles × two languages): the correct image, translated alt/caption, source, and license links.
- Three full-size diagram destinations returned image responses; their link labels translate.
- Responsive layouts at 1440, 390, and 320 pixels in both languages: no horizontal overflow. Topic filters and title search passed in each case.
- Production preview without JavaScript at 320 pixels: all seven article details and images remain readable; document width is 320 pixels.
- No browser page errors or failed article image requests.

Browser evidence: `docs/screenshots/article-images-2026-10-28/browser-results.json`. Screenshots in the same directory show the complete article grid, the training/inference reading view, and the narrow English cooling-diagram view. The final grid was inspected after adjusting the electricity-line and lakebed crops to retain their subjects.

Verification used the existing local Vite server at `http://127.0.0.1:5173/edukasi.html` and the production preview at `http://127.0.0.1:4173/edukasi.html` for the no-JavaScript check. These are local checks; no deployment was performed.

## Browser-comment follow-up — 28 October 2026

- Removed the complete “Angka kecil, konteks besar.” article, its English content, and its unused diagram. The collection and its filters/count now use six articles.
- Removed the resize/WebP notice from every article reading view. Delivery transformations remain recorded in the asset credits manifest.
- Shortened the carbon caption to “Komputasi AI memerlukan pasokan listrik.” and its English equivalent.
- Shortened the water caption to “Menara pendingin membuang panas melalui aliran udara dan penguapan sebagian air.” and its English equivalent.
- Removed the active-navigation underline selected under Home.

After these edits, `npm.cmd test` passed all 51 current tests and `npm.cmd run build` passed. New browser evidence is kept separately in `docs/screenshots/article-comments-2026-10-28/` so the initial screenshots above remain a historical record.

The focused browser follow-up passed at desktop and 320 pixels in Indonesian and English: six unique cards and the correct count, no removed article in search, all 24 reading-view checks with the shortened captions and clean image credits, and no active-navigation pseudo-element underline. Home navigation remained usable. No browser page errors or failed article image requests were recorded.
