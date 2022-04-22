import logger from "./logger";

export = function(err, req, res, next){
    logger.error(err.message, err);
    res.status(500).send('Something went wrong! Please wait while our little elves are investigating.');
}
