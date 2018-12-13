import {PubSub} from "@google-cloud/pubsub";
import logger from "../config/logger";

async function trigger(config) {
    logger.info(`Triggering job ${config.job.name}`);
    try {

        const message = `Triggered job ${config.job.name} on ${new Date().toISOString()}`;

        const client = new PubSub({
            projectId: config.job.meta.project
        });

        logger.info(`Triggering ${config.job.name} on project ${config.job.meta.project} and topic ${config.job.meta.topic}`);

        const dataBuffer = Buffer.from(message, "UTF-8");

        const messageId = await client
            .topic(config.job.meta.topic)
            .publisher()
            .publish(dataBuffer);

        logger.info(`${message} - MessageID: ${messageId}`);
        return messageId;
    } catch (error) {
        logger.error("There was an error triggering the job", error);
    }
}

export default trigger;
