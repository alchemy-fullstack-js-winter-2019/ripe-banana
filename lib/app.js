const express = require('express');
const app = express();
const notFound = require('./middleware/notFound');
const { handler } = require('../lib/middleware/error');
const connection = require('./middleware/connection');
const studios = require('./routes/studios');
const actors = require('./routes/actors');
const reviewers = require('./routes/reviewers');
const reviews = require('./routes/reviews');
const films = require('./routes/films');

app.use(express.json());

app.use('/studios', connection, studios);
app.use('/actors', connection, actors);
app.use('/reviewers', connection, reviewers);
app.use('/reviews', connection, reviews);
app.use('/films', connection, films);

app.use(connection);
app.use(notFound);
app.use(handler);

module.exports = app;
