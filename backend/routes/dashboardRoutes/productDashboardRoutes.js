import express from 'express';
const router = express.Router();
import {
  addProduct,
  updateProduct,
  deleteProduct,
} from '../../controllers/dashboardControllers/productDashboardController.js';
import upload from '../../middleware/multer.js';
import protectRoutes from '../../middleware/authMiddleware.js';

router.post('/add', protectRoutes, addProduct);
router.put('/:id/edit', protectRoutes, updateProduct);
router.delete('/:id', protectRoutes, deleteProduct);
router.post('/uploads', upload.single('image'), (req, res, next) => {
  // console.log(req.file);
  res.send(`${req.file.path}`);
});

export default router;
