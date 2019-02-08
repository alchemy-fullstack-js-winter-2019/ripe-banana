require('dotenv').config();
require('../lib/utils/connect')();
const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../lib/app');

const createStudio = (name = 'Sony Pictures', address = { city: 'Burbank', state: 'California', country: 'USA' }) => {
  return request(app)
    .post('/studios')
    .send({
      name,
      address
    })
    .then(res => res.body);
};

describe('studios app', () => {
  beforeEach(done => {
    return mongoose.connection.dropDatabase(() => {
      done();
    });
  });

  afterAll(done => {
    mongoose.connection.close(done);
  });

  it('can create a studio', () => {
    return request(app)
      .post('/studios')
      .send({
        name: 'Walt Disney',
        address: { city: 'Burbank', state: 'California', country: 'USA' }
      })
      .then(res => {
        expect(res.body).toEqual({
          name: 'Walt Disney',
          address: { city: 'Burbank', state: 'California', country: 'USA' },
          _id: expect.any(String),
          __v: 0
        });
      });
  });

  it('gets a list of all studios', () => {
    const studiosToCreate = ['Universal', 'Lionsgate'];
    return Promise.all(studiosToCreate.map(createStudio))
      .then(() => {
        return request(app)
          .get('/studios');
      })
      .then(({ body }) => {
        expect(body).toHaveLength(2);
      });
  });

  it('gets a single studio by id', () => {
    return createStudio('Pacific')
      .then(createdStudio => {
        return Promise.all([
          Promise.resolve(createdStudio._id),
          request(app)
            .get(`/studios/${createdStudio._id}`)
        ]);
      })
      .then(([_id, res]) => {
        expect(res.body).toEqual({
          address: { city: 'Burbank', state: 'California', country: 'USA' },
          name: 'Pacific',
          films: [],
          _id,
          __v: 0
        });
      });
  });

  it('finds a studio by id and updates it', () => {
    return createStudio('Warner Bros')
      .then(updatedStudio => {
        updatedStudio.name = 'Paramount';
        return request(app)
          .put(`/studios/${updatedStudio._id}`)
          .send(updatedStudio);
      })
      .then(res => {
        expect(res.body.name).toContain('Paramount');
      });
  });

  it('finds by id and deletes a studio', () => {
    return createStudio('20th Century Fox')
      .then(createdStudio => {
        const id = createdStudio._id;
        return request(app)
          .delete(`/studios/${id}`)
          .then(res => {
            expect(res.body).toEqual({ 'deleted': 1 });
          });
      });
  });
});
