const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const AuthError = require('../errors/auth-err');

dotenv.config();
const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new AuthError('Authorization Required');
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
      payload = jwt.verify(
        token,
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret'
      );
  } catch (err) {
        throw new AuthError('Authorization Required');
  }
  req.user = payload;
  next();
};
