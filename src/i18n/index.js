import { translations } from './catalogue.js';

export const languageKey = 'tracko2-language';
const supported = locale => locale === 'id' || locale === 'en';
const normalize = text => text.trim().replace(/\s+/g, ' ');

export function translate(text, locale = 'id', values = {}) {
  const source = String(text ?? '');
  const translated = locale === 'en' ? (translations.get(normalize(source)) ?? source) : source;
  return translated.replace(/\{(\w+)\}/g, (match, key) => Object.hasOwn(values, key) ? String(values[key]) : match);
}

export function readLocale(storage) {
  try { const value = storage?.getItem(languageKey); return supported(value) ? value : 'id'; }
  catch { return 'id'; }
}

export function saveLocale(locale, storage) {
  if (!supported(locale)) return;
  try { storage?.setItem(languageKey, locale); } catch { /* Keep switching in memory when storage is unavailable. */ }
}

export function formatLocaleNumber(number, digits = 1, locale = 'id') {
  return new Intl.NumberFormat(locale === 'en' ? 'en-US' : 'id-ID', { minimumFractionDigits: digits, maximumFractionDigits: digits }).format(number);
}

// Cache original nodes once. Updating node values preserves Alpine state, SVG,
// focus, links, icons, and open details, without an HTML parser or innerHTML.
export function collectBindings(root) {
  const bindings = [];
  const ignored = 'script, style, template, noscript, [x-text], [data-i18n-ignore], [data-i18n-number]';
  const walker = root.createTreeWalker(root.documentElement, 4);
  while (walker.nextNode()) {
    const node = walker.currentNode;
    if (node.parentElement?.closest(ignored)) continue;
    const source = normalize(node.nodeValue);
    if (!translations.has(source)) continue;
    const leading = node.nodeValue.match(/^\s*/)[0];
    const trailing = node.nodeValue.match(/\s*$/)[0];
    bindings.push(locale => { node.nodeValue = leading + translate(source, locale) + trailing; });
  }
  for (const element of root.querySelectorAll('[aria-label], [placeholder], [title], [alt], meta[name="description"]')) {
    for (const attribute of ['aria-label', 'placeholder', 'title', 'alt', 'content']) {
      if (!element.hasAttribute(attribute) || element.hasAttribute(`:${attribute}`) || element.hasAttribute(`x-bind:${attribute}`)) continue;
      const source = element.getAttribute(attribute);
      if (translations.has(normalize(source))) bindings.push(locale => element.setAttribute(attribute, translate(source, locale)));
    }
  }
  for (const element of root.querySelectorAll('[data-i18n-number]')) {
    const number = Number(element.dataset.i18nNumber);
    bindings.push(locale => { element.textContent = formatLocaleNumber(number, 1, locale); });
  }
  return locale => { root.documentElement.lang = locale; bindings.forEach(update => update(locale)); };
}

export function createI18n(root, storage) {
  const apply = collectBindings(root);
  const locale = readLocale(storage);
  apply(locale);
  return {
    locale, announcement: '',
    t(text, values) { return translate(text, this.locale, values); },
    setLocale(value) {
      if (!supported(value) || value === this.locale) return;
      this.locale = value;
      saveLocale(value, storage);
      apply(value);
      this.announcement = this.t('Bahasa diubah ke Bahasa Indonesia.');
      // Story geometry can change when translated text wraps onto a new line.
      root.defaultView?.requestAnimationFrame(() => root.defaultView.dispatchEvent(new Event('resize')));
    }
  };
}
