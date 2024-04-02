const mongoose = require('mongoose');
const Joi = require('joi');

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
        
    },
    doneOn: {
        type: Date,
        default: Date.now
    }
});

const Activity = mongoose.model('Activity', activitySchema);

function validateActivity(activity) {
    let schema = Joi.object({
        activity: Joi.string().required()
    });
    return schema.validate(activity);
}

module.exports = {  Activity , validateActivity };