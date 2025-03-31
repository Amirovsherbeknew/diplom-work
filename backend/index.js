// backend/index.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

// Swagger: API hujjatlari uchun yo'nalish
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routerni o'rnatish
const superadminRoutes = require('./routes/superadmin');
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const userRoutes = require('./routes/users');

app.use('/api/superadmin', superadminRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;

// Asosiy MongoDB ulanishi (superadmin uchun umumiy bazani ishlatish mumkin)
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('MongoDB connected');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})
.catch(err => console.log(err));
