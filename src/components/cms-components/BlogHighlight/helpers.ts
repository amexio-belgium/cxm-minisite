import type { SomePortableTextComponents } from "astro-portabletext/types";
import PortableBlogHighlightNormalText from "@components/cms-components/BlogHighlight/PortableText/PortableBlogHighlightNormalText.astro";

export const portableBlogHighlightComponents: SomePortableTextComponents = {
  block: {
    normal: PortableBlogHighlightNormalText,
  },
};
