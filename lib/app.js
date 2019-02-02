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



// app.use('/auth', connection, require('./routes/auth'));
// app.use('/posts', connection, require('./routes/post'));

app.use(notFound);
app.use(handler);

module.exports = app;
