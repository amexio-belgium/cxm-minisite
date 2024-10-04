import "dotenv/config";
import * as fs from "node:fs";
import * as path from "path";
import * as xml2js from "xml2js";
import { sanityContentQuery } from "../scripts/sanityContentQuery.js";

const SANITY_VISUAL_EDITING_ENABLED = process.env.SANITY_VISUAL_EDITING_ENABLED;
const PUBLIC_ASTRO_BASE_PATH = process.env.PUBLIC_ASTRO_BASE_PATH;

if (SANITY_VISUAL_EDITING_ENABLED !== "true") {
  // Path to the sitemap file
  const sitemapPath = path.join(
    `./dist/${PUBLIC_ASTRO_BASE_PATH}`,
    "sitemap-0.xml",
  );

  // Read the sitemap.xml file
  fs.readFile(sitemapPath, "utf-8", (err, data) => {
    if (err) {
      console.error("Error reading sitemap.xml:", err);
      return;
    }

    // Parse the XML file
    const parser = new xml2js.Parser({
      explicitArray: false, // Prevents wrapping single values into arrays
      ignoreAttrs: false, // Keeps attributes intact
    });

    parser.parseString(data, async (err, result) => {
      if (err) {
        console.error("Error parsing XML:", err);
        return;
      }

      // Access the URL entries (result.urlset.url is the assumed structure)
      const urlEntries = result.urlset.url;

      if (!urlEntries) {
        console.error("No URLs found in sitemap.xml.");
        return;
      }

      // Filter out URLs ending with /"[slug]"/ or "/404/"
      const filteredUrls = urlEntries.filter(
        (entry) =>
          !entry.loc.endsWith("/[slug]/") && !entry.loc.endsWith("/404/"),
      );

      // Get the noIndexed pages
      const query = {
        query: `*[
            metadata.noIndex == true
          ]{
            metadata {
              noIndex,
              slug {
                current
              }
            }
          }`,
        params: "",
      };
      const { data } = await sanityContentQuery(query);

      const slugs = Array.isArray(data)
        ? data.map((item) => item.metadata.slug.current)
        : [];

      // Update the result object with the filtered URLs and filter out the noIndexed slugs
      result.urlset.url = filteredUrls.filter((locObj) => {
        return !slugs.some((slug) => locObj.loc.includes(slug));
      });

      // Convert the updated object back to XML
      const builder = new xml2js.Builder({
        headless: false, // Keeps the XML declaration (<?xml ... ?>)
        renderOpts: { pretty: true, indent: "  ", newline: "\n" },
      });
      const updatedXml = builder.buildObject(result);

      // Write the updated XML back to the sitemap.xml file
      fs.writeFile(sitemapPath, updatedXml, (err) => {
        if (err) {
          console.error("Error writing updated sitemap.xml:", err);
          return;
        }

        console.log(
          "Successfully removed [slug] and non-indexed pages from sitemap.xml",
        );
      });
    });
  });
}
