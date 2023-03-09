import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
// import cors from 'cors';
import connectDB from './config/db.js';
import colors from 'colors';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
// ===== Dashboard ========================
import productDashboardRoutes from './routes/dashboardRoutes/productDashboardRoutes.js';
import categoryRoutes from './routes/dashboardRoutes/categoryRoutes.js';
import adminOrderRoutes from './routes/dashboardRoutes/adminOrderRoutes.js';
import adminUserRoutes from './routes/dashboardRoutes/adminUserRoutes.js';
// ========================================

// initialize the app
const app = express();

// app.use(cors());

// accept JSON data from the BODY
app.use(express.json());

dotenv.config();

// Connect the Dadabase
connectDB();

// we use the static folder /upload
const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

app.use('/api/orders', orderRoutes);
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.get('/api/config/paypal', (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);

//========= Dashboard Routes ============
app.use('/api/dashboard/products', productDashboardRoutes);
app.use('/api/dashboard/categories', categoryRoutes);
app.use('/api/dashboard/orders', adminOrderRoutes);
app.use('/api/dashboard/users', adminUserRoutes);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/frontend/build/index.html'));
  });
}
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(
    `App is running in ${process.env.NODE_ENV} mode on port ${PORT} `.yellow
      .underline
  );
});
