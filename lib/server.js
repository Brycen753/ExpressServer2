const http = require('http');
const config = require('./config');
const logger = require('./logger');
const app = require('./app/app');

// --- Create and start the HTTP server ---
const server = http.createServer(app);

server.listen(config.httpPort, () => {
    logger.info(`Server is listening on port ${config.httpPort}`);
});