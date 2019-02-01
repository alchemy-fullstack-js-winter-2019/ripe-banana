const { Router } = require('express');
const Studio = require('../models/Studio');
const Film = require('../models/Film');

module.exports = Router()
  .get('/', (req, res, next) => {
    Studio 
      .find()
      .lean()
      .then(studios => res.send(studios))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    const id = req.params.id;
    let studio = null;
    Studio 
      .findById(id)
      .lean()
      .then(foundStudio => {
        studio = foundStudio;
        return Film
          .find({ studio: foundStudio._id });
      })
      .then(foundFilms => {
        const films = foundFilms.map(film => ({ _id: film._id, title: film.title }));
        studio.films = films;
        res.send(studio);
      })
      .catch(next);
  });
