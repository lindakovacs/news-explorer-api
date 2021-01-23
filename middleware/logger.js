const winston = require('winston');
const expressWinston = require('express-winston');
const fs = require('fs');
const path = require('path');

const logsDir = './logs';

if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir);
}

const requestLogger = expressWinston.logger({
  // transports: [new winston.transports.File({ filename: 'request.log' })],
  transports: [
    new winston.transports.File({
      filename: path.join(logsDir, '/request.log'),
    }),
  ],
  format: winston.format.json(),
});

const errorLogger = expressWinston.errorLogger({
  // transports: [new winston.transports.File({ filename: 'error.log' })],
  transports: [
    new winston.transports.File({
      filename: path.join(logsDir, '/error.log'),
    }),
  ],
  format: winston.format.json(),
});

module.exports = {
  requestLogger,
  errorLogger,
};
