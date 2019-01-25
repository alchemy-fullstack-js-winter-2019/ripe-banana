require ('dotenv').config();
require('../lib/utils/connect');
const mongoose = require('mongoose');
const request = require('supertest');

describe('studio app', () => {
  const createStudio = ((name, address) => {
    return Studio.create({ name, address })
      .then(studio => ({ ...studio, _id: studio._id.toString() }));
  });

  beforeEach(done => {
    return mongoose.connection.dropDatabase(() => {
      done();
    });
  });

});
