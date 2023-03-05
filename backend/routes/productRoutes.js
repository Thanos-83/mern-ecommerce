import express from 'express';
const router = express.Router();
import protectRoutes from '../middleware/authMiddleware.js';

import {
  getProducts,
  getSingleProductById,
  createReview,
} from '../controllers/productController.js';

router.get('/', getProducts);
router.route('/:id').get(getSingleProductById);
router.post('/:id/reviews', protectRoutes, createReview);

export default router;
