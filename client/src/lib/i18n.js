"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultNS = exports.resources = void 0;
const i18next_1 = require("i18next");
const react_i18next_1 = require("react-i18next");
exports.resources = {
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
exports.defaultNS = "header";
i18next_1.default.use(react_i18next_1.initReactI18next).init({
    resources: exports.resources,
    lng: "en",
    ns: ["header"],
    fallbackLng: "en",
    defaultNS: exports.defaultNS,
    interpolation: {
        escapeValue: false,
    },
});
//# sourceMappingURL=i18n.js.map