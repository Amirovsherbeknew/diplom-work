const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const getTenantConnection = require('../db/tenantConnection');
const MainDB = require('../models/MainDB'); // Barcha shopslar shu yerda saqlanadi

// Faqat superadmin kirishi mumkin
router.use(authMiddleware('superadmin'));

// 🔹 1️⃣ Yangi shop yaratish (va yangi connection ochish)
router.post('/create-shop', async (req, res) => {
    try {
        let { shopName } = req.body;
        if (!shopName) {
            return res.status(400).json({ message: 'shopName talab qilinadi' });
        }

        shopName = shopName.toLowerCase(); // 🔹 Katta-kichik harflarni normalize qilish

        // 🔹 Agar shop allaqachon mavjud bo‘lsa, xatolik qaytariladi
        const existingShop = await MainDB.findOne({ shopName });
        if (existingShop) {
            return res.status(400).json({ message: `Bu shop (${shopName}) allaqachon mavjud` });
        }

        // 🔹 Yangi shopni MainDB (asosiy bazada) saqlash
        const newShop = new MainDB({ shopName });
        await newShop.save();

        // 🔹 Yangi shop uchun alohida MongoDB connection yaratish
        const tenantDb = getTenantConnection(shopName);
        console.log(`✅ Yangi MongoDB connection yaratildi: ${shopName}`);

        res.status(201).json({ message: `Yangi shop yaratildi va yangi ulanish ochildi: ${shopName}`, shopName });

    } catch (error) {
        console.error('❌ Server xatosi (create-shop):', error);
        res.status(500).json({ message: 'Serverda xatolik', error: error.message });
    }
});

// 🔹 2️⃣ Barcha shopslarni olish
router.get('/shops', async (req, res) => {
    try {
        const shops = await MainDB.find({}, 'shopName -_id'); // Faqat shopName'larni qaytarish
        res.json({ shops });
    } catch (error) {
        console.error('❌ Server xatosi (shops list):', error);
        res.status(500).json({ message: 'Serverda xatolik', error: error.message });
    }
});

module.exports = router;
