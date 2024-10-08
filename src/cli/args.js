const parseArgs = () => {
  const args = process.argv.slice(2);

  const result = [];
  args.map((arg, i) => {
    if (args[i].startsWith("--")) {
      const key = arg.slice(2);
      const value = args[i + 1];
      result.push(`${key} is ${value}`);
    }
  });
  console.log(result.join(", "));
};

parseArgs();
