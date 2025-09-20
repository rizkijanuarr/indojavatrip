import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translation files
import en from './locales/en.json';
import id from './locales/id.json';
import zh from './locales/zh.json';
import ms from './locales/ms.json';
import ja from './locales/ja.json';

const resources = {
  en: { translation: en },
  id: { translation: id },
  zh: { translation: zh },
  ms: { translation: ms },
  ja: { translation: ja }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'id', // Default language (Indonesian)
    // Remove lng: 'id' to let LanguageDetector handle language selection
    
    interpolation: {
      escapeValue: false
    },
    
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
      lookupLocalStorage: 'selectedLanguage' // Use same key as LanguageSwitcher
    }
  });

export default i18n;