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
      company: 'some company'
    })
    .then(res => res.body);
};

describe('reviewers', () => {
  beforeEach(done => {
    return mongoose.connection.dropDatabase(() => {
      done();
    });
  });

  it('creates a new reviewer', () => {
    return request(app)
      .post('/reviewers')
      .send({
        name: 'reviewer',
        company: 'some company'
      })
      .then(res => {
        expect(res.body).toEqual({
          name: 'reviewer',
          company: 'some company',
          _id: expect.any(String),
          __v: 0
        });
      });
  });
});

it('can list all the actors', () => {
  const names = ['reviewer1', 'reviewer2', 'reviewer3'];
  return Promise.all(names.map(createReviewer))
    .then(() => {
      return request(app)
        .get('/reviewers');
    })
    .then(({ body }) => {
      expect(body).toHaveLength(4);
    });
});

it('gets a reviewer by id', () => {
  return createReviewer('tpain')
    .then(createdReviewer => {
      return request(app) 
        .get(`/reviewers/${createdReviewer._id}`)
        .then(res => {
          expect(res.body).toEqual({
            name: 'tpain',
            company: 'some company',
            _id: expect.any(String)
          });
        });
    });
});

it('updates a reviewer with :id', () => {
  return createReviewer('jane doe')
    .then(createdReviewer => {
      createdReviewer.name = 'new name';
      return request(app)
        .put(`/reviewers/${createdReviewer._id}`)
        .send(createdReviewer);
    })
    .then(res => {
      expect(res.body).toEqual({
        name: 'new name',
        company: 'some company',
        _id: expect.any(String),
        __v: 0
      });
    });
});
