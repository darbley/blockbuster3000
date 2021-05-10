const Joi = require('joi');
const mongoose = require('mongoose');

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

const validateCustomer = (customer) => {
    // Define schema to validate
    const schema = Joi.object({
        name: Joi.string().min(3).max(50).required(),
        phone: Joi.string().min(7).required(),
        isGold: Joi.boolean()

    });
    
    return schema.validate(customer);
}

exports.customerSchema = customerSchema;
exports.validateCustomer = validateCustomer;
//module.exports.valida = validateCus;
