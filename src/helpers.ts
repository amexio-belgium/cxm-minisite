export const parseHref = (href: string | URL | undefined | null) => {
  if (href) {
    const hrefString = href.toString();
    return hrefString.startsWith("http://") ||
      hrefString.startsWith("https://") ||
      hrefString.startsWith("www.") ||
      hrefString.startsWith("#") ||
      hrefString.startsWith("/fuse/") ||
      hrefString.startsWith("fuse/") ||
      hrefString.startsWith("./") ||
      hrefString.startsWith("../")
      ? href
      : import.meta.env.PUBLIC_ASTRO_BASE_PATH + href;
  }
  return "";
};
