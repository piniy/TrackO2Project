import '@fontsource/outfit/latin-500.css';
import '@fontsource/outfit/latin-600.css';
import '@fontsource/outfit/latin-700.css';
import '@fontsource/plus-jakarta-sans/latin-400.css';
import '@fontsource/plus-jakarta-sans/latin-500.css';
import '@fontsource/plus-jakarta-sans/latin-600.css';
import '@fontsource/plus-jakarta-sans/latin-700.css';
import './styles/main.css';
import './styles/welcome.css';
import './styles/journey.css';
import Alpine from 'alpinejs';
import calculator from './features/calculator.js';
import promptJourney from './features/journey.js';
import library from './features/library.js';
import game from './features/game.js';
import { createI18n } from './i18n/index.js';

let languageStorage;
try { languageStorage = window.localStorage; } catch { /* Storage may be disabled by the browser. */ }
Alpine.store('i18n', createI18n(document, languageStorage));
Alpine.magic('t', () => (text, values) => Alpine.store('i18n').t(text, values));

Alpine.data('calculator', calculator);
Alpine.data('promptJourney', promptJourney);
Alpine.data('library', library);
Alpine.data('learningGame', game);
document.documentElement.classList.add('js-ready');
Alpine.start();
