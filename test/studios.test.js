require ('dotenv').config();
require('../lib/utils/connect')();
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
  afterAll((done) => {
    mongoose.connection.close(done);
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
              __v: 0
            });
          });
      });
  });

  it('can get all studios', () => {
    return Promise.all(['warner', 'sony', 'walt disney'].map(createStudio))
      .then(() => {
        return request(app)
          .get('/studios');
      })
      .then(res => {
        expect(res.body).toHaveLength(3);
      });
  });

  it('can get a studio by id', () => {
    return createStudio('warner')
      .then(createdStudio => {
        return Promise.all([
          Promise.resolve(createdStudio._id),
          request(app)
            .get(`/studios/${createdStudio._id}`)
        ]);
      })
      .then(([_id, res]) => {
        expect(res.body).toEqual({
          name: expect.any(String),
          _id,
          __v: 0
        });
      });
  });
  it('can delete a studio', () => {
    return createStudio('warner')
      .then(createdStudio => {
        return Promise.all([
          Promise.resolve(createdStudio._id),
          request(app)
            .delete(`/studios/${createdStudio._id}`)
        ]);
      })
      .then(([_id, res]) => {
        expect(res.body).toEqual({ deleted: 1 });
        return request(app)
          .get(`/studios/${_id}`);
      })
      .then(res => {
        expect(res.status).toEqual(404);
      });
  });
});

