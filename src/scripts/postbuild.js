import fs from "node:fs";
import * as fsExtra from "fs-extra";
import "dotenv/config";

const PUBLIC_ASTRO_BASE_PATH = process.env.PUBLIC_ASTRO_BASE_PATH;
const basePath = PUBLIC_ASTRO_BASE_PATH || "";

const visualEditingEnabled =
  process.env.SANITY_VISUAL_EDITING_ENABLED === "true" ||
  process.env.SANITY_VISUAL_EDITING_ENABLED === true;

const backupsEnabled =
  process.env.ENABLE_BACKUPS === "true" || process.env.ENABLE_BACKUPS === true;

if (backupsEnabled) {
  if (!fs.existsSync("./netlify")) {
    fs.mkdirSync("./netlify");
  }
  if (!fs.existsSync("./netlify/functions")) {
    fs.mkdirSync("./netlify/functions");
  }
  fs.copyFileSync(
    "./functions/backup-background.js",
    "./netlify/functions/backup-background.js",
  );

  fs.copyFileSync(
    "./functions/backup-cron-job.js",
    "./netlify/functions/backup-cron-job.js",
  );
}

if (basePath && basePath !== "") {
  // Source and destination directories

  if (!visualEditingEnabled) {
    fs.copyFileSync("./dist/en/404/index.html", "./dist/404.html");
  }

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
  if (!visualEditingEnabled) {
    fs.copyFileSync("./dist/en/404/index.html", "./dist/404.html");
  }
}
