const express = require ('express');
const common = require('./common.js');

const router = express.Router();

router.use(common.notFound);
router.use(common.internalError);

module.exports = { router };