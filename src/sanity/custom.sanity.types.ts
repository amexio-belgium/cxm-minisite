import type {
  AnswerQuestion,
  Callout,
  CardGrid,
  CodeEmbed,
  CollaborationModel,
  CollabTab,
  Company,
  Cta,
  Faq,
  Geopoint,
  Highlight,
  internalGroqTypeReferenceTo,
  Intro,
  Link,
  LongFormText,
  Metadata,
  ReferenceCase,
  SanityImageAsset,
  SanityImageCrop,
  SanityImageHotspot,
  ServicePillar,
  ServicesCardList,
  SkosConcept,
  Tabs,
  Technology,
  Testimonial,
  WorkCardList,
  Youtube,
} from "@sanity/sanity.types";

export type PageTranslations = Array<{
  slug: string | null;
  language: string | null;
} | null> | null;

export interface LinkObjectReferenced {
  _type: "link";
  text?: string;
  type?: string;
  internalLink:
    | {
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
        content?: Array<
          | ({
              _key: string;
            } & Callout)
          | ({
              _key: string;
            } & CardGrid)
          | ({
              _key: string;
            } & Highlight)
          | ({
              _key: string;
            } & LongFormText)
          | ({
              _key: string;
            } & ServicesCardList)
          | ({
              _key: string;
            } & Tabs)
          | ({
              _key: string;
            } & WorkCardList)
        >;
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
      }
    | {
        _id: string;
        _type: "contentPage";
        _createdAt: string;
        _updatedAt: string;
        _rev: string;
        intro?: Intro;
        content?: Array<
          | ({
              _key: string;
            } & Callout)
          | ({
              _key: string;
            } & CardGrid)
          | ({
              _key: string;
            } & Highlight)
          | ({
              _key: string;
            } & LongFormText)
          | ({
              _key: string;
            } & ServicesCardList)
          | ({
              _key: string;
            } & Tabs)
          | ({
              _key: string;
            } & WorkCardList)
        >;
        metadata?: Metadata;
        language?: string;
      }
    | {
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
        content?: Array<
          | ({
              _key: string;
            } & Callout)
          | ({
              _key: string;
            } & CardGrid)
          | ({
              _key: string;
            } & Highlight)
          | ({
              _key: string;
            } & LongFormText)
          | ({
              _key: string;
            } & ServicesCardList)
          | ({
              _key: string;
            } & Tabs)
          | ({
              _key: string;
            } & WorkCardList)
        >;
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
      }
    | null;
  url?: string;
  email?: string;
  phone?: string;
  value?: string;
  blank?: boolean;
  parameters?: string;
  anchor?: string;
}

export type i18nImageAsset = SanityImageAsset & {
  titles: { [key: string]: string }[];
  descriptions: { [key: string]: string }[];
  altTexts: { [key: string]: string }[];
};

export type i18nImage = {
  asset: i18nImageAsset;
  hotspot?: SanityImageHotspot;
  crop?: SanityImageCrop;
  _type: "image";
};

export type CalloutReferenced = {
  _type: "callout";
  intro?: Intro;
  content?: Array<
    | i18nImage
    | {
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
      }
  >;
};

export type LongFormTextReferenced = {
  _type: "longFormText";
  intro?: Intro;
  standOut: boolean;
  content?: Array<
    | {
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
      }
    | i18nImage
    | ({
        _key: string;
      } & Youtube)
    | ({
        _key: string;
      } & Geopoint)
  >;
};

export type HighlightReferenced = {
  _type: "highlight";
  intro?: Intro;
  style?: "subtle" | "popping";
  ctaVisible?: boolean;
  cta?: Cta;
  image?: i18nImage;
};

export type TabReferenced = {
  _type: "tab";
  title?: string;
  content?: Array<
    | {
        content?: Array<{
          children?: Array<{
            marks?: Array<string>;
            text?: string;
            _type: "span";
            _key: string;
          }>;
          style?: "normal" | "h3" | "h4" | "h5" | "h6";
          listItem?: "bullet" | "number";
          markDefs?: Array<
            {
              _key: string;
            } & Link
          >;
          level?: number;
          _type: "block";
          _key: string;
        }>;
        _type: "content";
        _key: string;
      }
    | i18nImage
  >;
};

export type BlogHighlightReferenced = {
  _type: "blogHighlight";
  blogType?: "latest" | "specific";
  blogPost?: BlogPostWithReferences;
};

export type TabsReferenced = {
  _type: "tabs";
  intro?: Intro;
  tabsOverview?: Array<
    {
      _key: string;
    } & TabReferenced
  >;
};

