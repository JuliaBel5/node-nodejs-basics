import { Transform } from "node:stream";
import { pipeline } from "node:stream/promises";

const transform = async () => {
  const reverseTransform = new Transform({
    transform(chunk, encoding, callback) {
      const reversed = chunk.toString().split("").reverse().join("");
      callback(null, reversed);
    },
  });

  try {
    await pipeline(process.stdin, reverseTransform, process.stdout);
  } catch (error) {
    console.error("Operation failed", error);
  }
};

await transform();
