require('dotenv').config();
require('../../lib/utils/connect')();
// const { Router } = require('express');
// const Studio = require('../models/Studio');
const request = require('supertest');
const app = require('../../lib/app');
const mongoose = require('mongoose');

// const createStudio = (name, address = {
//   city: 'Portland',
//   state: 'OR',
//   country: '\'Merica'
// }) => {
//   return request(app)
//     .post('/studios')
//     .send({
//       name,
//       address
//     })
//     .then(res => res.body);
// };

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

  afterAll((done) => {
    mongoose.disconnect(done);
  });


});

// it('gets a list of studios', () => {
//   const handles = ['TA1', 'TA2', 'TA3'];
//   return Promise.all(handles.map(createTweet))
//     .then(() => {
//       return request(app)
//         .get('/tweets')
//         .then(res => {
//           expect(res.body).toHaveLength(3);
//         });
//     });
// });


