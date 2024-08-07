import type { AnswerQuestion, CardGrid, Faq, internalGroqTypeReferenceTo, Intro, Link, LongFormText, Metadata, SanityImageAsset, SanityImageCrop, SanityImageHotspot, ServicePillar, ServicesCardList } from "./sanity.types";

export type CustomLinkObject = {
    _type: "link";
    text?: string;
    type?: string;
    internalLink: {
      _id: string;
      _type: "contentPage";
      _createdAt: string;
      _updatedAt: string;
      _rev: string;
      intro?: Intro;
      content?: Array<({
        _key: string;
      } & CardGrid) | ({
        _key: string;
      } & LongFormText) | ({
        _key: string;
      } & ServicesCardList)>;
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
      content?: Array< ({
        _key: string;
      } & CardGrid) | ({
        _key: string;
      } & LongFormText) | ({
        _key: string;
      } & ServicesCardList)>;
      faqs?: Faq;
      customerReferences?: Array<{
        _ref: string;
        _type: "reference";
        _weak?: boolean;
        _key: string;
        [internalGroqTypeReferenceTo]?: "customer";
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
  }


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

export interface ServiceWithReferences {
  _type: 'service',
  challange?: string,
  language?: string,
  cta?: string,
  content?: Array<ServicesCardList|CardGrid>,
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