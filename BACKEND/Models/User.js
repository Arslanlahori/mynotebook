const mongoose = require('mongoose');
const { Schema } = mongoose;
const UserSchema = new Schema({
    Name: {
        type: String,
        require: true
    },
    Email: {
        type: String,
        require: true,
        unique: true
    },
    Password: {
        type: String,
        require: true
    },
    Date: {
        type: Date,
        Default: Date.now
    }
});
const User = mongoose.model('User', UserSchema);
User.createIndexes();
module.exports = User;