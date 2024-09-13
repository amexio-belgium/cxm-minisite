// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

export const SITE_TITLE = "AmeXio Fuse";
export const SITE_DESCRIPTION = "Welcome to my website!";
export const VISUAL_EDITING_ENABLED =
  import.meta.env.SANITY_VISUAL_EDITING_ENABLED === "true";
export const BASE_PATH = import.meta.env.PUBLIC_ASTRO_BASE_PATH || "";
