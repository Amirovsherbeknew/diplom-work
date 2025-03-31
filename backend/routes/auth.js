// backend/routes/auth.js
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const authMiddleware = require('../middleware/authMiddleware'); // JWT middleware
const hashPassword = require('../utils/hashPassword');
const JWT_SECRET = process.env.JWT_SECRET;
const User = require('../models/User')

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Foydalanuvchi ro'yxatdan o'tishi (faqat superadmin orqali)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: user1
 *               password:
 *                 type: string
 *                 example: password123
 *               shop:
 *                 type: string
 *                 example: yunusobod
 *     responses:
 *       201:
 *         description: Foydalanuvchi yaratildi
 */
router.post('/register', authMiddleware('superadmin'), async (req, res) => {
  const { username, password, shop } = req.body;
  const users = await User.find({ shop }); // Avval shop bo‘yicha filtrlanadi
  const filteredUsers = users.filter(user => user.username === username)
  console.log(filteredUsers)
  // Hamma registratsiya uchun role avtomatik 'user' bo'ladi
  const role = 'user'; 
  
  if (!username || !password || !shop) {
    return res.status(400).json({ message: 'username, password va shop talab qilinadi' });
  }
  if (filteredUsers.length > 0) {
    return res.status(400).json({ message: 'Bunaqa foydalanuvchi tizimda mavjud' });
  }
  try {
    const hashedPassword = await hashPassword(password);
    // va keyin 
    const newUser = new User({id:{type:Number,required:true,unique:true}, username, password: hashedPassword, shop, role });
    // const newUser = new User({ username, password, shop, role });
    await newUser.save();
    res.status(201).json({ message: 'Foydalanuvchi yaratildi' });
  } catch (err) {
    res.status(500).json({ message: 'Xatolik', error: err });
  }
});

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Foydalanuvchi tizimga kirishi
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: user1
 *               password:
 *                 type: string
 *                 example: password123
 *               shop:
 *                 type: string
 *                 example: yunusobod
 *     responses:
 *       200:
 *         description: JWT token qaytariladi
 */
router.post('/login', async (req, res) => {
  const { username, password, shop } = req.body;
  if (!username || !password || !shop) {
    return res.status(400).json({ message: 'username, password va shop talab qilinadi' });
  }
  
  try {
    const user = await User.findOne({ username, shop });
    if (!user) return res.status(400).json({ message: 'Foydalanuvchi topilmadi' });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Noto‘g‘ri parol' });
    
    // Token ichida userId, shop va role ni qo'shamiz
    const token = jwt.sign({ userId: user._id, shop: user.shop, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Xatolik', error: err });
  }
});

module.exports = router;
