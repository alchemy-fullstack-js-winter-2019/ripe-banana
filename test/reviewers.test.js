require('dotenv').config();
require('../lib/utils/connect')();
const request = require('supertest');
const app = require('../lib/app');
const mongoose = require('mongoose');

describe('reviewers', () => {
  beforeEach(done => {
    return mongoose.connection.dropDatabase(() => {
      done();
    });
  });

  it('creates a reviewer', () => {
    return request(app)
      .post('/reviewers')
      .send({
        name: 'Rex Reed',
        company: 'At the movies'
      })
      .then(res => {
        expect(res.body).toEqual({
          name: 'Rex Reed',
          company: 'At the movies',
          _id: expect.any(String),
          __v: 0
        });
      });
  });

  afterAll(done => {
    mongoose.connection.close(done);
  });
});
