import path from "node:path";
import { getDirname } from "../utils/getDirname.js";
import { doesFileExist } from "../utils/doesFileExist.js";
import { mkdir, readdir, copyFile, stat } from "node:fs/promises";

const __dirname = getDirname(import.meta.url);
const copyFolderContents = async (source, destination) => {
  const items = await readdir(source);

  for (const item of items) {
    const sourceItemPath = path.join(source, item);
    const destinationItemPath = path.join(destination, item);

    const itemStats = await stat(sourceItemPath);

    if (itemStats.isDirectory()) {
      await mkdir(destinationItemPath);
      await copyFolderContents(sourceItemPath, destinationItemPath);
    } else {
      await copyFile(sourceItemPath, destinationItemPath);
    }
  }
};
const copy = async () => {
  const errorMessage = "FS operation failed";
  const pathToFolder = path.join(__dirname, "files");
  const pathToNewFolder = path.join(__dirname, "files_copy");

  const sourceExists = await doesFileExist(pathToFolder);
  if (!sourceExists) {
    throw new Error(errorMessage);
  }

  const destinationExists = await doesFileExist(pathToNewFolder);
  if (destinationExists) {
    throw new Error(errorMessage);
  }
  try {
    await mkdir(pathToNewFolder);
    await copyFolderContents(pathToFolder, pathToNewFolder);
  } catch (err) {
    throw new Error(err.message);
  }
};

await copy();
