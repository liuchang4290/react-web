import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import enTranslation from './locales/en.json';
import zhTranslation from './locales/zh.json';

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    fallbackLng: 'en',
    preload: ['en', 'zh'],
    resources: {
      zh: { translation: zhTranslation },
      en: { translation: enTranslation },
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
