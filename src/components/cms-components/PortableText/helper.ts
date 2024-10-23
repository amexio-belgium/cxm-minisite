import PortableP from "@components/cms-components/PortableText/PortableP.astro";
import PortableH2 from "@components/cms-components/PortableText/PortableH2.astro";
import PortableH3 from "@components/cms-components/PortableText/PortableH3.astro";
import PortableH4 from "@components/cms-components/PortableText/PortableH4.astro";
import PortableH5 from "@components/cms-components/PortableText/PortableH5.astro";
import PortableH6 from "@components/cms-components/PortableText/PortableH6.astro";
import PortableImage from "@components/cms-components/PortableText/PortableImage.astro";
import PortableYoutube from "@components/cms-components/PortableText/PortableYoutube.astro";
import type { SomePortableTextComponents } from "astro-portabletext/types";
import PortableMark from "@components/cms-components/PortableText/PortableMark.astro";
import PortableListBullet from "@components/cms-components/PortableText/PortableListBullet.astro";
import PortableListNumber from "@components/cms-components/PortableText/PortableListNumber.astro";
import PortableListBulletItem from "@components/cms-components/PortableText/PortableListBulletItem.astro";
import PortableListNumberItem from "@components/cms-components/PortableText/PortableListNumberItem.astro";
import PortableMarkSimple from "@components/cms-components/PortableText/PortableMarkSimple.astro";
import PortableSpan from "@components/cms-components/PortableText/PortableSpan.astro";

export const defaultComponents: SomePortableTextComponents = {
  type: {
    image: PortableImage,
    youtube: PortableYoutube,
  },
  list: {
    bullet: PortableListBullet,
    number: PortableListNumber,
  },
  listItem: {
    bullet: PortableListBulletItem,
    number: PortableListNumberItem,
  },
  block: {
    normal: PortableP,
    h2: PortableH2,
    h3: PortableH3,
    h4: PortableH4,
    h5: PortableH5,
    h6: PortableH6,
  },
  mark: PortableMarkSimple,
};

export const headerComponents: SomePortableTextComponents = {
  type: {
    image: PortableImage,
    youtube: PortableYoutube,
  },
  list: {
    bullet: PortableListBullet,
    number: PortableListNumber,
  },
  listItem: {
    bullet: PortableListBulletItem,
    number: PortableListNumberItem,
  },
  block: {
    normal: PortableSpan,
    h2: PortableH2,
    h3: PortableH3,
    h4: PortableH4,
    h5: PortableH5,
    h6: PortableH6,
  },
  mark: PortableMarkSimple,
};

export const simpleComponents: SomePortableTextComponents = {
  mark: PortableMark,
};
