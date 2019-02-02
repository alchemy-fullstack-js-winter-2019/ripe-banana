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

  it('gets a reviewer by id', () => {
    return createReviewer('Gene Shalit')
      .then(createdReviewer => {
        return request(app) 
          .get(`/reviewers/${createdReviewer._id}`)
          .then(res => {
            expect(res.body).toEqual({
              name: 'Gene Shalit',
              company: 'review company',
              reviews: [],
              _id: expect.any(String)
            });
          });
      });
  });

  it('finds a reviewer and updates it', () => {
    return createReviewer('Peter Travers')
      .then(createdReviewer => {
        createdReviewer.name = 'Kenneth Turan';
        return request(app)
          .put(`/reviewers/${createdReviewer._id}`)
          .send(createdReviewer);
      })
      .then(res => {
        expect(res.body).toEqual({
          name: 'Kenneth Turan',
          company: 'review company',
          _id: expect.any(String),
          __v: 0
        });
      });
  });

  afterAll(done => {
    mongoose.connection.close(done);
  });
});
