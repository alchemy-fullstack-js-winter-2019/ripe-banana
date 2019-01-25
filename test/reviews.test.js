require('dotenv').config();
require('../lib/utils/connect')();
const request = require('supertest');
const app = require('../lib/app');
const mongoose = require('mongoose');

const createReview = (review) => {
  return request(app)
    .post('/reviews')
    .send({ 
      review: review
    })
    .then(res => res.body);
};

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

it('can list all the reviews in the database', () => {
  const reviews = ['terrible', 'great', 'abysmal'];
  return Promise.all(reviews.map(createReview))
    .then(() => {
      return request(app)
        .get('/reviews');
    })
    .then(({ body }) => {
      expect(body).toHaveLength(1);
    });
});

afterAll(done => {
  mongoose.connection.close(done);
});

