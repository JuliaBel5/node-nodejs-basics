import { spawn } from "child_process";
import process from "process";
import { getDirname } from "../utils/getDirname.js";
import path from "node:path";

const __dirname = getDirname(import.meta.url);
const filePath = path.join(__dirname, "files", "script.js");
const spawnChildProcess = async (args) => {
  const child = spawn("node", [filePath, ...args], {
    stdio: ["pipe", "pipe", "pipe"],
  });

  process.stdin.pipe(child.stdin);

  child.stdout.pipe(process.stdout);

  child.stderr.pipe(process.stderr);

  child.on("exit", (code) => {
    console.log(`Child process exited with code ${code}`);
  });
};

spawnChildProcess(["Hi there!", "How are you?"]);
