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
        film: 'gone with the wind',
        rating: 5
      })
      .then(res => {
        expect(res.body).toEqual({
          review: 'great movie',
          film: expect.any(String),
          rating: expect.any(Number),
          _id: expect.any(String),
          __v: 0
        });
      });
  });
});

it('can list all the actors in the database', () => {
  const reviews = ['terrible', 'great', 'abysmal'];
  return Promise.all(reviews.map(createReview))
    .then(() => {
      return request(app)
        .get('/reviews');
    })
    .then(({ body }) => {
      expect(body).toHaveLength(4);
    });
});
