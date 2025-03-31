const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const getTenantConnection = require('../utils/getTenantConnection');
const User = require('../models/User');
const mongoose = require('mongoose');

router.post('/add-product', authMiddleware('user'), async (req, res) => {
    try {
        const { name, price,shop_name,quantity } = req.body;
        const error_message = ''
        Object.keys(req.body).forEach(key => {
            if (!req.body[key]) {
                error_message = `${key} talab qilinadi`
            }
        })
        if (error_message) return res.status(400).json({ message: error_message});
        // 1️⃣ Token orqali userni topamiz
        const user = await User.findById(req.user.userId);
        if (!user) return res.status(400).json({ message: 'Foydalanuvchi topilmadi' });
        // 2️⃣ Userning `shop` ni bilamiz
        const shopName = user.shop;

        // 3️⃣ O‘sha shop uchun alohida connection olamiz
        const tenantDb = getTenantConnection(shopName);
        if (!tenantDb) return res.status(400).json({message:'Kiritilgan korxona topilmadi'});
        if (tenantDb === 'no_registr') return res.status(400).json({message:'Siz bu korxonaga mahsulot royxatga ololmaysiz'});
        console.log(`Tenant DB nomi: ${shopName}`)
        // 4️⃣ Product modelini yaratamiz (har bir tenant uchun alohida)
        const Product = mongoose.model('Product', new mongoose.Schema({
            name: String,
            price: Number,
            quantity: Number,
            shop_name:String,
            createdAt: { type: Date, default: Date.now }
        }));

        // 5️⃣ Mahsulot yaratamiz
        const newProduct = new Product({ name, price,shop_name });
        await newProduct.save();

        res.status(201).json({ message: 'Mahsulot yaratildi', product: newProduct });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Serverda xatolik', error: err });
    }
});

module.exports = router;
