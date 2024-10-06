import express from 'express';
import { updateUser, deleteUser, getUserDetails } from '../controllers/user.controller.js';
import { verifyToken } from '../middleware/authMiddleware.js'; // Assuming you have auth middleware

const router = express.Router();

// Route to get user details
router.get('/me', verifyToken, getUserDetails);

// Route to update user details
router.put('/update', verifyToken, updateUser);

// Route to delete user account
router.delete('/delete', verifyToken, deleteUser);

export default router;
