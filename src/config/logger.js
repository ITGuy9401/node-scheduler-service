import winston from "winston";
import config from "./config";
import path from "path";

const loggingPath = config.loggingPath || path.join(__dirname, "/logs");
const instanceName = config.instanceName || "default";

const options = {
    file: {
        level: 'info',
        filename: path.join(loggingPath, `/scheduler-${instanceName}.log`),
        handleExceptions: true,
        json: true,
        maxsize: 5242880, // 5MB
        maxFiles: 5,
        colorize: false,
    },
    console: {
        level: 'debug',
        handleExceptions: true,
        json: false,
        colorize: true,
    },
};

export default winston.createLogger({
    transports: [
        new winston.transports.File(options.file),
        new winston.transports.Console(options.console)
    ],
    exitOnError: false
});
