const Chance = require('chance');
const chance = new Chance();

const Studio = require('../lib/models/Studio');
const Film = require('../lib/models/Film');
const Actor = require('../lib/models/Actor');
const Reviewer = require('../lib/models/Reviewer');
const Review = require('../lib/models/Review');

const STUDIOS = 10;
const FILMS = 20;
const ACTORS = 20;
const REVIEWERS = 30;
const REVIEWS = 30;

let filmsDb = null;
module.exports = ((studios = STUDIOS, films = FILMS, actors = ACTORS, reviewers = REVIEWERS, reviews = REVIEWS) => {
  return Promise.all(
    [...Array(studios)].map(() => Studio.create({
      name: chance.word(),
      address: {
        city: chance.city(),
        state: chance.state(),
        country: chance.country()
      }
    }))
  )
    .then(studiosCreated => {
      return Promise.all(
        [...Array(films)].map(() => {
          return Film.create({
            title: chance.word(),
            studio: chance.pickone(studiosCreated)._id,
            released: parseInt(chance.year()),
            cast: [...Array(10)].map(() => chance.name())
          });
        })
      );
    })
    .then(filmsCreated => {
      filmsDb = filmsCreated;
      return Promise.all(
        [...Array(actors)].map(() => {
          return Actor.create({
            name: chance.name(),
            dob: chance.date(),
            pob: chance.city()
          });
        })
      );
    })
    .then(() => {
      return Promise.all(
        [...Array(reviewers)].map(() => {
          return Reviewer.create({
            name: chance.name(),
            company: chance.word()
          });
        })
      );
    })
    .then(reviewersCreated => {
      return Promise.all(
        [...Array(reviews)].map(() => {
          return Review.create({
            rating: chance.integer({ min: 0, max: 5 }),
            reviewer: chance.pickone(reviewersCreated)._id,
            review: 'It was blah',
            film: chance.pickone(filmsDb)._id,
            updatedAt: Date.now()
          });
        })
      );
    });
});
