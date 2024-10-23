import "dotenv/config";
import { schedule } from "@netlify/functions";

const handler = function (event, context, callback) {
  const url = `${process.env.ASTRO_SITE_URL}.netlify/functions/backup-background`; // Replace with the actual endpoint

  const data = {
    password: process.env.BACKUP_FUNCTION_PASSWORD,
  };

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((data) => {
      console.log("Success:", data);
      return {
        statusCode: 200,
      };
    })
    .catch((error) => {
      console.error("Error:", error);
      return {
        statusCode: 500,
      };
    });
};

exports.handler = schedule("*/2 * * * *", handler);
