require('dotenv').config();
require('../../lib/utils/connect')();
const Studio = require('../../lib/models/Studio');
const request = require('supertest');
const app = require('../../lib/app');
const mongoose = require('mongoose');


let createStudio = (name, address = {
  city: 'NY',
  state: 'NY', 
  country: 'US'
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
  afterAll(done => {
    mongoose.connection.close(done);  
  });
  it('creates a studio', () => {
    return request(app)
      .post('/studios')
      .send({
        name: 'Pixar',
        address: {
          city: 'Emeryville',
          state: 'CA',
          country: 'US'
        }
      })
      .then(res => {
        expect(res.body).toEqual({
          name: 'Pixar',
          address: {
            city: 'Emeryville',
            state: 'CA',
            country: 'US'
          },
          _id: expect.any(String),
          __v: 0
        });
      });
  });
  it('gets list of ALL studios', () => {
    const arrayOfStudios = ['Netflix', 'Amazon', 'HBO Pictures'];
    return Promise.all(arrayOfStudios.map(createStudio))
      .then(() => {
        return request(app)
          .get('/studios');
      })
      .then(res => { 
        expect(res.body).toHaveLength(3);
        expect(res.body).toContainEqual({ _id: expect.any(String), name: 'Netflix' });
      });
  });
  it('gets a studio by ID', () => {
    return createStudio('Studio Ghibli')
      .then(res => {
        return request(app)
          .get(`/studios/${res._id}`)
          .then(res => {
            expect(res.body).toEqual({
              name:'Studio Ghibli',
              address: expect.any(Object),
              _id:expect.any(String),
              __v:0
            });
          });
      });
  });
});
