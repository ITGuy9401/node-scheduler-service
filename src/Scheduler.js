import logger from "./config/logger";
import config from "./config/config";
import * as cron from "node-cron";
import {default as pubsubIntegration} from "./integration/pubsub";
import path from "path";
import fs from "fs";

const banner = fs.readFileSync(path.join(__dirname, "banner.txt")).toString("UTF-8");

console.log(banner);
console.log("Launched Scheduler", "v" + process.env.npm_package_version);

switch (config.job.type) {
    case "pubsub":
        logger.info(`Configuring a PubSub job with the following cron: "${config.job.cron}"`);
        cron.schedule(config.job.cron, pubsubIntegration, null);
        break;
    default:
        logger.error("Wrong job type: " + config.job.type);
        process.exit(1);
        break;
}
