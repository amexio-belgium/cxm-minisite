import type { CalloutBlock, CardGrid, Faq, HighlightBlock, internalGroqTypeReferenceTo, Intro, LongFormText, Metadata, SanityImageCrop, SanityImageHotspot, ServicesCardList } from "./sanity.types";

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
      } & CalloutBlock) | ({
        _key: string;
      } & CardGrid) | ({
        _key: string;
      } & HighlightBlock) | ({
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
      content?: Array<({
        _key: string;
      } & CalloutBlock) | ({
        _key: string;
      } & CardGrid) | ({
        _key: string;
      } & HighlightBlock) | ({
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