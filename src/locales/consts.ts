import { loadEnv } from "vite";

/* 
    To add new languages, add them in this file. Add them in the i18nParams for the routing,
    in the languages for the language picker and in the UI json for the translations 
*/
const { SANITY_LOCALES } = loadEnv(process.env.NODE_ENV!, process.cwd(), "");

interface AltTexts {
  [key: string]: string;
}

export const locales = SANITY_LOCALES.split(", ");

export const i18nParams = locales.map((locale) => ({
  params: { locale: locale },
}));

export const languages: AltTexts = {
  en: "English",
  fr: "Français",
  nl: "Nederlands",
};

export const defaultLang = "en";
