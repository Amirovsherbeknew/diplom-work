// backend/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

const authMiddleware = (requiredRole) => {
  return (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) return res.status(401).json({ message: 'Token talab qilinadi' });
    try {
      const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);
      req.user = decoded;
      // Agar kerak bo'lsa, rolni tekshiramiz
      if (requiredRole && req.user.role !== requiredRole) {
        return res.status(403).json({ message: `Faqat ${requiredRole} roli uchun ruxsat berilgan` });
      }
      next();
    } catch (err) {
      res.status(401).json({ message: 'Token yaroqsiz' });
    }
  };
};

module.exports = authMiddleware;
