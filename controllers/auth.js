const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

const BadRequestError = require('../errors/bad-request-err');
const AuthError = require('../errors/auth-err');
const ConflictError = require('../errors/conflict-err');
const NotFoundError = require('../errors/not-found-err');

const User = require('../models/user');
const { ERROR_MESSAGES, STATUS_CODES, DEV_KEY } = require('../utils/constants');

dotenv.config();
const { NODE_ENV, JWT_SECRET } = process.env;

// module.exports.getUser = (req, res, next) => {
//   User.findById(req.user._id)
//     .orFail(() => new NotFoundError('User not Found'))
//     .then((user) => {
//       const {
//         _doc: { password, ...props },
//       } = user;
//       res.send({ data: props });
//     })
//     .catch(next);
// };

module.exports.createUser = (req, res, next) => {
  const { name, email, password } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({ name, email, password: hash }))
    // .then((hash) => User.create({ name, email }))
    // .then((user) => res.status(201).send({ _id: user._id }))
    .then((user) => res.status(STATUS_CODES.created).send({
        email: user.email,
        _id: user._id,
        // message: `User ${email} successfully created!`,
        // data: {
        //   id: user.id,
        //   name,
        //   email
        // },
      }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequestError(ERROR_MESSAGES.userBadRequest);
      } else if (err.name === 'MongoError') {
        throw new ConflictError(ERROR_MESSAGES.signup);
      }
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
        throw new AuthError(ERROR_MESSAGES.signin);
      } else {
        req._id = user._id;
        return bcrypt.compare(password, user.password);
      }
    })
    .then((matched) => {
      if (!matched) {
        throw new AuthError(ERROR_MESSAGES.signin);
      }
      const token = jwt.sign(
        { _id: req._id },
        NODE_ENV === 'production' ? JWT_SECRET : DEV_KEY,
        { expiresIn: '7d' }
      );
      res.header('authorization', `Bearer ${token}`);
      res.cookie('token', token, { httpOnly: true });
      res.status(STATUS_CODES.ok).send({ token });
    })
    .catch(next);
};
