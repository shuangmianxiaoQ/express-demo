const express = require('express');

const controller = require('../controller/userController');
const validator = require('../middleware/validator/userValidator');
const { verifyToken } = require('../utils/jwt');

const router = express.Router();

router
  .post('/register', validator.register, controller.register)
  .post('/login', validator.login, controller.login)
  .get('/list', verifyToken, controller.list)
  .put('/', verifyToken, validator.update, controller.update);

module.exports = router;
