import i18n from "i18next";
import { initReactI18next } from "react-i18next";
// import HEADER_VI from "@/locales/vi/header.json";
// import HEADER_EN from "@/locales/en/header.json";

export const resources = {
  en: {
    header: {
      "header-bottom": {
        opinion: { label: "Opinion", link: "/opinion" },
        "business & trends": {
          label: "Business & trends",
          link: "/business-&-trends",
        },
        politics: { label: "Politics", link: "/politics" },
        sports: { label: "Sports", link: "/sports" },
        "style & experiences": {
          label: "Style & experiences",
          link: "/style-&-experiences",
        },
        sustainability: { label: "Sustainability", link: "/sustainability" },
        academic: { label: "Academic", link: "/academic" },
        "worlds of luxury": {
          label: "Worlds of luxury",
          link: "/worlds-of-luxury",
        },
      },
    },
  },
  vi: {
    header: {
      "header-bottom": {
        opinion: { label: "Gợi ý", link: "/goi-y" },
        "business & trends": {
          label: "Business & trends",
          link: "/business-&-trends",
        },
        politics: { label: "Chính trị", link: "/chinh-tri" },
        sports: { label: "Thể thao", link: "/the-thao" },
        "style & experiences": {
          label: "Style & experiences",
          link: "/style-&-experiences",
        },
        sustainability: { label: "Sustainability", link: "/sustainability" },
        academic: { label: "Academic", link: "/academic" },
        "worlds of luxury": {
          label: "Worlds of luxury",
          link: "/worlds-of-luxury",
        },
      },
    },
  },
};

export const defaultNS = "header";

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  ns: ["header"],
  fallbackLng: "en",
  defaultNS,
  interpolation: {
    escapeValue: false,
  },
});
