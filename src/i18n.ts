import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      greeting: "Hello!",
      where_going: "Where are you going today?",
      search_placeholder: "Events, buses, or destinations...",
      popular_near_you: "Popular Near You",
      see_all: "See all",
      explore_map: "Explore Map",
      explore_map_desc: "Stops & venues",
      get_premium: "Get Premium",
      get_premium_desc: "Unlock perks",
      home: "Home",
      tickets: "Tickets",
      saved: "Saved",
      rewards: "Rewards",
      profile: "Profile",
      language: "Language",
    }
  },
  sq: {
    translation: {
      greeting: "Përshëndetje!",
      where_going: "Ku po shkoni sot?",
      search_placeholder: "Ngjarje, autobusë, ose destinacione...",
      popular_near_you: "Popullore Pranë Jush",
      see_all: "Shiko të gjitha",
      explore_map: "Eksploro Hartën",
      explore_map_desc: "Ndaljet & vendet",
      get_premium: "Merr Premium",
      get_premium_desc: "Zhblloko benefitet",
      home: "Kryefaqja",
      tickets: "Biletat",
      saved: "Të ruajtura",
      rewards: "Shpërblimet",
      profile: "Profili",
      language: "Gjuha",
    }
  },
  tr: {
    translation: {
      greeting: "Merhaba!",
      where_going: "Bugün nereye gidiyorsunuz?",
      search_placeholder: "Etkinlikler, otobüsler veya yerler...",
      popular_near_you: "Yakınınızdaki Popüler",
      see_all: "Tümünü gör",
      explore_map: "Haritayı Keşfet",
      explore_map_desc: "Duraklar ve mekanlar",
      get_premium: "Premium Al",
      get_premium_desc: "Ayrıcalıkları aç",
      home: "Ana Sayfa",
      tickets: "Biletler",
      saved: "Kaydedilenler",
      rewards: "Ödüller",
      profile: "Profil",
      language: "Dil",
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
      escapeValue: false, 
    }
  });

export default i18n;
