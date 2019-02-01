require('dotenv').config();
require('../../lib/utils/connect')();
const mongoose = require('mongoose');
const Reviewer = require('../../lib/models/Reviewer');

describe('app', () => {
  beforeEach(done => mongoose.connection.dropDatabase(done));

  afterAll(() => mongoose.disconnect());

  it('validates a good model for Reviewer', () => {
    return Reviewer
      .create({
        name: 'Shaba Critic',
        company: 'Shabsters, Inc.'
      })
      .then(reviewer => expect(reviewer.toJSON()).toEqual({
        name: 'Shaba Critic',
        company: 'Shabsters, Inc.',
        _id: expect.any(mongoose.Types.ObjectId)
      }));
  });  
});
