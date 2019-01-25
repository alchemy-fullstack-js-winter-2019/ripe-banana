const { Router } = require('express');
const { HttpError } = require('../middleware/error');
const Films = require('../models/Film');

module.exports = Router()
  .post('/', (req, res, next) => {
    const { title, released, studio } = req.body;
    Films
      .create({ title, released, studio })
      .then(films => {
        res.send(films);
      })
      .catch(err => {
        next(err);
      });
  })
    
  .get('/:id', (req, res, next) => {
    const _id = req.params.id;
    Films
      .findById(_id)
      .select({ '__v': false })
      .populate('studio', '-address -__v')
      .then(foundFilm => {
        if(!foundFilm) {
          return next(new HttpError(404, `No Film found with id: ${_id}`));
        }
        res.send(foundFilm);
      })
      .catch(next);
  })
  .get('/', (req, res, next) => {
    Films
      .find()
      .populate('studio')
      .select({ cast: false, reviews: false, __v: false })
      .then(film => res.send(film))
      .catch(next);
  })
  .patch('/:id', (req, res, next) => {
    Films
      .findByIdAndUpdate(req.params.id, req.body, { new: true })
      .populate('studio')
      .then(updatedFilm => res.send(updatedFilm))
      .catch(next);
  })
  .delete('/:id', (req, res, next) => {
    Films.findByIdAndDelete(req.params.id)
      .then(() => res.send({ deleted: 1 }))
      .catch(next);
  });

