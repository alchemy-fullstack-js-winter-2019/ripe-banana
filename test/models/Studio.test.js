require('dotenv').config();
require('../../lib/utils/connect')();
const { getErrors } = require('../../lib/middleware/error');
const mongoose = require('mongoose');
const { Types } = require('mongoose');
const Studio = require('../../lib/models/Studio');

describe.skip('Studio model', () => {

  beforeEach(done  => {
    mongoose.connection.dropDatabase(done);
  });
  afterAll(done => mongoose.disconnect(done));

  const studio = new Studio({
    name: 'A24',
    address: {
      city: 'NY',
      state: 'NY',
      country: 'US'
    }
  });
  expect(studio.toJSON()).toEqual({
    _id: expect.any(Types.ObjectId),
    name: 'A24',
    address: {
      city: 'NY',
      state: 'NY',
      country: 'US'
    }
  });
  it('requires a name in Schema', () => {
    const studio = new Studio({
      address: {
        city:'NY',
        state:'NY',
        country:'US'
      }
    });
    const errors = getErrors(studio.validateSync(), 1);
    expect(errors.name.kind).toEqual('required');
  });
});



