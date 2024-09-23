import type { Link } from "@sanity/sanity.types";
import { BASE_PATH } from "@src/consts";
import type { LinkObjectReferenced } from "src/sanity/custom.sanity.types";

export const getHrefFromLinkObject = (
  linkObject: LinkObjectReferenced | Link | null,
  language: string,
) => {
  let href = "";
  if (
    linkObject?.type === "internal" &&
    linkObject.internalLink &&
    (linkObject.internalLink?._type == "contentPage" ||
      linkObject.internalLink._type == "service")
  ) {
    href = `${BASE_PATH}/${language}/${linkObject.internalLink.metadata?.slug?.current}`;
  } else if (linkObject?.type === "external") {
    href = linkObject.url || "";
    if (!href.startsWith("https://") && !href.startsWith("http://")) {
      href = "https://" + href;
    }
  } else if (linkObject?.type === "email") {
    href = `mailto:${linkObject.email}` || "";
  } else if (linkObject?.type === "phone") {
    href = `tel:${linkObject?.phone}` || "";
  }
  return href;
};
