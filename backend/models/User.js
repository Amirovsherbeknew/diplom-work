const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  shop: { type: String, required: true },  // Hamma userlar biror shop'ga tegishli bo‘ladi
  role: { type: String, enum: ['superadmin', 'user'], default: 'user' }
});

// Agar model allaqachon mavjud bo'lsa, qayta yaratmaymiz
module.exports = mongoose.models.User || mongoose.model('User', UserSchema);
