import fs from "node:fs";
import * as fsExtra from "fs-extra";
import path from "path";
import "dotenv/config";

// Helper function to replace occurrences of 'replaceMeWithLocale' in a file
const replaceInFile = (filePath, locale) => {
  const fileContents = fs.readFileSync(filePath, "utf-8");
  const updatedContents = fileContents.replace(/replaceMeWithLocale/g, locale);
  fs.writeFileSync(filePath, updatedContents, "utf-8");
};

// Function to recursively go through all files in a directory and apply replacements
const processDirectory = (dir, locale) => {
  const files = fs.readdirSync(dir);
  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.lstatSync(filePath);
    if (stat.isDirectory()) {
      processDirectory(filePath, locale); // Recurse into subdirectory
    } else {
      replaceInFile(filePath, locale); // Replace content in file
    }
  });
};

const locales = process.env.SANITY_LOCALES.split(", ");
await fsExtra.remove("./src/pages/en");
await fsExtra.remove("./src/pages/nl");
await fsExtra.remove("./src/pages/fr");
locales.forEach(async (locale) => {
  const localeDir = `./src/pages/${locale}/`;

  if (!fsExtra.exists(localeDir)) {
    await fsExtra.mkdir(localeDir);
  } else {
    await fsExtra.emptyDir(localeDir);
  }

  // Copy files from pagetemplates to the locale directory
  await fsExtra.copy("./src/pagetemplates/", localeDir, {
    recursive: true,
  });

  // Process all files in the new locale directory to replace 'replaceMeWithLocale' with the locale
  processDirectory(localeDir, locale);
});
