const mongoose = require('mongoose');
const ignoreList = ['global'];
// Barcha ochilgan connection'larni cache qilish uchun obyekt
const connections = {};

const getTenantConnection = (shopName) => {
    console.log(shopName)
    if (connections[shopName]) {
        console.log(`🔄 ${shopName} uchun avvaldan mavjud bo‘lgan ulanish ishlatilmoqda.`);
        return connections[shopName];
    }

    // 🔹 Yangi MongoDB URL generatsiya qilish
    const dbURI = `mongodb://localhost:27017/${shopName}`;
    
    // 🔹 Yangi connection yaratish
    const newConnection = mongoose.createConnection(dbURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    // 🔹 Connection'ni cache qilib qo‘yamiz
    connections[shopName] = newConnection;

    console.log(`✅ ${shopName} uchun yangi ulanish ochildi.`);
    if (ignoreList.includes(newConnection)) {
        return 'no_registr'
    }
    return newConnection;
};

module.exports = getTenantConnection;
