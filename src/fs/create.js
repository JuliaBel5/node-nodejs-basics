import path from "node:path";
import { getDirname } from "../utils/getDirname.js";
import { doesFileExist } from "../utils/doesFileExist.js";
import { writeFile } from "node:fs/promises";

const __dirname = getDirname(import.meta.url);

const create = async () => {
  const fileContent = "I am fresh and young";
  const errorMessage = "FS operation failed";
  const pathToNewFile = path.join(__dirname, "files", "fresh.txt");
  const fileExists = await doesFileExist(pathToNewFile);

  if (fileExists) {
    throw new Error(errorMessage);
  }
  try {
    await writeFile(pathToNewFile, fileContent);
  } catch (err) {
    throw new Error(err.message);
  }
};

await create();
