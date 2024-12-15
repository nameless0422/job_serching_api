const jwt = require('jsonwebtoken');
const TokenBlacklist = require('../models/TokenBlacklist');

/**
 * Middleware to authenticate users using JWT and blacklist verification
 */
exports.authenticate = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            console.log('Token not found in headers');
            return res.status(401).json({ status: 'error', message: 'Authentication token required' });
        }

        const isBlacklisted = await TokenBlacklist.findOne({ token });
        if (isBlacklisted) {
            console.log('Token is blacklisted');
            return res.status(401).json({ status: 'error', message: 'Token is blacklisted' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Decoded payload:', decoded); // 디버깅
        req.user = decoded;

        next();
    } catch (err) {
        console.error('JWT verification error:', err.message); // 디버깅
        return res.status(401).json({ status: 'error', message: 'Invalid or expired token' });
    }
};


/**
 * Middleware to authorize users based on their roles
 * @param {string[]} roles - Array of roles allowed to access the route
 */
exports.authorize = (roles) => (req, res, next) => {
    try {
        if (!req.user) {
            return res.status(401).json({ status: 'error', message: 'Authentication required' });
        }

        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ status: 'error', message: 'Forbidden: Access is denied' });
        }

        next(); // User has required role, proceed
    } catch (err) {
        return res.status(403).json({ status: 'error', message: 'Unauthorized access' });
    }
};

/**
 * Middleware to log out a user by blacklisting their token
 */
exports.logout = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(400).json({ status: 'error', message: 'Token is required for logout' });
        }

        // Add the token to the blacklist
        await TokenBlacklist.create({ token });
        res.status(200).json({ status: 'success', message: 'Logged out successfully' });
    } catch (err) {
        res.status(500).json({ status: 'error', message: 'Failed to log out' });
    }
};
