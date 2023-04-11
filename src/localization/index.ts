import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import translateEn from './locales/en/translation.json';
import translateAr from './locales/ar/translation.json';

import langHelper from 'utils/language/LangHelper';

export const defaultNS = 'translateEn';
export const resources = {
  en: { translation: translateEn },
  ar: { translation: translateAr },
};

const i18n = i18next.use(initReactI18next).init({
  returnNull: false,
  resources,
  // defaultNS,
  lng: langHelper.getLang(),
  fallbackLng: ['en', 'ar'],
  interpolation: { escapeValue: false },
  supportedLngs: ['en', 'ar'],
});

export default i18n;
