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

export const navigationQuery = groq`*[_type == "navigation" && _id == $navigationId][0]
                                    {
                                        ..., 
                                        links[]{title, linkObject{..., internalLink->{...}}}
                                    }
                                    `;

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
  content[] {
    ...,
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
    defined(cards) => {
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
          ...,
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
            "test":"test",
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
            ...,
             asset->{...}
           }
        }
      } 
   },
  }
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
  content[] {
    ...,
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
    defined(cards) => {
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
          ...,
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
            "test":"test",
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
            ...,
             asset->{...}
           }
        }
      } 
   },
  }
}`;

export const blogsListQuery = groq`
{
  "blogPosts": *[_type == "blogPost" && language == $language]|order(publicationDate desc)[0...3]{
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
*[_type == "blogPost" && language == $language && _id > $lastId]|order(publicationDate desc)[0...3]{
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


export const homePageSlugQuery = groq`*[_type == 'siteConfig' && language == $language][0]{
  homePage->{
    "slug": metadata.slug.current
  }
}.homePage.slug`;

export const contentPageQuery = groq`*[_type == "contentPage" && language == $language && metadata.slug.current == $slug][0]{
  ...,
  content[] {
    ...,
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
    defined(cards) => {
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
          ...,
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
            "test":"test",
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
            ...,
             asset->{...}
           }
        }
      } 
   },
  }
}`;
