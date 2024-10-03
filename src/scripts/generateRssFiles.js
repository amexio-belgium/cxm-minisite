import "dotenv/config";
import * as fs from "node:fs";
import RSS from "rss";
import { sanityContentQuery } from "../scripts/sanityContentQuery.js";

const PUBLIC_ASTRO_BASE_PATH = process.env.PUBLIC_ASTRO_BASE_PATH;
const SANITY_VISUAL_EDITING_ENABLED = process.env.SANITY_VISUAL_EDITING_ENABLED;

if (SANITY_VISUAL_EDITING_ENABLED !== "true") {
  const basePath = PUBLIC_ASTRO_BASE_PATH || "";

  const locales = [
    "en",
    // "nl",
    // "fr"
  ];

  for (const locale of locales) {
    const { data: siteConfig } = await sanityContentQuery({
      query: `*[_type == "siteConfig" && language == $language][0]{
  ...,
  homePage->{
    "slug": metadata.slug.current
  },
  socials[]{
    ...,
    icon{
      asset->{
        ...,
        altTexts{...},
        descriptions{...},
        titles{...}
      }
    },
  }
}`,
      params: { language: locale },
    });

    const { data: posts } = await sanityContentQuery({
      query: `*[_type == "blogPost" && language == $language && !metadata.noIndex]{
  "title": metadata.title,
  "slug": metadata.slug.current,
  "author": author->{name}.name,
  "description": metadata.description,
  "pubDate": publicationDate
}`,
      params: { language: locale },
    });

    const date = new Date();

    let feed = new RSS({
      title: siteConfig.siteName,
      description: siteConfig.siteDescription,
      feed_url: `${process.env.ASTRO_SITE_URL}${locale}/rss.xml`,
      site_url: `${process.env.ASTRO_SITE_URL}${locale}/`,
      copyright: `${date.getFullYear} AmeXio Fuse`,
      language: locale,
      pubDate: date,
      ttl: "60",
    });

    posts.forEach((post) => {
      feed.item({
        title: post.title || "Post title missing",
        description: post.description || "Post description missing",
        author: post.author || "No author",
        date: new Date(post.pubDate) || "No publication date",
        url: `${process.env.ASTRO_SITE_URL.slice(0, -1)}${basePath}/${locale}/insights/${post.slug}`,
      });
    });

    const feedWithStyleSheet = feed
      .xml()
      .replace(
        `<?xml version="1.0" encoding="UTF-8"?>`,
        `<?xml version="1.0" encoding="UTF-8"?><?xml-stylesheet href="${basePath}/rss/styles.xsl" type="text/xsl"?>`,
      );

    fs.writeFile(
      `dist${basePath}/${locale}/rss.xml`,
      feedWithStyleSheet,
      { overwrite: true },
      (err) => {
        if (err) {
          console.log(err);
        }
      },
    );
  }

  console.log("Finished creating rss files");
}
