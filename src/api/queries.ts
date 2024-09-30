import groq from "groq";

export const siteConfigQuery = groq`*[_type == "siteConfig" && language == $language][0]{
  ...,
  homePage->{
    "slug": metadata.slug.current
  },
  socials[]{
    ...,
    icon{
      asset->{
        ...,
        altTexts{...},
        descriptions{...},
        titles{...}
      }
    },
  }
}`;

export const navigationQuery = groq`*[_type == "navigation" && _id == $navigationId][0]{
                                        ..., 
                                        links[]{title, linkObject{..., internalLink->{...}}}
                                    }
                                    `;

const portableTextResolveInternalLink = groq`markDefs[] {
  ...,
  defined(internalLink) => {
    internalLink -> {...}
  }
}`;

const contentQuery = groq`
content[] {
  ...,
  intro {
    ...,
    intro[] {
      ...,
      ${portableTextResolveInternalLink}
    },
    introCta {
      ...,
      link {
        ...,
        internalLink->{...}
      }
    }
  },
   _type == "blogsList" => {
    ...,
    blogsType == "specific" => {
      blogPosts[]->{
        ...,
        featuredImage{
          asset->{...}
        },
        postType[]->{
          prefLabel,
          definition
        },
        author->{
          ...,
          image{
            ...,
            asset->{
              ...
            }
          }
        },
        topic[]->{
          prefLabel,
          definition
        },
      }
    },
  },
  _type == "blogHighlight" => {
    ...,
    blogType == "latest" => {
      "blogPost": *[ _type == "blogPost" && !(_id in path("drafts.**"))]| order(_createdAt desc)[0]{
        ...,
        featuredImage{
          asset->{...}
        },
        postType[]->{
          prefLabel,
          definition
        },
        author->{
          ...,
          image{
            ...,
            asset->{
              ...
            }
          }
        },
        topic[]->{
          prefLabel,
          definition
        },
      }
    },
    blogType == "specific" => {
      blogPost->{
        ...,
        featuredImage{
          asset->{...}
        },
        postType[]->{
          prefLabel,
          definition
        },
        author->{
          ...,
          image{
            ...,
            asset->{
              ...
            }
          }
        },
        topic[]->{
          prefLabel,
          definition
        },
      }
    },
  },
  defined(groups) => {
    groups[] {
      ...,
      'services': services[]->{
        ...,
        image{
          ...,
          asset->{...}
        },
      }
    }
  },
  _type == "testimonial" => {
    person->{
      ...,
      image {
        ...,
        asset->{...}
      }
    }
  },
  _type == "cardGrid" => {
    backgroundImage{
      asset->{...}
    },
    intro {
      ...,
      introCta {
        ...,
        link {
          ...,
          internalLink->{...}
        }
      }
    },
    cards[] {
      ...,
      icon{
        ...,
        asset->{
          ...,
        }
      }
    }
  },
  _type == "callout" => {
    ...,
    content[]{
      ...,
      defined(asset) => {
        asset->{...}
      }
    }
  },
  _type == "highlight" => {
    ...,
    defined(image) => {
      image{
        asset->{...}
      }
    }
  }, 
  _type == "tabs" => {
    ...,
    defined(tabsOverview) => {
      intro {
        ...,
        intro[] {
          ...,
          ${portableTextResolveInternalLink}
        }
      },
      tabsOverview[]{
        ...,
        _type == "tab" => {
          ...,
          content[]{
            ...,
            _type == "image" => {
              asset->{...}
            },
            _type == "content" => {
              content[] {
                ...,
                ${portableTextResolveInternalLink}
              }
            }
          }
        }
      }
    }
  }, 
  _type == "longFormText" => {
    ...,
    defined(content) => {
      content[]{
        ...,
        _type == "image" => {
          asset->{...}
        },
        ${portableTextResolveInternalLink}
      }
    } 
  },
  _type == "workCardList" => {
    ...,
    defined(referenceCases) => {
      referenceCases[]-> {
        ...,
        introImage {
          ...,
          asset->{...}
        },
        company -> {
          ...,
          logo{
            ...,
            default{
              ...,
              asset->{...}
            },
            dark{
              ...,
              asset->{...}
            },
            light{
              ...,
              asset->{...}
            }
          }
        },
        technologies[]->{...},
        services[]->{...},
        metadata{
          ...,
          image{
            ...,
            asset->{...}
          }
        },
        collaborationModel-> {
          ...,
          collaborationTabs[]{
            ...,
            concept->{...}
          }
        }
      } 
    }
  },
  _type == "faq" => {
    ...,
    defined(questions) => {
      questions[]->{
        ...,
        answer[] {
          ...,
          ${portableTextResolveInternalLink}
        }
      }
    }
  }
}`;

