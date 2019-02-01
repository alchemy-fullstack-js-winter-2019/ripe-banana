require('dotenv').config();
require('../../lib/utils/connect')();
const mongoose = require('mongoose');
const Actor = require('../../lib/models/Actor');

describe('app', () => {
  beforeEach(done => mongoose.connection.dropDatabase(done));

  afterAll(() => mongoose.disconnect());

  it('validates a good model for Actor', () => {
    return Actor
      .create({
        name: 'Shabz',
        dob: new Date('1892-12-17'),
        pob: 'Antartica'
      })
      .then(actor => expect(actor.toJSON()).toEqual({
        name: 'Shabz',
        dob: new Date('1892-12-17'),
        pob: 'Antartica',
        _id: expect.any(mongoose.Types.ObjectId)
      }));
  });  
});
