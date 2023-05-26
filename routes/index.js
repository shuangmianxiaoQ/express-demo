var express = require('express');

var router = express.Router();

router.use('/user', require('./user'));
router.use('/video', require('./video'));

module.exports = router;
