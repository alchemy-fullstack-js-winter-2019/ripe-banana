require('dotenv').config();
require('../../lib/utils/connect')();
const mongoose = require('mongoose');
const Studio = require('../../lib/models/Studio');
const Film = require('../../lib/models/Film');
const Reviewer = require('../../lib/models/Reviewer');
const Review = require('../../lib/models/Review');

describe('app', () => {
  beforeEach(done => mongoose.connection.dropDatabase(done));

  afterAll(() => mongoose.disconnect());

  it('validates a good model for Film', () => {
    let film = null;
    return Studio
      .create({
        name: 'Shaba Productions',
        address: {
          city: 'Los Angeles',
          state: 'CA',
          country: 'USA'
        }
      })
      .then(createdStudio => {
        return Film
          .create({
            title: 'JS The Movie',
            studio: createdStudio._id,
            released: 2019,
            cast: ['Bob', 'Shirly', 'Martha']
          });
      })
      .then(createdFilm => {
        film = createdFilm;
        return Reviewer
          .create({
            name: 'Shaba Critic',
            company: 'Shabsters, Inc.'
          });
      })
      .then(createdReviewer => {
        return Review
          .create({
            rating: 5,
            reviewer: createdReviewer._id,
            review: 'It was blah',
            film: film._id,
            updatedAt: Date.now()
          });
      })
      .then(review => expect(review.toJSON()).toEqual({
        rating: 5,
        reviewer: expect.any(mongoose.Types.ObjectId),
        review: 'It was blah',
        film: film._id,
        updatedAt: expect.any(Date),
        createdAt: expect.any(Date),
        _id: expect.any(mongoose.Types.ObjectId)
      }));
  });  
});
