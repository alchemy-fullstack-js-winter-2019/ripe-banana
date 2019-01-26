const express = require('express');
const app = express();
const studios = require('./routes/studios');
const actors = require('./routes/actors');
const films = require('./routes/films');
const connection = require('./middleware/connection');
const notFound = require('./middleware/notFound');
const { handler } = require('./middleware/error');

// app.use(require('morgan')('dev', {
//   skip() {
//     return process.env.NODE_ENV === 'test';
//   }
// }));

app.use(express.json());
app.use('/studios', studios, connection);
app.use('/actors', actors, connection);
app.use('/films', films, connection);

app.use(notFound);

app.use(handler);

module.exports = app;
