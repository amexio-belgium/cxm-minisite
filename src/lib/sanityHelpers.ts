import type { CustomLinkObject } from "src/sanity/custom.sanity.types";

export const getHrefFromLinkObject = (linkObject: CustomLinkObject|null, language: string) => {
    let href = '';
    if(linkObject?.type === 'internal'){
      href = `/preview/${language}/${linkObject.internalLink?.metadata?.slug?.current}`;
    }
    else if (linkObject?.type === 'external'){
      href = linkObject.url || '';
    }
    else if (linkObject?.type === 'email'){
      href = `mailto:${linkObject.email}` || '';
    }
    else if (linkObject?.type === 'phone'){
      href = `tel:${linkObject?.phone}` || '';
    }
    return href;
}