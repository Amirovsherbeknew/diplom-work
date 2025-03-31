const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/product');

dotenv.config();

const app = express();
app.use(express.json());

// MongoDB ga umumiy bog‘lanish (faqat userlar uchun)
mongoose.connect(process.env.MONGO_URI + '/users', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB ulanishi muvaffaqiyatli')).catch(err => console.error('MongoDB xatosi:', err));

// Routerlarni ulaymiz
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server ${PORT}-portda ishlamoqda`));
