const express = require('express');
const app = express();
const notFound = require('./middleware/notFound');
const connection = require('./middleware/connection');
const { handler } = require('./middleware/error');
const studios = require('./routes/studios');
const reviewers = require('./routes/reviewers');
const actors = require('./routes/actors');
<<<<<<< HEAD
const reviews = require('./routes/reviews');
=======
const films = require('./routes/films');
>>>>>>> 9d2a7b80159eafc21b778320aa8a927be7a48c93

app.use(require('morgan')('dev', {
  skip() {
    return process.env.NODE_ENV === 'test';
  }
}));
app.use(express.json());
app.use('/studios', connection, studios);
app.use('/actors', connection, actors);
<<<<<<< HEAD
app.use('/reviewers', connection, reviewers);
app.use('/reviews', connection, reviews);
=======
app.use('/films', connection, films);
>>>>>>> 9d2a7b80159eafc21b778320aa8a927be7a48c93
app.use(connection);
app.get('/', (req, res) => {
  res.status(200).send(
    'Welcome to THE RIPEST BANANA'
  );
});
app.use(notFound);
app.use(handler);

module.exports = app;
