import { format } from "winston";
import winston from "winston";
const { combine, timestamp, metadata } = format;
import 'winston-mongodb';

export default winston.createLogger({
    level: 'info',
    format: combine(
        timestamp(),
        metadata(),
        winston.format.json(),
    ),
    transports: [
        new winston.transports.MongoDB({ level: 'error', db: process.env.DB_CONNECT }),
        new winston.transports.Console({
            format: winston.format.simple(),
        })
    ]
});
