import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
const app = express();

import logger from "./utility_services/logger";
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
const server =app.listen(port, () => logger.info(`Listening port ${port}...`));

export = server;
