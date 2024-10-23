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

const shareName = "fusebackups";
const directoryName = "backups";

const account = "amexiofusebackup";
const accountKey = process.env.AZURE_FILES_ACCOUNT_KEY;

const credential = new StorageSharedKeyCredential(account, accountKey);
const serviceClient = new ShareServiceClient(
  `https://${account}.file.core.windows.net`,
  credential,
);

async function backup() {
  await exportDataset({
    // Instance of @sanity/client configured to correct project ID and dataset
    client: sanityClient,
    // Name of dataset to export
    dataset: DATASET,
    // Path to write zip-file to
    outputPath: `/tmp/${DATASET}.tar.gz`,
    assetConcurrency: 12,
  });

  fs.readdirSync("/tmp/").forEach((file) => {
    console.log("File in tmp folder:");
    console.log(file);
  });

  const directoryClient = serviceClient
    .getShareClient(shareName)
    .getDirectoryClient(directoryName);

  const readStream = fs.createReadStream(`/tmp/${DATASET}.tar.gz`, {
    highWaterMark: 3000 * 1000,
  });
  let chunks = [];

  let chunkCount = 0;

  readStream.on("data", async (chunk) => {
    chunks.push(chunk); // Collect chunks
    chunkCount += 1;
    console.log(chunkCount);
  });

  readStream.on("end", async () => {
    const now = new Date()
      .toISOString()
      .replace("T", "_")
      .replace(/:/g, "-")
      .slice(0, 19);
    const fileName = `${now}-${DATASET}.tar.gz`;
    const fileClient = directoryClient.getFileClient(fileName);

    const buffer = Buffer.concat(chunks);
    const fileSize = Buffer.byteLength(buffer);
    console.log("Filesize: " + fileSize);
    await fileClient.create(fileSize);
    console.log(`Create file ${fileName} successfully`);

    for (let i = 0; i < chunks.length; i++) {
      await fileClient.uploadRange(
        chunks[i],
        i * 3000 * 1000,
        Buffer.byteLength(chunks[i]),
      );
    }

    console.log("Finished uploading backup to azure");

    await deleteOldestZips();

    console.log("Finished backup");
  });
}

async function deleteOldestZips() {
  try {
    const directoryClient = serviceClient
      .getShareClient(shareName)
      .getDirectoryClient(directoryName);
    let zipFiles = [];

    // List files in the directory
    let iter = directoryClient.listFilesAndDirectories();
    for await (const item of iter) {
      if (item.kind === "file" && item.name.endsWith(".gz")) {
        const fileClient = directoryClient.getFileClient(item.name);
        const properties = await fileClient.getProperties();

        zipFiles.push({
          name: item.name,
          lastModified: properties.lastModified,
        });
      }
    }

    // Sort by last modified date (oldest first)
    zipFiles.sort((a, b) => a.lastModified - b.lastModified);

    // If there are more than 5 zip files, delete the oldest ones
    const filesToDelete =
      zipFiles.length > 31 ? zipFiles.slice(0, zipFiles.length - 31) : [];

    // Delete the extra files
    for (const file of filesToDelete) {
      const fileClient = directoryClient.getFileClient(file.name);
      console.log(`Deleting file: ${file.name}`);
      await fileClient.delete();
    }

    if (filesToDelete.length > 0) {
      console.log(
        `${filesToDelete.length} old zip file(s) deleted successfully.`,
      );
    } else {
      console.log("No zip files to delete. The 31 newest zip files are kept.");
    }
  } catch (error) {
    console.error("Error deleting files:", error.message);
  }
}
export default async function executeBackup(req, context) {
  try {
    const body = await req?.json();
    if (body?.password === process.env.BACKUP_FUNCTION_PASSWORD) {
      try {
        await backup();
        return new Response(
          JSON.stringify({ message: "Backup completed successfully" }),
          { status: 200 },
        );
      } catch (err) {
        console.error("Backup failed:", err.message);
        return new Response(
          JSON.stringify({ message: "Backup process failed" }),
          { status: 500 },
        );
      }
    } else {
      console.error("Authorization failed");
      return new Response(JSON.stringify({ message: "Unauthorized" }), {
        status: 401,
      });
    }
  } catch (err) {
    console.error("Error parsing request:", err.message);
    return new Response(JSON.stringify({ message: "Invalid request" }), {
      status: 400,
    });
  }
}
