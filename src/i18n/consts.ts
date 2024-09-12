/* 
    To add new languages, add them in this file. Add them in the i18nParams for the routing,
    in the languages for the language picker and in the UI json for the translations 
*/

export const i18nParams = [
  { params: { lang: "en" } },
  { params: { lang: "nl" } },
  { params: { lang: "fr" } },
];

export const langCodes = i18nParams.map((param) => param.params.lang);

export const languages = {
  en: "English",
  fr: "Français",
  nl: "Nederlands",
};

export const defaultLang = "en";
