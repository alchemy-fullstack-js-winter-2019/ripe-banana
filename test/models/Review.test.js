require('dotenv').config();
require('../../lib/utils/connect')();
const mongoose = require('mongoose');
const { Types } = require('mongoose');
const Review = require('../../lib/models/Review');
const Reviewer = require('../../lib/models/Reviewer');

const createReviewer = (name, company = { website: 'www.ryanheartsfilms' }) => {
  return Reviewer.create({ name, company })
    .then(createdReviewer => {
      return createdReviewer;
    });
};

describe.only('Review tests', () => {

  beforeEach(done => {
    mongoose.connection.dropDatabase(done);
  });

  it('validates a good model', () => {
    return createReviewer('Kinglsey')
      .then(createdReviewer => {
        const review = new Review({
          rating: 5,
          reviewer: createdReviewer._id,
          review: 'it was a great movie',
          createdAt: Date.now(),
          updatedAt: Date.now()
        });
        expect(review.toJSON()).toEqual({
          _id: expect.any(Types.ObjectId),
          rating: 5,
          reviewer: createdReviewer._id,
          review: 'it was a great movie',
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date)
        });
      });
  });

  afterAll((done) => {
    mongoose.disconnect(done);
  }); 

});
