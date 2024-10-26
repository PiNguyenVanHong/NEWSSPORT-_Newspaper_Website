import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HEADER_VI from "@/locales/vi/header.json";
import HEADER_EN from "@/locales/en/header.json";

export const resources = {
    en: {
        header: HEADER_EN,
    },
    vi: {
        header: HEADER_VI,
    },
};

export const defaultNS = "header";

i18n.use(initReactI18next).init({
    resources,
    lng: "en",
    ns: ["header", ],
    fallbackLng: "en",
    defaultNS,
    interpolation: {
        escapeValue: false,
    }
})