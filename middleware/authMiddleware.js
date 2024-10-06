
// import jwt from 'jsonwebtoken';
// import { errorHandler } from '../utils/error.js';

// export const verifyToken = (req, res, next) => {
//   const token = req.cookies.access_token;

//   if (!token) {
//     return next(errorHandler(401, 'Access denied, no token provided'));
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.userId = decoded.id; // Attach the user's ID to the request
//     next();
//   } catch (error) {
//     return next(errorHandler(403, 'Invalid or expired token'));
//   }
// };

import jwt from 'jsonwebtoken';
import { errorHandler } from '../utils/error.js';

export const verifyToken = (req, res, next) => {
  // Log cookies for debugging
  console.log('Cookies:', req.cookies);

  // Get the token from cookies
  const token = req.cookies.access_token; // Token expected in cookies

  if (!token) {
    return next(errorHandler(401, 'Access denied, no token provided'));
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id; // Attach the user's ID to the request
    next(); // Proceed to the next middleware
  } catch (error) {
    return next(errorHandler(403, 'Invalid or expired token'));
  }
};




