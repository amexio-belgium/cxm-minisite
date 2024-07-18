import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from "@astrojs/tailwind";
import qwikdev from '@qwikdev/astro';

import partytown from "@astrojs/partytown";
import { loadEnv } from "vite";
const { SITE_URL } = loadEnv(process.env.NODE_ENV, process.cwd(), "");
// https://astro.build/config
export default defineConfig({
  site: 'https://partytown-test--dreamy-trifle-7f42a6.netlify.app',
  integrations: [mdx(), sitemap(), qwikdev(), tailwind({
    nesting: true
  }), partytown({
    config: {
      debug: false,
      resolveUrl(url, location, type) {
        const proxyMap = {
          'consent.cookiebot.com': '/cookiebot',
          'consentcdn.cookiebot.com': '/cookiebotcdn',
          'consentcdn.cookiebot.eu': '/cookiebotcdneu'
        }
        
        console.log('siteurl: ' + SITE_URL);
        
        if(proxyMap[url.hostname] && proxyMap[url.hostname] !== ''){
          const newUrl = new URL(SITE_URL);
          newUrl.pathname = proxyMap[url.hostname] + url.pathname;
          newUrl.search = url.search;
          newUrl.searchParams = url.searchParams;
          return newUrl;
        }
        
        if(url.pathname.startsWith('/3f5a3037-fd04-4d20-9b59-cd8759bfacf9/') && url.hostname === 'partytown-test--dreamy-trifle-7f42a6.netlify.app'){
          const newUrl = new URL(SITE_URL);
          newUrl.pathname = '/cookiebot' + url.pathname;
          newUrl.search = url.search;
          newUrl.searchParams = url.searchParams;
          return newUrl;
        }
        
        return url;

      },
      
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
            return newpath
          },
        },
        '/cookiebotcdn/': {
          target: 'https://consentcdn.cookiebot.com',
          changeOrigin: true,
          rewrite: (path) => {
            const newpath = path.slice(13)
            return newpath
          },
        },
        '/cookiebotcdneu/': {
          target: 'https://consentcdn.cookiebot.eu',
          changeOrigin: true,
          rewrite: (path) => {
            const newpath = path.slice(15)
            return newpath
          },
        },
      }
    }
  }
});