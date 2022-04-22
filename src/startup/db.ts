import mongoose from "mongoose";
import logger from "../middleware/logger";

export default function() {
    mongoose.connect(process.env.DB_CONNECT)
        .then(() => logger.info('Connected to mongoDB!'));
}
