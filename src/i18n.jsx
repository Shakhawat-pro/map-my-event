import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Translation resources
const resources = {
  en: {
    translation: {
      // Common
      welcome: "Welcome",
      home: "Home",
      find_event: "Find Event",
      calendar: "Calendar",
      post_event: "Post an Event",
      
      // HomePage
      upcoming_event: "Upcoming Event",
      popular_topic: "Popular Topic",
      deadline_alert: "Deadline Alert",
      submit_by: "by {{date}}",
      
      // MapPage
      search_placeholder: "Search events...",
      filter_events: "Filter Events"
    }
  },
  fr: {
    translation: {
      // Common
      welcome: "Bienvenue",
      home: "Accueil",
      find_event: "Trouver un Événement",
      calendar: "Calendrier",
      post_event: "Publier un Événement",
      
      // HomePage
      upcoming_event: "Événement à Venir",
      popular_topic: "Sujet Populaire",
      deadline_alert: "Alerte Date Limite",
      submit_by: "avant le {{date}}",
      
      // MapPage
      search_placeholder: "Rechercher des événements...",
      filter_events: "Filtrer les Événements"
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    },
    detection: {
      order: ['querystring', 'cookie', 'localStorage', 'navigator'],
      caches: ['cookie']
    }
  });

export default i18n;