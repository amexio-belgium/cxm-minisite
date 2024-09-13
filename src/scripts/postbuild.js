import fs from "node:fs";
import * as fsExtra from "fs-extra";
import "dotenv/config";

const PUBLIC_ASTRO_BASE_PATH = process.env.PUBLIC_ASTRO_BASE_PATH;
const basePath = PUBLIC_ASTRO_BASE_PATH || "";
const SANITY_VISUAL_EDITING_ENABLED = process.env.SANITY_VISUAL_EDITING_ENABLED;

if (SANITY_VISUAL_EDITING_ENABLED !== "true" && basePath && basePath !== "") {
  // Source and destination directories
  if (!fs.existsSync("./build")) {
    fs.mkdirSync("./build");
  }

  fs.cpSync("./dist", "./build/", { recursive: true });
  fsExtra.emptyDirSync("./dist");

  fs.mkdirSync(`./dist${basePath}`);

  fs.cpSync("./build", `./dist${basePath}/`, { recursive: true });
  fsExtra.emptyDirSync("./build");
  fs.rmdir("./build", (err) => {
    if (err) {
      throw err;
    }
  });
}
