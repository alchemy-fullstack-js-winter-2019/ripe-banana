require('dotenv').config();
require('../../lib/utils/connect')();
const mongoose = require('mongoose');
// const seedData = require('../seedData');
const Studio = require('../../lib/models/Studio');

describe('app', () => {
  beforeEach(done => mongoose.connection.dropDatabase(done));

  // beforeEach(() => {
  //   return seedData();
  // });

  afterAll(() => mongoose.disconnect());

  it('validates a good model for Studio', () => {
    return Studio
      .create({
        name: 'Shaba Productions',
        address: {
          city: 'Los Angeles',
          state: 'CA',
          country: 'USA'
        }
      })
      .then(studio => expect(studio.toJSON()).toEqual({
        name: 'Shaba Productions',
        address: {
          city: 'Los Angeles',
          state: 'CA',
          country: 'USA'
        },
        _id: expect.any(mongoose.Types.ObjectId)
      }));
  });  
});
