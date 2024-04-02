const mongoose = require('mongoose');
const express = require('express');
const { Student, validateStudent } = require('../models/student');

const router = express.Router();

router.get('/', async (req, res) => {
    const students = await Student.find().sort('classRoom');
    res.send(students);
});

router.get('/:code', async (req, res) => {
    const student = await Student.findOne({code: req.params.code});
    if (!student) return res.status(404).send('Student not found!');

    res.send(student);
});

router.get('/byClass/:class', async (req, res) => {
    let students = await Student.find({classRoom: req.params.class}).sort('names');
    if (students.length == 0) return res.status(404).send('Nta munyeshuri dufite muri ' + req.params.class);

    res.send(students);
})

router.post('/', async (req, res) => {
    const { error } = validateStudent(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let student = new Student({
        names: req.body.names,
        code: req.body.code,
        combination: req.body.combination,
        gender: req.body.gender,
        classRoom: req.body.classRoom
    });

    student = await student.save();

    res.send(student);
});


module.exports = router;