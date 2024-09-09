import rss from "@astrojs/rss";
import { SITE_TITLE, SITE_DESCRIPTION } from "@src/consts";
import { getLocale } from "i18n:astro";
import { loadQuery } from "@api/sanity.ts";
import type {
  RssBlogPostsQueryResult,
  SiteConfigQueryResult,
} from "@sanity/sanity.types.ts";
import { rssBlogPostsQuery, siteConfigQuery } from "@api/queries.ts";

export async function GET(context) {
  const visualEditingEnabled =
    import.meta.env.SANITY_VISUAL_EDITING_ENABLED === "true";

  const locale = getLocale().toLowerCase();

  const { data: siteConfig } = await loadQuery<SiteConfigQueryResult>({
    query: siteConfigQuery,
    params: { language: locale },
  });

  const { data: posts } = await loadQuery<RssBlogPostsQueryResult>({
    query: rssBlogPostsQuery,
    params: { language: locale },
  });

  return rss({
    stylesheet: "/rss/styles.xsl",
    title: siteConfig?.siteName || "Missing sitename in siteconfig",
    description:
      siteConfig?.siteDescription || "Missing description in siteconfig",
    site: `${context.site}/${locale}${visualEditingEnabled ? "/preview" : ""}`,
    items: posts.map((post) => ({
      title: post.title || "Post title missing",
      description: post.description || "Post description missing",
      author: post.author || "No author",
      pubDate: new Date(post.pubDate!) || "No publication date",
      link: `/${locale}${visualEditingEnabled ? "/preview" : ""}/insights/${post.slug}`,
    })),
  });
}
