const express = require('express');
const app = express();
const connection = require('./middleware/connection');
const { handler } = require('./middleware/error');
const notFound = require('./middleware/notFound');
const morgan = require('morgan');


app.use(express.json());
const studios = require('./routes/studios');
const films = require('./routes/films');

app.use(require('morgan')('dev', {
  skip() {
    return process.env.NODE_ENV === 'test';
  }
}));

app.use('/studios', connection, studios);

app.use('/films', connection, films);
app.use(notFound);
app.use(handler);



module.exports = app;
