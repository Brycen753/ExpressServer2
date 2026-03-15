const express = require('express');
const common = require('./common.js');
const items = require('./items.js');

const router = express.Router();

router.get('/items', items.readAllItems);

router.use(common.notFound);
router.use(common.internalError);

module.exports = { router };