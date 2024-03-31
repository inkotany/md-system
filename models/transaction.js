const mongoose = require('mongoose');
const joi = require('joi');

const transactionSchema = new mongoose.Schema({
    tID: {
        type: String,
        required: true
    },
    activity: {
        type: String,
        enum: ['Kubitsa', 'Kubikuza'],
        required: true
    },
    student: {
        type: Array
    },
    agent: {
        type: String,
        required: true
    },
    doneOn: {
        type: Date,
        default: Date.now
    }
});

const Transaction = mongoose.model('Transaction', transactionSchema);

function validateTransaction(book) {
    return true;
}

module.exports = { Transaction , validateTransaction };