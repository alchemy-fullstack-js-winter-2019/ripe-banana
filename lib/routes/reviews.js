const { Router } = require('express');
const Review = require('../models/Review');

module.exports = Router()
  .post('/', (req, res, next) => {
    const { rating, review } = req.body;
    Review
      .create({ rating, review })
      .then(review => res.send(review))
      .catch(next);
  })
  .get('/', (req, res, next) => {
    Review
      .find()
      .select({ '__v': false, 'reviewer': false, 'createdAt': false, 'updatedAt': false })
      .then(listOfReviews => {
        res.send(listOfReviews);
      })
      .catch(next);
  });
