require('dotenv').config();
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../lib/app');
const connect = require('../../lib/utils/connect');
const seedData = require('../seedData');

describe('app', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(done => {
    mongoose.connection.dropDatabase(done);
  });

  beforeEach(() => {
    return seedData();
  });

  afterAll(done => {
    mongoose.connection.close(done);
  });

  it('gets a list of films', () => {
    return request(app)
      .get('/films')
      .then(res => expect(res.body).toHaveLength(20));
  });
  
  it('gets film by id', () => {
    return request(app)
      .get('/films')
      .then(res => {
        return request(app)
          .get(`/films/${res.body[0]._id}`);
      })
      .then(res => expect(res.body).toEqual({
        _id: expect.any(String),
        title: expect.any(String),
        released: expect.any(Number),
        studio: expect.any(Object),
        cast: expect.any(Array),
        reviews: expect.any(Array)
      }));
  });
});
