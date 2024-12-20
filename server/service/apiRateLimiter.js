const rateLimit = require('express-rate-limit')

const loginLimiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 15 minutes
    max: 100,
    message: {
        status: 429,
        error: 'Too many login attempts. Please try again after 15 minutes.',
    },
    headers: true, 
});

module.exports = loginLimiter;