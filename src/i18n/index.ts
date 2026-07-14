import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import ko from './locales/ko.json';
import en from './locales/en.json';

i18n
  // .use(LanguageDetector) // Disable detector to force Korean
  .use(initReactI18next)
  .init({
    resources: {
      ko: ko,
      en: en,
    },
    lng: 'ko', // Default to Korean
    fallbackLng: 'ko',
    debug: false,
    interpolation: {
      escapeValue: false, // React already safe from xss
    },
  });

export default i18n;
