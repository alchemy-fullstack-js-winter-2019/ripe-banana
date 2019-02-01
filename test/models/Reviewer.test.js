require('dotenv').config();
require('../../lib/utils/connect')();
const mongoose = require('mongoose');
const { Types } = require('mongoose');
const Reviewer = require('../../lib/models/Reviewer');

describe('Reviewer test', () => {
  beforeEach(done => {
    mongoose.connection.dropDatabase(done);
  });

  it('validates a good model', () => {
    const reviewer = new Reviewer({
      name: 'Frank',
      company: {
        website: 'www.frankgoestothemovies.com'
      }
    });
    expect(reviewer.toJSON()).toEqual({
      _id: expect.any(Types.ObjectId),
      name: 'Frank',
      company: {
        website: 'www.frankgoestothemovies.com'
      }
    });

  });

  afterAll((done) => {
    mongoose.connection.close();
    done();
  });
});
