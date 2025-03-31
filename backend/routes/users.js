// backend/routes/users.js
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const getTenantConnection = require('../db/tenantConnection');

// Autentifikatsiya middleware (JWT tekshirish)
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ message: 'Token talab qilinadi' });
  try {
    const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token yaroqsiz' });
  }
};

router.use(authMiddleware);

// Dinamik user modelini yaratish
const getUserModel = (connection) => {
  const userSchema = new connection.Schema({
    username: String,
    password: String,
  });
  return connection.model('User', userSchema);
};

router.get('/', async (req, res) => {
  const shop = req.user.shop;
  const connection = getTenantConnection(shop);
  const User = getUserModel(connection);
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Xatolik', error: err });
  }
});

router.post('/', async (req, res) => {
  const shop = req.user.shop;
  const connection = getTenantConnection(shop);
  const User = getUserModel(connection);
  const newUser = new User(req.body);
  try {
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ message: 'Xatolik', error: err });
  }
});

router.get('/:id', async (req, res) => {
  const shop = req.user.shop;
  const connection = getTenantConnection(shop);
  const User = getUserModel(connection);
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'Foydalanuvchi topilmadi' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Xatolik', error: err });
  }
});

router.put('/:id', async (req, res) => {
  const shop = req.user.shop;
  const connection = getTenantConnection(shop);
  const User = getUserModel(connection);
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!user) return res.status(404).json({ message: 'Foydalanuvchi topilmadi' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Xatolik', error: err });
  }
});

router.delete('/:id', async (req, res) => {
  const shop = req.user.shop;
  const connection = getTenantConnection(shop);
  const User = getUserModel(connection);
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: 'Foydalanuvchi topilmadi' });
    res.json({ message: 'Foydalanuvchi o\'chirildi' });
  } catch (err) {
    res.status(500).json({ message: 'Xatolik', error: err });
  }
});

module.exports = router;
