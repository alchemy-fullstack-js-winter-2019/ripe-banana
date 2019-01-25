require ('dotenv').config();
require('../lib/utils/connect')();
const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../lib/app');
const Actor = require('../lib/models/Actor');

describe('actor app', () => {
  const createActor = ((name, dob, pob) => {
    return Actor.create({ name, dob, pob })
      .then(actor => ({ ...actor, _id: actor._id.toString() }));
  });
  beforeEach(done => {
    return mongoose.connection.dropDatabase(() => {
      done();
    });
  });
  afterAll((done) => {
    mongoose.connection.close(done);
  });

  it('can create a new actor', () => {
    return createActor('tom hanks', Date.now(), 'Concord, CA')
      .then(() => {
        return request(app)
          .post('/actors')
          .send({
            name: 'tom hanks',
            dob: Date.now(),
            pob: 'Concord, CA'
          })
          .then(res => {
            expect(res.body).toEqual({
              name: 'tom hanks',
              dob: expect.any(String),
              pob: 'Concord, CA',
              _id: expect.any(String),
              __v: 0
            });
          });
      });
  });

  it('can find all actors', () => {
    return Promise.all(['tom hanks', 'johnny depp', 'viola davis'].map(createActor))
      .then(() => {
        return request(app)
          .get('/actors');
      })
      .then(listOfActors => {
        expect(listOfActors.body).toHaveLength(3);
      });
  });


});
