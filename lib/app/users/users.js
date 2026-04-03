const express = require('express');

var router = express.Router();

const { authenticateUser, authorizeAdmin } = require('./usersMiddleware');

// Requirement 1: Apply authentication to ALL URLs with the /users prefix
router.use(authenticateUser);

// Requirement 2: Apply admin authorization to URLs with the /users/admin prefix
router.use('/admin', authorizeAdmin);

module.exports = { router };