import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import netlify from "@astrojs/netlify";
import sanityImg from "@otterstack/sanity-img-astro/integration";
import sanity from "@sanity/astro";
import react from "@astrojs/react";
import { loadEnv } from "vite";
import liciousI18n from "@astrolicious/i18n";
import { locales } from "./src/locales/consts";
const {
  ASTRO_SITE_URL,
  SANITY_STUDIO_DATASET,
  SANITY_STUDIO_PROJECT_ID,
  SANITY_VISUAL_EDITING_ENABLED,
  SANITY_STUDIO_URL,
} = loadEnv(process.env.NODE_ENV, process.cwd(), "");

// https://astro.build/config
export default defineConfig({
  build: {
    format: 'directory'
  },
  site: ASTRO_SITE_URL,
  integrations: [
    sitemap(),
    tailwind({
      nesting: true,
    }),
    sanity({
      projectId: SANITY_STUDIO_PROJECT_ID,
      dataset: SANITY_STUDIO_DATASET,
      // Set useCdn to false if you're building statically.
      useCdn: false,
      stega: {
        studioUrl: SANITY_STUDIO_URL + "en",
      },
    }),
    react(),
    sanityImg({
      options: {
        auto: "format",
      },
    }),
    liciousI18n({
      defaultLocale: "en",
      strategy: "prefix",
      locales: locales, // must include the default locale
      client: {
        data: true,
        paths: true,
        translations: true,
        getStaticPaths: true,
      },
      rootRedirect: {
        status: 301,
        destination: "/en",
      },
    }),
  ],
  output: SANITY_VISUAL_EDITING_ENABLED ? "server" : "static",
  adapter: netlify(),
});
