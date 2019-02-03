require('dotenv').config();
require('../../lib/utils/connect')();
const mongoose = require('mongoose');
const { Types } = require('mongoose');
const Film = require('../../lib/models/Film');
const Studio = require('../../lib/models/Studio');


describe('film model', () => {
  beforeEach(done => mongoose.connection.dropDatabase(done));

  afterAll(() => mongoose.disconnect());

  it('validates film model', () => {
    const studio = new Studio({
      name: 'Warner',
      address: {
        city: 'Hollywood',
        state: 'OR',
        country: 'USA'
      }
    });
    const film = new Film ({
      title: 'Castaway',
      studio: studio._id,
      released: 2000,
      cast: [{ 
        role: 'main actor',
        actor: 'Tom Hanks'
      }],
    });
 
    expect(film.toJSON()).toEqual({
      title: 'Castaway',
      studio: expect.any(Types.ObjectId),
      released: 2000,
      _id: expect.any(Types.ObjectId),
      cast: [{ 
        _id: expect.any(Object),
        role: 'main actor',
        actor: 'Tom Hanks'
      }],
    });
  });
});
