const { Router } = require('express');
const { HttpError } = require('../middleware/error');
const Studio = require('../models/Studio');
const Film = require('../models/Film');

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
      .then(foundStudio => {
        if(!foundStudio) {
          return next(new HttpError(404, `No Studio found with id: ${_id}`));
        }
        Film.find({ studio: foundStudio._id })
          .select('_id title')
          .then(() => {
            res.send(foundStudio);
          });
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
    Studio.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedStudio) => {
      if(err) return next(err);
      res.send(updatedStudio);
    });
  })
  .delete('/:id', (req, res, next) => {
    Studio.findByIdAndDelete(req.params.id)
      .then(() => res.send({ deleted: 1 }))
      .catch(next);
  });
