import path from "node:path";
import { fileURLToPath } from "node:url";
import { readFile } from "node:fs/promises";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
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
