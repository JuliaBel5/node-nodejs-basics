import fs from "node:fs";
import path from "node:path";
import { getDirname } from "../utils/getDirname.js";

const __dirname = getDirname(import.meta.url);

const read = async () => {
  const filePath = path.join(__dirname, "files", "fileToRead.txt");
  const readStream = fs.createReadStream(filePath, { encoding: "utf8" });

  readStream.on("data", (data) => {
    process.stdout.write(data);
  });

  readStream.on("error", (error) => {
    console.error(`Error reading the file: ${error.message}`);
  });

  readStream.on("end", () => {
    console.log("\n");
  });
};

await read();
