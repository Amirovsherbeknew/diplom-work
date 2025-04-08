const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const getTenantConnection = require('../db/tenantConnection');
const MainDB = require('../models/MainDB'); // Barcha shopslar shu yerda saqlanadi
const Error = require('../utils/Error')
// Faqat superadmin kirishi mumkin
router.use(authMiddleware('superadmin'));

router.get('/', async (req,res) => {
    try {
        const shops = await MainDB.find(); // Barcha ma'lumotlarni olish
        res.json(shops); // JSON formatda jo‘natish
    } catch (error) {
        res.status(500).json({message:'Serverda xatolik'})
    }
})
router.get('/:id',async (req,res) => {
    try {
        const user_id = req.params.id;
        const shops = await MainDB.findById(user_id)
        res.json(shops)
    } catch (error) {
        res.status(500).json({message:'Serverda xatolik'})
    }
})
// 🔹 1️⃣ Yangi shop yaratish (va yangi connection ochish)
router.post('/create-shop', async (req, res) => {
    try {
        let { shopName,inn } = req.body;
        let error_message = ''
        Object.entries(req.body).forEach(([key,value]) => {
            if (!value) {
                error_message = key
            }
        })
        if (error_message) return res.status(400).json({message:`Majburiy ${error_message} ga malumot kiriting`}) 
        shopName = shopName.toLowerCase(); // 🔹 Katta-kichik harflarni normalize qilish

        // 🔹 Agar shop allaqachon mavjud bo‘lsa, xatolik qaytariladi
        const existingShop = await MainDB.findOne({ shopName });
        const existingShopInn = await MainDB.findOne({ inn });
        console.log(existingShopInn)
        if (existingShop) {
            const err_message = await Error('2000')
            return res.status(400).json({message:err_message?.message});
        }
        if (existingShopInn) {
            console.log(await Error("2001"))
            return res.status(400).json({message:err_message?.message});
        }
        // 🔹 Yangi shopni MainDB (asosiy bazada) saqlash
        const newShop = new MainDB({ shopName,inn });
        await newShop.save();

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
