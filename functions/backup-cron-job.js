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
  });

  return {
    statusCode: 200,
  };
};

exports.handler = schedule("*/2 * * * *", handler);
