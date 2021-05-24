const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Joi = require('joi');
const {Genre, validateGenre} = require('../models/genre');

  
// Organize by route REQUESTS
router.get('/', async (req, res) => {
    let genres = await Genre.find().sort('name');
    res.send(genres)
})

// POST REQUESTS
router.post('/', async (req, res) => {
 
    const { error } = validateGenre(req.body);
    if(error){
        console.log(error);
        return res.status(400).send(error.details[0].message);
    }

    const genre = new Genre({
        name: req.body.name
    });

    let result = await genre.save();
    res.send(result);
})

router.get('/:id', async (req, res) => {
    const genre = await Genre.findById(req.params.id)

    if(!genre){
        return res.status(404).send('the film genre id was not found')
    }
    res.send(genre);
})

// UPDATE - PUT REQUESTS
router.put('/:id', async (req, res) => {

    // Validate Request Params
    const { error } = validateGenre(req.body);
    if(error){
        console.log(error);
        return res.status(400).send(error.details[0].message);
    }
   
    // Get the Genre
    let genre = await Genre.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true })

    // If not existing, return 404 not found
    if(!genre){
        return res.status(404).send('the film genre id was not found')
    }

    res.send(genre);

})

// DELETE
router.delete('/:id', async (req, res) => {

    // Find the Genre by ID
    const genre = await Genre.findByIdAndRemove(req.params.id)
    
    // If not existing, return 404 not found
    if(!genre){
        return res.status(404).send('the film genre id was not found ');
    }
    console.log('film genre found',genre)
    // DELETE
    res.send(`deleted ${genre}`)
})

module.exports = router;