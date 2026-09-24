import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import enTranslations from './messages/en.json';
import viTranslations from './messages/vi.json';

const initI18n = () => {
  if (i18n.isInitialized) {
    return i18n;
  }

  return i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      resources: {
        en: {
          translation: enTranslations,
        },
        vi: {
          translation: viTranslations,
        },
      },
      fallbackLng: 'en',
      debug: false,
      interpolation: {
        escapeValue: false,
      },
    });
};

initI18n();

export default i18n;

