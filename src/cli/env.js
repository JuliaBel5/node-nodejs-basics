const parseEnv = () => {
  const prefix = "RSS_";
  const envVars = Object.entries(process.env)
    .filter(([key]) => key.startsWith(prefix))
    .map(([key, value]) => `${key}=${value}`)
    .join("; ");

  if (envVars) {
    console.log(envVars);
  } else {
    console.log("No such variables found");
  }
};

parseEnv();
