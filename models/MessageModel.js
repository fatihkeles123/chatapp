const mongoose = require('mongoose');
const DatabaseSchema = mongoose.Schema;

const schemaMessage = new DatabaseSchema({
    messageBody: {
        type: String,
        unique: true,
        required: true
    },
    messageCreationDate: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Message MongoDB Schema', schemaMessage);