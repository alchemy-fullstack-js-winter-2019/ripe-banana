require('dotenv').config();
require('../../lib/utils/connect')();
const mongoose = require('mongoose');
const { Types } = require('mongoose');
const Film = require('../../lib/models/Film');
const Studio = require('../../lib/models/Studio');

describe('Film model', () => {
  
  beforeEach(done  => {
    mongoose.connection.dropDatabase(done);
  });

  afterAll(done => mongoose.disconnect(done));
 
  it('validates a good model', () => {
    
    const studio = new Studio({
      name: 'A24',
      address: {
        city: 'NY',
        state: 'NY',
        country: 'US'
      }
    });

    const film = new Film ({
      title: 'Memento',
      studio: studio._id,
      release: 2000,
      cast: [{
        role:'Guy Pearce',
        actor: actor._id
      }]
    });
  });
});
