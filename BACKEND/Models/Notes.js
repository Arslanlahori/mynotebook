const mongoose = require('mongoose');
const { Schema } = mongoose;
const NotesSchema = new Schema({
    Title: {
        type: string,
        require: true
    },
    Description: {
        type: string,
        require: true,

    },
    Tag: {
        type: string,
        default: 'General'

    },
    Date: {
        type: Date,
        Default: Date.now
    }
});

module.exports = mongoose.model('Notes', NotesSchema);