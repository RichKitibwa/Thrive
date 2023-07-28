const jwt = require('jsonwebtoken');

const authenticateUser = (req, res, next) => {
  const authHeader = req.header('Authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authorization token missing or invalid.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const secretKey = process.env.JWT_SECRET;
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token.' });
  }
};

module.exports = authenticateUser;
