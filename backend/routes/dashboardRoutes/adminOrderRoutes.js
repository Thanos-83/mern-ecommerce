import express from 'express';
import {
  getAllOrders,
  editOrder,
} from '../../controllers/dashboardControllers/adminOrdersController.js';
const Router = express.Router();
import protectRoutes from '../../middleware/authMiddleware.js';
import { isAdmin } from '../../middleware/authMiddleware.js';
Router.get('/', getAllOrders);
Router.get('/:id/edit', editOrder);

export default Router;
