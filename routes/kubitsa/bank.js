const mongoose = require('mongoose');
const express = require('express');
const { User } = require('../../models/user');
const { Student } = require('../../models/student');
const { Transaction } = require('../../models/transaction');
const Joi = require('joi');

const router = express.Router();

function validate(body) {
    let schema = Joi.object({
        code: Joi.string().required(),
        amount: Joi.number().required()
    });

    return schema.validate(body);
}

router.get('/transactions', async (req, res) => {
    let transactions = await Transaction.find().sort('date_aquired');
    if (transactions.length === 0) return res.status(404).send('No transactions yet');
    res.send(transactions).status(200);
});

router.get('/archived', async (req, res) => {
    let archived = await Transaction.find({archived: true});
    if (archived.length === 0) return res.status(404).send('No archives');
    res.send(archived).status(200);
});

router.get('/transactions/:user', async (req, res) => {
    let transactions = await Transaction.find({agent: req.params.user});
    if (transactions.length === 0) return res.send('No transaction yet!').status(404);
    res.status(200).send(transactions);
});

router.post('/deposit', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let student = await Student.findOne({code: req.body.code});
    if (!student) return res.status(404).send('Student not found');

    let newBalance = Number(student.balance) + Number(req.body.amount);
    let transaction = new Transaction({
        tID: 'uuid',
        activity: 'Kubitsa',
        amount: Number(req.body.amount),
        student: {
            names: student.names,
            classRoom: student.classRoom,
            code: student.code
        },
        agent: 'User'
    });

    // Update student's balance

    

});

module.exports = router;