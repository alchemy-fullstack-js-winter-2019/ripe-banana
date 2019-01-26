const express = require('express');
const app = express();
const { handler } = require('../lib/middleware/error');
const notFound = require('./middleware/notFound');
const connection = require('./middleware/connection');

app.use(require('morgan')('dev', {
    skip() {
        return process.env.NODE_ENV === 'test';
    }
}));

app.use(connection);
app.use(express.json());
app.use(notFound);
app.use(handler);


module.exports = app;