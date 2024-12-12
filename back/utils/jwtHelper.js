const jwt = require('jsonwebtoken');
const secretKey = 'supersecret';

exports.generateToken = (payload) => {
    return jwt.sign(payload, secretKey, { expiresIn: '1h' });
};

exports.verifyToken = (token) => {
    return jwt.verify(token, secretKey);
};
