require('dotenv').config();
require('../../lib/utils/connect')();
const request = require('supertest');
const app = require('../../lib/app');
const mongoose = require('mongoose');
const Review = require('../../lib/models/Review');
const Reviewer = require('../../lib/models/Reviewer');

const createReviewer = (name, company = { website: 'www.ryanheartsfilms' }) => {
  return Reviewer.create({ name, company })
    .then(createdReviewer => {
      return createdReviewer;
    });
};

const createReview = ({ rating = 5, reviewer, review = 'AMAZING SOUNDTRACK!', createdAt = Date.now(), updatedAt = Date.now() }) => {
  return Review.create({ rating, reviewer, review, createdAt, updatedAt })
    .then(createdReview => {
      return createdReview;
    });
};
  
describe('reviews routes', () => {
  beforeEach(done => {
    mongoose.connection.dropDatabase(done);
  });

  it('creates a  new review', () => {
    return createReviewer('Jojo')
      .then(createdReviewer => {
        return request(app)
          .post('/reviews')
          .send({
            rating: 3, 
            reviewer: createdReviewer._id,
            review: 'CRAPPY', 
            createdAt: Date.now(),
            updatedAt: Date.now()
          });
      })
      .then(res => {
      
        expect(res.body).toEqual({
          _id: expect.any(String),
          rating: 3,
          reviewer: expect.any(String),
          review: 'CRAPPY',
          updatedAt: expect.any(String),
          createdAt: expect.any(String),
          __v: 0 
        });
      });
  });

  it('get all reviews', () => {
    return createReviewer('TK')
      .then(createdReviewer => {
        const reviewsCreate = [{ rating: 4, reviewer: createdReviewer._id, review: 'it was pretty good' }, { rating: 2, reviewer: createdReviewer._id, review: 'it was pretty bad' }];
        return Promise.all(reviewsCreate.map(review => createReview(review)))
          .then(() => {
            return request(app)
              .get('/reviews');
          })
          .then(res => {
            expect(res.body).toHaveLength(2);
            expect(res.body).toContainEqual({
              _id: expect.any(String),
              rating: 4,
              reviewer: { company: { website: 'www.ryanheartsfilms' }, _id: expect.any(String), name: 'TK' },
              review: 'it was pretty good',
            });
          });
      });
  });

  afterAll((done) => {
    mongoose.disconnect(done);
  });

});
