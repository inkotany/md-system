const mongoose = require('mongoose');
const Joi = require('joi');

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

function validateTransaction(transaction) {
    let schema = Joi.object({
        activity: Joi.required(),
        doneOn: Joi.required(),
        agent: Joi.required()
    });
    return schema.validate(transaction);
}

module.exports = { Transaction , validateTransaction };