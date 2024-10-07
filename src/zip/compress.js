import fs from "node:fs";
import path from "node:path";
import zlib from "node:zlib";
import { pipeline as streamPipeline } from "node:stream";
import { promisify } from "node:util";
import { getDirname } from "../utils/getDirname.js";
import { doesFileExist } from "../utils/doesFileExist.js";

const __dirname = getDirname(import.meta.url);
const pipeline = promisify(streamPipeline);
export const compress = async () => {
  const filePath = path.join(__dirname, "files", "fileToCompress.txt");
  const outputFilePath = path.join(__dirname, "files", "archive.gz");
  try {
    const archiveExists = await doesFileExist(outputFilePath);
    if (archiveExists) {
      console.log("Archive already exists, skipping compression.");
      return;
    }

    const gzip = zlib.createGzip();
    const readStream = fs.createReadStream(filePath);
    const writeStream = fs.createWriteStream(outputFilePath);

    await pipeline(readStream, gzip, writeStream);
    console.log("File successfully compressed");
  } catch (err) {
    console.error(`Error during compression: ${err.message}`);
  }
};
await compress();
