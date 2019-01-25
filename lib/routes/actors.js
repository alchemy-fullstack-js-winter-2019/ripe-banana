const { Router } = require('express');
const Actor = require('../models/Actor');
const { HttpError } = require('../middleware/error');

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
      .then(actors => res.send(actors))
      .catch(next);
  })
  .get('/:id', (req, res, next) => {
    const _id = req.params.id;
    Actor
      .findById(_id)
      .then(foundActor => {
        if(!foundActor) {
          return next(new HttpError(404, `No actor found with ${_id}`));
        }
        res.send(foundActor);
      })
      .catch(next);
  });


