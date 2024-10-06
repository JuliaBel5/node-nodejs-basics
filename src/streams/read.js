import fs from "node:fs";
import path from "node:path";
import { getDirname } from "../utils/getDirname.js";

const __dirname = getDirname(import.meta.url);

const read = async () => {
  const filePath = path.join(__dirname, "files", "fileToRead.txt");
  const readStream = fs
    .createReadStream(filePath, { encoding: "utf8", highWaterMark: 1 })
    .pipe(process.stdout);

  readStream.on("error", (error) => {
    console.error(`Error reading the file: ${error.message}`);
  });
};

await read();
