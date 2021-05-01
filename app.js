const express = require('express');
const mongoose = require('mongoose');
const { errors, isCelebrateError } = require('celebrate');
// const { celebrate, Joi, errors, isCelebrateError } = require('celebrate');
const path = require('path');
const cors = require('cors');
const dotenv = require('dotenv');
// const articlesRouter = require('./routes/articles');
// const usersRouter = require('./routes/users');
const routes = require('./routes/index.js');

const { requestLogger, errorLogger } = require('./middleware/logger');

const auth = require('./middleware/auth');
const BadRequestError = require('./errors/bad-request-err');
const NotFoundError = require('./errors/not-found-err');
const ConflictError = require('./errors/conflict-err');

// const { PORT = 3000 } = process.env;
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

app.use('/', routes);
app.use(cors());
app.options('*', cors());
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));

app.use(requestLogger);
app.use(errorLogger);
app.use(errors());
// app.use('/articles', auth, articlesRouter);
// app.use('/users', auth, usersRouter);

app.use(express.static(path.join(__dirname, 'public')));

app.get('*', (req, res) => {
  res.status(404).send({ message: 'Requested resource not found' });
});

app.use((err, req, res, next) => {
  if (isCelebrateError(err)) {
    throw new BadRequestError('Request cannot be completed at this time.');
  }
  next(err);
});

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
