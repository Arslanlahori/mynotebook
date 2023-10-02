const mongoose = require('mongoose');

const UserSchema = new Schema({
    Name: {
        type: string,
        require: true
    },
    Email: {
        type: string,
        require: true,
        unique: true
    },
    Password: {
        type: string,
        require: true
    },
    Date: {
        type: Date,
        Default: Date.now
    }
});

module.exports = mongoose.model('User', UserSchema);