require('dotenv').config();
require('../../lib/utils/connect')();
const Film = require('../../lib/models/Film');
const request = require('supertest');
const app = require('../../lib/app');
const mongoose = require('mongoose');
 
let createFilm = (title, studio, release, cast = {
  role: 'Hans Gruber',
  actor: 'Alan Rickman' 
}) => {
  return Film.create({ title, studio, release, cast })
    .then(createdFilm => {
      return createdFilm;
    });
};

describe.skip('Film routes', () => {
  beforeEach(done => {
    mongoose.connection.dropDatabase(done);
  });
  afterAll(done => {
    mongoose.connection.close(done);  
  });
  it('creates a film', () => {
    return request(app)
      .post('/studios')
      .send({
        title: 'Die Hard',
        studio: '20th Century Fox', 
        release: 1988,
        cast: {
          role: 'Hans Gruber',
          actor: 'Alan Rickman'
        }
      })
      .then(res => {
        expect(res.body).toEqual({
          title: 'Die Hard',
          studio: '20th Century Fox', 
          release: 1988,
          cast: {
            role: 'Hans Gruber',
            actor: 'Alan Rickman'
          },
          _id: expect.any(String),
          __v: 0
        });
      });
  });
  it('gets list of ALL films', () => {
    const arrayOfStudios = ['Die Hard', 'Amelie', 'Bridges of Madison County'];
    return Promise.all(arrayOfStudios.map(createFilm))
      .then(() => {
        return request(app)
          .get('/films');
      })
      .then(res => { 
        expect(res.body).toHaveLength(3);
        expect(res.body).toContainEqual({ _id: expect.any(String), name: 'Die Hard' });
      });
  });
  it('gets a films by ID', () => {
    return createFilm('Blade Runner')
      .then(res => {
        return request(app)
          .get(`/films/${res._id}`)
          .then(res => {
            expect(res.body).toEqual({
              name:'Blade Runner',
              address: expect.any(Object),
              _id:expect.any(String),
              __v:0
            });
          });
      });
  });
  it('deletes a film', () => {
    return createFilm('Star Wars')
      .then(createdFilm => {
        const studio_id = createdFilm._id;
        return request(app)
          .delete(`/films/${studio_id}`)
          .then(res => {
            expect(res.body).toEqual({ deleted: true });
          });
      });
  });

});
