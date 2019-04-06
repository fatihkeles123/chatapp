const jwt = require('jsonwebtoken');


const generateToken = (userName) => {
		return jwt.sign({ userName }, process.env.SECRET_KEY, { expiresIn: '1h' });
}

module.exports = generateToken;