const mongoose = require('mongoose');
const express = require('express');
const { ClassRoom } = require('../models/classRoom');
const { Student, validateStudent } = require('../models/student');
const { generateStudentCode } = require('../algo/generateCode');

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

    let checkClass = await ClassRoom.findOne({class: req.body.classRoom});
    if (!checkClass) return res.status(404).send(`Class mwanditsemo: ${req.body.classRoom} ntiba muri system, mubanze muyongeremo.`);

    let student = new Student({
        names: req.body.names,
        code: generateStudentCode(),
        combination: req.body.combination,
        gender: req.body.gender,
        classRoom: req.body.classRoom
    });

    student = await student.save();

    res.send(student);
});

router.put('/:code', async (req, res) => {
    const { error } = validateStudent(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let student = await Student.findOneAndUpdate({code: req.params.code}, {
        names: req.body.names,
        combination: req.body.combination,
        gender: req.body.gender,
        classRoom: req.body.classRoom
    }, {new: true});

    if (!student) return res.status(404).send(`Umunyeshuri ufite code: ${req.params.code} ntabonetse`);
    res.send('Update Success!');
});

router.delete('/:code', async (req, res) => {
    const student = Student.findOneAndDelete({code: req.params.code});
    if (!student) return res.status(404).send('Student not found');
    res.send(student);
});


module.exports = router;