import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';

// Get user details
export const getUserDetails = async (req, res, next) => {
    const userId = req.userId; // Extracted from the token via middleware

    try {
        // Find the user by ID and exclude the password field
        const user = await User.findById(userId).select('-password');
        if (!user) {
            return next(errorHandler(404, 'User not found'));
        }

        res.status(200).json({ message: 'User details fetched successfully', user });
    } catch (error) {
        next(error);
    }
};

// Update user details
export const updateUser = async (req, res, next) => {
    const userId = req.userId; // Extracted from the token via middleware
    const { username, email, password } = req.body;

    try {
        // Find the user by ID
        const user = await User.findById(userId);
        if (!user) {
            return next(errorHandler(404, 'User not found'));
        }

        // Update user details (if provided)
        if (username) user.username = username;
        if (email) user.email = email;
        if (password) {
            const hashedPassword = bcryptjs.hashSync(password, 10); // Hash the new password
            user.password = hashedPassword;
        }

        // Save the updated user
        await user.save();
        res.status(200).json({ message: 'User updated successfully', user });
    } catch (error) {
        next(error);
    }
};

// Delete user account
export const deleteUser = async (req, res, next) => {
    const userId = req.userId; // Extracted from the token via middleware

    try {
        // Find the user and delete them
        const deletedUser = await User.findByIdAndDelete(userId);
        if (!deletedUser) {
            return next(errorHandler(404, 'User not found'));
        }

        res.status(200).json({ message: 'User account deleted successfully' });
    } catch (error) {
        next(error);
    }
};
