require('../lib/utils/connect')();
const request = require('supertest');
const app = require('../lib/app');
const mongoose = require('mongoose');
const Studio = require('../lib/models/Studio');

let studio = null;
describe('studios', () => {
  const createStudio = (name, address) => {
    return Studio.create({ name, address })
      .then(studioRes => studioRes);
  };

  beforeEach(done => mongoose.connection.dropDatabase(done));

  beforeEach(done => {
    createStudio('shabaProductions', '1234 main st.')
      .then(res => {
        const { _id, name, address, __v } = res;
        studio = { _id: _id.toString(), name, address, __v  };
        done();
      });
  });

  afterAll(() => mongoose.disconnect());

  it('gets studios', () => {
    return request(app)
      .get('/studios')
      .then(res => expect(res.body).toEqual([studio]));
  });
});
