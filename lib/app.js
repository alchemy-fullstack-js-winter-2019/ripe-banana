const express = require('express');
const app = express();
const studios = require('./routes/studios');
const films = require('./routes/films');
const actors = require('./routes/actors');

app.use(express.json());

app.use('/studios', studios);
app.use('/films', films);
app.use('/actors', actors);

module.exports = app;
