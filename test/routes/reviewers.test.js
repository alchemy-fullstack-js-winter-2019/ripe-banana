require ('dotenv').config();
require('../../lib/utils/connect')();
const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../../lib/app');
const Reviewer = require('../../lib/models/Reviewer');

const createReviewer = (name, company) => {
  return Reviewer.create({ name, company })
    .then(createdReviewer => {
      return createdReviewer;
    });
};
describe('reviewer app', () => {

  beforeEach(done => {
    return mongoose.connection.dropDatabase(done); 
  });
  afterAll((done) => {
    mongoose.connection.close(done);
  });

  it('creates a review', () => {
    return request(app)
      .post('/reviewers')
      .send({
        name: 'reviewer1',
        company: 'BestReview'
      })
      .then(res => {
        expect(res.body).toEqual({
          name: 'reviewer1',
          company: 'BestReview',
          _id: expect.any(String),
          __v:0
        });
      });
  });
  
  it('returns list of reviewers', () => {
    return Promise.all(['Reviewer1', 'Reviewer2', 'Reviewer3'].map(createReviewer))
      .then(() => {
        return request(app)
          .get('/reviewers');
      })
      .then(res => {
        expect(res.body).toHaveLength(3);
      });
  });

  it('gets a reviewer by id', () => {
    return createReviewer('Reviewer1', 'BestReview')
      .then(createdReviewer => {
        return request(app)
          .get(`/reviewers/${createdReviewer._id}`)
          .then(res => {
            expect(res.body).toEqual({
              name: 'Reviewer1',
              company: 'BestReview',
              _id: expect.any(String),
              __v: 0
            });
          });
      });
  });

  it('updates a reviewer', () => {
    return createReviewer('Reviewer1', 'BestReview')
      .then(createdReviewer => {
        return request(app)
          .patch(`/reviewers/${createdReviewer._id}`)
          .send({
            name: 'Reviewer1',
            company: 'BestReview'
          })
          .then(updatedReviewer => {
            expect(updatedReviewer.body).toEqual({
              name: 'Reviewer1',
              company: 'BestReview',
              _id: expect.any(String),
              __v: 0
            });
          });
      });
  });
});


