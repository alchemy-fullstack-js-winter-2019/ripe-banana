const { Router } = require('express');
const Film = require('../models/Film');
const Studio = require('../models/Studio');

module.exports = Router()
  .post('/', (req, res, next) => {
    Studio
      .create(req.body)
      .then(studio => res.send(studio))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    const _id = req.params.id;

    Promise.all([
      Studio.findById(_id)
        .lean(),

      Film.find({ studio: _id })
        .select('_id title')
        .lean()
    ])
      .then(([studio, films]) => {
        studio.films = films;
        res.send(studio);
      }) 
      .catch(next);
  })

  .get('/', (req, res, next) => {
    Studio
      .find()
      .lean()
      .select({ address: false, __v: false })
      .then(studio => res.send(studio))
      .catch(next);
  })

  .put('/:id', (req, res, next) => {
    Studio
      .findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then(updatedStudio => res.send(updatedStudio))
      .catch(next);
  })

  .delete('/:id', (req, res, next) => {
    Studio
      .findByIdAndDelete(req.params.id)
      .then(() => res.send({ deleted: 1 }))
      .catch(next);
  });
