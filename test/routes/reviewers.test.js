require ('dotenv').config();
require('../../lib/utils/connect')();
const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../../lib/app');
// const Reviewer = require('../../lib/models/Reviewer');

// const createReviewer = (name, company = { website: 'reviewmovies.com' }) => {
//   return Reviewer.create({ name, company })
//     .then(createdReviewer => {
//       return createdReviewer;
//     });
// };
describe('reviewer app', () => {

  beforeEach(done => {
    return mongoose.connection.dropDatabase(done); 
  });
  afterAll((done) => {
    mongoose.connection.close(done);
  });

  it('creates a review', () => {
    // return createReviewer('reviewer1', { website: 'reviewmovies.com' })
    return request(app)
      .post('/reviewers')
      .send({
        name: 'reviewer1',
        company: {
          website: 'reviewmovies.com'
        }
      })
      .then(res => {
        expect(res.body).toEqual({
          name: 'reviewer1',
          company: {
            website: 'reviewmovies.com'
          },
          _id: expect.any(String),
          __v:0
        });
      });
  });
});


