const jwt = require('jsonwebtoken');

const signToken = (payload) => jwt.sign(payload, process.env.JWT_SECRET || 'dev-secret', { expiresIn: '1d' });

module.exports = { signToken };
