const { Router } = require('express');
const Film = require('../models/Film');

module.exports = Router()

    .post('/', (req, res, next) => {
        // const { title, studio, released, cast, cast.actor } = req.body

        console.log(req, res, next);
        Film.create({
            // title: req.body.title,
            // studio: req.body.studio,

        });
    });