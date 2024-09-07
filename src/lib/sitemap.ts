export function getSitemapParams(
  slugs: Array<string | null> | null,
  locale: string,
) {
  if (slugs && slugs !== null && slugs.length > 0) {
    return slugs.map((slug) => ({
      params: {
        slug: slug!,
      },
      locale,
    }));
  }

  return undefined;
}
