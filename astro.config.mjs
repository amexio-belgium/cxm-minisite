import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

import tailwind from "@astrojs/tailwind";
import qwikdev from '@qwikdev/astro';
import { loadEnv } from "vite";
const { PUBLIC_ASTRO_BASE_PATH, ASTRO_SITE_URL } = loadEnv(process.env.NODE_ENV, process.cwd(), "");
const basePath = PUBLIC_ASTRO_BASE_PATH && PUBLIC_ASTRO_BASE_PATH !== '' ? PUBLIC_ASTRO_BASE_PATH : '/'
export default defineConfig({
    site: ASTRO_SITE_URL,
    outDir: `./dist${PUBLIC_ASTRO_BASE_PATH}`,
    integrations: [
        mdx(),
        sitemap(),
        qwikdev(),
        tailwind({
            nesting: true,
        })
    ],
    base: basePath,
    vite: {
        build: {
            outDir: `./dist${PUBLIC_ASTRO_BASE_PATH}`,
            emptyOutDir: true, // also necessary
        },
        optimizeDeps: {
            exclude: ["fsevents"]
        }
    },
});