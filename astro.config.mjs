import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from "@astrojs/tailwind";
import qwikdev from '@qwikdev/astro';

import partytown from "@astrojs/partytown";

// https://astro.build/config
export default defineConfig({
  site: 'https://partytown-test--dreamy-trifle-7f42a6.netlify.app',
  integrations: [mdx(), sitemap(), qwikdev(), tailwind({
    nesting: true
  }), partytown({
    config: {
      resolveUrl(url, location, type) {
        const proxyMap = {
          'https://consent.cookiebot.com': 'http://localhost:4321/cookiebot',
        }
        url.hostname = proxyMap[url.hostname] || url.hostname;
        return url;
      },
      forward: ['datalayer.push']
    }
  })],
  vite: {
    server: {
      proxy: {
        '/cookiebot': {
          target: 'https://consent.cookiebot.com',
          changeOrigin: true,
        }
      }
    }
  }
});