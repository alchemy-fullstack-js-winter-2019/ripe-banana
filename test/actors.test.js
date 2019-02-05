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
      dob: '1975-05-04T07:00:00.000Z',
      pob: 'LA'
    })
    .then(res => res.body);
};

let angelina = {
  name: 'angelina',
  dob: new Date(1975, 5, 4).toJSON(),
  pob: 'LA'
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
      .send(angelina)
      .then(({ body }) => {
        const { _id, __v } = body;
        expect(body).toEqual({
          ...angelina,
          _id,
          __v
        });
        angelina = body;
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
  let terminator = {
    title: 'Tomb Raider',
    studio: mongoose.Types.ObjectId(),
    released: 1999,
    cast: [{
      part: 'babe',
      actor: angelina._id
    }]
  };
  
  return request(app)
    .post('/films')
    .send(terminator)
    .then(({ body }) => {
      terminator = body;
      return request(app) 
        .get(`/actors/${angelina._id}`);
    })

    .then(({ body }) => {
      expect(body).toEqual({ ...angelina, films: [] });
    });
});

it('updates an actor', () => {
  return createActor('actor3')
    .then(createdActor => {
      createdActor.name = 'new name';
      return request(app)
        .put(`/actors/${createdActor._id}`)
        .send(createdActor);
    })
    .then(res => {
      expect(res.body).toEqual({
        name: 'new name',
        dob: '1975-05-04T08:00:00.000Z',
        pob: 'LA',
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

afterAll(done => {
  mongoose.connection.close(done);
});
