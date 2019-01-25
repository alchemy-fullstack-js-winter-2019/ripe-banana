const { Router } = require('express');
const Actor = require('../models/Actor');

module.exports = Router()
  .post('/', (req, res, next) => {
    const { name, dob, pob } = req.body;
    Actor
      .create({ name, dob, pob })
      .then(actor => res.send(actor))
      .catch(next);
  })

  .put('/:id', (req, res, next) => {
    Actor
      .findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then(updatedActor => {
        res.send(updatedActor);
      })
      .catch(next);
  })
  .get('/', (req, res, next) => {
    Actor
      .find()
      .select({ 'dob' : false, 'pob' : false })
      .then(listOfActors => {
        res.send(listOfActors);
      })
      .catch(next);
  })
  .get('/:id', (req, res, next) => {
    Actor
      .findById(req.params.id)
      .then(foundActor => {
        res.send(foundActor);
      })
      .catch(next);
  })
  .delete('/:id', (req, res, next) => {
    Actor.findByIdAndDelete(req.params.id)
      .then(() => {
        res.send({ deleted: 1 });
      })
      .catch(next);
  });  
