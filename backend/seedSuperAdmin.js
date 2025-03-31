// seedSuperAdmin.js
const mongoose = require('mongoose');
const hashPassword = require('./utils/hashPassword');
const dotenv = require('dotenv');

dotenv.config();

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  shop: { type: String, required: true },
  role: { type: String, enum: ['superadmin', 'user'], default: 'user' }
});
const User = mongoose.model('User', UserSchema);

const createSuperAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB ga ulandi');
    
    const existing = await User.findOne({ username: 'admin', role: 'superadmin' });
    if (existing) {
      console.log('Superadmin allaqachon mavjud');
      process.exit(0);
    }
    const hashedPassword = await hashPassword('superadmin');
    const superadmin = new User({
      username: 'admin',
      password:hashedPassword,
      shop: 'global',  // yoki mos filial nomi, agar global bo'lsa, 'global'
      role: 'superadmin'
    });
    await superadmin.save();
    console.log('Superadmin yaratildi');
    process.exit(0);
  } catch (err) {
    console.error('Xatolik:', err);
    process.exit(1);
  }
};

createSuperAdmin();
