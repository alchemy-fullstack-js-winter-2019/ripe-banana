require('dotenv').config();
require('../../lib/utils/connect')();
const mongoose = require('mongoose');
// const seedData = require('../seedData');
const Studio = require('../../lib/models/Studio');
const Film = require('../../lib/models/Film');

describe('app', () => {
  beforeEach(done => mongoose.connection.dropDatabase(done));

  // beforeEach(() => {
  //   return seedData();
  // });

  afterAll(() => mongoose.disconnect());

  it('validates a good model for Film', () => {
    return Studio
      .create({
        name: 'Shaba Productions',
        address: {
          city: 'Los Angeles',
          state: 'CA',
          country: 'USA'
        }
      })
      .then(createdStudio => {
        return Film
          .create({
            title: 'JS The Movie',
            studio: createdStudio._id,
            released: 2019,
            cast: ['Bob', 'Shirly', 'Martha']
          });
      })
      .then(film => expect(film.toJSON()).toEqual({
        title: 'JS The Movie',
        studio: expect.any(mongoose.Types.ObjectId),
        released: 2019,
        cast: ['Bob', 'Shirly', 'Martha'],
        _id: expect.any(mongoose.Types.ObjectId)
      }));
  });  
});
