const mogoose = require('mongoose');
const baseModel = require('./baseModel');
const md5 = require('../utils/md5');

// 定义用户模型
const userSchema = new mogoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    set: (val) => md5(val),
    // 查询时不返回密码
    select: false,
  },
  phone: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    default: null,
  },
  cover: {
    type: String,
    default: null,
  },
  channelDesc: {
    type: String,
    default: null,
  },
  ...baseModel
});

module.exports = userSchema;
