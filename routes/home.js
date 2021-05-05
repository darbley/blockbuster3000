const express = require('express');
const router = express.Router();

// GET REQUESTS
router.get('/', (req, res) => {
    //res.send("Hello W")
    res.render('index', { title: 'Home Page', message: 'Home message text'})
})

module.exports = router;