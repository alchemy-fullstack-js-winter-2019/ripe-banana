const { Router } = require('express');
// const Actor = require('../models/Actor');
const Film = require('../models/Film');

module.exports = Router()
    .post('/', (req, res, next) => {
        const { title, released, studio } = req.body;
        Film
            .create({ title, released, studio })
            .then(film => res.send(film))
            .catch(next);
    })
    .get('/', (req, res, next) => {
        Film
            .find()
            .select('name')
            .then(actors => res.send(actors))
            .catch(next);
    })
    .get('/:id', (req, res, next) => {
        // Promise.all([
        Film
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
        Film
            .findOneAndUpdate(req.params.id, req.body, { new: true })
            .then(actor => res.send(actor))
            .catch(next);
    })
    .delete('/:id', (req, res, next) => {
        Film
            .findOneAndDelete(req.params.id)
            .then(() => res.send({ deleted: 1 }))
            .catch(next);
    });
