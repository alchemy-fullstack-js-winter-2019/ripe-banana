const { Router } = require('express');
const Reviewer = require('../models/Reviewer');


module.exports = Router()
    .post('/', (req, res, next) => {
        const { name, company } = req.body;
        Reviewer.create({ name, company })
            .then(Reviewer => res.send(Reviewer))
            .catch(next);
    })
    .get('/', (req, res, next) => {
        Reviewer
            .find()
            .select('-__v -company')
            .then(Reviewers => res.send(Reviewers))
            .catch(next);
    })
    .get('/:id', (req, res, next) => {
        console.log(req.body);

        Reviewer  
            .findById(req.params.id)
            .then(Reviewer => res.send(Reviewer))
            .catch(next);
    })

    .delete('/:id', (req, res, next) => {
        Reviewer
            .findByIdAndDelete(req.params.id)
            .then(() => res.send({ deleted: true }))
            .catch(next);
    });