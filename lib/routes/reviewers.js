const { Router } = require('express');
const Reviewer = require('../models/Reviewer');
const Review = require('../models/Review');

module.exports = Router()
  .post('/', (req, res, next) => {
    const { name, company } = req.body;
    Reviewer
      .create({ name, company })
      .then(reviewer => res.send(reviewer))
      .catch(next);
  })

  .put('/:id', (req, res, next) => {
    Reviewer
      .findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then(updatedReviewer => res.send(updatedReviewer))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    Reviewer
      .find()
      .lean()
      .select({ '__v': false })
      .then(listOfReviewers => res.send(listOfReviewers))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    const { id } = req.params;

    Promise.all([
      Reviewer.findById(id)
        .lean()
        .select({ '__v': false }),

      Review.find({ reviewer: id })
        .lean()
        .select('rating review')
        .populate({
          path: 'film',
          select: 'title'
        })
    ])
      .then(([reviewer, reviews]) => {
        reviewer.reviews = reviews;
        res.send(reviewer);
      })
      .catch(next);
  });
