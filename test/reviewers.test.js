require('dotenv').config();
require('../lib/utils/connect')();
const request = require('supertest');
const app = require('../lib/app');
const mongoose = require('mongoose');

const createReviewer = (name) => {
  return request(app)
    .post('/reviewers')
    .send({ 
      name: name,
      company: 'review company'
    })
    .then(res => res.body);
};

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

  it('list of all reviewers', () => {
    const names = ['Roger Ebert', 'Leonard Maltin', 'Gene Siskel'];
    return Promise.all(names.map(createReviewer))
      .then(() => {
        return request(app)
          .get('/reviewers');
      })
      .then(({ body }) => {
        expect(body).toHaveLength(3);
      });
  });

  afterAll(done => {
    mongoose.connection.close(done);
  });
});
