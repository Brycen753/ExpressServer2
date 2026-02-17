const logger = require('../logger.js');
const express = require('express');

// --- Function to handle HTTP requests ---

var app = express();

function helloWorld(req, res, next) {
    res.status(200);
    res.set('Content-Type', 'text/plain');
    res.send('Hello, world!');
}

app.use(helloWorld);

module.exports = app;
