const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const { Student } = require('../models/student');

router.post('/addPassword', async (req, res) => {
    let codeCheck = await Student.findOne({code: req.body.code});
    if (!codeCheck) return res.status(404).send('Student not found!');

    // Encrypt the password
    let password = 123;

    let student = await Student.updateOne({code: req.body.code}, {password: password});
    if (!student) return res.status(500).send('Update failed');
    res.send('Password successfully set!');
});


module.exports = router;