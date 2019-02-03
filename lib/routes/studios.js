const { Router } = require('express');
const { HttpError } = require('../middleware/error');
const Studio = require('../models/Studio');

module.exports = Router()
    .post('/', (req, res, next) => {
        const { name, address } = req.body;
        Studio
            .create({ name, address })
            .then(studio => {
                res.send(studio);
            })
            .catch(err => {
                next(err);
            });
    })
    
    .get('/:id', (req, res, next) => {
        const _id = req.params.id;
        Studio
            .findById(_id)
            .then(studio => {
                if(!studio) {
                    return next(new HttpError(404, `No Studio found with id: ${_id}`));
                }
                res.send(studio);
            })
            .catch(next);
    })
    .get('/', (req, res, next) => {
        Studio
            .find()
            .select({ address: false, __v: false })
            .then(studio => res.send(studio))
            .catch(next);
    })
    .patch('/:id', (req, res, next) => {
        Studio.findOneAndUpdate(req.params.id, req.body, { new: true }, (err, studio) => {
            if(err) return next(err);
            res.send(studio);
        });
    })
    .delete('/:id', (req, res, next) => {
        Studio.findOneAndDelete(req.params.id)
            .then(() => res.send({ deleted: 1 }))
            .catch(next);
    });
