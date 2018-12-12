import config from "../config/config";
import {PubSub} from "@google-cloud/pubsub";
import logger from "../config/logger";

const projectId = config.job.meta.project;
const topic = config.job.meta.topic;

export default async function trigger() {
    const client = new PubSub({
        projectId: projectId
    });

    const dataBuffer = new Buffer(`triggered on ${new Date().toISOString()}`, "UTF-8");

    const messageId = await client
        .topic(topic)
        .publisher()
        .publish(dataBuffer);

    logger.info("Triggered job - MessageID:", messageId);
    return messageId;
}
