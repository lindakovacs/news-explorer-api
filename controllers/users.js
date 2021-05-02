const dotenv = require('dotenv');
const NotFoundError = require('../errors/not-found-err');
const User = require('../models/user');

dotenv.config();
const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.getAllUsers = (req, res, next) => {
  User.find({})
    .select('+password')
    .then((user) => res.send({ data: user }))
    // .then((users) => res.send({ data: users }))
    .catch(next);
};

module.exports.getUserById = (req, res, next) => {
  User.findById(req.params.id === 'me' ? req.user._id : req.params.id)
    .select('+password')
    .then((user) => {
      if (user) {
        res.send({ data: user });
      } else {
        throw new NotFoundError('User not found.');
      }
    })
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'TypeError') {
        throw new NotFoundError('User not found.');
      }
      next(err);
    })
    .catch(next);
};