import express from "express";
import bcryptjs from "bcryptjs";
import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken';

// Sign up a new user
export const signup = async (req, res, next) => {
    const { username, password, email } = req.body;

    try {
        // Check if a user with the same username or email already exists
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'Username or email already exists' });
        }

        // Hash the password
        const hashedPassword = bcryptjs.hashSync(password, 10);
        const newUser = new User({ username, email, password: hashedPassword });

        await newUser.save(); // Save new user to the database
        res.status(201).json({ success: true, message: 'User created successfully' });
    } catch (error) {
        // Handle other errors (e.g., server errors)
        next(error);
    }
};


// Sign in an existing user
export const signin = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        // Find user by email
        const validUser = await User.findOne({ email });
        if (!validUser) return next(errorHandler(404, 'User not found!'));

        // Check if password matches
        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if (!validPassword) return next(errorHandler(401, 'Wrong credentials!'));

        // Create JWT token
        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Remove password from the user object
        const { password: pass, ...rest } = validUser._doc;

        // Send the token in a cookie and return the user data
        res
            .cookie('access_token', token, { 
                httpOnly: true, 
                sameSite: 'strict', 
                maxAge: 60 * 60 * 1000 // Cookie will expire in 1 hour 
            })
            .status(200)
            .json(rest);
    } catch (error) {
        next(error);
    }
};

// Sign out the user
export const signOut = async (req, res, next) => {
    
    try {
        res.clearCookie('access_token', { httpOnly: true, sameSite: 'strict' });
        res.status(200).json('User has been logged out!');
        
    } catch (error) {
        next(error);
    }
};
