require('dotenv').config();
require('../../lib/utils/connect')();
const mongoose = require('mongoose');
const Studio = require('../../lib/models/Studio');
// const Film = require('../../lib/models/Film');
// const request = require('supertest');
// const app = require('../../lib/app');

describe('studio model', () => {
  beforeEach(done => mongoose.connection.dropDatabase(done));

  afterAll(() => mongoose.disconnect());

  it('validates studio model', () => {
    const studio = {
      name: 'Warner',
      address: {
        city: 'Hollywood',
        state: 'CA',
        country: 'USA' 
      } 
    };
    const newStudio = new Studio(studio);
    const jsonStudio = newStudio.toJSON();
    expect(jsonStudio).toEqual({
      name: 'Warner',
      address: {
        city: 'Hollywood',
        state: 'CA',
        country: 'USA'
      },
      _id: expect.any(Object)
    });

  });
});
