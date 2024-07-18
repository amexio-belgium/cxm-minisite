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
      // resolveUrl(url, location, type) {
      //   const proxyMap = {
      //     'https://consent.cookiebot.com/uc.js': 'http://localhost:4321/cookiebot',
      //     'https://consentcdn.cookiebot.com': 'http://localhost:4321/cookiebotcdn'
      //   }
      //   url.hostname = proxyMap[url.hostname] || url.hostname;
      //   return url;
      // },
      forward: ['datalayer.push']
    }
  })],
  vite: {
    server: {
      proxy: {
        '/cookiebot/': {
          target: 'https://consent.cookiebot.com',
          changeOrigin: true,
          rewrite: (path) => {
            const newpath = path.slice(10)
            console.log(newpath)
            return newpath
          },
        },
        '/cookiebotcdn/': {
          target: 'https://consentcdn.cookiebot.com',
          changeOrigin: true,
          rewrite: (path) => {
            const newpath = path.slice(13)
            console.log('cookiebotcdn.com: ' + newpath)
            return newpath
          },
        },
        '/cookiebotcdneu/': {
          target: 'https://consentcdn.cookiebot.com',
          changeOrigin: true,
          rewrite: (path) => {
            const newpath = path.slice(15)
            console.log('hi')
            console.log(newpath)
            return newpath
          },
        },

      }
    }
  }
});