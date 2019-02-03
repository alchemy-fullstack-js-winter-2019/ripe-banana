/* eslint-disable no-console */
require ('dotenv').config();
require('../../lib/utils/connect')();
const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../../lib/app');
// const Film = require('../../lib/models/Film');
// const { Types } = require('mongoose');
const Studio = require('../../lib/models/Studio');

describe('film app', () => {
  // const createFilm = ((title, studio, released, cast) => {
  //   return Film.create({ title, studio, released, cast })
  //     .then(film => ({ ...film, _id: film._id.toString() }));
  // });
  const createStudio = (name) => {
    return Studio.create({ name, address: { city: 'Hollywood', state: 'CA', country:'USA' } })
      .then(studio => ({ ...studio, _id: studio._id.toString() }));
  };
  beforeEach(done => {
    return mongoose.connection.dropDatabase(() => {
      done();
    }); 
  });

  it('creates a new film', () => {
    return createStudio('warner')
      .then(studio => {
        return request(app)
          .post('/films')
          .send({
            title: 'Castaway',
            studio: studio._id,
            released: 2000,
          })
          .then(res  => {
            console.log(res.body);
            expect(res.body).toEqual({
              title: 'Castaway',
              studio: expect.any(String),
              released: 2000,
              cast: { 
                // _id: expect.any(Object),
                role: expect.any(String),
                actor: 'Tom Hanks'
              },
              _id: expect.any(String),
              __v: 0
            });
          });

      });
  });
});
