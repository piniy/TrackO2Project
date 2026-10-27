# Asset sources

Assets used in the education portal. Original assets were retrieved or copied on 25 October 2026; the homepage raster refresh below was retrieved on 27 October 2026.

- `public/assets/images/data-center.webp`: photograph supplied by the user at `D:\Competitions\Iostc undip 2026\data center.webp`, copied without editing. The image shows energy infrastructure and a data center building. Cooling tower vapor is not presented as visible carbon emissions.
- `public/assets/images/tracko2-logo.png`: existing project logo, copied from the archived original site. It remains the original raster artwork.
- `public/assets/images/hisyam.jpg`, `nadin.jpg`, `naufal.jpg`: existing project team photographs. Names follow the original site's team section.
- `public/assets/icons/*.svg`: official, unmodified [Lucide icon files](https://github.com/lucide-icons/lucide/tree/main/icons) downloaded from `raw.githubusercontent.com/lucide-icons/lucide/main/icons/`. The locally saved copies are static; the website does not fetch icons from a CDN. License and attribution are included in `public/assets/icons/LICENSE.txt`. No SVG paths or illustrations were drawn for this redesign.

The original icon sprite remains for interface controls. The cinematic camera, route motion, typing, and scroll controller remain in place; its drawn objects were replaced with downloaded raster assets at the user's request on 27 October. Additional charts use semantic HTML and CSS. Local fonts retain their package-provided licenses and are bundled by Vite.

## Homepage raster refresh — 27 October 2026

All delivery files are served locally. Transparent PNG originals were resized and encoded as WebP without changing their colors or shapes. No new image was generated for this revision.

| Local delivery file | Original / author | Reuse terms |
| --- | --- | --- |
| `public/assets/images/data-center-hero.webp` (previous hero, no longer displayed) | Data-center photograph, Taylor Vick / Unsplash. [Photographer](https://unsplash.com/@tvick); [original CDN image](https://images.unsplash.com/photo-1558494949-ef010cbdcc31). Downloaded at 1920 × 1077. | [Unsplash License](https://unsplash.com/license), including website use and modification. Replaced by the emissions photograph below following the user's next comments. |
| `public/assets/images/emissions-hero.webp` (previous hero, no longer displayed) | [A Factory at Dusk, Lal Toraman / Pexels](https://www.pexels.com/photo/a-factory-at-dusk-16102539/), 1920 × 1280 delivery. | [Pexels License](https://www.pexels.com/license/). Superseded by the user-supplied image below. |
| `public/assets/images/emissions-hero.jpg` (current hero) | User-supplied `D:\Competitions\Iostc undip 2026\ChatGPT Image Oct 27, 2026, 01_12_34 PM.jpg`, copied unchanged at the user's request. | Provenance: supplied and selected by the user for this website. The former Pexels photographer credit was removed because it referred to the previous image. This replacement was edited directly without build, tests, or browser verification, as requested. |
| `public/assets/images/services/notebook.webp`, `calculator.webp`, `puzzle.webp`, `boy.webp`, `girl.webp` | Colored dynamic-angle icons by Vijay Verma, [3dicons](https://github.com/realvjy/3dicons). Original URL pattern: `https://3dicons.sgp1.cdn.digitaloceanspaces.com/v1/dynamic/color/{name}-dynamic-color.png`. | [CC0 1.0](https://github.com/realvjy/3dicons/blob/develop/LICENSE). Local terms: `public/assets/licenses/3dicons-CC0.txt`. Delivery: 360 × 360. |
| `public/assets/images/journey/electricity.webp` | `flash-dynamic-color.png`, same 3dicons collection. | CC0 1.0, same local terms. Delivery: 400 × 400. |
| `public/assets/images/journey/macbook.webp` | MacBook Air Space Gray frame from [Frames by Bunlong Heng](https://github.com/bunlongheng/frames). [Original PNG](https://raw.githubusercontent.com/bunlongheng/frames/main/public/assets/frames/macbook.png), 3306 × 1897. | MIT, copyright 2026 Bunlong Heng. Local notice: `public/assets/licenses/frames-MIT.txt`. Delivery: 1200 × 689. The prompt is live text layered into the measured screen opening, not part of the downloaded frame. |
| `public/assets/images/journey/servers.webp` | [Server Rack, Grab3D](https://grab3d.com/models/electronics/server-rack/), natural white/gray 3D rack render. Excess transparent canvas padding was trimmed for the existing scene framing. | CC0 1.0; the downloaded package notice explicitly covers its models, textures, and images. Local notice: `public/assets/licenses/grab3d-CC0.txt`. Replaces the initial Thiings asset so the visible footer asset-credit row can be removed as requested. |
| `public/assets/images/calculator/chat.webp`, `summary.webp`, `writing.webp`, `image.webp` | 3dicons by Vijay Verma, colored dynamic-angle `chat-bubble`, `file-text`, `pencil`, and `picture` assets. The large calculator reuses `services/calculator.webp`. | CC0 1.0; same kit and local `3dicons-CC0.txt` notice as the service icons. Sources are documented with the implementation verification. |
| `public/assets/images/journey/emissions.webp` | Microsoft [Fluent Emoji 3D Factory](https://github.com/microsoft/fluentui-emoji/tree/main/assets/Factory), [original PNG](https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Factory/3D/factory_3d.png). | MIT, copyright Microsoft Corporation. Local notice: `public/assets/licenses/fluent-emoji-MIT.txt`. Delivery: 256 × 256, original resolution. |
| `public/assets/images/journey/cloud.webp` | Microsoft [Fluent Emoji 3D Cloud](https://github.com/microsoft/fluentui-emoji/tree/main/assets/Cloud), [original PNG](https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Cloud/3D/cloud_3d.png). | MIT, same local notice. Delivery: 256 × 256, original resolution. |

The factory and cloud form a symbolic illustration of emissions associated with supplying electricity. The CO₂ text labels the concept; the image does not represent visible CO₂, measured emissions, or emissions directly released by the AI server. The service team icon combines the two original 3dicons people assets using CSS positioning.

The initial Thiings server was replaced with Grab3D's CC0 render in the second revision; no Thiings artwork is currently used. Its earlier acquisition note remains only as historical provenance. Raw download candidates are kept with local review artifacts, outside the delivery asset directories; rejected candidates are not displayed.

## School map

The shared footer embeds Google Maps for SMA Negeri 2 Semarang, Jl. Sendangguwo Baru No. 1, Gemah, Pedurungan, Semarang. Identity/address were checked against the [government school record, NPSN 20328896](https://referensi.data.kemendikdasmen.go.id/pendidikan/npsn/20328896) and the [school's own site](https://sma2smg.sch.id/v5/). The iframe is lazy-loaded, titled in the interface language, and retains Google's own map attribution. An external Google Maps link remains available below it.
