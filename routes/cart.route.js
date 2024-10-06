import express from 'express';

import { verifyToken } from '../middleware/authMiddleware.js';
import { addToCart, getCart, updateCartItemQuantity, removeFromCart } from '../controllers/cart.controller.js';

const router = express.Router();

// Add product to cart
router.post('/add', verifyToken, addToCart)

// Get user's cart
router.get('/', verifyToken, getCart);

// Update product quantity in cart
router.put('/update', verifyToken, updateCartItemQuantity);

// Remove product from cart
router.delete('/remove', verifyToken, removeFromCart);

export default router;
