import banner from "banner.txt";
import logger from "./config/logger";
import config from "./config/config";
import * as cron from "node-cron";
import {default as pubsubIntegration} from "./integration/pubsub";

logger.info(banner);
logger.info("Launched Scheduler", "v" + process.env.npm_package_version);

switch (config.job.type) {
    case "pubsub":
        cron.schedule(config.job.cron, pubsubIntegration, null);
        break;
    default:
        logger.error("Wrong job type: " + config.job.type);
        process.exit(1);
        break;
}
