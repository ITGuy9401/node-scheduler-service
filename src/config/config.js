import fs from "fs";
import path from "path";
import logger from "./logger";

const PATH = path.join(__dirname, "..", "..", "jobs-enabled");

const jobs = fs.readdirSync(PATH, {
    withFileTypes: true
}).filter(file => file.name.toString().endsWith(".json"))
    .map(file => {
        logger.info(`logging file ${file.name}`);
        if (file.isFile()) {
            return fs.readFileSync(path.join(PATH, file.name), {
                encoding: "utf8"
            });
        } else {
            return fs.readlinkSync(path.join(PATH, file.name), {
                encoding: "utf8"
            });
        }
    })
    .map(stringJson => JSON.parse(stringJson));

export default jobs;
