import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

import tailwind from "@astrojs/tailwind";
import qwikdev from '@qwikdev/astro';

// https://astro.build/config
export default defineConfig({
  site: 'https://example.com',
  integrations: [
    mdx(), 
    sitemap(), 
    qwikdev(),
    tailwind({
       nesting: true,
    })
  ]
});