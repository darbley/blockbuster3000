const Joi = require('joi');
const mongoose = require('mongoose');

const genreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 50
    }
});

const Genre = mongoose.model('Genre',  genreSchema);

const validateGenre = (genre) => {
    // Required
    // Min 3 Chars
    // String type
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });
    
    return schema.validate(genre);
}

module.exports.Genre = Genre; 
module.exports.genreSchema = genreSchema; 
module.exports.validateGenre = validateGenre; 