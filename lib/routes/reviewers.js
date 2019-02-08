const { Router } = require('express');
const Reviewer = require('../models/Reviewer');

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
            .then(reviewer => {
                res.send(reviewer);
            })
            .catch(next);
    })
    .get('/', (req, res, next) => {
        Reviewer
            .find()
            .select({ '__v': false })
            .then(reviewers => {
                res.send(reviewers);
            })
            .catch(next);
    })
    .get('/:id', (req, res, next) => {
        Reviewer
            .findById(req.params.id)
            .populate('reviews')
            .select({ '__v': false })
            .then(reviewer => {
                res.send(reviewer);
            })
            .catch(next);
    });
