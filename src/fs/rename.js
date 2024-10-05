import { access, rename as fileRename } from "fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { constants } from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rename = async () => {
  const errorMessage = "FS operation failed";
  const pathToWrongFile = path.join(__dirname, "files", "wrongFilename.txt");
  const pathToRightFile = path.join(__dirname, "files", "properFilename.md");

  try {
    await access(pathToWrongFile, constants.F_OK);
    try {
      await access(pathToRightFile, constants.F_OK);
      throw new Error(errorMessage);
    } catch (error) {
      if (error.code === "ENOENT") {
        await fileRename(pathToWrongFile, pathToRightFile);
        console.log("File renamed successfully!");
      } else {
        throw new Error(error.message);
      }
    }
  } catch (error) {
    if (error.code === "ENOENT") {
      throw new Error(errorMessage);
    } else {
      throw new Error(error.message);
    }
  }
};

await rename();
