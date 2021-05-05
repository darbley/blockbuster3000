const express = require('express');
const router = express.Router();

const genres = [
    { id: 1, name: 'Action' },  
    { id: 2, name: 'Horror' },  
    { id: 3, name: 'Romance' },  
  ];

  
// GET REQUESTS
router.get('/', (req, res) => {
    //res.send("Hello W")
    res.render('index', { title: 'Genres page', message: 'Pug message text'})
})

router.get('/:id', (req, res) => {
    let genre = genres.find((genre) => {
        let paramId = parseInt(req.params.id);
        return genre.id === paramId
    })
    if(!genre){
        return res.status(404).send('the course id was not found')
    }
    res.send(genre);
})


module.exports = router;