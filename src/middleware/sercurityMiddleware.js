const xss = require('xss-clean');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

// XSS Protection
exports.xssProtection = xss();

// Secure Headers
exports.secureHeaders = helmet();

// Rate Limiting
exports.rateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15분
    max: 100, // ip당 100개 리미트
    message: { status: 'error', message: 'Too many requests. Please try again later.' },
});
