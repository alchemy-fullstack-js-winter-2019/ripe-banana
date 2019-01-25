require('dotenv').config();

const request = require('supertest');
const Studio = require('../lib/models/Studio');
const mongoose = require('mongoose');
const app = require('../lib/app');

describe('Studio app', () => {

  const createStudio = (name) => {
    return request(app)
      .post('/studios')
      .send({
        name: name
        
      })
      .then(res => res.body);
  };
  it('validates a good model', () => {
    const studio = new Studio({
      name: 'Universal',
      address: {
        city: 'Los Angeles',
        state: 'CA',
        county: 'LA County'
      }
    });
    expect(studio.toJSON()).toEqual({
      
      name: 'Universal',
      address: {
        city: 'Los Angeles',
        state: 'CA',
        county: 'LA County'
      },
      _id: expect.any(mongoose.Types.ObjectId)
     
    });
  });

  it.only('creates a new studio', () => {
    return request(app)
      .post('/studios')
      .send({
        name: 'Universal',
        address: {
          city: 'Los Angeles',
          state: 'CA',
          county: 'LA County'
        } 
      })
      .then(res => {
        console.log(res.body);
        expect(res.body).toEqual({
          name: 'Universal',
          address: {
            city: 'Los Angeles',
            state: 'CA',
            county: 'LA County'
          }, id: expect.any(String)
        });
      });
  });

  it.skip('gets list of studios', () => {
    return Promise.all(['Universal', 'Fox', 'Disney'].map(studio => {
      return createStudio(studio);
    }))
      .then(() => {
        return request(app)
          .get('/studios');
      })
      .then(res => {
        expect(res.body).toHaveLength(3);
      });
  });
});
