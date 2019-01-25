require('dotenv').config();
require('../../lib/utils/connect')();
const Reviewer = require('../../lib/models/Reviewer');
const request = require('supertest');
const app = require('../../lib/app');
const mongoose = require('mongoose');

const createReviewer = (name, company = {
  website: 'www.ryanheartsfilms.com'
}) => {
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
    return Promise.all(reviewersToCreate.map(createReviewer))
      .then(() => {
        return request(app)
          .get('/reviewers');
      })
      .then(res => {
        expect(res.body).toHaveLength(3);
        expect(res.body).toContainEqual({ _id: expect.any(String), name: 'Kevin', company: { website: 'www.ryanheartsfilms.com' } });
      });
  });
  afterAll((done) => {
    mongoose.disconnect(done);
  });
});
