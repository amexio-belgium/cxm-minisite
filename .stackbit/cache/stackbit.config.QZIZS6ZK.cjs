var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// stackbit.config.ts
var stackbit_config_exports = {};
__export(stackbit_config_exports, {
  default: () => stackbit_config_default
});
module.exports = __toCommonJS(stackbit_config_exports);
var import_types = require("@stackbit/types");
var import_cms_sanity = require("@stackbit/cms-sanity");
var stackbit_config_default = (0, import_types.defineStackbitConfig)({
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
    tokenEnvVar: "SANITY_TOKEN"
  },
  experimental: {
    ssg: {
      name: "Astro",
      logPatterns: {
        up: ["is ready", "astro"]
      },
      directRoutes: {
        "socket.io": "socket.io"
      },
      passthrough: ["/vite-hmr/**"]
    }
  },
  contentSources: [
    new import_cms_sanity.SanityContentSource({
      rootPath: "/Users/davithakobyan/projects/cxm-minisite",
      studioPath: "../cxm-minisite-cms/",
      studioUrl: "",
      projectId: process.env.SANITY_PROJECT_ID,
      token: process.env.SANITY_TOKEN,
      dataset: process.env.SANITY_DATASET || "production"
    })
  ],
  mapModels({ models }) {
    return models.map((model) => {
      return {
        ...model
        // Add or adjust model properties ...
      };
    });
  },
  modelExtensions: [
    {
      name: "contentPage",
      type: "page",
      urlPath: "/{slug}",
      fields: [{ name: "pageId", type: "string", hidden: true }]
    },
    {
      name: "blogPost",
      type: "page",
      urlPath: "/insights/{slug}"
    },
    {
      name: "service",
      type: "page",
      urlPath: "/services/{slug}"
    },
    {
      name: "referenceCase",
      type: "page",
      urlPath: "/work/{slug}"
    }
  ],
  siteMap: ({ documents, models }) => {
    const pageModels = models.filter((m) => m.type === "page").map((m) => m.name);
    return documents.filter((d) => pageModels.includes(d.modelName)).map((document) => {
      const doc = document;
      const slug = doc?.context?.publishedDocument?.metadata?.slug?.current;
      if (!slug || slug === "")
        return null;
      const urlPath = `/${doc?.context?.publishedDocument.language}/${slug.replace(/^\/+/, "")}`;
      return {
        urlPath,
        document,
        isHomePage: urlPath === "/"
      };
    }).filter(Boolean);
  }
});
//# sourceMappingURL=stackbit.config.QZIZS6ZK.cjs.map
