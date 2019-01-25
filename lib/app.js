const express = require('express');
const app = express();
const notFound = require('./middleware/notFound');
const connection = require('./middleware/connection');
const { handler } = require('./middleware/error');
const studios = require('./routes/studios');
const reviewers = require('./routes/reviewers');

app.use(require('morgan')('dev', {
  skip() {
    return process.env.NODE_ENV === 'test';
  }
}));
app.use(express.json());
app.use('/studios', connection, studios);
app.use('/reviewers', connection, reviewers);
app.use(connection);
app.get('/', (req, res) => {
  res.status(200).send(
    'Welcome to THE RIPEST BANANA'
  );
});
app.use(notFound);
app.use(handler);

module.exports = app;
