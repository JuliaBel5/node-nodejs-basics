import path from "node:path";
import { fileURLToPath } from "node:url";
import { access, mkdir, readdir, copyFile, stat } from "node:fs/promises";
import { constants } from "node:fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
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
  try {
    await access(pathToFolder, constants.F_OK);
    try {
      await access(pathToNewFolder, constants.F_OK);

      throw new Error(errorMessage);
    } catch (err) {
      if (err.code === "ENOENT") {
        await mkdir(pathToNewFolder);
      } else {
        throw new Error(err.message);
      }
    }
    await copyFolderContents(pathToFolder, pathToNewFolder);
    console.log("Folder copied successfully!");
  } catch (err) {
    throw new Error(err.message);
  }
};

await copy();
