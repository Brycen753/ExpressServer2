const http = require('http');
const config = require('./config');
const logger = require('./logger');
const app = require('./app/app');
const db = require('./db.js');

// --- Create and start the HTTP server ---
const server = http.createServer(app);

db.connect(config.dbInfo)
    .then(() => {
        logger.info('Connected to database');
        server.listen(config.httpPort, () => {
            logger.info(`Server listening on port ${config.httpPort}...`);
        });
    })
    .catch((err) => {
        logger.error(err);
    });