const mongoose = require('mongoose');
const Joi = require('joi');

const studentSchema = new mongoose.Schema({
    names: {
        type: String,
        required: true,
        trim: true
    },
    gender: {
        type: String,
        required: true,
        enum: ['M', 'F']
    },
    classRoom: {
        type: String,
        required: true
    },
    balance: {
        type: Number,
        default: 0
    },
    password: {
        type: String
    },
    bed: {
        type: String
    }
});

const Student = mongoose.model('Student', studentSchema);

function validateStudent(student) {
    let schema = Joi.object({
        names: Joi.string().required().min(3),
        gender: Joi.string().required().max(1).min(1),
        classRoom: Joi.required()
    });
    return schema.validate(student);
}

module.exports = { Student, validateStudent };