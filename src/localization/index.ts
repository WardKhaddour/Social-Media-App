import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import translateEn from './en';
import translateAr from './ar';

const getLanguage = () => {
  const language = navigator.language.startsWith('ar') ? 'ar' : 'en';

  return localStorage.getItem('language') || language;
};

const i18n = i18next.use(initReactI18next).init({
  resources: {
    en: { translation: translateEn },
    ar: { translation: translateAr },
  },
  lng: getLanguage(),
  fallbackLng: ['en', 'ar'],
  interpolation: { escapeValue: false },
  supportedLngs: ['en', 'ar'],
});

export default i18n;
