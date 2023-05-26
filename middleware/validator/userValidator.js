const { body } = require('express-validator');

const validate = require('./errorValidator');
const { User } = require('../../model');

exports.register = validate([
  body('username')
    .notEmpty()
    .withMessage('用户名不能为空')
    .bail()
    .isLength({ min: 3 })
    .withMessage('用户名长度不能小于3'),
  body('email')
    .notEmpty()
    .withMessage('邮箱不能为空')
    .bail()
    .isEmail()
    .withMessage('邮箱格式不正确')
    .bail()
    .custom(async (val) => {
      const email = await User.findOne({ email: val });
      if (email) {
        return Promise.reject('邮箱已被注册');
      }
    }),
  body('phone')
    .notEmpty()
    .withMessage('手机号不能为空')
    .bail()
    .isMobilePhone('zh-CN')
    .withMessage('手机号格式不正确')
    .bail()
    .custom(async (val) => {
      const phone = await User.findOne({ phone: val });
      if (phone) {
        return Promise.reject('手机号已被注册');
      }
    }),
  body('password').notEmpty().withMessage('密码不能为空').bail().isLength({ min: 6 }).withMessage('密码长度不能小于6'),
]);

exports.login = validate([
  body('email')
    .notEmpty()
    .withMessage('邮箱不能为空')
    .bail()
    .isEmail()
    .withMessage('邮箱格式不正确')
    .custom(async (val) => {
      const email = await User.findOne({ email: val });
      if (!email) {
        return Promise.reject('邮箱未注册，请先注册');
      }
    }),
  body('password').notEmpty().withMessage('密码不能为空'),
]);
