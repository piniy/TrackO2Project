import { activities, formatNumber } from '../content/activities.js';
import { articles } from '../content/articles.js';
import { references, reviewedDate } from '../content/references.js';

const escape = value => String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
const iconNames = { arrow: 'arrow-right', 'arrow-down': 'chevron-down', chat: 'message-circle', document: 'file-text', pen: 'pen-line', drop: 'droplet', bolt: 'zap', game: 'gamepad-2', external: 'external-link', refresh: 'rotate-ccw', book: 'book-open', bulb: 'lightbulb', phone: 'smartphone' };
export const icon = (name, extra = '') => `<img class="icon ${escape(extra)}" src="/assets/icons/${escape(iconNames[name] ?? name)}.svg" alt="" aria-hidden="true">`;
const sourceLink = id => {
  const source = references.find(item => item.id === id);
  return `<a href="${escape(source.url)}" target="_blank" rel="noopener noreferrer">${escape(source.author)} ${icon('external')}<span class="sr-only"> (tab baru)</span></a>`;
};
export const sourceMetadataLabels = {
  version: 'Versi sumber', dataYear: 'Tahun data / asumsi', taskUnit: 'Tugas dan satuan',
  geography: 'Cakupan wilayah', evidence: 'Jenis bukti', included: 'Jalur yang dicakup', excluded: 'Batas dan pengecualian'
};

const articleImages = { karbon: 'home-emissions.jpg', air: 'home-water.jpg', energi: 'home-energy.jpg', kebiasaan: 'home-energy.jpg' };
const photos = {
  servers: { file: 'home-energy.jpg', alt: 'Deretan rak server di pusat data NERSC', caption: 'Contoh rak server di pusat data NERSC.', author: 'Derrick Coetzee', url: 'https://commons.wikimedia.org/wiki/File:Front_of_server_racks_at_NERSC.jpg', license: 'CC0' },
  cooling: { file: 'home-water.jpg', alt: 'Menara pendingin di pusat data NERSC', caption: 'Contoh menara pendingin di pusat data NERSC.', author: 'Derrick Coetzee', url: 'https://commons.wikimedia.org/wiki/File:Marley_cooling_tower_at_NERSC_(1).jpg', license: 'CC0' },
  students: { file: 'students-computer.jpg', alt: 'Siswa menggunakan komputer sekolah', caption: 'Siswa menggunakan komputer sekolah.', author: 'Bright Kwame Ayisi', url: 'https://commons.wikimedia.org/wiki/File:Students_using_a_computer.jpg', license: 'CC0' },
  reservoir: { file: 'koto-panjang-reservoir.webp', alt: 'Waduk Koto Panjang di Riau', caption: 'Waduk Koto Panjang sebagai contoh konteks air setempat.', author: 'Fadillah Jafar', url: 'https://commons.wikimedia.org/wiki/File:Waduk_Koto_Panjang.jpg', license: 'CC BY 3.0' }
};
const articlePhoto = { 'jejak-karbon': 'servers', 'jejak-air': 'cooling', 'energi-pusat-data': 'servers', 'prompt-bijak': 'students', 'pelatihan-inferensi': 'servers', 'membaca-estimasi': 'students', 'air-dan-lokasi': 'reservoir' };
const articleBody = item => {
  const photo = photos[articlePhoto[item.id]];
  return `<div class="article-body">${item.paragraphs.map(text => `<p>${escape(text)}</p>`).join('')}<figure class="article-photo"><img src="/assets/images/education/${escape(photo.file)}" alt="${escape(photo.alt)}" loading="lazy" decoding="async"><figcaption><span>${escape(photo.caption)}</span> <span>Foto:</span> <a href="${escape(photo.url)}" target="_blank" rel="noopener noreferrer">${escape(photo.author)} / Wikimedia Commons (${escape(photo.license)})</a></figcaption></figure><div class="article-sources"><span>Sumber bacaan</span>${item.sources.map(sourceLink).join('')}</div></div>`;
};

