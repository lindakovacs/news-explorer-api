const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const path = require('path');
const cors = require('cors');
const routes = require('./routes/index.js');

const { requestLogger, errorLogger } = require('./middleware/logger');
const NotFoundError = require('./errors/not-found-err');

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

app.use(cors());
app.options('*', cors());
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);

app.use('/', routes);

app.use(express.static(path.join(__dirname, 'public')));

app.get('*', (req, res) => {
  res.status(404).send({ message: 'Requested resource not found' });
});

app.use(errorLogger);
app.use(errors());

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
