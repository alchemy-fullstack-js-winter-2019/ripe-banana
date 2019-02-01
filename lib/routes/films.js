const { Router } = require('express');
const Film = require('../models/Film');

module.exports = Router()
  .get('/', (req, res, next) => {
    Film 
      .find()
      .lean()
      .then(films => res.send(films))
      .catch(next);
  });
