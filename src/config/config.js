import fs from "fs";
import path from "path";

const configFile = fs.readFileSync(process.env.CONFIG_FILE || path.join(__dirname, "..", "..", "config.default.json"));
const config = JSON.parse(configFile);

export default config;
