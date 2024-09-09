/* 
    To add new languages, add them in this file. Add them in the i18nParams for the routing,
    in the languages for the language picker and in the UI json for the translations 
*/
interface AltTexts {
  [key: string]: string;
}

export const i18nParams = [
  { params: { lang: "en" } },
  { params: { lang: "nl" } },
  { params: { lang: "fr" } },
];

export const locales = ["en", "nl", "fr"];

export const languages: AltTexts = {
  en: "English",
  fr: "Français",
  nl: "Nederlands",
};

export const defaultLang = "en";
