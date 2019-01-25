require('dotenv').config();
require('../../lib/utils/connect')();
// const Film = require('../../lib/models/Film');
// const request = require('supertest');
// const app = require('../../lib/app');
const mongoose = require('mongoose');

// const createFilm = () => {
//   return Film.create({})
//     .then(createdFilm => {
//       return createdFilm;
//     });
// };

describe('film routes', () => {
  beforeEach(done => {
    mongoose.connection.dropDatabase(done);
  });

  it('creates a film', () => {

  });

  afterAll((done) => {
    mongoose.disconnect(done);
  });
});
