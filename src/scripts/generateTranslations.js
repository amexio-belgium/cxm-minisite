import "dotenv/config";
import * as fs from "node:fs";
import { sanityContentQuery } from "../scripts/sanityContentQuery.js";

const locales = process.env.SANITY_LOCALES
  ? process.env.SANITY_LOCALES.split(", ")
  : ["en"];

for (const locale of locales) {
  const { data: translations } = await sanityContentQuery({
    query: `*[_type == "translation" && language == $lang]{"key": key.current, translation}`,
    params: { lang: locale },
  });

  const formatted = {
    $schema: "https://inlang.com/schema/inlang-message-format",
  };

  translations.forEach((item) => {
    if (item.translation && item.key) {
      formatted[item.key] = item.translation;
    }
  });

  fs.writeFile(
    `messages/${locale}.json`,
    JSON.stringify(formatted, null, 4),
    { overwrite: true },
    (err) => {
      if (err) {
        console.log(err);
      }
    },
  );
}

console.log("Finished creating translations");
