const mongoose = require('mongoose');
const DatabaseSchema = mongoose.Schema;

const schemaUser = new DatabaseSchema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    creationdate: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User MongoDB Schema', schemaUser);