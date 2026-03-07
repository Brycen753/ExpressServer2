const logger = require('../../logger.js');

function notFound(req, res, next) {
    res.status(404);
    res.json({ message: "Requested respose was not found" });
}

function internalError(err, req, res, next) {
    logger.error(err);
    res.status(500);
    res.json({ message: "Internal server error" });
}

module.exports = { notFound, internalError };