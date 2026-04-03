const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const expressSession = require('express-session');
const expressHandlebars = require('express-handlebars');
const logger = require('../logger.js');
const config = require('../config.js');
const common = require("./common.js");
// 1. Import (require) secret/secret.js
const secret = require("./secret/secret.js");
const users = require('./users/users.js');

var app = express();

// configure app settings for handlebars
app.engine('hbs', expressHandlebars.engine({defaultLayout: null, extname: 'hbs'}));
app.set('views', config.projectPath('views'));

// mount the secret router on path /secret
app.use('/secret', secret.router);
app.use('/users', users.router);

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

app.use(common.notFound);

module.exports = app;
