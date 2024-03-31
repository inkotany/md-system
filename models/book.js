const mongoose = require('mongoose');
const joi = require('joi');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true,
        unique: true
    },
    author: {
        type: String,
        required: true
    },
    publisher: {
        type: String,
        required: true
    },
    date_aquired: {
        type: Date
    },
    status: {
        type: String,
        enum: ['Available', 'Issued', 'Missing']
    },
    theme: {
        type: String
    },
    isTorn: {
        type: Boolean
    }
});

const Book = mongoose.model('Book', bookSchema);

function validateBook(book) {
    return true;
}

module.exports = { Book, validateBook };