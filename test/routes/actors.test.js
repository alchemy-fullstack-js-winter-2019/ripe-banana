require('dotenv').config();
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../lib/app');
const connect = require('../../lib/utils/connect');
const seedData = require('../seedData');

describe('app', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(done => {
    mongoose.connection.dropDatabase(done);
  });

  beforeEach(() => {
    return seedData();
  });

  afterAll(done => {
    mongoose.connection.close(done);
  });

  it('gets a list of actors', () => {
    return request(app)
      .get('/actors')
      .then(res => expect(res.body).toHaveLength(20));
  });
});
