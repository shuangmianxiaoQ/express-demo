const _ = require('lodash');
const { User } = require('../model');
const { createToken } = require('../utils/jwt');

exports.register = async (req, res) => {
  const userModel = new User(req.body);
  const result = await userModel.save();
  const data = _.omit(result.toJSON(), ['password']);
  res.status(201).json(data);
};

exports.login = async (req, res) => {
  const result = await User.findOne(req.body);
  if (!result) {
    return res.status(401).json({ error: '密码不正确' });
  }
  const json = result.toJSON();
  const token = await createToken(json);
  res.status(200).json({ ...json, token });
};

exports.list = (req, res) => {
  console.log(req.user, 'req');
  res.send('user list');
};

exports.update = async (req, res) => {
  const result = await User.findByIdAndUpdate(req.user._id, req.body, { new: true })
  res.status(200).json(result);
};
