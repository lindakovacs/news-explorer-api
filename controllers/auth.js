const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

const BadRequestError = require('../errors/bad-request-err');
const AuthError = require('../errors/auth-err');
// const ConflictError = require('../errors/conflict-err');

const User = require('../models/user');

dotenv.config();
const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.createUser = (req, res, next) => {
  const { name, email, password } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({ name, email, password: hash }))
    // .then((user) => res.status(201).send({ _id: user._id }))
    .then((user) => res.status(201).send(user))

    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequestError(
          'Unable to create user. Please try again later.'
        );
      }
      // } else if (err.name === 'MongoError') {
      //   throw new ConflictError('User already taken');
      // }
      next(err);
    })
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        throw new AuthError('Incorrect email or password.');
      } else {
        req._id = user._id;
        return bcrypt.compare(password, user.password);
      }
    })
    .then((matched) => {
      if (!matched) {
        throw new AuthError('Incorrect email or password.');
      }
      const token = jwt.sign(
        { _id: req._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' }
      );
      res.header('authorization', `Bearer ${token}`);
      res.cookie('token', token, { httpOnly: true });
      res.status(200).send({ token });
    })
    .catch(next);
};
