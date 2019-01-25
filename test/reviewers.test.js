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
        name: 'mr. reviewer',
        company: 'some company'
      })
      .then(res => {
        expect(res.body).toEqual({
          name: 'mr. reviewer',
          company: 'some company',
          _id: expect.any(String),
          __v: 0
        });
      });
  });
});

it('can list all the actors in the database', () => {
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
  return createReviewer('travis scott')
    .then(createdReviewer => {
      return request(app) 
        .get(`/reviewers/${createdReviewer._id}`)
        .then(res => {
          expect(res.body).toEqual({
            name: 'travis scott',
            company: 'some company',
            _id: expect.any(String)
          });
        });
    });
});

it('updates a reviewer with :id and returns the update', () => {
  return createReviewer('Kate McKinnon')
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