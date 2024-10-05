import path from "node:path";
import { fileURLToPath } from "node:url";
import { writeFile, access } from "node:fs/promises";
import { constants } from "node:fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const create = async () => {
  const fileContent = "I am fresh and young";
  const errorMessage = "FS operation failed";
  const pathToNewFile = path.join(__dirname, "files", "fresh.txt");
  try {
    await access(pathToNewFile, constants.F_OK);
    throw new Error(errorMessage);
  } catch (err) {
    if (err.code === "ENOENT") {
      await writeFile(pathToNewFile, fileContent);
    } else {
      throw new Error(err.message);
    }
  }
};
await create();
