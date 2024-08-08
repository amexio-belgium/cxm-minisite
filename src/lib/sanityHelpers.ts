import type { Link } from "@sanity/sanity.types";
import type { LinkObjectReferenced } from "src/sanity/custom.sanity.types";

export const getHrefFromLinkObject = (
  linkObject: LinkObjectReferenced | Link | null,
  language: string,
  preview: boolean,
) => {
  let href = preview ? "/preview/" : "";
  if (
    linkObject?.type === "internal" &&
    linkObject.internalLink &&
    (linkObject.internalLink?._type == "contentPage" ||
      linkObject.internalLink._type == "service")
  ) {
    href = `/preview/${language}/${linkObject.internalLink.metadata?.slug?.current}`;
  } else if (linkObject?.type === "external") {
    href = linkObject.url || "";
  } else if (linkObject?.type === "email") {
    href = `mailto:${linkObject.email}` || "";
  } else if (linkObject?.type === "phone") {
    href = `tel:${linkObject?.phone}` || "";
  }
  return href;
};
