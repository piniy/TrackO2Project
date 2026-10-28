# Education visual direction and media references — 27 October 2026

The user's current direction is a simple video introduction, the existing cinematic prompt journey, connected core concepts, approachable interactive data, an invitation to the game, then the unchanged further-reading library. The homepage's forest/lime palette, Inter typography, real photography and existing 3D assets remain the visual starting point.

## Educational and visual references

| Reference | Useful pattern | Application to TraCkO2 |
| --- | --- | --- |
| [NASA Kids Science: Earth](https://science.nasa.gov/kids/earth/) (the former Climate Kids entry redirects here) | Image-led topic entries, short familiar explanations, and clearly separated Read/Play/Watch actions. | Give video, journey and knowledge game distinct, obvious purposes. Use an illustration or photograph to introduce the physical subject before a paragraph or figure. Avoid a new abstract label for every section. |
| [Our World in Data: Energy Production and Consumption](https://ourworldindata.org/energy-production-consumption) | A paragraph introduces what the reader is about to see, then the interactive chart carries the comparison. Measurement definitions and sources stay close to their charts. | Lead with a concrete explanation of how tasks use electricity, show all ten tasks, and let a selected task explain one example. Keep units and essential study context beside the figure; keep long methods in secondary detail. |
| [Google Data Centers: Operating sustainably](https://www.datacenters.google/operating-sustainably/) and [FAQ](https://www.datacenters.google/discover-more/faq/) | Photographs make infrastructure tangible; explanations connect servers, heat, cooling, energy and water rather than introducing disconnected numbers. | Continue the prompt journey into the same physical story: computers need electricity; electricity supply can create emissions; heat must leave the equipment, sometimes using water. Use the existing research figures for the data itself. Provider marketing and corporate targets are not independent proof of general AI performance. |

These are design/content-structure references, not claims that these approaches guarantee learning outcomes. No site's proprietary graphics or page code have been copied.

## Narrative direction

One continuous thread can connect the concepts to the data:

> Ketika server menyusun jawaban, komputernya menggunakan listrik dan menghasilkan panas. Jejaknya bergantung pada pekerjaan yang dilakukan, sumber listrik, dan cara pendinginannya. Grafik berikut membantumu melihat perbedaan itu melalui beberapa contoh penelitian.

Then the research examples can continue in ordinary prose: compare the work performed (Luccioni), explore how cooling and electricity relate to water in a modeled case (Li), and see a separate provider-reported production snapshot (Google). Keep denominators distinct in labels instead of asking readers to understand an abstract study-comparison framework before they see the story.

## Downloaded assets

Both images were downloaded from the original Wikimedia file URLs, visually inspected, resized proportionally, and encoded as WebP for the local website. No image-generation or retouching was used. Source originals remain in the operating-system temporary directory `tracko2-education-assets`; the production assets below are the smaller derivatives.

| Local path | Subject and source | Credit / selected license | Preparation |
| --- | --- | --- | --- |
| `public/assets/images/education/cern-server-room.webp` | [CERN Server 03.jpg](https://commons.wikimedia.org/wiki/File:CERN_Server_03.jpg), server room at CERN in Switzerland, photographed 25 February 2009. [Original JPEG](https://upload.wikimedia.org/wikipedia/commons/d/d7/CERN_Server_03.jpg). | Florian Hirzinger, [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/). The resized WebP derivative retains this license. | 3984×2656 → 1600×1067; WebP quality 84; no crop or retouch. |
| `public/assets/images/education/koto-panjang-reservoir.webp` | [Waduk Koto Panjang.jpg](https://commons.wikimedia.org/wiki/File:Waduk_Koto_Panjang.jpg), Koto Panjang reservoir, Kampar, Riau, Indonesia, photographed 27 January 2010. [Original JPEG](https://upload.wikimedia.org/wikipedia/commons/4/4e/Waduk_Koto_Panjang.jpg). | Fadillah Jafar, [CC BY 3.0](https://creativecommons.org/licenses/by/3.0/). | 3264×2448 → 1400×1050; WebP quality 84; no crop or retouch. |

Use the server-room photo as an illustration of real computing infrastructure. It is not an image of the AI systems measured in the studies. Use the reservoir photo as Indonesian water context; it does not document an AI facility's water source or evidence of harm at that reservoir.

## Compact on-page credit suggestions

- Server image: `Foto ruang server CERN: Florian Hirzinger · CC BY-SA 3.0. Ukuran dan format disesuaikan.` Link the creator/file title to the Wikimedia description and the license to its CC page.
- Reservoir image: `Waduk Koto Panjang, Riau: Fadillah Jafar · CC BY 3.0. Ukuran dan format disesuaikan.` Link the title to its Wikimedia description and the license to its CC page.
- English: `CERN server room photo: Florian Hirzinger · CC BY-SA 3.0. Resized and converted to WebP.`
- English: `Koto Panjang reservoir, Riau: Fadillah Jafar · CC BY 3.0. Resized and converted to WebP.`

The photos have different licenses; neither license changes the licensing of unrelated site code or datasets. Credits should remain accessible wherever these photo assets are used.

## Additional 3D concept asset

`public/assets/images/education/water-drop-3d.png` is the unchanged transparent PNG from [Microsoft Fluent Emoji: Droplet / 3D](https://github.com/microsoft/fluentui-emoji/blob/main/assets/Droplet/3D/droplet_3d.png). It pairs with the homepage's existing electricity and emissions artwork to represent water in the core concepts. Copyright Microsoft Corporation, [MIT license](https://github.com/microsoft/fluentui-emoji/blob/main/LICENSE); the complete upstream license is included as `public/assets/images/education/LICENSE.fluentui-emoji.txt`. The asset was downloaded from Microsoft's official repository and visually inspected. It represents a concept without suggesting a measured quantity or comparison.
