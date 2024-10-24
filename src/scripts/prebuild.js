import fs from "node:fs";
import "dotenv/config";

fs.writeFileSync(
  "./public/_redirects",
  `https://www.${new URL(process.env.ASTRO_SITE_URL).hostname}/* https://${new URL(process.env.ASTRO_SITE_URL).hostname}/:splat 301!\n` +
    "/ /en/ 301!\n" +
    "/:lang/* /:lang/404/ 404",
);
// Script to create a robots.txt with the current sitemap
fs.writeFileSync(
  "./public/robots.txt",
  `Sitemap: ${process.env.ASTRO_SITE_URL}sitemap-index.xml \nUser-agent: * \nAllow: /`,
);
