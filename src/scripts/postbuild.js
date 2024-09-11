import fs from "node:fs";
import * as fsExtra from "fs-extra";
import { loadEnv } from "vite";

const { PUBLIC_ASTRO_BASE_PATH } = loadEnv(
  process.env.NODE_ENV,
  process.cwd(),
  "",
);

if (PUBLIC_ASTRO_BASE_PATH && PUBLIC_ASTRO_BASE_PATH !== "") {
  // Source and destination directories
  if (!fs.existsSync("./build")) {
    fs.mkdirSync("./build");
  }

  fs.cpSync("./dist", "./build/", { recursive: true });
  fsExtra.emptyDirSync("./dist");

  fs.mkdirSync(`./dist${PUBLIC_ASTRO_BASE_PATH}`);

  fs.cpSync("./build", `./dist${PUBLIC_ASTRO_BASE_PATH}/`, { recursive: true });
  fsExtra.emptyDirSync("./build");
  fs.rmdir("./build", (err) => {
    if (err) {
      throw err;
    }
  });
}
