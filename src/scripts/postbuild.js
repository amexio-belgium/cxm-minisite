import fs from "node:fs";
import * as fsExtra from "fs-extra";
import "dotenv/config";

const PUBLIC_ASTRO_BASE_PATH = process.env.PUBLIC_ASTRO_BASE_PATH;
const basePath = PUBLIC_ASTRO_BASE_PATH || "";

if (basePath && basePath !== "") {
  // Source and destination directories

  fs.copyFileSync("./dist/en/404/index.html", "./dist/404.html");
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
} else {
  fs.copyFileSync("./dist/en/404/index.html", "./dist/404.html");
}
