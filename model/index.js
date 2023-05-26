const mogoose = require('mongoose');
const { MONGODB_URI } = require('../config/config.default');

async function connect() {
  await mogoose.connect(MONGODB_URI);
}

connect()
  .then(() => {
    console.log('connect success');
  })
  .catch((err) => {
    console.log('connect fail');
  });

module.exports = {
  User: new mogoose.model('User', require('./userModel')),
};
