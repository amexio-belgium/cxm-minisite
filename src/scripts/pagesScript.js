import fs from "node:fs";
import * as fsExtra from "fs-extra";
import "dotenv/config";

const locales = process.env.SANITY_LOCALES.split(", ");

locales.forEach((locale) => {
  if (!fs.existsSync(`./src/pages/${locale}`)) {
    fs.mkdirSync(`./src/pages/${locale}`);
  } else {
    fsExtra.emptyDirSync(`./src/pages/${locale}`);
  }
  fs.cpSync("./src/pagetemplates", `./src/pages/${locale}`, {
    recursive: true,
  });
});
