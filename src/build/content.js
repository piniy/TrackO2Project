import { activities, formatNumber } from '../content/activities.js';
import { articles } from '../content/articles.js';
import { references } from '../content/references.js';

const escape = value => String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
export const icon = (name, extra = '') => `<svg class="icon ${extra}" aria-hidden="true"><use href="#i-${escape(name)}"></use></svg>`;
const sourceLink = id => {
  const source = references.find(item => item.id === id);
  return `<a href="${escape(source.url)}" target="_blank" rel="noopener noreferrer">${escape(source.author)} ${icon('external')}<span class="sr-only"> (tab baru)</span></a>`;
};

export function renderContent(name) {
  if (name === 'activity-inputs') return activities.map(item => `
    <div class="activity-row">
      <span class="icon-tile ${item.color}">${icon(item.icon)}</span>
      <div class="activity-label"><label for="count-${item.id}">${escape(item.title)}</label><p>${escape(item.description)}</p><span class="factor"><span data-i18n-number="${item.factor}">${formatNumber(item.factor)}</span> <span>g CO₂e / aktivitas</span></span></div>
      <div class="stepper"><button type="button" @click="adjust('${item.id}', -1)" :aria-label="$t('Kurangi {activity}', { activity: $t('${escape(item.title)}') })" aria-label="Kurangi ${escape(item.title.toLowerCase())}">−</button><input id="count-${item.id}" name="${item.id}" type="number" inputmode="numeric" min="0" max="10000" step="1" value="0" x-model="counts.${item.id}" @input="dirty = true" aria-describedby="input-help"><button type="button" @click="adjust('${item.id}', 1)" :aria-label="$t('Tambah {activity}', { activity: $t('${escape(item.title)}') })" aria-label="Tambah ${escape(item.title.toLowerCase())}">+</button></div>
    </div>`).join('');
  if (name === 'factor-rows') return activities.map(item => `<tr><th scope="row">${escape(item.title)}</th><td data-i18n-number="${item.factor}">${formatNumber(item.factor)}</td><td>g CO₂e / aktivitas</td></tr>`).join('');
  if (name === 'articles') return articles.map(item => `
    <article class="learning-article ${item.topic}" id="${item.id}" x-show="matches('${item.id}')">
      <div class="article-heading"><span class="icon-tile ${item.topic === 'air' ? 'blue' : item.topic === 'energi' ? 'orange' : 'green'}">${icon(item.icon)}</span><span class="eyebrow">${escape(item.topic)}</span><span class="read-time">${escape(item.readTime)}</span></div>
      <h2>${escape(item.title)}</h2><p class="article-summary">${escape(item.summary)}</p>
      <details><summary>Baca materi ${icon('arrow-down')}</summary><div class="article-body">${item.paragraphs.map(text => `<p>${escape(text)}</p>`).join('')}<div class="takeaway">${icon('check')}<p>${escape(item.takeaway)}</p></div><div class="article-sources"><span>Sumber bacaan</span>${item.sources.map(sourceLink).join('')}</div></div></details>
    </article>`).join('');
  if (name === 'references') return references.map(item => `
    <article class="reference-card" x-show="matches('${item.id}')" id="${item.id}">
      <div class="reference-type"><span class="pill ${item.topic === 'air' ? 'pill-blue' : ''}">${escape(item.topic)}</span><span><span>${escape(item.kind)}</span> · <span>${escape(item.year)}</span></span></div>
      <h2><a href="${escape(item.url)}" target="_blank" rel="noopener noreferrer"><span${item.id === 'proposal' ? ' lang="id" data-i18n-ignore' : ''}>${escape(item.title)}</span> ${icon('external')}<span class="sr-only"> (tab baru)</span></a></h2>
      <p class="reference-author">${escape(item.author)}</p><p>${escape(item.summary)}</p>${item.id === 'proposal' ? '<p class="small muted">Proposal asli tersedia dalam Bahasa Indonesia.</p>' : ''}
    </article>`).join('');
  throw new Error(`Unknown content fragment: ${name}`);
}
