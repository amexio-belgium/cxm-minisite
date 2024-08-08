import type {
  AnswerQuestion,
  Callout,
  CardGrid,
  Faq,
  Highlight,
  internalGroqTypeReferenceTo,
  Intro,
  Link,
  LongFormText,
  Metadata,
  SanityImageAsset,
  SanityImageCrop,
  SanityImageHotspot,
  ServicePillar,
  ServicesCardList,
  Tabs,
  WorkCardList
} from "./sanity.types";

export interface LinkObjectReferenced {
  _type: "link";
  text?: string;
  type?: string;
  internalLink: {
    _id: string;
    _type: "company";
    _createdAt: string;
    _updatedAt: string;
    _rev: string;
    name?: string;
    link?: Link;
    logo?: {
      default?: {
        asset?: {
          _ref: string;
          _type: "reference";
          _weak?: boolean;
          [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
        };
        hotspot?: SanityImageHotspot;
        crop?: SanityImageCrop;
        _type: "image";
      };
      light?: {
        asset?: {
          _ref: string;
          _type: "reference";
          _weak?: boolean;
          [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
        };
        hotspot?: SanityImageHotspot;
        crop?: SanityImageCrop;
        _type: "image";
      };
      dark?: {
        asset?: {
          _ref: string;
          _type: "reference";
          _weak?: boolean;
          [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
        };
        hotspot?: SanityImageHotspot;
        crop?: SanityImageCrop;
        _type: "image";
      };
    };
    content?: Array<({
      _key: string;
    } & Callout) | ({
      _key: string;
    } & CardGrid) | ({
      _key: string;
    } & Highlight) | ({
      _key: string;
    } & LongFormText) | ({
      _key: string;
    } & ServicesCardList) | ({
      _key: string;
    } & Tabs) | ({
      _key: string;
    } & WorkCardList)>;
    type?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "skosConcept";
    };
    industryVertical?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "skosConcept";
    };
  } | {
    _id: string;
    _type: "contentPage";
    _createdAt: string;
    _updatedAt: string;
    _rev: string;
    intro?: Intro;
    content?: Array<({
      _key: string;
    } & Callout) | ({
      _key: string;
    } & CardGrid) | ({
      _key: string;
    } & Highlight) | ({
      _key: string;
    } & LongFormText) | ({
      _key: string;
    } & ServicesCardList) | ({
      _key: string;
    } & Tabs) | ({
      _key: string;
    } & WorkCardList)>;
    metadata?: Metadata;
    language?: string;
  } | {
    _id: string;
    _type: "service";
    _createdAt: string;
    _updatedAt: string;
    _rev: string;
    intro?: Intro;
    image?: {
      asset?: {
        _ref: string;
        _type: "reference";
        _weak?: boolean;
        [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
      };
      hotspot?: SanityImageHotspot;
      crop?: SanityImageCrop;
      _type: "image";
    };
    challenge?: string;
    cta?: string;
    content?: Array<({
      _key: string;
    } & Callout) | ({
      _key: string;
    } & CardGrid) | ({
      _key: string;
    } & Highlight) | ({
      _key: string;
    } & LongFormText) | ({
      _key: string;
    } & ServicesCardList) | ({
      _key: string;
    } & Tabs) | ({
      _key: string;
    } & WorkCardList)>;
    faqs?: Faq;
    customerReferences?: Array<{
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      _key: string;
      [internalGroqTypeReferenceTo]?: "company";
    }>;
    servicePillar?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "servicePillar";
    };
    language?: string;
    metadata?: Metadata;
  } | null;
  url?: string;
  email?: string;
  phone?: string;
  value?: string;
  blank?: boolean;
  parameters?: string;
  anchor?: string;
};


export type i18nImageAsset = SanityImageAsset & {
  titles: {[key: string]: string}[],
  descriptions: {[key: string]: string}[],
  altTexts: {[key: string]: string}[]
}

export type i18nImage = {
  asset: i18nImageAsset | null;
  hotspot?: SanityImageHotspot;
  crop?: SanityImageCrop;
  _type: "image";
}

export type CalloutReferenced = {
  _type: "callout";
  intro?: Intro;
  content?: Array<i18nImage | {
    richText?: Array<{
      children?: Array<{
        marks?: Array<string>;
        text?: string;
        _type: "span";
        _key: string;
      }>;
      style?: "normal" | "h2" | "h3" | "h4" | "blockquote";
      listItem?: "bullet" | "number";
      markDefs?: Array<{
        reference?: {
          _ref: string;
          _type: "reference";
          _weak?: boolean;
          [internalGroqTypeReferenceTo]?: "contentPage";
        };
        _type: "internalLink";
        _key: string;
      }>;
      level?: number;
      _type: "block";
      _key: string;
    }>;
    _type: "textObject";
    _key: string;
  }>;
}

export interface ServiceWithReferences {
  _type: 'service',
  challange?: string,
  language?: string,
  cta?: string,
  content?: Array<ServicesCardList|CardGrid|CalloutReferenced>,
  metadata?: Metadata,
  image?: i18nImage,
  _updatedAt?: string,
  _id: string,
  intro?: Intro,
  servicePillar?: ServicePillar,
  customerReferences: CustomerReferenced,
  faqs: FaqsReferenced
}

export type CustomerReferenced = Array<{
  _id: string;
  _type: "customer";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  name?: string;
  link?: Link;
  logo: {
    default: i18nImage | null;
    light: i18nImage | null;
    dark: i18nImage | null;
  } | null;
}> | null;

export type FaqsReferenced = {
  _type: "faq";
  title?: string;
  questions?: AnswerQuestion[]
}