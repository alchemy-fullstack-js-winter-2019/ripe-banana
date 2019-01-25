require('dotenv').config();
require('../../lib/utils/connect')();
const mongoose = require('mongoose');
const { Types } = require('mongoose');
const Studio = require('../../lib/models/Studio');


describe('Studio tests', () => {

  beforeEach(done => {
    mongoose.connection.dropDatabase(done);
  });

  it('validates a good model', () => {
    const studio = new Studio({
      name: 'Warner Sisterz',
      address: {
        city: 'Portland',
        state: 'OR',
        country: '\'Merica'
      }
    });
    expect(studio.toJSON()).toEqual({
      _id: expect.any(Types.ObjectId),
      name: 'Warner Sisterz',
      address: {
        city: 'Portland',
        state: 'OR',
        country: '\'Merica'
      }
    });
  });

  afterAll((done) => {
    mongoose.disconnect(done);
  }); 

});
