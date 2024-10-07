import { parentPort } from "worker_threads";

// n should be received from main thread
const nthFibonacci = (n) =>
  n < 2 ? n : nthFibonacci(n - 1) + nthFibonacci(n - 2);

const sendResult = (result) => {
  parentPort.postMessage({ status: "resolved", data: result });
};

parentPort.on("message", (message) => {
  try {
    const result = nthFibonacci(message);
    sendResult(result);
  } catch (err) {
    parentPort.postMessage({ status: "error", data: null });
  }
});
