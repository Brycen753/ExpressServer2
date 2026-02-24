const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const expressSession = require('express-session');
const logger = require('../logger.js');
const config = require('../config.js');
// 1. Import (require) secret/secret.js

var app = express();

// secret middleware should go in secret feature
// function secret(req, res, next) {
    
// }

// ideally this would go in another module (common.js)
function notFound(req, res, next) {
    res.status(404);
    res.set('Content-Type', 'text/plain');
    res.send(`Not found ${req.method} ${req.url}`);
}

app.set('views', config.projectPath('views'));

app.use(morgan('dev', { stream: logger.httpStream }));
app.use(express.static(config.projectPath('static')));
app.use(bodyParser.urlencoded());
app.use(expressSession({
    secret: 'gulpmugiwara',
    saveUninitialized: false,
    resave: false,
}));
// get rid of this:
// app.use('/secret', express.static(config.projectPath('secret')));

// mount the secret router on path /secret
app.use('/secret', secret.router);
app.use(notFound);

module.exports = app;
