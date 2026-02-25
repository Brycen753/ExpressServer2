// Put middleware functions in a separate file
const express = require('express');
// Import (require) midlleware functions
const secretMiddleware = require('./secretMiddleware.js');

// create the router
var router = express.Router();

// start mounting middleware functions
// initialize the feature
router.use(secretMiddleware.init);
// pretend like "showPlayPage" is a middleware function that shows the play page
router.get('/play', secretMiddleware.showPlayPage);
// Submits a guess
router.post('/guess', secretMiddleware.guessSubmission);
// Throws out the current game so that any future requests will be for a new game
router.post('/reset', secretMiddleware.resetFeature);

module.exports = { router };
