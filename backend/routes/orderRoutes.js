import express from 'express';
import protectRoutes from '../middleware/authMiddleware.js';
const router = express.Router();
import {
  createOrder,
  getOrderById,
  updateOrderToPaid,
  getMyOrders,
} from '../controllers/orderController.js';

router.route('/').post(protectRoutes, createOrder);
router.route('/myorders').get(protectRoutes, getMyOrders);
router.route('/:id').get(protectRoutes, getOrderById);
router.route('/:id/pay').put(protectRoutes, updateOrderToPaid);

export default router;
