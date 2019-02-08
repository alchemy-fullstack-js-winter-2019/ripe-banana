const express = require('express');
const app = express();
const notFound = require('./middleware/notFound');
const connection = require('./middleware/connection');
const { handler } = require('./middleware/error');
const studios = require('./routes/studios');
const reviewers = require('./routes/reviewers');
const actors = require('./routes/actors');
const reviews = require('./routes/reviews');
const films = require('./routes/films');

app.use(require('morgan')('dev', {
  skip() {
    return process.env.NODE_ENV === 'test';
  }
}));
app.use(express.json());
app.use('/studios', connection, studios);
app.use('/actors', connection, actors);
app.use('/reviewers', connection, reviewers);
app.use('/reviews', connection, reviews);
app.use('/films', connection, films);
app.use(connection);
app.get('/', (req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.status(200);
  res.end(`
    <html>
      <h1>Welcome to THE RIPEST BANANA</h1>
      <br>
      <img src="https://thumbs.gfycat.com/AfraidPiercingBobcat-max-1mb.gif">
    </html>
  `);
});
app.use(notFound);
app.use(handler);

module.exports = app;
