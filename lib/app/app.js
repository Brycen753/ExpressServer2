const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const expressSession = require('express-session');
const logger = require('../logger.js');

// --- Function to handle HTTP requests ---

var app = express();

function notFound(req, res, next) {
    res.status(404);
    res.set('Content-Type', 'text/plain');
    res.send(`Not found ${req.method} ${req.url}`);
}

app.use(morgan('dev', { stream: logger.httpStream }));
app.use(bodyParser.urlencoded());
app.use(expressSession({
    secret: 'gulpmugiwara',
    saveUninitialized: false,
    resave: false,
}));

app.use(notFound);

module.exports = app;
