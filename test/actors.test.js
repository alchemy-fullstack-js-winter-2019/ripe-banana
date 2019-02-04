require('dotenv').config();
require('../lib/utils/connect')();
const request = require('supertest');
const app = require('../lib/app');
const mongoose = require('mongoose');

const createActor = (name) => {
  return request(app)
    .post('/actors')
    .send({ 
      name: name,
      dob: '5/4/1975',
      pob: 'LA'
    })
    .then(res => res.body);
};

describe('actors', () => {
  beforeEach(done => {
    return mongoose.connection.dropDatabase(() => {
      done();
    });
  });

  it('creates a new actor', () => {
    return request(app)
      .post('/actors')
      .send({
        name: 'angelina jolie',
        dob: '5/4/1975',
        pob: 'LA'
      })
      .then(res => {
        expect(res.body).toEqual({
          name: 'angelina jolie',
          dob: '1975-05-04T07:00:00.000Z',
          pob: 'LA',
          _id: expect.any(String),
          __v: 0
        });
      });
  });
});

it('can list all the actors in the database', () => {
  const names = ['angelina1', 'angelina2', 'angelina3'];
  return Promise.all(names.map(createActor))
    .then(() => {
      return request(app)
        .get('/actors');
    })
    .then(({ body }) => {
      expect(body).toHaveLength(4);
    });
});
