import express from 'express';
import {
  createCategory,
  getCategories,
} from '../../controllers/dashboardControllers/categoryController.js';
const Router = express.Router();

Router.post('/', createCategory);
Router.get('/', getCategories);

export default Router;
