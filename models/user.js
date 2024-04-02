const mongoose = require('mongoose');
const Joi = require('joi');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    names: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
});

const User = mongoose.model('User', userSchema);

function validateUser(user) {
    let schema = Joi.object({
        username: Joi.string().min(3).required(),
        email: Joi.email().required(),
        names: Joi.string().required(),
        phone: Joi.string().required(),
        password: Joi.string().required()
    })
}

module.exports = { User, validateUser };