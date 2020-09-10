/** @format */

import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

import {en_source, hi_source, fr_source} from './locale';

const resources = {
  en: {
    translation: en_source,
  },
  hi: {
    translation: hi_source,
  }
};

i18n.use(initReactI18next).init({
  resources,
  fallbackLng: 'hi',
  lng: 'hi',
  interpolation: {
    escapeValue: false,
  },
});


export default i18n;