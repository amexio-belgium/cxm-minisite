// stackbit.config.ts
import path from "path";
import {
  defineStackbitConfig,
  type SiteMapEntry,
  getLocalizedFieldForLocale,
} from "@stackbit/types";
import { SanityContentSource } from "@stackbit/cms-sanity";

export default defineStackbitConfig({
  stackbitVersion: "~0.6.0",
  ssgName: "custom",
  nodeVersion: "20",
  devCommand: "node_modules/.bin/astro dev --port {PORT} --hostname 127.0.0.1",
  import: {
    type: "sanity",
    contentFile: "sanity-export/export.tar.gz",
    sanityStudioPath: "studio",
    deployStudio: true,
    deployGraphql: false,
    projectIdEnvVar: "SANITY_PROJECT_ID",
    datasetEnvVar: "SANITY_DATASET",
    tokenEnvVar: "SANITY_TOKEN",
  },
  experimental: {
    ssg: {
      name: "Astro",
      logPatterns: {
        up: ["is ready", "astro"],
      },
      directRoutes: {
        "socket.io": "socket.io",
      },
      passthrough: ["/vite-hmr/**"],
    },
  },
  contentSources: [
    new SanityContentSource({
      rootPath: __dirname,
      studioPath: "../cxm-minisite-cms/",
      studioUrl: "",
      projectId: process.env.SANITY_PROJECT_ID!,
      token: process.env.SANITY_TOKEN!,
      dataset: process.env.SANITY_DATASET || "production",
    }),
  ],
  mapModels({ models }) {
    return models.map((model) => {
      return {
        ...model,
        // Add or adjust model properties ...
      };
    });
  },
  modelExtensions: [
    {
      name: "contentPage",
      type: "page",
      urlPath: "/{slug}",
      fields: [{ name: "pageId", type: "string", hidden: true }],
    },
    {
      name: "blogPost",
      type: "page",
      urlPath: "/insights/{slug}",
    },
    {
      name: "service",
      type: "page",
      urlPath: "/services/{slug}",
    },
    {
      name: "referenceCase",
      type: "page",
      urlPath: "/work/{slug}",
    },
  ],
  siteMap: ({ documents, models }) => {
    const pageModels = models
      .filter((m) => m.type === "page")
      .map((m) => m.name);
    return documents
      .filter((d) => pageModels.includes(d.modelName))
      .map((document) => {
        const doc = document as any;
        // 3: use the pageId value for the stableId

        const slug = doc?.context?.publishedDocument?.metadata?.slug?.current;

        if (!slug || slug === "") return null;

        const urlPath = `/${doc?.context?.publishedDocument.language}/${slug.replace(/^\/+/, "")}`;

        return {
          urlPath,
          document,
          isHomePage: urlPath === "/",
        };
      })
      .filter(Boolean) as SiteMapEntry[];
  },
});
