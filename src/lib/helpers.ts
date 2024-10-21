import { BASE_PATH } from "@src/consts";

export const parseHref = (href: string | URL | undefined | null) => {
  if (href) {
    const hrefString = href.toString();
    if (BASE_PATH && BASE_PATH !== "") {
      return hrefString.startsWith("http://") ||
        hrefString.startsWith("https://") ||
        hrefString.startsWith("www.") ||
        hrefString.startsWith("#") ||
        hrefString.startsWith(`/${BASE_PATH}/`) ||
        hrefString.startsWith(`${BASE_PATH}/`) ||
        hrefString.startsWith("./") ||
        hrefString.startsWith("../")
        ? href
        : hrefString.endsWith("/")
          ? BASE_PATH + href
          : BASE_PATH + href + "/";
    }

    return href;
  }
  return "";
};