export const serviceQuery = groq`*[_type == "service" && language == $language && metadata.slug.current == $slug][0]{
  ...,
  faqs{
    ...,
    questions[]->{...}
  },
  servicePillar->{...},
  image{
    ...,
    asset->{...}
  },
  customerReferences[]->{
    ...,
  },
  "_translations": *[_type == "translation.metadata" && references(^._id)].translations[].value->{
    "slug": metadata.slug.current,
    language
  },
  ${contentQuery}
}`;

export const blogPostQuery = groq`*[_type == "blogPost" && language == $language && metadata.slug.current == $slug][0]{
  ...,
  featuredImage{
    asset->{...}
  },
  postType[]->{
    prefLabel,
    definition
  },
  author->{
    ...,
    image{
      ...,
      asset->{
        ...
      }
    }
  },
  topic[]->{
    prefLabel,
    definition
  },
  "_translations": *[_type == "translation.metadata" && references(^._id)].translations[].value->{
    "slug": metadata.slug.current,
    language
  },
  ${contentQuery}
}`;

export const blogsListQuery = groq`
{
  "blogPosts": *[_type == "blogPost" && language == $language && !metadata.noIndex]|order(publicationDate desc)[0...$itemsPerTime]{
    _id,
    featuredImage{
      asset->{...}
    },
    postType[]->{
      prefLabel,
      definition
    },
    author->{
      ...,
      image{
        ...,
        asset->{
          ...
        }
      }
    },
    topic[]->{
      prefLabel,
      definition
    },
    metadata,
    publicationDate,
    _createdAt,
    intro
  },
  "totalItems": count(*[_type == "blogPost" && language == $language && !metadata.noIndex])
}
`;

export const blogsListQueryPaginating = groq`
*[_type == "blogPost" && language == $language && !metadata.noIndex && publicationDate < $lastPubDate]|order(publicationDate desc)[0...$itemsPerTime]{
  _id,
  featuredImage{
    asset->{...}
  },
  postType[]->{
    prefLabel,
    definition
  },
  author->{
    ...,
    image{
      ...,
      asset->{
        ...
      }
    }
  },
  topic[]->{
    prefLabel,
    definition
  },
  metadata,
  publicationDate,
  _createdAt,
  intro
}`;

export const workQuery = groq`*[_type == "referenceCase" && language == $language && metadata.slug.current == $slug][0]{
  ...,
  company -> {
    ...,
    logo{
      ...,
      default{
        ...,
        asset->{...}
      },
      dark{
        ...,
        asset->{...}
      },
      light{
        ...,
        asset->{...}
      }
    }
  },
  collaborationModel-> {
    ...,
    collaborationTabs[]{
      ...,
      concept->{...}
    }
  },
  introImage {
    asset->{...}
  },
  technologies[]->{
    ...,
    partner->{
      ...
    },
    logo{
      ...,
      default{
        ...,
        asset->{...}
      },
      dark{
        ...,
        asset->{...}
      },
      light{
        ...,
        asset->{...}
      }
    }
  },
  relatedCases[]->{
    ...,
    collaborationModel-> {
      ...,
      collaborationTabs[]{
        ...,
        concept->{...}
      }
    },
    introImage {
      asset->{...}
    },
    technologies[]->{...},
    services[]->{...},
    metadata{
      ...,
      image{
        ...,
        asset->{...}
      }
    },
  },
  services[]->{...},
  metadata{
    ...,
    image{
      ...,
      asset->{...}
    }
  },
  "_translations": *[_type == "translation.metadata" && references(^._id)].translations[].value->{
    "slug": metadata.slug.current,
    language
  },
  ${contentQuery}
}`;

export const homePageSlugQuery = groq`*[_type == 'siteConfig' && language == $language][0]{
  homePage->{
    "slug": metadata.slug.current
  }
}.homePage.slug`;

export const contentPageQuery = groq`*[_type == "contentPage" && language == $language && metadata.slug.current == $slug][0]{
  ...,
  "_translations": *[_type == "translation.metadata" && references(^._id)].translations[].value->{
    "slug": metadata.slug.current,
    language
  },
  intro {
    ...,
    intro[] {
      ...,
      ${portableTextResolveInternalLink}
    },
  },
  ${contentQuery}
}`;

export const rssBlogPostsQuery = groq`
*[_type == "blogPost" && language == $language]{
  "title": metadata.title,
  "slug": metadata.slug.current,
  "author": author->{name}.name,
  "description": metadata.description,
  "pubDate": publicationDate
}
`;

export const allContentPagesQuery = groq`*[_type == "contentPage" && language == $language && defined(metadata.slug.current)]{
  "slug": metadata.slug.current
}.slug`;

export const allServicePagesQuery = groq`*[_type == "service" && language == $language && defined(metadata.slug.current)]{
  "slug": metadata.slug.current
}.slug`;

export const allInsightPagesQuery = groq`*[_type == "blogPost" && language == $language && defined(metadata.slug.current)]{
  "slug": metadata.slug.current
}.slug`;

export const allCasePagesQuery = groq`*[_type == "referenceCase" && language == $language && defined(metadata.slug.current)]{
  "slug": metadata.slug.current
}.slug`;
