const mongoose = require('mongoose');
const DatabaseSchema = mongoose.Schema;

const schemaUser = new DatabaseSchema({
    userName: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    creationDate: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User MongoDB Schema', schemaUser);