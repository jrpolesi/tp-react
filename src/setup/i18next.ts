import i18n from "i18next";
import detector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import { resources } from "../locales";

export const FALLBACK_LANGUAGE = "en";

i18n
  .use(detector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    fallbackLng: FALLBACK_LANGUAGE,
    interpolation: {
      escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    },
    detection: {
      convertDetectedLanguage: (lng) => {
        return lng.replace(/-.*/, "");
      },
    },
  });
