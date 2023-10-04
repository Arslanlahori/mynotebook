const mongoose = require('mongoose');
const { Schema } = mongoose;
const NotesSchema = new Schema({

    //USER model link connection
    User: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
        //user model se liya hy means reference

    },
    Title: {
        type: String,
        require: true
    },
    Description: {
        type: String,
        require: true,

    },
    Tag: {
        type: String,
        default: 'General'

    },
    Date: {
        type: Date,
        default: Date.now
    }
});

// const NOTES = mongoose.model('NOTES', NotesSchema);
// NOTES.createIndexes();
module.exports = mongoose.model('NOTES', NotesSchema);