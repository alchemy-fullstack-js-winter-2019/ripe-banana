require('dotenv').config();
require('./lib/utils/connect')();
const mongoose = require('mongoose');
const seedData = require('./test/seedData');

seedData()
  .then(() => console.log('seed data done'))
  .finally(() => mongoose.connection.close());
