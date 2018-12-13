#!/usr/bin/node
import logger from "./config/logger";
import config from "./config/config";
import * as cron from "node-cron";
import {default as pubsubIntegration} from "./integration/pubsub";
import path from "path";
import fs from "fs";

import express from "express";

const app = express();
app.use(express.json());

const port = process.env.PORT || 30125;


const banner = fs.readFileSync(path.join(__dirname, "banner.txt")).toString("UTF-8");

logger.info(`Found ${config.length} jobs to schedule`);

console.log(config);
for (let cfg of config) {
    switch (cfg.job.type) {
        case "pubsub":
            logger.info(`Configuring ${cfg.job.name} as PubSub job with the following cron: "${cfg.job.cron}"`);
            cron.schedule(cfg.job.cron, () => pubsubIntegration(cfg), null);
            break;
        default:
            logger.error(`Job ${cfg.job.name}, Wrong job type: ${cfg.job.type}`);
            process.exit(1);
            break;
    }
}

app.get("/", (req, res) => {
    res.send(config);
});

app.listen(port, () => {
    console.log(banner);
    console.log("Launched Scheduler", "v" + process.env.npm_package_version, "on port", port);
    logger.info("Launched Scheduler", "v" + process.env.npm_package_version, "on port", port);
});
