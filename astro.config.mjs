import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

import tailwind from "@astrojs/tailwind";
import qwikdev from '@qwikdev/astro';
import { loadEnv } from "vite";
const { PUBLIC_ASTRO_BASE_PATH } = loadEnv(process.env.NODE_ENV, process.cwd(), "");
const basePath = PUBLIC_ASTRO_BASE_PATH && PUBLIC_ASTRO_BASE_PATH !== '' ? PUBLIC_ASTRO_BASE_PATH : '/'
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
  base: basePath
});