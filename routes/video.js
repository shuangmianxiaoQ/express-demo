const express = require('express');

const { list } = require('../controller/videoController');

const router = express.Router();

router.get('/list', list);

module.exports = router;