export function renderContent(name) {
  if (name === 'article-count') return String(articles.length);
  if (name === 'reference-count') return String(references.length);
  if (name === 'reviewed-date') return `<time datetime="${reviewedDate}">27 Oktober 2026</time>`;
  if (name === 'activity-inputs' || name === 'trial-activity-inputs') return activities.map(item => `
    <div class="activity-row${name === 'trial-activity-inputs' ? ` trial-activity trial-activity-${item.id}` : ''}">
      ${name === 'trial-activity-inputs' ? `<span class="trial-activity-art"><img src="/assets/images/calculator/${({ chat: 'chat', summary: 'summary', longText: 'writing', image: 'image' })[item.id]}.webp" alt="" width="256" height="256" loading="lazy" decoding="async"></span>` : `<span class="icon-tile ${item.color}">${icon(item.icon)}</span>`}
      <div class="activity-label"><label for="count-${item.id}">${escape(item.title)}</label><p>${escape(item.description)}</p><span class="factor"><span data-i18n-number="${item.factor}">${formatNumber(item.factor)}</span> <span>g CO₂e / aktivitas</span></span></div>
      <div class="stepper"><input id="count-${item.id}" name="${item.id}" type="number" inputmode="numeric" min="0" max="10000" step="1" value="0" x-model="counts.${item.id}" @input="dirty = true"><button type="button" @click="adjust('${item.id}', -1)" :aria-label="$t('Kurangi {activity}', { activity: $t('${escape(item.title)}') })" aria-label="Kurangi ${escape(item.title.toLowerCase())}">−</button><button type="button" @click="adjust('${item.id}', 1)" :aria-label="$t('Tambah {activity}', { activity: $t('${escape(item.title)}') })" aria-label="Tambah ${escape(item.title.toLowerCase())}">+</button></div>
    </div>`).join('');
  if (name === 'factor-rows') return activities.map(item => `<tr><th scope="row">${escape(item.title)}</th><td data-i18n-number="${item.factor}">${formatNumber(item.factor)}</td><td>g CO₂e / aktivitas</td></tr>`).join('');
  if (name === 'articles') return articles.map(item => `
    <article class="learning-article ${item.topic}" id="${item.id}" x-data="{}" x-show="matches('${item.id}')">
      <img class="article-cover" src="/assets/images/education/${articleImages[item.topic]}" alt="" loading="lazy" decoding="async">
      <div class="article-heading"><span class="eyebrow">${escape(item.topic)}</span><span class="read-time">${escape(item.readTime)}</span></div>
      <h3>${escape(item.title)}</h3><p class="article-summary">${escape(item.summary)}</p>
      <details><summary @click.prevent="$refs.readingDialog.showModal()">Baca materi <span aria-hidden="true">↗</span></summary>${articleBody(item)}</details>
      <dialog class="article-dialog" x-ref="readingDialog" aria-labelledby="dialog-title-${item.id}" @click="if ($event.target === $el) $el.close()">
        <button type="button" class="article-dialog-close" @click="$el.closest('dialog').close()" aria-label="Tutup materi">×</button>
        <span class="eyebrow">${escape(item.topic)}</span><h2 id="dialog-title-${item.id}">${escape(item.title)}</h2><p class="article-dialog-summary">${escape(item.summary)}</p>${articleBody(item)}
      </dialog>
    </article>`).join('');
  if (name === 'references') return references.map(item => `
    <article class="reference-card" x-show="matches('${item.id}')" id="${item.id}">
      <div class="reference-type"><span class="pill ${item.topic === 'air' ? 'pill-blue' : ''}">${escape(item.topic)}</span><span><span>${escape(item.kind)}</span> · <span>${escape(item.year)}</span></span></div>
      <h2><a href="${escape(item.url)}" target="_blank" rel="noopener noreferrer"><span${item.id === 'proposal' ? ' lang="id" data-i18n-ignore' : ''}>${escape(item.title)}</span> ${icon('external')}<span class="sr-only"> (tab baru)</span></a></h2>
      <p class="reference-author">${escape(item.author)}</p><p>${escape(item.summary)}</p><p class="reference-limitation"><strong>Batasan:</strong> <span>${escape(item.limitation)}</span></p>${item.id === 'proposal' ? '<p class="small muted">Proposal asli tersedia dalam Bahasa Indonesia.</p>' : ''}
      <details class="reference-metadata"><summary>Rincian sumber ${icon('arrow-down')}</summary><dl>${Object.entries(sourceMetadataLabels).map(([field, label]) => `<div><dt>${escape(label)}</dt><dd>${escape(item[field] ?? 'Tidak dilaporkan')}</dd></div>`).join('')}</dl></details>
    </article>`).join('');
  throw new Error(`Unknown content fragment: ${name}`);
}
