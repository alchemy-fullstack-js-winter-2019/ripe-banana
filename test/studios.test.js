require ('dotenv').config();
require('../lib/utils/connect');
const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../lib/app');
const Studio = require('../lib/models/Studio');

describe('studio app', () => {
  const createStudio = ((name, address) => {
    return Studio.create({ name, address })
      .then(studio => ({ ...studio, _id: studio._id.toString() }));
  });

  beforeEach(done => {
    return mongoose.connection.dropDatabase(() => {
      done();
    });
  });

  it('can create a new studio', () => {
    return createStudio('warner', { city: 'LA', state: 'CA', country: 'US' })
      .then(() => {
        return request(app)
          .post('/studios')
          .send({
            name: 'warner',
            address: {
              city: 'LA',
              state: 'CA',
              country: 'US'
            }
          })
          .then(res => {
            expect(res.body).toEqual({
              name: expect.any(String),
              address: {
                city: 'LA',
                state: 'CA',
                country: 'US'
              },
              _id: expect.any(String),
              // __v: 0
            });
          });
      });
  });

});
