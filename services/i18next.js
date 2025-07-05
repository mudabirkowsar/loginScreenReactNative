import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import en from "../locales/en.json"
import sv from "../locales/sv.json"
import fr from "../locales/fr.json"
import hi from "../locales/hi.json"
import it from "../locales/it.json"
import ja from "../locales/ja.json"
import ur from "../locales/ur.json"
import ar from "../locales/ar.json"


export const languageResources = {
    en: { translation: en },
    sv: { translation: sv },
    fr: { translation: fr },
    hi: { translation: hi },
    it: { translation: it },
    ja: { translation: ja },
    ur: { translation: ur },
    ar: { translation: ar },
}

i18next.use(initReactI18next).init({
    compatibilityJSON: "v3",
    lng: "en",
    fallbackLng: "en",
    resources: languageResources,
})

export default i18next;