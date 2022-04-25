import logger from "../middleware/logger";
import winston from "winston";

export default function() {
    const actions = (ex) => {
        winston.add(new winston.transports.Console());
        logger.error(ex.message, ex);
        winston.info(ex);
    }

    process.on('uncaughtException', (ex) => {
        actions(ex);
    });

    process.on('unhandledRejection', (ex) => {
        actions(ex);
    });
}
