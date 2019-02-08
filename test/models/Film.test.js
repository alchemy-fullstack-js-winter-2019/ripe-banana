require('dotenv').config();
require('../../lib/utils/connect')();
const mongoose = require('mongoose');
const { Types } = require('mongoose');
const Film = require('../../lib/models/Film');
const Studio = require('../../lib/models/Studio');
const Actor = require('../../lib/models/Actor');

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
    const actor = new Actor({
      name: 'Wz',
      dob: '2010-10-20',
      pob: 'Portlandia'
    });
    const film = new Film({
      title: 'Bananas On A Plane',
      studio: studio._id,
      released: 1994,
      cast: [{
        role: 'Miss Nana',
        actor: actor._id
      }]
    });
    expect(film.toJSON()).toEqual({
      _id: expect.any(Types.ObjectId),
      title: 'Bananas On A Plane',
      studio: expect.any(Types.ObjectId),
      released: 1994,
      cast: [{
        _id: expect.any(Types.ObjectId),
        role: 'Miss Nana',
        actor: expect.any(Types.ObjectId)
      }]
    });
  });

  afterAll((done) => {
    mongoose.connection.close();
    done();
  }); 

});
