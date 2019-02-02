require('dotenv').config();
require('../lib/utils/connect')();
const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../lib/app');


const createFilm = (title = 'Ghostbusters', released = 1984) => {
  return request(app)
    .post('/films')
    .send({
      title,
      released
    })
    .then(res => res.body);
};


describe('films app', () => {
  beforeEach(done => {
    return mongoose.connection.dropDatabase(() => {
      done();
    });
  });

  afterAll(done => {
    mongoose.connection.close(done);
  });

  it('can create a film', () => {
    return request(app)
      .post('/films')
      .send({
        title: 'The Matrix',
        released: 1999
      })
      .then(res => {
        expect(res.body).toEqual({
          title: 'The Matrix',
          released: 1999,
          _id: expect.any(String),
          __v: 0
        });
      });
  });

  it('gets a list of all films', () => {
    const filmsToCreate = ['Star Wars', 'Fight Club'];
    return Promise.all(filmsToCreate.map(createFilm))
      .then(() => {
        return request(app)
          .get('/films');
      })
      .then(({ body }) => {
        expect(body).toHaveLength(2);
      });
  });

  it('gets a single film by id', () => {
    return createFilm('American Beauty')
      .then(createdFilm => {
        return Promise.all([
          Promise.resolve(createdFilm._id),
          request(app)
            .get(`/films/${createdFilm._id}`)
        ]);
      })
      .then(([_id, res]) => {
        expect(res.body).toEqual({
          title: 'American Beauty',
          released: 1984,
          _id,
          __v: 0
        });
      });
  });

  it('finds a film by id and updates it', () => {
    return createFilm('Toy Story')
      .then(updatedFilm => {
        updatedFilm.title = 'Office Space';
        return request(app)
          .patch(`/films/${updatedFilm._id}`)
          .send(updatedFilm);
      })
      .then(res => {
        expect(res.text).toContain('Office Space');
      });
  });

  it('finds by id and deletes a film', () => {
    return createFilm('Dogma')
      .then(createdFilm => {
        const id = createdFilm._id;
        return request(app)
          .delete(`/films/${id}`)
          .then(res => {
            expect(res.body).toEqual({ 'deleted': 1 });
          });
      });
  });

});
