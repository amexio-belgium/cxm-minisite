import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

import tailwind from "@astrojs/tailwind";
import qwikdev from '@qwikdev/astro';
import { loadEnv } from "vite";
const { ASTRO_BASE_PATH } = loadEnv(process.env.NODE_ENV, process.cwd(), "");
// https://astro.build/config
export default defineConfig({
  site: 'https://dreamy-trifle-7f42a6.netlify.app',
  integrations: [
    mdx(), 
    sitemap(), 
    qwikdev(),
    tailwind({
       nesting: true,
    })
  ],
  base: ASTRO_BASE_PATH
});