const jwt = require('jsonwebtoken');
const TokenBlacklist = require('../models/TokenBlacklist');

exports.authenticate = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ status: 'error', message: 'Authentication token required' });
    }

    try {
        // Check token in blacklist
        const isBlacklisted = await TokenBlacklist.findOne({ token });
        if (isBlacklisted) {
            return res.status(401).json({ status: 'error', message: 'Token is blacklisted' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ status: 'error', message: 'Invalid or expired token' });
    }
};

exports.authorize = (roles) => (req, res, next) => {
    if (!roles.includes(req.user.role)) {
        return res.status(403).json({ status: 'error', message: 'Forbidden: Access is denied' });
    }
    next();
};