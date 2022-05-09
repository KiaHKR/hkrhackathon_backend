import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
const app = express();

import logger from "./utility_services/logger.js";
import config from "./startup/config";
import logging from "./startup/logging";
import db from './startup/db'
import routes from "./startup/routes";
import prod from './startup/prod'

config();
logging();
routes(app);
db();
prod(app);


const port = process.env.PORT || 3000;

const server = (process.env.NODE_ENV === 'test') ?
    app.listen() :
    app.listen(port, () => logger.info(`Listening port ${port}...`));

export default server;
