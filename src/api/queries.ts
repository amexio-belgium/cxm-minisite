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

const contentQuery = groq`content[] {
  ...,
  intro {
    ...,
    introCta {
      ...,
      link {
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
      tabsOverview[]{
        ...,
        _type == "tab" => {
          ...,
          content[]{
            ...,
            _type == "image" => {
              asset->{...}
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
          }
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
  ${contentQuery}
}`;

export const blogsListQuery = groq`
{
  "blogPosts": *[_type == "blogPost" && language == $language]|order(publicationDate desc)[0...$itemsPerTime]{
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
  "totalItems": count(*[_type == "blogPost" && language == $language])
}
`;

export const blogsListQueryPaginating = groq`
*[_type == "blogPost" && language == $language && _id > $lastId]|order(publicationDate desc)[0...$itemsPerTime]{
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

export const workQuery = groq`*[_type == "referenceCase" && language == "en" && metadata.slug.current == $slug][0]{
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
  ${contentQuery}
}`;

export const homePageSlugQuery = groq`*[_type == 'siteConfig' && language == $language][0]{
  homePage->{
    "slug": metadata.slug.current
  }
}.homePage.slug`;

export const contentPageQuery = groq`*[_type == "contentPage" && language == $language && metadata.slug.current == $slug][0]{
  ...,
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
