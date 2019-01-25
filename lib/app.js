const express = require('express');
const app = express();
const notFound = require('./middleware/notFound');
const connection = require('./middleware/connection');

app.use(express.json());
app.use(connection);
app.get('/', (req, res) => {
  res.status(200).send(
    'Welcome to THE RIPEST BANANA'
  );
});
app.use(notFound);

module.exports = app;
