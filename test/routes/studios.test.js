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

  it('gets a list of studios', () => {
    return request(app)
      .get('/studios')
      .then(res => expect(res.body).toHaveLength(10));
  });
  
  it('gets studio by id', () => {
    return request(app)
      .get('/studios')
      .then(res => {
        return request(app)
          .get(`/studios/${res.body[0]._id}`);
      })
      .then(res => expect(res.body).toEqual({
        _id: expect.any(String),
        name: expect.any(String),
        address: expect.any(Object),
        films: expect.any(Array),
        __v: 0
      }));
  });
});
