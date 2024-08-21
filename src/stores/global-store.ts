import { atom } from "nanostores";
export const siteLanguage = atom<string>("en");

export const isPreview = atom<boolean>(false);
