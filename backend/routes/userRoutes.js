import express from 'express';
import protectRoutes from '../middleware/authMiddleware.js';

const router = express.Router();
import {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
} from '../controllers/userController.js';

router.post('/login', authUser);
router.route('/').post(registerUser);
router.route('/profile').get(protectRoutes, getUserProfile);
router.route('/profile').put(protectRoutes, updateUserProfile);

export default router;
