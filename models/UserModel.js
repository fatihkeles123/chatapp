const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
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

schemaUser.pre('save', function(next){
    if(!this.isModified('password')){
		return next()
	}
    bcrypt.hash(this.password, 10)
        .then(hash => {
            // Store hash in your password DB.
            this.password = hash;
            next();
        })
        .catch(e => e);
});

module.exports = mongoose.model('users', schemaUser);