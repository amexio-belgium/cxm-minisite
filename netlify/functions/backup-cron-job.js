import "dotenv/config";
import { schedule } from "@netlify/functions";

const handler = async function (event, context, callback) {
  const url = `${process.env.ASTRO_SITE_URL}`; // Replace with the actual endpoint

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
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

exports.handler = schedule("*/2 * * * *", handler);
