import type { SomePortableTextComponents } from "astro-portabletext/types";
import PortableHighlightH3 from "@components/cms-components/HighlightBlock/PortableText/PortableHighlightH3.astro";
import PortableHighlightNormalText from "@components/cms-components/HighlightBlock/PortableText/PortableHighlightNormalText.astro";
import PortableHighlightH4 from "@components/cms-components/HighlightBlock/PortableText/PortableHighlightH4.astro";
import PortableHighlightH5 from "@components/cms-components/HighlightBlock/PortableText/PortableHighlightH5.astro";
import PortableHighlightH6 from "@components/cms-components/HighlightBlock/PortableText/PortableHighlightH6.astro";

export const portableHighlightComponents: SomePortableTextComponents = {
  block: {
    h3: PortableHighlightH3,
    h4: PortableHighlightH4,
    h5: PortableHighlightH5,
    h6: PortableHighlightH6,
    normal: PortableHighlightNormalText,
  },
};
