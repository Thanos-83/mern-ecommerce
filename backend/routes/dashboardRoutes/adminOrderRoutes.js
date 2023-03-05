import express from 'express';
import { getAllOrders } from '../../controllers/dashboardControllers/adminOrdersController.js';
const Router = express.Router();

Router.get('/', getAllOrders);

export default Router;
