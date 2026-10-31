# Asset sources

## Team portraits — 29 October 2026

- `public/assets/images/rafi.jpg`: user-supplied `IMG-20261028-WA0029.jpg`, selected as the replacement for Rafi's team profile.
- `public/assets/images/vania.jpg`: user-supplied `IMG-20261028-WA0035.jpg`, selected for Carissa Vania's team profile.

Both originals are copied unchanged. Per-member CSS framing crops the surrounding scenery for the portrait cards without altering the source photographs.

Assets used in the education portal. Original assets were retrieved or copied on 25 October 2026; the homepage raster refresh below was retrieved on 27 October 2026.

- `public/assets/images/data-center.webp`: photograph supplied by the user at `D:\Competitions\Iostc undip 2026\data center.webp`, copied without editing. The image shows energy infrastructure and a data center building. Cooling tower vapor is not presented as visible carbon emissions.
- `public/assets/images/tracko2-logo.webp`: existing project logo, copied from the archived original site. Converted to WebP for delivery.
- `public/assets/images/hisyam.webp`, `nadin.webp`, `naufal.webp`: existing project team photographs. Names follow the original site's team section.
- `public/assets/icons/*.svg`: official, unmodified [Lucide icon files](https://github.com/lucide-icons/lucide/tree/main/icons) downloaded from `raw.githubusercontent.com/lucide-icons/lucide/main/icons/`. The locally saved copies are static; the website does not fetch icons from a CDN. License and attribution are included in `public/assets/icons/LICENSE.txt`. No SVG paths or illustrations were drawn for this redesign.

The original icon sprite remains for interface controls. The cinematic camera, route motion, typing, and scroll controller remain in place; its drawn objects were replaced with downloaded raster assets at the user's request on 27 October. Additional charts use semantic HTML and CSS. Local fonts retain their package-provided licenses and are bundled by Vite.

## Homepage raster refresh — 27 October 2026

All delivery files are served locally. Transparent PNG originals were resized and encoded as WebP without changing their colors or shapes. No new image was generated for this revision.

| Local delivery file | Original / author | Reuse terms |
| --- | --- | --- |
| `public/assets/images/data-center-hero.webp` (previous hero, no longer displayed) | Data-center photograph, Taylor Vick / Unsplash. [Photographer](https://unsplash.com/@tvick); [original CDN image](https://images.unsplash.com/photo-1558494949-ef010cbdcc31). Downloaded at 1920 × 1077. | [Unsplash License](https://unsplash.com/license), including website use and modification. Replaced by the emissions photograph below following the user's next comments. |
| `public/assets/images/emissions-hero.webp` (previous hero, no longer displayed) | [A Factory at Dusk, Lal Toraman / Pexels](https://www.pexels.com/photo/a-factory-at-dusk-16102539/), 1920 × 1280 delivery. | [Pexels License](https://www.pexels.com/license/). Superseded by the user-supplied image below. |
| `public/assets/images/emissions-hero-current.webp` (current hero) | User-supplied `D:\Competitions\Iostc undip 2026\ChatGPT Image Oct 27, 2026, 01_12_34 PM.jpg`, converted to WebP for delivery. | Provenance: supplied and selected by the user for this website. The former Pexels photographer credit was removed because it referred to the previous image. This replacement was edited directly without build, tests, or browser verification, as requested. |
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

## Research chart themes — 28 October 2026

The electricity, converted-emissions, and water charts use local Lucide assets: battery-charging.svg, cloud.svg, waves-horizontal.svg, cpu.svg, memory-stick.svg, and fan.svg. Retrieved unchanged from https://raw.githubusercontent.com/lucide-icons/lucide/main/icons/ on 28 October 2026. ISC license and copyright notice are retained in public/assets/icons/LICENSE.txt. Existing zap, droplet, and server icons are reused. Icons and CSS textures identify the resource; they do not encode additional measurements. The cloud is a symbol for greenhouse-gas emissions, not a photograph of CO2.

Design references: [CFPB data visualization guidelines](https://cfpb.github.io/design-system/guidelines/data-visualization-guidelines), [SUNIVA energy dashboard](https://suniva.ch/solarpotenzial/eigenverbrauch-optimierung), and [Siemens daily water usage](https://sid.siemens.com/r/A6V15485821/widgets/daily-water-usage/_daily-water-usage?contentId=rxzWBcLPc3ZM3Ojc~sKg9A). References informed resource colors and clear component labels; no dashboard screenshots are bundled. All study values, logarithmic energy scaling, and linear stacked water scaling remain unchanged.

## Homepage education preview photographs (28 October 2026)

These are illustrative examples of computing and infrastructure; the photographs do not depict the particular AI systems discussed in the educational material and do not provide emissions or water measurements. The source pages identify each image as CC0 1.0; attribution is not required. Links and creators are retained here for provenance. The files are resized Wikimedia thumbnails; the CSS display may crop them.

| Local file | Depicted subject and source | Creator and license |
| --- | --- | --- |
| `public/assets/images/education/home-energy.webp` | [Front of server racks at NERSC](https://commons.wikimedia.org/wiki/File:Front_of_server_racks_at_NERSC.jpg), 14 October 2011. | Derrick Coetzee · [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/) |
| `public/assets/images/education/home-emissions.webp` | [Dry Fork Station coal-fired power plant, Wyoming](https://commons.wikimedia.org/wiki/File:Dry_Fork_Station_coal-fired_power_plant_in_Campbell_County,_Wyoming.jpg), 7 March 2019. This is one electricity source, not a representation of all electricity generation; do not describe visible plumes as CO₂. | Mr. Satterly · [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/) |
| `public/assets/images/education/home-water.webp` | [Marley cooling tower at NERSC](https://commons.wikimedia.org/wiki/File:Marley_cooling_tower_at_NERSC_(1).jpg), 14 October 2011. Do not infer this facility's water consumption from the photograph. | Derrick Coetzee · [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/) |

## Article photograph — 28 October 2026

`public/assets/images/education/students-computer.webp` is a 1280-pixel Wikimedia thumbnail of [Students using a computer](https://commons.wikimedia.org/wiki/File:Students_using_a_computer.jpg), by Bright Kwame Ayisi, CC0 1.0. It illustrates students using a computer, not a documented AI session. This was the previous article selection. The distinct article visuals below replace it in the article cards and reading views; existing homepage and water-section photographs remain documented above.

## Distinct education article visuals — 28 October 2026

Each of the six articles now has its own online-sourced image, shared by its card and reading view. Photographs illustrate the subject; they do not measure the cited studies or AI impacts. Diagrams explain concepts, with their full labels and arrows retained. All delivery files are local optimized WebP images; card photographs may crop in CSS, while diagrams use `contain`. Attribution and license links appear on every card and in every reading view. Delivery transformations are documented in the credits manifest. Share-alike image derivatives retain their source licenses. Full original URLs, dimensions, transformation notes and contextual limits are recorded in `public/assets/images/education/articles/credits.json`.

| Article | Local delivery file | Image source / creator | Reuse terms |
| --- | --- | --- | --- |
| `jejak-karbon` | `public/assets/images/education/articles/electricity-grid.webp` | [Electricity pylon File 002.jpg](https://commons.wikimedia.org/wiki/File:Electricity_pylon_File_002.jpg) · Novoklimov | [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/) |
| `jejak-air` | `public/assets/images/education/articles/water-cooling.webp` | [Crossflow diagram.svg](https://commons.wikimedia.org/wiki/File:Crossflow_diagram.svg) · Eric Dreher / Zerodamage | [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/) |
| `energi-pusat-data` | `public/assets/images/education/articles/data-center-power.webp` | [EPS 6000 Row A.jpg](https://commons.wikimedia.org/wiki/File:EPS_6000_Row_A.jpg) · Robert.Harker | [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/) |
| `prompt-bijak` | `public/assets/images/education/articles/planning-a-question.webp` | [Person writing in notebook while using laptop at a modern workspace.jpg](https://commons.wikimedia.org/wiki/File:Person_writing_in_notebook_while_using_laptop_at_a_modern_workspace.jpg) · Shixart1985 | [CC BY 2.0](https://creativecommons.org/licenses/by/2.0/) |
| `pelatihan-inferensi` | `public/assets/images/education/articles/training-inference.webp` | [Conceptual illustration of the process of training and inference — Figure 1](https://www.mdpi.com/1424-8220/21/7/2364) · Donghee Ha, Mooseop Kim, KyeongDeok Moon, and Chi Yoon Jeong | [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) |
| `air-dan-lokasi` | `public/assets/images/education/articles/water-location.webp` | [Danau Sentarum musim kemarau 2.jpg](https://commons.wikimedia.org/wiki/File:Danau_Sentarum_musim_kemarau_2.jpg) · Rendika Wijayanto | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) |
# Brand icon and shared-link preview — 29 October 2026

User-provided artwork: `C:/Users/DELL/Downloads/Untitled design (2).webp`. Original copied unchanged to `public/assets/images/brand/tracko2-icon-source.webp`. The existing logo was prepared deterministically with Pillow: trim empty padding, preserve artwork proportions/colors and the original background, and center it for the required output sizes. No generative alterations were made.

- `public/favicon.png`: 64 × 64 browser icon.
- `public/favicon.ico`: 16/32/48/64 px fallback.
- `public/apple-touch-icon.png`: 180 × 180 touch icon.
- `public/assets/images/brand/tracko2-share.png`: 1200 × 630 link-preview image.

Open Graph and Twitter metadata reference the owner-supplied public origin `https://track-o2-project.vercel.app`; the files still need to be included in a deployment before social services can fetch the updated artwork.

### Favicon-only revision

The user subsequently supplied `C:/Users/DELL/Downloads/Untitled design (5).webp` for the browser favicon only. Its original is preserved as `public/assets/images/brand/tracko2-favicon-source.webp`. Transparent outer padding was trimmed, preserving the white frame, mint panel, logo artwork, and alpha channel. `public/favicon.png` and `public/favicon.ico` now use this version; the favicon URL is versioned `20261029-3`. The shared-link image and touch icon retain the previous artwork.

### Favicon replacement — 30 October 2026

User-provided `C:/Users/DELL/Downloads/Untitled design.png` replaces the browser favicon. The original is preserved unchanged as `public/assets/images/brand/tracko2-favicon-source.png`. The complete square artwork, including its white border and transparency, was resized with Pillow to the 64 × 64 PNG and 16/32/48/64 px ICO. The favicon URL is versioned `20261030-1` to refresh browser caches.


### Website and Android icon replacement — 31 October 2026

User-provided `C:/Users/DELL/Downloads/Untitled design (1).png` (2000 × 2000 RGBA) now supplies the website favicon and Android launcher icon. The original is preserved unchanged as `public/assets/images/brand/tracko2-favicon-source.png` and in the Android repository at `docs/assets/tracko2-app-icon-source.png`. Pillow performs deterministic resizing only, retaining the neon glow, logo, colors and transparency. Website outputs are 64px PNG, multi-size ICO (16/32/48/64px), and 180px Apple touch icon; cache version `20261031-1`. Android includes mdpi through xxxhdpi launcher PNGs and an adaptive icon: the full artwork occupies 72dp of a 108dp foreground canvas over its original dark green (#17320B), allowing launcher masks without cutting the central logo. Shared-link previews and the site header logo retain their existing artwork.

### Updated website and Android icon — 31 October 2026

The later user-provided `C:/Users/DELL/Downloads/Untitled design (2).png` (2000 × 2000 RGBA) supersedes the preceding icon. Its unchanged original replaces both source PNGs above. System.Drawing performs deterministic bicubic resizing, preserving the white frame, mint panel, logo and transparent outer corners. Website outputs are the 64px PNG, 16/32/48/64px ICO and 180px Apple touch icon, with cache version `20261031-2`. Android density icons are 48/72/96/144/192px; the adaptive foreground is 432px with the complete artwork centered at 288px over mint `#CAF2CE`, sampled from the source panel. The shared-link preview and header logo retain their existing artwork.


### Android download-page device mockup — 31 October 2026

The iPhone-style frame in `android.html` and `src/styles/android.css` is original HTML/CSS, visually informed by the online reference https://github.com/marvelapp/devices.css (pure CSS phones and tablets). No third-party code or device image is bundled. The screen is an illustrative rendering based on the neighboring Android project’s manual-entry Overview, with an empty estimate rather than invented usage. The caption identifies it as an illustration for the Android app. The download remains Android-only.
