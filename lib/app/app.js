const express = require('express');
const morgan = require('morgan');
const logger = require('../logger.js');

app.use(express.static(config.projectPath('static')));

// --- Function to handle HTTP requests ---

var app = express();

function notFound(req, res, next) {
    res.status(404);
    res.set('Content-Type', 'text/plain');
    res.send(`Not found ${req.method} ${req.url}`);
}

app.use(morgan('dev', { stream: logger.httpStream }));
app.use(notFound);

module.exports = app;
