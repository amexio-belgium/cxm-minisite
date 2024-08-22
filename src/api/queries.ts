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
}`

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
