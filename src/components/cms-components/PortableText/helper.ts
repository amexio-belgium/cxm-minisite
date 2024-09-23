import PortableH2 from "@components/cms-components/PortableText/PortableH2.astro";
import PortableH3 from "@components/cms-components/PortableText/PortableH3.astro";
import PortableH4 from "@components/cms-components/PortableText/PortableH4.astro";
import PortableH5 from "@components/cms-components/PortableText/PortableH5.astro";
import PortableH6 from "@components/cms-components/PortableText/PortableH6.astro";
import PortableImage from "@components/cms-components/PortableText/PortableImage.astro";
import PortableYoutube from "@components/cms-components/PortableText/PortableYoutube.astro";
import type { SomePortableTextComponents } from "astro-portabletext/types";
import PortableMark from "./PortableMark.astro";
export const defaultComponents: SomePortableTextComponents = {
  type: {
    image: PortableImage,
    youtube: PortableYoutube,
  },
  block: {
    h2: PortableH2,
    h3: PortableH3,
    h4: PortableH4,
    h5: PortableH5,
    h6: PortableH6,
  },
  mark: PortableMark,
};
