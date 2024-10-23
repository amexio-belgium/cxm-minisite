import "dotenv/config";
import { schedule } from "@netlify/functions";

const handler = async function (event, context, callback) {
  const url = `${process.env.ASTRO_SITE_URL}.netlify/functions/backup-background`; // Replace with the actual endpoint

  const data = {
    password: process.env.BACKUP_FUNCTION_PASSWORD,
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    // Ensure the request was successful
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }
  } catch (error) {
    console.error("Error during fetch:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Function failed" }),
    };
  }

  return {
    statusCode: 200,
  };
};

exports.handler = schedule("0 1 * * *", handler);
