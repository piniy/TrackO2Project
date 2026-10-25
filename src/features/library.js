import { references } from '../content/references.js';
import { articles } from '../content/articles.js';
import { translate } from '../i18n/index.js';
export function matchesItem(item, query, topic, locale) {
  const text = [item.title, item.summary, item.author, item.topic, ...(item.paragraphs || [])]
    .filter(Boolean).map(value => translate(value, locale)).join(' ').toLocaleLowerCase(locale);
  return (topic === 'semua' || item.topic === topic) && text.includes(query.trim().toLocaleLowerCase(locale));
}
export default (kind = 'articles') => ({
  query: '', topic: 'semua',
  items: kind === 'references' ? references : articles,
  matches(id) {
    const item = this.items.find(entry => entry.id === id);
    if (!item) return false;
    return matchesItem(item, this.query, this.topic, this.$store.i18n.locale);
  },
  get visibleCount() { return this.items.filter(item => this.matches(item.id)).length; },
  clear() { this.query = ''; this.topic = 'semua'; }
});
