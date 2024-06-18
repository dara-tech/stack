import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

// Translation files
import translationEN from './locales/en/translation.json';
import translationKM from './locales/km/translation.json';

const resources = {
  en: {
    translation: translationEN,
  },
  km: {
    translation: translationKM,
  },
};

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: true,
    interpolation: {
      escapeValue: false, // React already does escaping
    },
  });

export default i18n;
