const mongoose = require('mongoose');
const { Theme, validateTheme} = require('../../models/theme');
const express = require('express');
// const { Book } = require('../../models/book');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const themes = await Theme.find().sort('theme');
        res.status(200).send(themes);
    } catch (error) {
        res.status(500).send('Internal server error');
    }
});

router.get('/:theme', async (req, res) => {
    try {
        const theme = await Theme.findOne({theme: req.params.theme});

        if (!theme) return res.status(404).send(`'${req.params.theme}' not found!`);
        res.status(200).send(theme);
    } catch (error) {
        res.status(500).send('Internal server error');
    }
});

router.post('/', async (req, res) => {
    const { error } = validateTheme(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let theme = new Theme({
        theme: req.body.theme
    });

    theme = await theme.save();

    res.status(202).send(theme);
});

router.put('/:theme', async (req, res) => {
    const { error } = validateTheme(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let theme = await Theme.findOneAndUpdate({theme: req.params.theme}, {
        theme: req.body.theme
    }, {new: true});

    if (!theme) return res.status(404).send('Oops! Theme not found');

    res.send('Theme updated successfully!');
});

router.delete('/:theme', async (req, res) => {
    const theme = Theme.findOneAndDelete({code: req.params.theme});

    if (!theme) return res.status(404).send('Theme with given name not found!');

    res.send(theme);
});

module.exports = router;