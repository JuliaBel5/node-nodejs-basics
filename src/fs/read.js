import path from "node:path";
import { getDirname } from "../utils/getDirname.js";
import { readFile } from "node:fs/promises";

const __dirname = getDirname(import.meta.url);
const read = async () => {
  try {
    const filePath = path.join(__dirname, "files", "fileToRead.txt");
    const fileContent = await readFile(filePath, "utf8");

    console.log(fileContent);
  } catch (err) {
    throw new Error("FS operation failed");
  }
};
read();
