export const parseHref = (href: string | URL | undefined) => {
  if (href) {
    const hrefString = href.toString();
    return hrefString.startsWith("http://") ||
      hrefString.startsWith("https://") ||
      hrefString.startsWith("www.") ||
      hrefString.startsWith("#")
      ? href
      : import.meta.env.PUBLIC_ASTRO_BASE_PATH + href;
  }
  return "";
};
