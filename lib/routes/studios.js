const { Router } = require('express');
const Studio = require('../models/Studio');
// const Film = require('../models/Film');

module.exports = Router()
  .get('/', (req, res, next) => {
    Studio 
      .find()
      .then(studios => res.send(
        studios.map(studio => ({ _id: studio._id, name: studio.name }))
      ))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    const id = req.params.id;
    Studio 
      .findById(id)
      .then(studio => res.send({
        _id: studio._id,
        name: studio.name,
        address: studio.address
      }))
      .catch(next);
  });
