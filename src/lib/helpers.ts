import { BASE_PATH } from "@src/consts";

export const parseHref = (href: string | URL | undefined | null) => {
  if (href) {
    const hrefString = href.toString();
    if (BASE_PATH && BASE_PATH !== "") {
      return hrefString.startsWith("http://") ||
        hrefString.startsWith("https://") ||
        hrefString.startsWith("www.") ||
        hrefString.startsWith("#") ||
        hrefString.startsWith(`/${import.meta.env.PUBLIC_ASTRO_BASE_PATH}/`) ||
        hrefString.startsWith(`${import.meta.env.PUBLIC_ASTRO_BASE_PATH}/`) ||
        hrefString.startsWith("./") ||
        hrefString.startsWith("../")
        ? href
        : BASE_PATH + href;
    }

    return href;
  }
  return "";
};
