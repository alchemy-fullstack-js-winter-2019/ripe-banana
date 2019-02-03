const express = require('express');
const app = express();
const connection = require('./middleware/connection');
const notFound = require('./middleware/notFound');
const { handler } = require('./middleware/error');
const actors = ('./routes/actors');

app.use(express.json());
app.use(connection);

app.use('actors', actors);
app.use(notFound);
app.use(handler);

module.exports = app;