export interface ContentPageWithReferences {
  _type: "contentPage";
  content?: Array<
    | ServicesCardList
    | CardGridReferenced
    | CalloutReferenced
    | LongFormTextReferenced
    | HighlightReferenced
    | TabsReferenced
    | WorkCardListReferenced
  >;
  metadata?: Metadata;
  _updatedAt?: string;
  _id: string;
  _translations: PageTranslations;
  intro?: IntroReference;
}

export type PersonReferenced = {
  _id: string;
  _type: "person";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  name?: string;
  jobTitle?: string;
  contactLink?: Link;
  image?: i18nImage;
};

export type Content = Array<
  | ServicesCardList
  | CardGridReferenced
  | CalloutReferenced
  | LongFormTextReferenced
  | HighlightReferenced
  | TabsReferenced
  | BlogHighlightReferenced
  | BlogsListReferenced
  | WorkCardListReferenced
  | CodeEmbed
  | TestimonialReferenced
  | FaqsReferenced
>;

export interface BlogPostWithReferences {
  _type: "blogPost";
  language?: string;
  content?: Content;
  metadata?: Metadata;
  featuredImage?: i18nImage;
  _updatedAt?: string;
  _id: string;
  _createdAt: string;
  intro?: Intro;
  publicationDate?: string;
  author?: PersonReferenced;
  postType: Array<{
    prefLabel: string | null;
    definition: string | null;
  }> | null;
  topic: Array<{
    prefLabel: string | null;
    definition: string | null;
  }> | null;
  _translations: PageTranslations;
}

export type BlogsListReferenced = {
  _type: "blogsList";
  blogsType?: "latest" | "specific";
  style?: "popping" | "subtle";
  blogPosts?: BlogPostWithReferences[];
  maxPerPage?: number;
  hidePagination?: boolean;
  intro?: IntroReference;
};

export interface ServiceWithReferences {
  _type: "service";
  challenge?: string;
  customerReferencesText?: string;
  language?: string;
  cta?: string;
  content?: Content;
  metadata?: Metadata;
  image?: i18nImage;
  _updatedAt?: string;
  _id: string;
  intro?: Intro;
  servicePillar?: ServicePillar;
  customerReferences: CustomerReferenced[];
  faqs: FaqsReferenced;
  _translations: PageTranslations;
}

export interface WorkWithReferences {
  _type: "works";
  language?: string;
  customerReferencesText?: string;
  content?: Content;
  logo?: {
    default: i18nImage | null;
    light: i18nImage | null;
    dark: i18nImage | null;
  } | null;
  link?: Link;
  coreTechnology?: string;
  metadata?: Metadata;
  introImage?: i18nImage;
  _updatedAt?: string;
  _id: string;
  intro?: Intro;
  duration?: string;
  collaborationModel?: CollaborationModelReferenced;
  customerReferences?: CustomerReferenced[];
  services?: ServiceWithReferences[];
  technologies?: TechnologyReferenced[];
  relatedCases?: ReferenceCaseReferenced[];
  _translations: PageTranslations;
  company?: CompanyWithReferences;
}

export type CustomerReferenced = {
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
} | null;

export type FaqsReferenced = {
  _type: "faq";
  title?: string;
  questions?: AnswerQuestion[];
};

export type TestimonialReferenced = Omit<Testimonial, "person"> & {
  person: PersonReferenced;
};

export type TechnologyReferenced = Omit<Technology, "logo" | "partner"> & {
  logo?: {
    default: i18nImage | null;
    light: i18nImage | null;
    dark: i18nImage | null;
  } | null;
  partner: { link: Link };
};

export type ReferenceCaseReferenced = Omit<
  ReferenceCase,
  "introImage" | "metadata" | "collaborationModel" | "technologies" | "services"
> & {
  introImage?: i18nImage;
  metadata?: MetadataReferenced;
  collaborationModel?: CollaborationModelReferenced;
  technologies?: TechnologyReferenced[];
  services?: ServiceWithReferences[];
  company?: CompanyWithReferences;
};

export type MetadataReferenced = Omit<Metadata, "image"> & {
  image: i18nImage | null;
};

export type CollaborationModelReferenced = Omit<
  CollaborationModel,
  "collaborationTabs"
> & {
  collaborationTabs: CollabTabReferenced[];
};

export type CollabTabReferenced = Omit<CollabTab, "concept"> & {
  concept: SkosConcept;
};

export type WorkCardListReferenced = Omit<WorkCardList, "referenceCases"> & {
  referenceCases: ReferenceCaseReferenced[];
};

export type IntroReference = Intro & {
  introCta: Cta | null;
};

export type CardGridReferenced = Omit<CardGrid, "backgroundImage"> & {
  backgroundImage?: i18nImage;
};

export type CompanyWithReferences = Omit<Company, "logo" | "_type"> & {
  logo?: {
    default?: i18nImage;
    light?: i18nImage;
    dark?: i18nImage;
  };
};
