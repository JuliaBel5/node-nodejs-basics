import { createWriteStream } from "node:fs";
import path from "node:path";
import { pipeline } from "node:stream/promises";
import { getDirname } from "../utils/getDirname.js";

const __dirname = getDirname(import.meta.url);

const write = async () => {
  const filePath = path.join(__dirname, "files", "fileToWrite.txt");
  const writableStream = createWriteStream(filePath, { encoding: "utf8" });

  try {
    await pipeline(process.stdin, writableStream);
  } catch (error) {
    console.error(`Operation failed: ${error.message}`);
  }
};

await write();
