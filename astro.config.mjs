import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import netlify from "@astrojs/netlify";
import sanityImg from "@otterstack/sanity-img-astro/integration";
import sanity from "@sanity/astro";
import react from "@astrojs/react";
import { loadEnv } from "vite";
import { locales } from "./src/locales/consts";
import paraglide from "@inlang/paraglide-astro";
import sitemap from "@astrojs/sitemap";

const {
  ASTRO_SITE_URL,
  SANITY_STUDIO_DATASET,
  SANITY_STUDIO_PROJECT_ID,
  SANITY_STUDIO_URL,
  SANITY_VISUAL_EDITING_ENABLED,
  PUBLIC_ASTRO_BASE_PATH,
} = loadEnv(process.env.NODE_ENV, process.cwd(), "");

const basePath =
  PUBLIC_ASTRO_BASE_PATH && PUBLIC_ASTRO_BASE_PATH !== ""
    ? PUBLIC_ASTRO_BASE_PATH
    : "/";

// https://astro.build/config
export default defineConfig({
  site: ASTRO_SITE_URL,
  outDir: `./dist${PUBLIC_ASTRO_BASE_PATH}`,
  i18n: {
    defaultLocale: "en",
    locales: locales,
    routing: {
      prefixDefaultLocale: true,
    },
  },
  integrations: [
    sitemap(),
    paraglide({
      // recommended settings
      project: "./project.inlang",
      outdir: "./src/paraglide", //where your files should be
    }),
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
  ],
  vite: {
    build: {
      outDir: `./dist${PUBLIC_ASTRO_BASE_PATH}`,
      emptyOutDir: true, // also necessary
    },
    optimizeDeps: {
      exclude: ["fsevents"],
    },
  },
  output: SANITY_VISUAL_EDITING_ENABLED === "true" ? "server" : "static",
  adapter: netlify(),
  base: basePath,
});
