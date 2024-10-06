import express from 'express';

import { verifyToken } from '../middleware/authMiddleware.js';
import { addToFavorites, getFavorites, removeFromFavorites } from '../controllers/favorite.controller.js';

const router = express.Router();

// Add product to favorites
router.post('/add', verifyToken, addToFavorites);

// Get user's favorite products
router.get('/', verifyToken, getFavorites);

// Remove product from favorites
router.delete('/remove', verifyToken, removeFromFavorites);

export default router;
