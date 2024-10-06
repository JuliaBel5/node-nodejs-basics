import path from "node:path";
import { getDirname } from "../utils/getDirname.js";
import { doesFileExist } from "../utils/doesFileExist.js";
import { readdir } from "fs/promises";

const __dirname = getDirname(import.meta.url);

const list = async () => {
  const errorMessage = "FS operation failed";
  const pathToFolder = path.join(__dirname, "files");
  const folderExists = await doesFileExist(pathToFolder);
  if (!folderExists) {
    throw new Error(errorMessage);
  }

  try {
    const filesNames = await readdir(pathToFolder);
    console.log(filesNames);
  } catch (error) {
    throw new Error(error.message);
  }
};

await list();
