const mongoose = require('mongoose');

const UsersSchema = mongoose.Schema({
    name: {
        type: String,
        require: true,
        trim: true,
    },
    email: {
        type: String,
        require: true,
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        require: true,
        trim: true,
    },
    registrationDate: {
        type: Date,
        default: Date.now(),
    },
});

module.exports = mongoose.model('User', UsersSchema);
