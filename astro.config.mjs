import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import netlify from "@astrojs/netlify";
import sanityImg from "@otterstack/sanity-img-astro/integration";
import sanity from "@sanity/astro";
import react from "@astrojs/react";
import { loadEnv } from "vite";
import liciousI18n from "@astrolicious/i18n";
const {
  SANITY_API_READ_TOKEN,
  SANITY_STUDIO_DATASET,
  SANITY_STUDIO_PROJECT_ID
} = loadEnv(process.env.NODE_ENV, process.cwd(), "");


// https://astro.build/config
export default defineConfig({
  site: "https://dreamy-trifle-7f42a6.netlify.app",
  integrations: [sitemap(), tailwind({
    nesting: true
  }), sanity({
    projectId: SANITY_STUDIO_PROJECT_ID,
    dataset: SANITY_STUDIO_DATASET,
    // Set useCdn to false if you're building statically.
    useCdn: false,
    stega: {
      studioUrl: "http://localhost:3333"
    }
  }), react(), sanityImg({
    options: {
      auto: "format"
    }
  }), liciousI18n({
    defaultLocale: "en",
    strategy: "prefix",
    locales: ["en", "nl", "fr"], // must include the default locale
    client: {
      data: true,
      paths: true,
      translations: true,
      getStaticPaths: true,
    }
  })],
  output: "hybrid",
  adapter: netlify()
});