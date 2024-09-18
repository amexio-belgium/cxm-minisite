import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import partytown from "@astrojs/partytown";
import tailwind from "@astrojs/tailwind";
import { loadEnv } from "vite";
const { PUBLIC_ASTRO_BASE_PATH, ASTRO_SITE_URL } = loadEnv(
  process.env.NODE_ENV,
  process.cwd(),
  ""
);
const basePath =
  PUBLIC_ASTRO_BASE_PATH && PUBLIC_ASTRO_BASE_PATH !== ""
    ? PUBLIC_ASTRO_BASE_PATH
    : "/";
export default defineConfig({
  site: ASTRO_SITE_URL,
  outDir: `./dist${PUBLIC_ASTRO_BASE_PATH}`,
  integrations: [
    mdx(),
    sitemap(),
    tailwind({
      nesting: true,
    }),
    partytown({
      config: {
        debug: false,
        resolveUrl(url, location, type) {
          const proxyMap = {
            "consent.cookiebot.com": "/cookiebot",
            "consentcdn.cookiebot.com": "/cookiebotcdn",
            "consentcdn.cookiebot.eu": "/cookiebotcdneu",
          };

          if (proxyMap[url.hostname] && proxyMap[url.hostname] !== "") {
            const newUrl = new URL("http://localhost:4321");
            newUrl.pathname = proxyMap[url.hostname] + url.pathname;
            newUrl.search = url.search;
            newUrl.searchParams = url.searchParams;
            return newUrl;
          }

          if (
            url.pathname.startsWith("/bc1980b0-1e04-4da9-8b72-cabb6d00ff5e/") &&
            url.hostname === "localhost:4321"
          ) {
            const newUrl = new URL("http://localhost:4321");
            newUrl.pathname = "/cookiebot" + url.pathname;
            newUrl.search = url.search;
            newUrl.searchParams = url.searchParams;
            return newUrl;
          }

          return url;
        },

        forward: ["datalayer.push"],
      },
    }),
  ],
  base: basePath,
  vite: {
    build: {
      outDir: `./dist${PUBLIC_ASTRO_BASE_PATH}`,
      emptyOutDir: true, // also necessary
    },
    optimizeDeps: {
      exclude: ["fsevents"],
    },
    server: {
      proxy: {
        "/cookiebot/": {
          target: "https://consent.cookiebot.com",
          changeOrigin: true,
          rewrite: (path) => {
            const newpath = path.slice(10);
            return newpath;
          },
        },
        "/cookiebotcdn/": {
          target: "https://consentcdn.cookiebot.com",
          changeOrigin: true,
          rewrite: (path) => {
            const newpath = path.slice(13);
            return newpath;
          },
        },
        "/cookiebotcdneu/": {
          target: "https://consentcdn.cookiebot.eu",
          changeOrigin: true,
          rewrite: (path) => {
            const newpath = path.slice(15);
            return newpath;
          },
        },
      },
    },
  },
});
