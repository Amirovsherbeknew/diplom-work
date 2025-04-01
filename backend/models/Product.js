const mongoose = require('mongoose');
const Product = new mongoose.Schema({
    name: String,
    price: Number,
    quantity: Number,
    shop_name:String,
    createdAt: { type: Date, default: Date.now }
})
module.exports = mongoose.model('Product', Product);