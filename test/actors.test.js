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
      dob: '1958-10-20T08:00:00.000Z',
      pob: 'some place'
    })
    .then(res => res.body);
};

let arnold = {
  name: 'Arnold Schwarzenegger',
  dob: new Date(1947, 7, 30).toJSON(),
  pob: 'Austria'
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
      .send(arnold)
      .then(({ body }) => {
        const { _id, __v } = body;
        expect(body).toEqual({
          ...arnold,
          _id,
          __v
        });
        arnold = body;
      });
  });
});

it('can list all the actors in the database', () => {
  const names = ['chris1', 'chris2', 'chris3'];
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
    title: 'The Terminator',
    studio: mongoose.Types.ObjectId(),
    released: 1984,
    cast: [{
      part: 'Model 101',
      actor: arnold._id
    }]
  };
  
  return request(app)
    .post('/films')
    .send(terminator)
    .then(({ body }) => {
      terminator = body;
      return request(app) 
        .get(`/actors/${arnold._id}`);
    })

    .then(({ body }) => {
      expect(body).toEqual({ ...arnold, films: [] });
    });
});

it('updates an actor with :id and returns the update', () => {
  return createActor('Kate McKinnon')
    .then(createdActor => {
      createdActor.name = 'new name';
      return request(app)
        .put(`/actors/${createdActor._id}`)
        .send(createdActor);
    })
    .then(res => {
      expect(res.body).toEqual({
        name: 'new name',
        dob: '1958-10-20T08:00:00.000Z',
        pob: 'some place',
        _id: expect.any(String),
        __v: 0
      });
    });
});

it('deletes an actor with :id and returns the delete count', () => {
  return createActor('Coolio')
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
