const mongoose = require('mongoose');
const joi = require('joi');

const studentSchema = new mongoose.Schema({
    names: {
        type: String,
        required: true
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
    return true;
}

module.exports = { Student, validateStudent };