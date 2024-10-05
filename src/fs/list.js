import path from "node:path";
import { fileURLToPath } from "node:url";
import { access, readdir } from "fs/promises";
import { constants } from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const list = async () => {
  const errorMessage = "FS operation failed";
  const pathToFolder = path.join(__dirname, "files");

  try {
    await access(pathToFolder, constants.F_OK);
    try {
      const filesNames = await readdir(pathToFolder);
      console.log(filesNames);
    } catch (error) {
      throw new Error(error.message);
    }
  } catch (error) {
    if (error.code === "ENOENT") {
      throw new Error(errorMessage);
    } else {
      throw new Error(error.message);
    }
  }
};

await list();
