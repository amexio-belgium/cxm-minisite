import rss from "@astrojs/rss";
import { loadQuery } from "@api/sanity.ts";
import type {
  RssBlogPostsQueryResult,
  SiteConfigQueryResult,
} from "@sanity/sanity.types.ts";
import { rssBlogPostsQuery, siteConfigQuery } from "@api/queries.ts";
import type { APIContext } from "astro";

export async function GET(context: APIContext) {
  const locale = "en";

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
    site: `${context.site}/${locale}`,
    items: posts.map((post) => ({
      title: post.title || "Post title missing",
      description: post.description || "Post description missing",
      author: post.author || "No author",
      pubDate: new Date(post.pubDate!) || "No publication date",
      link: `/${locale}/insights/${post.slug}`,
    })),
  });
}
