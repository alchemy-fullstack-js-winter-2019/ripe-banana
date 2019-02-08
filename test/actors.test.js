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
      dob: '1937-12-31T08:00:00.000Z',
      pob: 'birthplace'
    })
    .then(res => res.body);
};

let aHopkins = {
  name: 'Anthony Hopkins',
  dob: new Date(1937, 12, 31).toJSON(),
  pob: 'Wales'
};

describe('actors', () => {
  beforeEach(done => {
    return mongoose.connection.dropDatabase(done);
  });

  it('creates a new actor', () => {
    return request(app)
      .post('/actors')
      .send(aHopkins)
      .then(({ body }) => {
        const { _id, __v } = body;
        expect(body).toEqual({
          ...aHopkins,
          _id,
          __v
        });
        aHopkins = body;
      });
  });


  it('can list all the actors in the database', () => {
    const names = ['Mark Wahlberg', 'James McAvoy', 'Matt Damon'];
    return Promise.all(names.map(createActor))
      .then(() => {
        return request(app)
          .get('/actors');
      })
      .then(({ body }) => {
        expect(body).toHaveLength(3);
      });
  });

  it('gets an actor by id', () => {
    return createActor('Hugh Jackman')
      .then(createdActor => {
        return request(app)
          .get(`/actors/${createdActor._id}`)
          .then(res => {
            expect(res.body).toEqual({
              name: 'Hugh Jackman',
              dob: '1937-12-31T08:00:00.000Z',
              pob: 'birthplace',
              _id: expect.any(String),
              films: [],
              __v: 0
            });
          });
      });
  });

  it('finds actor by id and updates it', () => {
    return createActor('Rider Strong')
      .then(createdActor => {
        createdActor.name = 'Vin Diesel';
        return request(app)
          .put(`/actors/${createdActor._id}`)
          .send(createdActor);
      })
      .then(res => {
        expect(res.body).toEqual({
          name: 'Vin Diesel',
          dob: '1937-12-31T08:00:00.000Z',
          pob: 'birthplace',
          _id: expect.any(String),
          __v: 0
        });
      });
  });

  it('finds actor by id and deletes it', () => {
    return createActor('Heath Ledger')
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
});
