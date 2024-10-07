import { Worker } from "worker_threads";
import os from "os";
import path from "path";
import { getDirname } from "../utils/getDirname.js";

const __dirname = getDirname(import.meta.url);

const performCalculations = async () => {
  const numOfCPUs = os.cpus().length;
  const workers = [];
  const results = new Array(numOfCPUs).fill(null);

  const promises = Array.from({ length: numOfCPUs }, (_, index) => {
    return new Promise((resolve) => {
      const workerData = 10 + index;
      const worker = new Worker(path.join(__dirname, "worker.js"));

      worker.postMessage(workerData);

      worker.on("message", (message) => {
        results[index] = message;
        resolve();
      });

      worker.on("error", () => {
        results[index] = { status: "error", data: null };
        resolve();
      });

      workers.push(worker);
    });
  });

  await Promise.all(promises);

  console.log(results);
};

await performCalculations();
