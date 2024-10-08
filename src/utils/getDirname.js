import path from "node:path";
import { fileURLToPath } from "node:url";

export function getDirname(url) {
  const __filename = fileURLToPath(url);
  return path.dirname(__filename);
}
