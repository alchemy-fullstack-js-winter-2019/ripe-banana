const express = require('express');
const app = express();
// const connection = require('./middleware/connection');

app.use(express.json());

module.exports = app;
