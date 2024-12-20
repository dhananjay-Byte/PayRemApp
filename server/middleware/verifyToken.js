const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Get token from Authorization header

  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  try {
    const secret = process.env.jwt_secret_key
    const decoded = jwt.verify(token, secret);
    req.user = decoded; // Attach the decoded user data to the request object
    next(); // Continue to the next middleware/route handler
  } catch (error) {
    return res.status(403).json({ error: 'Invalid token.' });
  }
};

module.exports = verifyToken;
