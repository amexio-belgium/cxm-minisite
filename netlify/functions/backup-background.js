import "dotenv/config";
import { createClient } from "@sanity/client";
import exportDataset from "@sanity/export";
import fs from "node:fs";

import {
  ShareServiceClient,
  StorageSharedKeyCredential,
} from "@azure/storage-file-share";

const DATASET = process.env.SANITY_STUDIO_DATASET;

const sanityClient = createClient({
  projectId: process.env.SANITY_STUDIO_PROJECT_ID,
  dataset: process.env.SANITY_STUDIO_DATASET,
  useCdn: false, // set to `false` to bypass the edge cache
  apiVersion: "2023-05-03", // use current date (YYYY-MM-DD) to target the latest API version
  token: process.env.SANITY_API_READ_TOKEN,
});

async function backup() {
  console.log("export dataset");

  await exportDataset({
    // Instance of @sanity/client configured to correct project ID and dataset
    client: sanityClient,

    // Name of dataset to export
    dataset: DATASET,

    // Path to write zip-file to
    outputPath: `/tmp/${DATASET}.tar.gz`,

    assetConcurrency: 12,
  });

  const account = "amexiofusebackup";
  const accountKey = process.env.AZURE_FILES_ACCOUNT_KEY;

  const credential = new StorageSharedKeyCredential(account, accountKey);
  const serviceClient = new ShareServiceClient(
    `https://${account}.file.core.windows.net`,
    credential,
  );

  const shareName = "fusebackups";
  const directoryName = "backups";

  const directoryClient = serviceClient
    .getShareClient(shareName)
    .getDirectoryClient(directoryName);

  const readStream = fs.createReadStream(`/tmp/${DATASET}.tar.gz`, {
    highWaterMark: 3000 * 1000,
  });
  let chunks = [];

  readStream.on("data", async (chunk) => {
    chunks.push(chunk); // Collect chunks
  });

  readStream.on("end", async () => {
    const date = new Date();
    const fileName = `${date.getTime()}-${DATASET}.tar.gz`;
    const fileClient = directoryClient.getFileClient(fileName);

    const buffer = Buffer.concat(chunks);
    const fileSize = Buffer.byteLength(buffer);
    await fileClient.create(fileSize);
    console.log(`Create file ${fileName} successfully`);

    for (let i = 0; i < chunks.length; i++) {
      await fileClient.uploadRange(
        chunks[i],
        i * 3000 * 1000,
        Buffer.byteLength(chunks[i]),
      );
    }

    // Upload file range
  });

  return true;
  // return Promise.all(promisesArray);
}

backup()
  .then(() => {
    console.log("all ok");
  })
  .catch((error) => {
    console.log("oops error");
    console.log(error);
    // console.log(error);
  });

export default async function (event, context, callback) {
  backup()
    .then(() => {
      callback(null, {
        statusCode: 200,
        body: "Everything went well!",
      });
    })
    .catch((error) => {
      callback(null, {
        statusCode: 422,
        body: `Oops! Something went wrong. ${error}`,
      });
    });
}
