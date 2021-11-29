const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_ACCESS_SECRET } = process.env;

module.exports.generateToken = (payload) => {
  const accessToken = jwt.sign(payload, NODE_ENV === 'production' ? JWT_ACCESS_SECRET : 'super-strong-secret', { expiresIn: '7d' });
  return accessToken;
};

module.exports.validateAccessToken = (token) => {
  try {
    const userData = jwt.verify(token, NODE_ENV === 'production' ? JWT_ACCESS_SECRET : 'super-strong-secret');
    return userData;
  } catch (e) {
    return null;
  }
};
