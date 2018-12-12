import config from "../config/config";
import {PubSub} from "@google-cloud/pubsub";
import logger from "../config/logger";

const projectId = config.job.meta.project;
const topic = config.job.meta.topic;

async function trigger() {
    logger.info("Triggering job");
    try {
        const client = new PubSub({
            projectId: projectId
        });

        const dataBuffer = Buffer.from(`triggered on ${new Date().toISOString()}`, "UTF-8");

        const messageId = await client
            .topic(topic)
            .publisher()
            .publish(dataBuffer);

        logger.info("Triggered job - MessageID:", messageId);
        return messageId;
    } catch (error) {
        logger.error("There was an error triggering the job", error);
    }
}

export default trigger;
