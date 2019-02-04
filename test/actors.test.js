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

it('can get list actors', () => {
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
it('gets an actor by id', () => {
  return createActor('brad pitt')
    .then(createdActor => {
      return request(app) 
        .get(`/actors/${createdActor._id}`)
        .then(res => {
          expect(res.body).toEqual({
            name: 'brad pitt',
            dob: '1963-12-18T08:00:00.000Z',
            pob: 'OK',
            _id: expect.any(String),
            __v: 0
          });
        });
    });
});

it('updates an actor with :id and returns the update', () => {
  return createActor('actor3')
    .then(createdActor => {
      createdActor.name = 'new name';
      return request(app)
        .put(`/actors/${createdActor._id}`)
        .send(createdActor);
    })
    .then(res => {
      expect(res.body).toEqual({
        name: 'actor3',
        dob: '1978-08-22T08:00:00.000Z',
        pob: 'OK',
        _id: expect.any(String),
        __v: 0
      });
    });
});
it('deletes an actor by :id', () => {
  return createActor('peewee')
    .then((createdActor) => {
      const id = createdActor._id;
      return request(app)
        .delete(`/actors/${id}`)
        .then(res => {
          expect(res.body).toEqual({ 'deleted': 1 });
        });
    });
});

