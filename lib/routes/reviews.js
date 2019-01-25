const { Router } = require('express');
const Review = require('../models/Review');

module.exports = Router()

  .post('/', (req, res, next) => {
    const { rating, reviewer, review, createAt, updatedAt } = req.body;
    Review.create({
      rating,
      reviewer,
      review,
      createAt,
      updatedAt
    })
      .then(review => res.send(review))
      .catch(next);
  });
