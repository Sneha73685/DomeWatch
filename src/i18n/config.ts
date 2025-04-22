
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { alertTranslations } from './locales/alerts';

const resources = {
  en: {
    translation: {
      ...alertTranslations.en,
      'app.title': 'DomeWatch',
      'app.subtitle': 'Securing the skies, one drone at a time',
      'theme.light': 'Light',
      'theme.dark': 'Dark',
      'language.english': 'English',
      'language.hindi': 'हिंदी',
      'language.marathi': 'मराठी'
    }
  },
  hi: {
    translation: {
      ...alertTranslations.hi,
      'app.title': 'डोमवॉच',
      'app.subtitle': 'आकाश को सुरक्षित करना, एक ड्रोन एक बार में',
      'theme.light': 'लाइट',
      'theme.dark': 'डार्क',
      'language.english': 'English',
      'language.hindi': 'हिंदी',
      'language.marathi': 'मराठी'
    }
  },
  mr: {
    translation: {
      ...alertTranslations.mr,
      'app.title': 'डोमवॉच',
      'app.subtitle': 'आकाश सुरक्षित करणे, एक ड्रोन एका वेळी',
      'theme.light': 'लाईट',
      'theme.dark': 'डार्क',
      'language.english': 'English',
      'language.hindi': 'हिंदी',
      'language.marathi': 'मराठी'
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
