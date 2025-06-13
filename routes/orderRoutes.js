import express from 'express'
import { addOrderItems, getOrderById } from '../controllers/orderController.js'
import {updateOrderToPaid} from '../controllers/orderController.js'
import {getMyOrders} from '../controllers/orderController.js'
import { protect } from '../middleware/authMiddleware.js'; // Protect routes


const router=express.Router()

router.post('/', protect, addOrderItems);
router.get('/myorders', protect, getMyOrders); // move above :id
router.get('/:id', protect, getOrderById);
router.put('/:id/pay', protect, updateOrderToPaid);

export default router