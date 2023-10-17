const jwt = require('jsonwebtoken');
const {config} = require('../config/config');

function sign(user){
  const payload = {
    sub: user.id,
    role: user.role
}
  console.log(config.jwtSecret);
  return jwt.sign(payload, config.jwtSecret, { expiresIn: '1h' });
}

module.exports = sign;
