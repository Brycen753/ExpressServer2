const logger = require('../logger.js');

// --- Function to handle HTTP requests ---
function requestHandler(req, res) {
    logger.http(`Received request: ${req.method} ${req.url}`);

    if (req.url === '/hello') {
        logger.info(`Serving /hello`);
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.write('Hello, world!\n');
        res.end();
    }
    else {
        logger.error(`Unknown route: ${req.url}`);
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found\n');
    }

    
}

module.exports = requestHandler;
