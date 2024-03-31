const mongoose = require('mongoose');
const joi = require('joi');

const themeSchema = new mongoose.Schema({
    theme: {
        type: String,
        required: true
    }
});

const Theme = mongoose.model('Theme', themeSchema);

function validateTheme(theme) {
    return true;
}

module.exports = { Theme, validateTheme };