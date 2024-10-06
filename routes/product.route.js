import express from 'express';
import { createProduct, getProducts, getProductById, updateProduct } from '../controllers/product.controller.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/create', verifyToken, createProduct);       // Create a new product
router.get('/', getProducts);                // Get all products
router.get('/:id', getProductById);          // Get product by ID
router.put('/update/:id', updateProduct);


export default router;

