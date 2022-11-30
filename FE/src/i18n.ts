import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import transEn from "./locales/en/translation.json";
import transVi from "./locales/vi/translation.json";

const resources = {
  en: {
    translation: transEn,
  },
  vi: {
    translation: transVi,
  },
};

i18n.use(initReactI18next).init({
  resources,
  fallbackLng: "vi",
  debug: true,
});

export default i18n;
