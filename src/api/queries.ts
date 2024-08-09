import groq from "groq";

export const siteConfigQuery = groq`*[_type == "siteConfig" && language == $language][0]{
  ...,
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
    }
  }
}`;
