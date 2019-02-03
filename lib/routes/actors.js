const { Router } = require('express');
const Actor = require('../models/Actor');
const Film = require('../models/Film');

module.exports = Router()
    .post('/', (req, res, next) => {
        const { name, dob, pob } = req.body;
        Actor
            .create({ name, dob, pob })
            .then(actor => res.send(actor))
            .catch(next);
    })
    .get('/', (req, res, next) => {
        Actor
            .find()
            .select('name')
            .then(actors => res.send(actors))
            .catch(next);
    })
    .get('/:id', (req, res, next) => {
        // Promise.all([
        Actor
            .findById(req.params.id)
        //         .lean(),
        //     Film
        //         .find({ 'cast.actor': req.params.id })
        //         .lean()
        //         .select('title released')
        // ])
            .then(actor => res.send(actor))
            .catch(next);
    })
    .put('/:id', (req, res, next) => {
        Actor
            .findByIdAndUpdate(req.params.id, req.body, { new: true })
            .then(actor => res.send(actor))
            .catch(next);
    })
    .delete('/:id', (req, res, next) => {
        Actor
            .findByIdAndDelete(req.params.id)
            .then(() => res.send({ deleted: 1 }))
            .catch(next);
    });
