import { createReadStream } from "fs";
import { createHash } from "crypto";
import path from "node:path";
import { getDirname } from "../utils/getDirname.js";

const __dirname = getDirname(import.meta.url);

const calculateHash = async () => {
  const filePath = path.join(__dirname, "files", "fileToCalculateHashFor.txt");
  const hash = createHash("sha256");
  const fileStream = createReadStream(filePath);

  fileStream.on("data", (chunk) => {
    hash.update(chunk);
  });

  fileStream.on("end", () => {
    const hashValue = hash.digest("hex");
    console.log(`SHA256 Hash: ${hashValue}`);
  });

  fileStream.on("error", (err) => {
    console.error(`Error reading file: ${err.message}`);
  });
};

await calculateHash();
