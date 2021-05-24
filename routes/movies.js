const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Joi = require('joi');
const {Movie, validateMovie} = require('../models/movie');
const {Genre} = require('../models/genre');

//const Genre = mongoose.model('genre', genreSchema);
//const Movie = mongoose.model('movie', movieSchema);
  
// Organize by route REQUESTS
router.get('/', async (req, res) => {
    let movies = await Movie.find().sort('name');
    res.send(movies)
})

//POST REQUESTS
router.post('/', async (req, res) => {
 
    const { error } = validateMovie(req.body);
    if(error){
        console.log(error);
        return res.status(400).send(error.details[0].message);
    }

    const genre = await Genre.findById(req.body.genreId);
    if(!genre){
        return res.status(400).send('invalid genre');
    }

    const movie = new Movie({
        title: req.body.title,
        genre: {
            _id: genre._id,
            name: genre.name
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    });

    let result = await movie.save();
    res.send(result);
})

module.exports = router;