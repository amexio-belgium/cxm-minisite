import "dotenv/config";
import * as fs from "node:fs";
import * as path from "path";
import * as xml2js from "xml2js";

const SANITY_VISUAL_EDITING_ENABLED = process.env.SANITY_VISUAL_EDITING_ENABLED;

if (SANITY_VISUAL_EDITING_ENABLED !== "true") {
  const client = createClient({
    projectId: process.env.SANITY_STUDIO_PROJECT_ID,
    dataset: process.env.SANITY_STUDIO_DATASET,
    useCdn: false, // set to `false` to bypass the edge cache
    apiVersion: "2023-05-03", // use current date (YYYY-MM-DD) to target the latest API version
  });

  async function querySanityData({ query, params }) {
    const { result, resultSourceMap } = await client.fetch(
      query,
      params ?? {},
      {
        filterResponse: false,
        perspective,
        resultSourceMap: visualEditingEnabled ? "withKeyArraySelector" : false,
        stega: false,
        visualEditingEnabled: false,
        useCdn: false,
      },
    );

    return {
      data: result,
      sourceMap: resultSourceMap,
      perspective,
    };
  }

  // Path to the sitemap file
  const sitemapPath = path.join("./dist", "sitemap-0.xml");

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

    parser.parseString(data, (err, result) => {
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

      // Update the result object with the filtered URLs
      result.urlset.url = filteredUrls;

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
          "Successfully removed paths containing '[slug]' from sitemap.xml.",
        );
      });
    });
  });
}
