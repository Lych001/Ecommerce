const jwt = require('jsonwebtoken');
const User = require('../models/users');

const checkRole = (role) => {
    return async (req, res, next) => {
        const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }

        try {
            const decoded = jwt.verify(token, 'your_jwt_secret');
            const user = await User.findById(decoded.sub);
            if (!user) {
                return res.status(401).json({ message: 'User not found' });
            }

            if (user.tipo_usuario !== role) {
                return res.status(403).json({ message: 'Access denied' });
            }

            req.user = user;
            next();
        } catch (err) {
            res.status(401).json({ message: 'Invalid token' });
        }
    };
};

const checkAnyRole = () => {
    return async (req, res, next) => {
        const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
        if (!token) {
            req.user = null; 
            return next();
        }

        try {
            const decoded = jwt.verify(token, 'your_jwt_secret');
            const user = await User.findById(decoded.sub);
            if (!user) {
                return res.status(401).json({ message: 'User not found' });
            }
            req.user = user; 
            next();
        } catch (err) {
            res.status(401).json({ message: 'Invalid token' });
        }
    };
};

module.exports = {checkRole , checkAnyRole};
