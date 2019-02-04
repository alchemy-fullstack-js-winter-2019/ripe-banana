const { Router } = require('express');
const Film = require('../models/Film');

module.exports = Router()

  .post('/', (req, res, next) => {
    const { name, address } = req.body;
    Film
      .create({
        name, 
        address
      })
      .then(film => res.send(film))
      .catch(next);
  })
  .get('/', (re, res, next) => {
    Film
      .find()
      .select('-__v -address')
      .then(films => res.send(films))
      .catch(next);  
  })
  .get('/:id', (req, res, next) => {
    Film
      .findById(req.params.id)
      .then(studio => res.send(studio))
      .catch(next);
  })
  .delete('/:id', (req, res, next) => {
    Film
      .findByIdAndDelete(req.params.id)
      .then(() => res.send({ deleted: true }))
      .catch(next);
  });


