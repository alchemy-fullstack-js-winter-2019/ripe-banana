require('dotenv').config();
require('../../lib/utils/connect')();
const mongoose = require('mongoose');
const Reviewer = require('../../lib/models/Reviewer');
const { Types } = require('mongoose');

describe('reviewer model', () => {
  beforeEach(done => mongoose.connection.dropDatabase(done));
  
  afterAll(() => mongoose.disconnect());
  it('validates a reviewer model', () => {
    const reviewer = new Reviewer({
      name: 'Reviewer1',
      company: {
        website: 'reviewmovies.com',
      }
    });
    expect(reviewer.toJSON()).toEqual({
      _id: expect.any(Types.ObjectId),
      name: 'Reviewer1',
      company: {
        website: 'reviewmovies.com',
      }
    });
  });

});

