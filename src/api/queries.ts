import groq from 'groq';

export const siteConfigQuery = groq`*[_type == "siteConfig" && language == $language][0]`;

export const navigationQuery = groq`*[_type == "navigation" && _id == $navigationId][0]
                                    {
                                        ..., 
                                        links[]{title, linkObject{..., internalLink->{...}}}
                                    }
                                    `;

export const serviceQuery = groq`*[_type == "service" && language == $language && metadata.slug.current == $slug][0]`;