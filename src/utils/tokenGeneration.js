const { JWT_SECRET } = require('../config/env.json');
const jwt = require('jsonwebtoken');

module.exports = (user, tokenData) => {
  // Token generation
  user.token = jwt.sign(tokenData, JWT_SECRET, { expiresIn: 60 * 60 });
  return user;
};