const NotFoundError = require('../errors/not-found-err');
const User = require('../models/user');
const { ERROR_MESSAGES, STATUS_CODES } = require('../utils/constants');

module.exports.getAllUsers = (req, res, next) => {
  User.find({})
    .select('+password')
    // .then((user) => res.send(user))
    .then((users) => res.status(STATUS_CODES.ok).send({ data: users }))
    .catch(next);
};

module.exports.getUserById = (req, res, next) => {
  User.findById(req.params.id === 'me' ? req.user._id : req.params.id)
    .select('+password')
    .then((user) => {
      if (user) {
        res.status(STATUS_CODES.ok).send(user);
      } else {
        throw new NotFoundError(ERROR_MESSAGES.userBadRequest);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'TypeError') {
        throw new NotFoundError(ERROR_MESSAGES.userBadRequest);
      }
      next(err);
    })
    .catch(next);
};