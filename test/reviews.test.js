require('dotenv').config();
require('../lib/utils/connect')();
const request = require('supertest');
const app = require('../lib/app');
const mongoose = require('mongoose');

describe('reviews', () => {
  beforeEach(done => {
    return mongoose.connection.dropDatabase(() => {
      done();
    });
  });

  it('creates a new review', () => {
    return request(app)
      .post('/reviews')
      .send({
        review: 'great movie',
        rating: 5
      })
      .then(res => {
        expect(res.body).toEqual({
          review: 'great movie',
          rating: 5,
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
          _id: expect.any(String),
          __v: 0
        });
      });
  });
});
