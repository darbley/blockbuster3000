const mongoose = require('mongoose');
const express = require('express');
const Joi = require('joi');
// Routes / Controllers
const homeRoute = require('./routes/home');
const genresRoutes = require('./routes/genres');
const customerRoutes = require('./routes/customers');
// App
const app = express();

mongoose.connect('mongodb://localhost/filmstore', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(respose => {
        console.log('connected');
    })
    .catch(error => {
        console.log('error ',error);
    })



// Use Pug Templating
app.set('view engine', 'pug');
app.set('views', './views');// default

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Route/Controllers
app.use('/', homeRoute);
app.use('/api/genres', genresRoutes);
app.use('/api/customers', customerRoutes);

const success = (port) => {
    console.log(`listening on post ${port}`);
}
// PORT 
const port = process.env.PORT || 3000;
app.listen(port, success(port));