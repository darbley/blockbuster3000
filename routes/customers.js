const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Joi = require('joi');


const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 50
    },
    phone : {
        type: String,
        required: true,
        minLength: 7
    },
    isGold: {
        type: Boolean,
        default: false
    }
});

const Customer = mongoose.model('customer', customerSchema);
const validateGenre = (obj) => {
    // Required
    // Min 3 Chars
    // String type
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });
    
    return schema.validate(obj);
}

const validateCustomer = (customer) => {
    // Define schema to validate
    const schema = Joi.object({
        name: Joi.string().min(3).max(50).required(),
        phone: Joi.string().min(7).required(),
        isGold: Joi.boolean()

    });
    
    return schema.validate(customer);
}

// Organize by route REQUESTS
router.get('/', async (req, res) => {
    let customers = await Customer.find().sort('name');
    res.send(customers)
})

// POST REQUESTS
router.post('/', async (req, res) => {
 
    const { error } = validateCustomer(req.body);
    if(error){
        console.log(error);
        return res.status(400).send(error.details[0].message);
    }

    const customer = new Customer({
        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGold
    });

    let result = await customer.save();
    res.send(result);
})

router.get('/:id', async (req, res) => {
    const customer = await Customer.findById(req.params.id)

    if(!customer){
        return res.status(404).send('the customer id was not found')
    }
    res.send(customer);
})

// UPDATE - PUT REQUESTS
router.put('/:id', async (req, res) => {

    // Validate Request Params
    const { error } = validateCustomer(req.body);
    if(error){
        console.log(error);
        return res.status(400).send(error.details[0].message);
    }
   
    // Get the Customer
    let customer = await Customer.findByIdAndUpdate(req.params.id, 
        { 
            name: req.body.name,
            phone: req.body.phone,
            isGold: req.body.isGold 
        }, { new: true });

    // If not existing, return 404 not found
    if(!customer){
        return res.status(404).send('the customer id was not found')
    }

    res.send(customer);

})

// DELETE
router.delete('/:id', async (req, res) => {

    // Find the Customer by ID
    const customer = await Customer.findByIdAndRemove(req.params.id)
    
    // If not existing, return 404 not found
    if(!customer){
        return res.status(404).send('the customer id was not found ');
    }
    console.log('customer found',customer)
    // DELETE
    res.send(`deleted ${customer}`)
})

module.exports = router;