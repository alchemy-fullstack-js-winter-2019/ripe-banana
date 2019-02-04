require('dotenv').config();
require('../../lib/utils/connect')();
const mongoose = require('mongoose');
const { Types } = require('mongoose');
const Film = require('../../lib/models/Film');


describe.skip('Film model', () => {
  
  beforeEach(done  => {
    mongoose.connection.dropDatabase(done);
  });

  afterAll(done => mongoose.disconnect(done));
 
  it('validates a good model', () => {
    const data  = ({
      title: 'Memento',
      studio: Types.ObjectId(),
      release: 2000,
      cast: [{
        role: 'Leonard',
        actor: Types.ObjectId()
      }]
    });
    
    const film = new Film(data);
    const jsonFilm = film.toJSON();
        
    data._id = jsonFilm._id;
    data.cast[0]._id = jsonFilm.cast[0]._id;
        
    expect(jsonFilm).toEqual(data);
  });

});
    
