const { Router } = require('express');
const Actor = require('../models/Actor');
const { HttpError } = require('../middleware/error');


module.exports = Router()
    .post('/', (req, res, next) => {
        console.log('hello post method', req.body);
        const { name, address } = req.body;
        Actor.create({ name, address })
            .then(actor => res.send(actor))
            .catch(next);
    })
    .get('/', (req, res, next) => {
        console.log(req.body);
        Actor
            .find()
            .select('-__v -address')
            .then(actors => res.send(actors))
            .catch(next);
    })
    .get('/:id', (req, res, next) => {
        Actor  
            .findById(req.params.id)
            .then(actor => res.send(actor))
            .catch(next);
    })
    .patch('/:id', (req, res, next) => {
        Actor  
            .findByIdAndUpdate(req.params.id, req.body,  { new: true })
            .then(actor => res.send(actor))
            .catch(next);
    })
    .delete('/:id', (req, res, next) => {
        Actor
            .findByIdAndDelete(req.params.id)
            .then(() => res.send({ deleted: true }))
            .catch(next);
    });