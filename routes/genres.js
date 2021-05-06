const express = require('express');
const router = express.Router();
const Joi = require('joi');

const genres = [
    { id: 1, name: 'Action' },  
    { id: 2, name: 'Horror' },  
    { id: 3, name: 'Romance' },  
  ];

  
// GET REQUESTS
router.get('/', (req, res) => {
    res.send(genres)
})


router.get('/:id', (req, res) => {
    let genre = genres.find((genre) => {
        let paramId = parseInt(req.params.id);
        return genre.id === paramId
    })
    if(!genre){
        return res.status(404).send('the film genre id was not found')
    }
    res.send(genre);
})

// POST REQUESTS
router.post('/', (req, res) => {
 
    const { error } = validateGenre(req.body);
    if(error){
        console.log(error);
        return res.status(400).send(error.details[0].message);
    }

    const genre = {
        id: genres.length + 1,
        name: req.body.name
    }
    genres.push(genre);
    res.send(genre);
})

const validateGenre = (obj) => {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });
    
    return schema.validate(obj);
}

// UPDATE - PUT REQUESTS
router.put('/:id', (req, res) => {
    // Look up the course
    let genre = genres.find((genre) => {
        let paramId = parseInt(req.params.id);
        return genre.id === paramId
    })
    // If not existing, return 404 not found
    if(!genre){
        return res.status(404).send('the film genre id was not found')
    }

    // Validate 
    // IF invalid, return 400,- Bad request
    
    const { error } = validateGenre(req.body);
    if(error){
        console.log(error);
        return res.status(400).send(error.details[0].message);
    }
   
    // Update the course
    // Return the updated course
    genre.name = req.body.name;
    res.send(genre);

})

// DELETE
router.delete('/:id', (req, res) => {
    // Look up the course
    let genre = genres.find((genre) => {
        let paramId = parseInt(req.params.id);
        return genre.id === paramId
    })
    // If not existing, return 404 not found
    if(!genre){
        return res.status(404).send('the film genre id was not found ');
    }
    console.log('film genre found',genre)
    // DELETE
    const index = genres.indexOf(genre);
    genres.splice(index, 1);
    console.log('genre found: ',index)
    res.send(`deleted ${genre}`)
})



module.exports = router;