const Joi = require('joi');
const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 50
    },
    email: {
        type: String,
        required: true,
        minLength: 4,
        maxLength: 255,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength: 4,
        maxLength: 1024
    }
});

const User = mongoose.model('User', userSchema);

const validateUser = (user) => {
    // Define schema to validate
    const schema = Joi.object({
        name: Joi.string().min(3).max(50).required(),
        email: Joi.string().min(4).max(255).required().email(),
        password: Joi.string().min(6).max(255).required()

    });
    
    return schema.validate(user);
}

module.exports.userSchema = userSchema;
module.exports.User = User;
module.exports.validateUser = validateUser;