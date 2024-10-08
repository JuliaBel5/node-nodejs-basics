import { access } from "node:fs/promises";
import { constants } from "node:fs";

export const doesFileExist = async (filePath) => {
  try {
    await access(filePath, constants.F_OK);
    return true;
  } catch (err) {
    if (err.code === "ENOENT") {
      return false;
    } else {
      throw new Error(err.message);
    }
  }
};
