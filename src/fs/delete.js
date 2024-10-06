import { unlink } from "fs/promises";
import path from "node:path";
import { getDirname } from "../utils/getDirname.js";
import { doesFileExist } from "../utils/doesFileExist.js";

const __dirname = getDirname(import.meta.url);

const remove = async () => {
  const errorMessage = "FS operation failed";
  const pathToFile = path.join(__dirname, "files", "fileToRemove.txt");
  const fileExists = await doesFileExist(pathToFile);
  if (!fileExists) {
    throw new Error(errorMessage);
  }

  try {
    await unlink(pathToFile);
  } catch (error) {
    throw new Error(error.message);
  }
};

await remove();
