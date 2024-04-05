const mongoose = require('mongoose');
const express = require('express');
const { Book, validateBook, validateMany} = require('../../models/book');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const books = await Book.find().sort('name');
        res.status(200).send(books);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.get('/number', async (req, res) => {
    let count = await Book.estimatedDocumentCount();
    res.json(count);
});

router.get('/search', async (req, res) => {
    try {
        const book = await Book.findOne({code: req.query.code});

        if (!book) return res.status(404).send('The book with given code is not found!');

        res.status(200).send(book);

    } catch (error) {
        res.status(500).send(error);
    }
});

router.get('/issued/books', async (req, res) => {
    const books = await Book.find({status: 'Issued'}).sort('date_aquired');
    res.status(200).send(books);
});

router.get('/availability', async (req, res) => {
    try {
        const book = await Book.findOne({status: 'Available', code: req.query.code});

        if (!book) return res.status(404).send('Book not found or issued');

        res.status(200).send(book);
        
    } catch (error) {
        res.status(500).send(error);
    }
});

router.post('/', async (req, res) => {
    const { error } = validateBook(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let check = await Book.findOne({code: req.body.code});
    if (check) return res.status(400).send('Igitabo gifite iyi code gisanzwe gihari!');

    let book = new Book({
        title: req.body.title,
        code: req.body.code,
        author: req.body.author,
        publisher: req.body.publisher,
        date_aquired: req.body.date_aquired,
        theme: req.body.theme
    });

    book = await book.save();

    res.send(book);
});

router.post('/addMany', async (req, res) => {
    const { error } = validateMany(req.body);

    if (error) return res.status(400).send(error.details[0].message);

    const from = Number(req.body.from);
    const to = Number(req.body.to);
    const backCode = req.body.backCode;

    for (from; from <= to; from++) {
        let code = {code: from + '/' + backCode };
        
        let check = await Book.findOne({code: code});
        if (check) continue;

        let book = new Book({...req.body, ...code});
        await book.save();
    }

    res.status(200).send(to + ' Books successfully added!');

});

router.delete('/:code', async (req, res) => {
    const book = Book.findOneAndDelete({code: req.params.code});

    if (!book) return res.status(404).send('Book with given code not found!');

    res.send(book);
});

module.exports = router;