const { Router } = require('express');
const Studio = require('../models/Studio');
const { HttpError } = require('../middleware/error');

module.exports = Router()
  .post('/', (req, res, next) => {
    const { name, address } = req.body;
    Studio
      .create({ name, address })
      .then(studio => res.send(studio))
      .catch(next);
  })
  .get('/', (req, res, next) => {
    Studio
      .find()
      .then(studios => res.send(studios))
      .catch(next);
  })
  .get('/:id', (req, res, next) => {
    const _id = req.params.id;
    Studio
      .findById(_id)
      .then(foundStudio => {
        if(!foundStudio) {
          return next(new HttpError(404, `No user found ${_id}`));
        }
        res.send(foundStudio);
      })
      .catch(next);
  })

  .delete('/:id', (req, res, next) => {
    Studio
      .findByIdAndDelete(req.params.id)
      .then(() => res.send({ deleted: 1 }))
      .catch(next);
  });




