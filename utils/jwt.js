const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const { SECRET } = require('../config/config.default');

const sign = promisify(jwt.sign);
const verify = promisify(jwt.verify);

module.exports. createToken = async (userInfo) => {
  return sign({ userInfo }, SECRET, { expiresIn: '1h' });
};

module.exports.verifyToken = async (req, res, next) => {
  // Authorization: Bearer {token}
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ error: '请提供token' });
  }
  try {
    const { userInfo } = await verify(token.split(' ')[1], SECRET);
    req.user = userInfo;
    next();
  } catch (err) {
    res.status(401).json({ error: '无效的token' });
  }
};
