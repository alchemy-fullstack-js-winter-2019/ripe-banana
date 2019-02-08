const express = require('express');
const app = express();
const studios = require('./routes/studios');
const actors = require('./routes/actors');
// const films = require('./routes/films');
const connection = require('./middleware/connection');
const notFound = require('./middleware/notFound');
const { handler } = require('./middleware/error');
const reviewers = require('./routes/reviewers');


app.use(express.json());
app.use('/studios', connection, studios);
app.use('/actors', connection, actors);
// app.use('/films', films, connection);
app.use('/reviewers', connection, reviewers);
app.use(connection);

app.use(notFound);

app.use(handler);

module.exports = app;
