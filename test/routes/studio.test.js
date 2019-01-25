require('dotenv').config();
require('../../lib/utils/connect')();
const Studio = require('../../lib/models/Studio');
const request = require('supertest');
const app = require('../../lib/app');
const mongoose = require('mongoose');

const createStudio = (name, address = {
  city: 'portland',
  state: 'OR',
  country: 'USA'
}) => {
  return Studio.create({ name, address })
    .then(createdStudio => {
      return createdStudio;
    });
};

describe('studio routes', () => {

  beforeEach(done => {
    mongoose.connection.dropDatabase(done);
  });

  it('creates a studio', () => {
    return request(app)
      .post('/studios')
      .send({ 
        name: 'Warner Sisterz', 
        address: {
          city: 'Portland',
          state: 'OR',
          country: '\'Merica'
        } })
      .then(res => {
        expect(res.body).toEqual({ 
          _id: expect.any(String),
          __v: 0,
          name: 'Warner Sisterz', 
          address: {
            city: 'Portland',
            state: 'OR',
            country: '\'Merica'
          }
        });
      });
  });

  it('gets a list of studios', () => {
    const studiosToCreate = ['Banana', 'Stefanana', 'Nananers LLC'];
    return Promise.all(studiosToCreate.map(createStudio))
      .then(() => {
        return request(app)
          .get('/studios');
      })
      .then(res => {
        expect(res.body).toContainEqual({ _id: expect.any(String), name: 'Banana' });
        expect(res.body).toHaveLength(3);
      });
  });

  it('gets a studio by id', () => {
    return createStudio('Paige')
      .then(res => {
        return request(app)
          .get(`/studios/${res._id}`)
          .then(res => {
            expect(res.body).toEqual({
              name: 'Paige',
              address: expect.any(Object),
              _id: expect.any(String),
              __v: 0
            });
          });
      });
  });

  it('can delete a studio', () => {
    return createStudio('Cari')
      .then(createdStudio => {
        const _id = createdStudio._id;
        return request(app)
          .delete(`/studios/${_id}`)
          .then(res => {
            expect(res.body).toEqual({ deleted: 1 });
          });
      });
  });

  afterAll((done) => {
    mongoose.disconnect(done);
  });

});


