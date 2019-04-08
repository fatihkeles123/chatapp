const mongoose = require('mongoose');
const DatabaseSchema = mongoose.Schema;

const schemaMessage = new DatabaseSchema({
    messageBody: {
        type: String,
        required: true
    },
    messageCreationDate: {
        type: Date,
        default: Date.now
    },
	creatorId: {
		type: String,
		required: true
	}
});

module.exports = mongoose.model('messages', schemaMessage);