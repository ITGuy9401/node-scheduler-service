import fs from "fs";

const configFile = fs.readFileSync(process.env.CONFIG_FILE || __dirname + "config.json");
const config = JSON.parse(configFile);

export default config;
