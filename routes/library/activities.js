const Joi = require('joi');
// const { v4 } = require('uuid');
const mongoose = require('mongoose');
const express = require('express');
const { Book } = require('../../models/book');
const { Student } = require('../../models/student');
const { Activity } = require('../../models/activity');

const router = express.Router();

router.post('/issue', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let book = await Book.findOne({code: req.body.book, status: 'Available'});
    if (!book) return res.status(404).send('Book not found or issued!');

    let student = await Student.findOne({code: req.body.student});
    if (!student) return res.status(404).send('Student not found!');

    let activity = new Activity({
        aID: v4(),
        activity: 'Issue',
        student: {
            names: student.names,
            classRoom: student.classRoom,
            code: student.code,
            gender: student.gender
        },
        book: {
            title: book.title,
            code: book.code,
            theme: book.theme
        }
    });

    book = await Book.findOneAndUpdate({code: req.body.code}, { $set: {status: 'Issued'}});
    if (!book) return res.send('Operation failed!');

    await activity.save();
    res.status(200).send(`${student.names} atijwe igitabo ${book.title}`);
});

function validate(body) {
    let schema = Joi.object({
        book: Joi.string().required(),
        student: Joi.string().required()
    });
    return schema.validate(body);
}

module.exports = router;