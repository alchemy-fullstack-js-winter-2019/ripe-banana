require('dotenv').config();
require('../../lib/utils/connect')();
// const Actor = require('../../lib/models/Actor');
const request = require('supertest');
const app = require('../../lib/app');
const mongoose = require('mongoose');

// const createActor = (name, dob, pob) => {
//   return Actor.create({ name, dob, pob })
//     .then(createdActor => {
//       return createdActor;
//     });
// };

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

  afterAll((done) => {
    mongoose.disconnect(done);
  });
});
