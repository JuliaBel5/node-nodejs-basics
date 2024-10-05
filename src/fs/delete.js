import { access, unlink } from "fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { constants } from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const remove = async () => {
  const errorMessage = "FS operation failed";
  const pathToFile = path.join(__dirname, "files", "fileToRemove.txt");
  try {
    await access(pathToFile, constants.F_OK);
    await unlink(pathToFile);
    console.log("File deleted successfully!");
  } catch (error) {
    if (error.code === "ENOENT") {
      throw new Error(errorMessage);
    } else {
      throw new Error(error.message);
    }
  }
};

await remove();
