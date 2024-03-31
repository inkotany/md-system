const mongoose = require('mongoose');
const joi = require('joi');

const bedSchema = new mongoose.Schema({
    bID: {
        type: String,
        required: true
    },
    type: {
        type: Number,
        required: true
    },
    verified: {
        type: Boolean,
        default: false
    }
});

const Bed = mongoose.model('Bed', bedSchema);

function validateBed(bed) {
    return true;
}

module.exports = { Bed, validateBed };