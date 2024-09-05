import { type QueryParams } from "sanity";
import { sanityClient } from "sanity:client";
import imageUrlBuilder from "@sanity/image-url";
import { VISUAL_EDITING_ENABLED } from "@src/consts";

const token = import.meta.env.SANITY_API_READ_TOKEN;

export async function loadQuery<QueryResponse>({
  query,
  params,
}: {
  query: string;
  params?: QueryParams;
}) {
  if (VISUAL_EDITING_ENABLED && !token) {
    throw new Error(
      "The `SANITY_API_READ_TOKEN` environment variable is required in Draft Mode.",
    );
  }

  const perspective = VISUAL_EDITING_ENABLED ? "previewDrafts" : "published";

  const { result, resultSourceMap } = await sanityClient.fetch<QueryResponse>(
    query,
    params ?? {},
    {
      filterResponse: false,
      perspective,
      resultSourceMap: VISUAL_EDITING_ENABLED ? "withKeyArraySelector" : false,
      stega: VISUAL_EDITING_ENABLED,
      ...(VISUAL_EDITING_ENABLED ? { token } : {}),
      useCdn: !VISUAL_EDITING_ENABLED,
    },
  );

  return {
    data: result,
    sourceMap: resultSourceMap,
    perspective,
  };
}

export const imageBuilder = imageUrlBuilder(sanityClient);

export {};
