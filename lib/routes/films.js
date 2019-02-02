const { Router } = require('express');
const Film = require('../models/Film');
const Review = require('../models/Review');

module.exports = Router()
  .get('/', (req, res, next) => {
    Film 
      .find()
      .lean()
      .then(films => res.send(films))
      .catch(next);
  })
  .get('/:id', (req, res, next) => {
    let film = null;
    Film
      .findById(req.params.id)
      .populate('studio', { studio: true })
      .select({ __v: false })
      .lean()
      .then(foundFilm => {
        film = foundFilm;
        return Review
          .find({ film: film._id })
          .populate('reviewer', { reviewer: true })
          .select({ __v: false })
          .lean();
      })
      .then(foundReviews => {
        const reviews = foundReviews.map(review => ({ _id: review._id, rating: review.rating, review: review.review, reviewer: review.reviewer }));
        film.reviews = reviews;
        res.send(film);
      })
      .catch(next);
  });
