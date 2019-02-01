require('../../lib/utils/connect')();
require('dotenv').config();
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../lib/app');
const Studio = require('../../lib/models/Studio');
const Film = require('../../lib/models/Film');

let genStudio = null;
describe('studios', () => {
  const createStudio = (name, address) => {
    return Studio
      .create({ name, address });
  };

  const createFilm = (title, released) => {
    return createStudio('Shaba Productions', '1234 Main St.')
      .then(studio => {
        genStudio = studio;
        return Film
          .create({ title, released, studioId: studio._id });
      });
  };

  beforeEach(done => mongoose.connection.dropDatabase(done));

  beforeEach(done => {
    createFilm('JS The Movie', '1-27-2019')
      .then(() => done());
  });

  afterAll(() => mongoose.disconnect());

  it('gets studios', () => {
    return request(app)
      .get('/studios')
      .then(res => {
        expect(res.body).toEqual([{
          _id: expect.any(String),
          name: 'Shaba Productions'
        }]);
      });
  });

  it('gets studio by id', () => {
    return request(app)
      .get(`/studios/${genStudio._id}`)
      .then(res => console.log('get by id', res.body));
  });
});
