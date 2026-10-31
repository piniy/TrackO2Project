import '@fontsource/inter/latin-400.css';
import '@fontsource/inter/latin-500.css';
import '@fontsource/inter/latin-600.css';
import '@fontsource/inter/latin-700.css';
import './styles/main.css';
import './styles/welcome.css';
import './styles/journey.css';
import './styles/content-additions.css';
import './styles/education.css';
import './styles/education-chart-themes.css';
import './styles/education-narrative.css';
import './styles/education-page.css';
import './styles/calculator-refresh.css';
import './styles/calculator-trial.css';
import './styles/team.css';
import './styles/game.css';
import './styles/formula.css';
import './styles/page-motion.css';
import './styles/footer.css';
import './styles/no-separators.css';
import './styles/ai-calculator.css';
import aiCalculator from './features/ai-calculator.js';
import Alpine from 'alpinejs';
import calculator from './features/calculator.js';
import teamProfiles from './features/team.js';
import formulaExplorer from './features/formula.js';
import education from './features/education.js';
import learningChoice from './features/learning-choice.js';
import promptJourney from './features/journey.js';
import library from './features/library.js';
import game from './features/game.js';
import { createI18n } from './i18n/index.js';
import { initPageMotion } from './features/page-motion.js';

let languageStorage;
try { languageStorage = window.localStorage; } catch { /* Storage may be disabled by the browser. */ }
Alpine.store('i18n', createI18n(document, languageStorage));
Alpine.magic('t', () => (text, values) => Alpine.store('i18n').t(text, values));

Alpine.data('calculator', calculator);
Alpine.data('aiCalculator', aiCalculator);
Alpine.data('teamProfiles', teamProfiles);
Alpine.data('formulaExplorer', formulaExplorer);
Alpine.data('education', education);
Alpine.data('learningChoice', learningChoice);
Alpine.data('promptJourney', promptJourney);
Alpine.data('library', library);
Alpine.data('learningGame', game);
document.documentElement.classList.add('js-ready');
Alpine.start();
// Alpine has applied bindings and the imported CSS is available before reveal.
Alpine.nextTick(() => requestAnimationFrame(() => {
  document.dispatchEvent(new Event('tracko2:ready'));
}));
initPageMotion();
