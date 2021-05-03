const rateLimit = require('express-rate-limit');

module.exports.limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

module.exports.STATUS_CODES = {
  ok: 200,
  created: 201,
  badRequest: 400,
  unauthorized: 401,
  notFound: 404,
  serverError: 500,
};

module.exports.ERROR_MESSAGES = {
  notFound: 'Requested resource not found.',
  unauthorized: 'Authorization Required',
  serverError: 'An error has occured on the server.',
  articlebadRequest: 'Data validation failed.',
  articleNotFound: 'Article not found.',
  userNotFound: 'User not found',
  deleteArticle: 'You can only delete your own articles.',
  signin: 'Incorrect email or password.',
  signup: 'Unable to create a user with the credentials provided.',
  userBadRequest: 'User not found.',
};