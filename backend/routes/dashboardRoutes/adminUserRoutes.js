import express from 'express';
import {
  getAllUsers,
  getSingleUser,
} from '../../controllers/dashboardControllers/adminUserController.js';
const Router = express.Router();
import protectRoutes from '../../middleware/authMiddleware.js';
import { isAdmin } from '../../middleware/authMiddleware.js';
Router.get('/', getAllUsers);
Router.get('/:userID', getSingleUser);

export default Router;
