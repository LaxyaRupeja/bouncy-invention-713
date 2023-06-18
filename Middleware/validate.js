const jwt = require('jsonwebtoken');
const { UserModel } = require('../Models/user.model');
require('dotenv').config();
function validateToken(req, res, next) {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    jwt.verify(token, process.env.jwtsecret, async (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token' });
        }
        const user = await UserModel.findById(decoded.userId);
        req.user = user;
        next();
    });
}

module.exports = {
    validateToken
}