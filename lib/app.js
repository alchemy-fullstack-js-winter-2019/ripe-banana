const express = require('express');
const app = express();
const connection = require('./middleware/connection');
const { handler } = require('./middleware/error');
const notFound = require('./middleware/notFound');
const morgan = require('morgan');

app.use(express.json());

app.use(require('morgan')('dev', {
  skip() {
    return process.env.NODE_ENV === 'test';
  }
}));

app.use(notFound);
app.use(handler);

const studios = require('./routes/studios');

app.use('/studios', connection, studios);

module.exports = app;
