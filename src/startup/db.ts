import mongoose from "mongoose";
import logger from "../middleware/logger";

export default function() {
    const mongoConnection = (process.env.NODE_ENV === 'test') ? process.env.DB_TEST_CONNECT : process.env.DB_CONNECT;
    mongoose.connect(mongoConnection)
        .then(() => logger.info('Connected to mongoDB!'));
}
