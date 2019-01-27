const express = require('express');
const app = express();
const notFound = require('./middleware/notFound');
const { handler } = require('../lib/middleware/error');
const connection = require('./middleware/connection');
const studios = require('./routes/studios');
const actors = require('./routes/actors');
app.use(require('morgan')('dev', {
    skip() {
        return process.env.NODE_ENV === 'test';
    }
}));

app.use(express.json());
app.use('/studios', connection, studios);
app.use('/actors', connection, actors);
app.use(connection);
app.use(notFound);
app.use(handler);


module.exports = app;