const mongoose = require('mongoose');

const MainDBSchema = new mongoose.Schema({
    shopName: { type: String, unique: true, required: true },
    inn: { type: String, unique: true, required: true },
});

module.exports = mongoose.model('shopname', MainDBSchema);
