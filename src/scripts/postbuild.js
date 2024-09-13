import fs from "node:fs";
import * as fsExtra from "fs-extra";
import { loadEnv } from "vite";

const { PUBLIC_ASTRO_BASE_PATH } = loadEnv(
  process.env.NODE_ENV,
  process.cwd(),
  "",
);

const basePath = PUBLIC_ASTRO_BASE_PATH || "";

if (basePath && basePath !== "") {
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
