import "dotenv/config";
import { createClient } from "@sanity/client";
import * as fs from "node:fs";

const client = createClient({
  projectId: process.env.SANITY_STUDIO_PROJECT_ID,
  dataset: process.env.SANITY_STUDIO_DATASET,
  useCdn: false, // set to `false` to bypass the edge cache
  apiVersion: "2023-05-03", // use current date (YYYY-MM-DD) to target the latest API version
});

const visualEditingEnabled =
  process.env.SANITY_VISUAL_EDITING_ENABLED === "true";
const token = process.env.SANITY_API_READ_TOKEN;

async function querySanityData({ query, params }) {
  if (visualEditingEnabled && !token) {
    throw new Error(
      "The `SANITY_API_READ_TOKEN` environment variable is required in Draft Mode.",
    );
  }

  const perspective = visualEditingEnabled ? "previewDrafts" : "published";

  const { result, resultSourceMap } = await client.fetch(query, params ?? {}, {
    filterResponse: false,
    perspective,
    resultSourceMap: visualEditingEnabled ? "withKeyArraySelector" : false,
    stega: false,
    ...(visualEditingEnabled ? { token } : {}),
    useCdn: false,
  });

  return {
    data: result,
    sourceMap: resultSourceMap,
    perspective,
  };
}

const locales = ["en", "nl", "fr"];

for (const locale of locales) {
  const { data: translations } = await querySanityData({
    query: `*[_type == "translation" && language == $lang]{"key": key.current, translation}`,
    params: { lang: locale },
  });

  const formatted = {
    $schema: "https://inlang.com/schema/inlang-message-format",
  };

  translations.forEach((item) => {
    if (item.translation && item.key) {
      formatted[item.key] = item.translation;
    }
  });

  fs.writeFile(
    `messages/${locale}.json`,
    JSON.stringify(formatted, null, 4),
    { overwrite: true },
    (err) => {
      if (err) {
        console.log(err);
      }
    },
  );
}

console.log("Finished creating translations");
