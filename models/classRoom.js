const mongoose = require('mongoose');
const joi = require('joi');

const classRoomSchema = new mongoose.Schema({
    class: {
        type: String,
        required: true
    }
});

const ClassRoom = mongoose.model('ClassRoom', classRoomSchema);

function validateClassRoom(classRoom) {
    return true;
}

module.exports = { ClassRoom, validateClassRoom };