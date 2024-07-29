import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from "@astrojs/tailwind";
import qwikdev from '@qwikdev/astro';
import netlify from "@astrojs/netlify";

import sanity from "@sanity/astro";
import react from "@astrojs/react";
import { loadEnv } from "vite";

const { SANITY_API_READ_TOKEN, SANITY_STUDIO_DATASET, SANITY_STUDIO_PROJECT_ID } = loadEnv(process.env.NODE_ENV, process.cwd(), "");

// https://astro.build/config
export default defineConfig({
  site: 'https://dreamy-trifle-7f42a6.netlify.app',
  integrations: [
    mdx(),
    sitemap(),
    qwikdev(),
    tailwind({
      nesting: true
    }),
    sanity({
      projectId: SANITY_STUDIO_PROJECT_ID,
      dataset: SANITY_STUDIO_DATASET,
      // Set useCdn to false if you're building statically.
      useCdn: false,
      stega: {
        studioUrl: '/',
      },
    }),
    react()
  ],
  output: "hybrid",
  adapter: netlify()
});