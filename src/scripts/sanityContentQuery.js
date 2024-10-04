import "dotenv/config";
import { createClient } from "@sanity/client";

const SANITY_VISUAL_EDITING_ENABLED = process.env.SANITY_VISUAL_EDITING_ENABLED;

export function sanityCreateClient() {
  return createClient({
    projectId: process.env.SANITY_STUDIO_PROJECT_ID,
    dataset: process.env.SANITY_STUDIO_DATASET,
    useCdn: false, // set to `false` to bypass the edge cache
    apiVersion: "2023-05-03", // use current date (YYYY-MM-DD) to target the latest API version
  });
}

export async function sanityContentQuery({ query, params }) {
  if (SANITY_VISUAL_EDITING_ENABLED === "true") {
    return null;
  }

  const client = sanityCreateClient();

  const visualEditingEnabled =
    process.env.SANITY_VISUAL_EDITING_ENABLED === "true";
  const token = process.env.SANITY_API_READ_TOKEN;

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
