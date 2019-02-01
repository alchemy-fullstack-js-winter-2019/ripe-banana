const express = require('express');
const app = express();
const studios = require('./routes/studios');
const films = require('./routes/films');

app.use(express.json());

app.use('/studios', studios);
app.use('/films', films);

module.exports = app;
