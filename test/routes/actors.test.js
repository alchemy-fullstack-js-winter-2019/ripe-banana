require('dotenv').config();
require('../../lib/utils/connect')();
const Actor = require('../../lib/models/Actor');
const request = require('supertest');
const app = require('../../lib/app');
const mongoose = require('mongoose');

const createActor = (
  name, 
  dob = Date.now(),
  pob = 'Alchemy Code Lab elevator'
) => {
  return Actor.create({ name, dob, pob })
    .then(createdActor => {
      return createdActor;
    });
};

describe('actor routes', () => {

  beforeEach(done => {
    mongoose.connection.dropDatabase(done);
  });

  it('creates an actor', () => {
    return request(app)
      .post('/actors')
      .send({ 
        name: 'Mariah Pizza', 
        dob: '2001-08-01',
        pob: 'Bananaville'
      })
      .then(res => {
        expect(res.body).toEqual(
          { _id: expect.any(String),
            name: 'Mariah Pizza',
            dob: expect.any(String),
            pob: 'Bananaville',
            __v: 0 });
      });
  });

  it('gets a list of actors', () => {
    const actorsToCreate = ['Kevin', 'Ryan', 'Alex'];
    return Promise.all(actorsToCreate.map(createActor))
      .then(() => {
        return request(app)
          .get('/actors');
      })
      .then(res => {
        expect(res.body).toContainEqual(
          { _id: expect.any(String), name: 'Kevin' },
          { _id: expect.any(String), name: 'Alex' },
          { _id: expect.any(String), name: 'Ryan' } 
        );
        expect(res.body).toHaveLength(3);
      });
  });

  it('gets an actor by id', () => {
    return createActor('J\'eremiah Pumpkinh3ad')
      .then(res => {
        return request(app)
          .get(`/actors/${res._id}`)
          .then(res => {
            expect(res.body).toEqual({
              name: 'J\'eremiah Pumpkinh3ad',
              dob: expect.any(String),
              pob: expect.any(String),
              _id: expect.any(String),
              __v: 0
            });
          });
      });
  });

  it('can update an actor', () => {
    const newActor = { name: 'Mr. Banana', dob: '2010-10-20', pob: 'Your kitchen' };
    return createActor('Sir Banana')
      .then(createdActor => { 
        return request(app)
          .put(`/actors/${createdActor._id}`)
          .send(newActor)
          .then(newActor => {
            expect(newActor.body).toEqual({ 
              _id: createdActor._id.toString(),
              name: 'Mr. Banana',
              dob: '2010-10-20T00:00:00.000Z',
              pob: 'Your kitchen',
              __v: 0 });
          });
      });
  });

  afterAll((done) => {
    mongoose.disconnect(done);
  });
});
