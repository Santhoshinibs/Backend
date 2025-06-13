import express from 'express';
import {
  getAllProducts,
  getProductById,
  addProductReview,
} from '../controllers/productController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.post('/:id/reviews', protect, addProductReview); // Protected route

export default router;

