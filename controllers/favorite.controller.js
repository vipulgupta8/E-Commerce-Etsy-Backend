import Favorite from '../models/favorite.model.js';
import Product from '../models/product.model.js';
import { errorHandler } from '../utils/error.js';

// Add product to favorites
export const addToFavorites = async (req, res, next) => {
  const { productId } = req.body;
  const userId = req.userId; // Extracted from the token via middleware

  // Validate productId
  if (!productId) {
    return next(errorHandler(400, 'Product ID is required'));
  }

  try {
    // Check if the product exists
    const product = await Product.findById(productId);
    if (!product) {
      return next(errorHandler(404, 'Product not found'));
    }

    // Find the user's favorites or create a new one if it doesn't exist
    let favorite = await Favorite.findOne({ userId });
    if (!favorite) {
      favorite = new Favorite({ userId, products: [] });
    }

    // Check if the product is already in the favorites
    const existingProduct = favorite.products.find(
      (item) => item.toString() === productId
    );

    if (existingProduct) {
      return res.status(400).json({ message: 'Product already in favorites' });
    }

    // Add the new product to the favorites
    favorite.products.push(productId);

    // Save the updated favorites
    await favorite.save();

    res.status(200).json({
      message: 'Product added to favorites successfully',
      favorite,
    });
  } catch (error) {
    next(error);
  }
};

// Get user's favorite products
export const getFavorites = async (req, res, next) => {
  const userId = req.userId;

  try {
    const favorite = await Favorite.findOne({ userId }).populate('products');
    if (!favorite || favorite.products.length === 0) {
      return res.status(200).json({ message: 'No favorite products found', products: [] });
    }

    res.status(200).json(favorite);
  } catch (error) {
    next(error);
  }
};

// Remove a product from favorites
export const removeFromFavorites = async (req, res, next) => {
  const { productId } = req.body;
  const userId = req.userId;

  if (!productId) {
    return next(errorHandler(400, 'Product ID is required'));
  }

  try {
    const favorite = await Favorite.findOne({ userId });
    if (!favorite) {
      return next(errorHandler(404, 'Favorites not found'));
    }

    // Remove the product from the favorites
    favorite.products = favorite.products.filter(
      (item) => item.toString() !== productId
    );

    await favorite.save();
    res.status(200).json({ message: 'Product removed from favorites', favorite });
  } catch (error) {
    next(error);
  }
};
