const express = require('express');
const app = express();
const connection = require('./middleware/connection');
const notFound = require('./middleware/notFound');
const { handler } = require('./middleware/error');
const actors = require('./routes/actors');
const films = require('./routes/films');
const reviewers = require('./routes/reviewers');
const reviews = require('./routes/reviews');
const studios = require('./routes/studios');

app.use(express.json());
app.use(connection);

app.use('/actors', actors);
app.use('/films', films);
app.use('/reviewers', reviewers);
app.use('/studios', studios);
app.use('/reviews', reviews);

app.use(notFound);
app.use(handler);

module.exports = app;
