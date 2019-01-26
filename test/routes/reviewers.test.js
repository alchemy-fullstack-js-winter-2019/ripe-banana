require('dotenv').config();
require('../../lib/utils/connect')();
const Reviewer = require('../../lib/models/Reviewer');
const request = require('supertest');
const app = require('../../lib/app');
const mongoose = require('mongoose');

const createReviewer = (name, company = { website: 'www.ryanheartsfilms' }) => {
  return Reviewer.create({ name, company })
    .then(createdReviewer => {
      return createdReviewer;
    });
};

describe('reviewer routes', () => {
  
  beforeEach(done => {
    mongoose.connection.dropDatabase(done);
  });

  it('creates a reviewer', () => {
    return request(app)
      .post('/reviewers')
      .send({
        name: 'Mariah',
        company: {
          website: 'www.noirmariah.com'
        }
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          __v: 0,
          name: 'Mariah',
          company: {
            website: 'www.noirmariah.com'
          }
        });
      });
  });

  it('gets a list of reviewers', () => {
    const reviewersToCreate = ['kevin', 'mariah', 'alex'];
    return Promise.all(reviewersToCreate.map(reviewer => createReviewer(reviewer)))
      .then(() => {
        return request(app)
          .get('/reviewers');
      })
      .then(res => {
        expect(res.body).toHaveLength(3);
        expect(res.body).toContainEqual({ company: { website: 'www.ryanheartsfilms' },
          _id: expect.any(String),
          name: 'mariah' });
      });
  });
  it('gets a studio by id', () => {
    return createReviewer('Fifi')
      .then(createdReviewer => {
        return request(app)
          .get(`/reviewers/${createdReviewer._id}`)
          .then(res => {
            expect(res.body).toEqual({
              name: 'Fifi',
              company: expect.any(Object),
              _id: expect.any(String)
            });
          });
      });
  });

  it('updates a reviewer', () => {
    const newReviewer = { name: 'Wally', company: { website: 'www.whereiswally.com' } };
    return createReviewer('Wally')
      .then(createdReviewer => {
        return request(app)
          .put(`/reviewers/${createdReviewer._id}`)
          .send(newReviewer)
          .then(res => {
            expect(res.body).toEqual({ 
              _id: createdReviewer._id.toString(),
              name: 'Wally', 
              company: { website: 'www.whereiswally.com' } 
            });
          });
      });
      
  });

  afterAll((done) => {
    mongoose.disconnect(done);
  });

});
