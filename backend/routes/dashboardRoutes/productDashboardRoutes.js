import express from 'express';
const router = express.Router();
import {
  addProduct,
  updateProduct,
  deleteProduct,
  uploadImage,
  getAllProducts,
} from '../../controllers/dashboardControllers/productDashboardController.js';
import protectRoutes from '../../middleware/authMiddleware.js';

router.get('/', getAllProducts);
router.post('/add', protectRoutes, addProduct);
router.post('/upload', uploadImage);
router.put('/:id/edit', protectRoutes, updateProduct);
router.delete('/:id', protectRoutes, deleteProduct);

export default router;
