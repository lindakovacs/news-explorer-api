const express = require('express');
const mongoose = require('mongoose');
const { celebrate, Joi, errors, isCelebrateError } = require('celebrate');
const path = require('path');
const cors = require('cors');
const dotenv = require('dotenv');
const articlesRouter = require('./routes/articles');
const usersRouter = require('./routes/users');

const { requestLogger, errorLogger } = require('./middleware/logger');

const { createUser, login } = require('./controllers/users');
const auth = require('./middleware/auth');
const BadRequestError = require('./errors/bad-request-err');
const NotFoundError = require('./errors/not-found-err');
const ConflictError = require('./errors/conflict-err');

const { PORT = 3001 } = process.env;
// const { NODE_ENV, MONGO_URL, PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/newsdb', {
// mongoose.connect(NODE_ENV === 'production' ? MONGO_URL : 'mongodb://localhost:27017/aroundb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(cors());
app.options('*', cors());
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));

app.use(requestLogger);

app.use('/articles', auth, articlesRouter);
app.use('/users', auth, usersRouter);

app.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30).pattern(new RegExp('^[a-zA-Z-\\s]*$')),
      about: Joi.string().min(2).max(30),
      // avatar: Joi.string().uri({ scheme: ['http', 'https'] }),
      avatar: Joi.string().uri(),
      email: Joi.string().required().email(),
      password: Joi.string().min(8).alphanum().required(),
    }),
  }),
  createUser
);

app.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  login
);

app.use(express.static(path.join(__dirname, 'public')));

app.get('*', (req, res) => {
  res.status(404).send({ message: 'Requested resource not found' });
});

app.use(errorLogger);

app.use((err, req, res, next) => {
  if (isCelebrateError(err)) {
    throw new BadRequestError('Request cannot be completed at this time.');
  }
  next(err);
});

app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  if (isCelebrateError(err)) {
    throw new ConflictError('User already taken.');
  }
  res.status(statusCode).send({
    message:
      statusCode === 500 ? 'An error has occured on the server' : message,
  });
});

app.use((req, res) => {
  throw new NotFoundError('Requested resource not found.');
});

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
