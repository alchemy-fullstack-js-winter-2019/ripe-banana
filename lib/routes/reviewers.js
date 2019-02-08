const { Router } = require('express');
const Reviewer = require('../models/Reviewer');
const { HttpError } = require('../middleware/error');

module.exports = Router()

  .post('/', (req, res, next) => {
    const { name, company } = req.body;
    Reviewer
      .create({ name, company })
      .then(reviewer => res.send(reviewer))
      .catch(next);
  })
  .get('/', (req, res, next) => {
    Reviewer
      .find()
      .then(reviewers => res.send(reviewers))
      .catch(next);
  })
  .get('/:id', (req, res, next) => {
    const _id = req.params.id;
    Reviewer
      .findById(_id)
      .then(foundReviewer => {
        if(!foundReviewer) {
          return next(new HttpError(404, `No reviewer found ${_id}`));
        }
        res.send(foundReviewer);
      })
      .catch(next);
  })
  .patch('/:id', (req, res, next) => {
    const id = req.params.id;
    Reviewer
      .findByIdAndUpdate(id, req.body, { new: true })
      .then(updatedReviewer => {
        res.send(updatedReviewer);
      })
      .catch(next);
  });
