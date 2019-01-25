require('dotenv').config();
require('../../lib/utils/connect')();
const mongoose = require('mongoose');
const { Types } = require('mongoose');
const Actor = require('../../lib/models/Actor');


describe('Actor tests', () => {

  beforeEach(done => {
    mongoose.connection.dropDatabase(done);
  });

  it('validates a good model', () => {
    const actor = new Actor({
      name: 'Wz',
      dob: '2010-10-20',
      pob: 'Portlandia'
    });
    expect(actor.toJSON()).toEqual({
      _id: expect.any(Types.ObjectId),
      name: 'Wz',
      dob: expect.any(Date),
      pob: 'Portlandia'
    });
  });

  afterAll((done) => {
    mongoose.disconnect(done);
  }); 

});
