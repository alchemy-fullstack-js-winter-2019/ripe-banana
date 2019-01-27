const { Router } = require('express');
const Studio = require('../models/Studio');

module.exports = Router()
  .get('/', (req, res, next) => {
    Studio 
      .find()
      .then(studios => res.send(
        studios.map(studio => ({ _id: studio._id, name: studio.name }))
      ))
      .catch(next);
  });
