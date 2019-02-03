require('dotenv').config();
require('../../lib/utils/connect')();

const request = require('supertest');
const Studio = require('../../lib/models/Studio');
const Actor = require('../../lib/models/Actor');
const mongoose = require('mongoose');
const app = require('../../lib/app');

describe('Film routes tests', () => {

  const createStudio = (name = 'Universal', 
    address = { city: 'Los Angeles',
      state: 'CA',
      country: 'USA'  }) => {
    return request(app)
      .post('/studios')
      .send({
        name: name,
        address: address
      })
      .then(res => res.body);
  };

  const createFilm = (title = 'The Matrix', released = 1994) => {
    return createStudio()
      .then(createdStudio => {
        return request(app)
          .post('/films')
          .send({
            title, released, studio: createdStudio._id
          })
          .then(res => res.body);
      });
  };

  // const createFilm = (title, studio, released, cast) => {
  //   return request(app)
  //     .post('/films')
  //     .send({
  //       title: expect.any(String),
  //       studio: expect.any(String),
  //       released: expect.any(Number),
  //       cast: {
  //         role: expect.any(String),
  //         actor: expect.any(String)
  //       }
  //     })
  //     .then(res => res.body);
  // };

  beforeEach(done => {
    mongoose.connection.dropDatabase(done);
  });

  it('creates a film', () => {
    return Studio.create({
      name: 'Universal',
      address: {
        city: 'Los Angeles',
        state: 'CA',
        country: 'USA' } })
      .then(studio => {
        console.log('Studio: ', studio);
        return Actor.create({
          name: 'Keanu Reeves',
          dob: '1970-01-01',
          pob: 'Beverly Hills'
        })
          .then(actor => {
            console.log('Actor: ', actor);
            return request(app)
              .post('/films')
              .send({
                title: 'The Matrix',
                studio: studio._id,
                released: 1994,
                cast: [{
                  role: 'Neo',
                  actor: actor._id,
                }]
              })
              .then(res => {
                console.log('Res body: ', res.body);
                expect(res.body).toEqual({ __v: 0,
                  _id: expect.any(String),
                  title: 'The Matrix',
                  studio: expect.any(String),
                  released: 1994,
                  cast: [{
                    _id: expect.any(String),
                    role: 'Neo',
                    actor: expect.any(String)
                  }]
                });
              });
          });
      });
  });

  it('gets a list of films', () => {
    return Promise.all(['The Matrix', 'Lion King', 'Star Wars'].map(film => {
      return createFilm(film);
    }))
      .then(() => {
        return request(app)
          .get('/films');
      })
      .then(res => {
        console.log('Film res.body: ', res.body);
        expect(res.body).toHaveLength(3);
      });
  });

  it('gets a film by id', () => {
    return createFilm('The Matrix')
      .then(createFilm => {
        return Promise.all([
          Promise.resolve(createFilm.id),
          request(app)
            .get(`/films/${createFilm._id}`)
        ])
          .then(([_id, res]) => {
            expect(res.body).toEqual({
              title: 'The Matrix',
              released: 1994,
              cast: [],
              studio: expect.any(String),
              __v: 0,
              _id: expect.any(String)
            });
          });
      });
     
  });
});


