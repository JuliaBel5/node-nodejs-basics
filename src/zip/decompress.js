import fs from "node:fs";
import path from "node:path";
import zlib from "node:zlib";
import { pipeline as streamPipeline } from "node:stream";
import { promisify } from "node:util";
import { getDirname } from "../utils/getDirname.js";
import { doesFileExist } from "../utils/doesFileExist.js";

const __dirname = getDirname(import.meta.url);
const pipeline = promisify(streamPipeline);
const decompress = async () => {
  const compressedFilePath = path.join(__dirname, "files", "archive.gz");
  const outputFilePath = path.join(__dirname, "files", "fileToCompress.txt");
  const fileExists = await doesFileExist(compressedFilePath);

  if (!fileExists) {
    console.error(`Error: The file ${compressedFilePath} does not exist`);
    return;
  }

  const gunzip = zlib.createGunzip();
  const readStream = fs.createReadStream(compressedFilePath);
  const writeStream = fs.createWriteStream(outputFilePath);

  try {
    await pipeline(readStream, gunzip, writeStream);
  } catch (err) {
    console.error(`Error during decompression: ${err.message}`);
  }
};

await decompress();
