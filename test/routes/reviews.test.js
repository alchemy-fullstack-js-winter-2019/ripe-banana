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

// const createReview = (rating = 5, reviewer, review = 'AMAZING SOUNDTRACK!') => {
//   return Review.create({ rating, reviewer, review })
//     .then(createdReview => {
//       return createdReview;
//     });
// };
  
describe('reviews routes', () => {
  beforeEach(done => {
    mongoose.connection.dropDatabase(done);
  });

  it.only('creates a  new review', () => {
    return createReviewer('Jojo')
      .then(createdReviewer => {
        return request(app)
          .post('/reviews')
          .send({
            rating: 3, 
            reviewer: createdReviewer._id,
            review: 'CRAPPY', 
            createdAt: Date.now,
            updatedAt: Date.now
          });
      })
      .then(res => {
        console.log('bdy', typeof res.body.updatedAt);
      
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
  afterAll((done) => {
    mongoose.disconnect(done);
  });
});
