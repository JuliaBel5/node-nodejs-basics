import { rename as fileRename } from "fs/promises";
import path from "node:path";
import { getDirname } from "../utils/getDirname.js";
import { doesFileExist } from "../utils/doesFileExist.js";

const __dirname = getDirname(import.meta.url);

const rename = async () => {
  const errorMessage = "FS operation failed";
  const pathToWrongFile = path.join(__dirname, "files", "wrongFilename.txt");
  const pathToRightFile = path.join(__dirname, "files", "properFilename.md");

  const sourceExists = await doesFileExist(pathToWrongFile);
  if (!sourceExists) {
    throw new Error(errorMessage);
  }

  const destinationExists = await doesFileExist(pathToRightFile);
  if (destinationExists) {
    throw new Error(errorMessage);
  }

  try {
    await fileRename(pathToWrongFile, pathToRightFile);
  } catch (error) {
    throw new Error(error.message);
  }
};

await rename();
