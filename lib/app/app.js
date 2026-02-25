const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const expressSession = require('express-session');
const logger = require('../logger.js');
const config = require('../config.js');
const common = require("./common.js");
// 1. Import (require) secret/secret.js
const secret = require("./secret/secret.js");

var app = express();

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
app.use(common.notFound);

module.exports = app;
