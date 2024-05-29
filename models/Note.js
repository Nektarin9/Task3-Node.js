const mongoose = require('mongoose');
const validator = require('validator');
const NoteSchema = mongoose.Schema({
    personName: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: validator.isMobilePhone,
            message: 'Invalid phone'
        }
    },
    description: {
        type: String,
        
    },
    date: {
        type: String,
        required: true
    }
});

const Note = mongoose.model('Note', NoteSchema)

module.exports = Note;