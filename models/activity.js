const mongoose = require('mongoose');
const joi = require('joi');

const activitySchema = new mongoose.Schema({
    aID: {
        type: String,
        required: true
    },
    activity: {
        type: String,
        enum: ['Issue', 'Return'],
        required: true
    },
    student: {
        type: Array
    },
    doneOn: {
        type: Date,
        default: Date.now
    }
});

const Activity = mongoose.model('Activity', activitySchema);

function validateActivity(activity) {
    return true;
}

module.exports = {  Activity , validateActivity };