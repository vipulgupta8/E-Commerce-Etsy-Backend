import Cart from '../models/cart.model.js';
import Product from '../models/product.model.js';
import { errorHandler } from '../utils/error.js';

// Add product to cart
export const addToCart = async (req, res, next) => {
  const { productId, quantity } = req.body;
  const userId = req.userId; // Extracted from the token via middleware

  // Validate productId and quantity
  if (!productId || !quantity || typeof quantity !== 'number' || quantity <= 0) {
    return next(errorHandler(400, 'Invalid product ID or quantity'));
  }

  try {
    // Check if the product exists
    const product = await Product.findById(productId);
    if (!product) {
      return next(errorHandler(404, 'Product not found'));
    }

    // Find the user's cart or create a new one if it doesn't exist
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, products: [] });
    }

    // Check if the product is already in the cart
    const existingProductIndex = cart.products.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (existingProductIndex >= 0) {
      // Update the quantity of the existing product
      cart.products[existingProductIndex].quantity += quantity;
    } else {
      // Add the new product to the cart
      cart.products.push({ productId, quantity });
    }

    // Save the updated cart
    await cart.save();

    res.status(200).json({
      message: 'Product added to cart successfully',
      cart,
    });
  } catch (error) {
    next(error);
  }
};

// Get user's cart
export const getCart = async (req, res, next) => {
  const userId = req.userId;

  try {
    const cart = await Cart.findOne({ userId }).populate('products.productId');
    if (!cart) {
      return res.status(200).json({ message: 'Cart is empty', products: [] });
    }

    res.status(200).json(cart);
  } catch (error) {
    next(error);
  }
};

// Update product quantity in cart
export const updateCartItemQuantity = async (req, res, next) => {
  const { productId, quantity } = req.body;
  const userId = req.userId;

  if (!productId || !quantity || typeof quantity !== 'number' || quantity <= 0) {
    return next(errorHandler(400, 'Invalid product ID or quantity'));
  }

  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return next(errorHandler(404, 'Cart not found'));
    }

    // Find the product in the cart
    const productIndex = cart.products.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (productIndex >= 0) {
      // Update the quantity of the product
      cart.products[productIndex].quantity = quantity;
      await cart.save();
      res.status(200).json({ message: 'Product quantity updated successfully', cart });
    } else {
      return next(errorHandler(404, 'Product not found in cart'));
    }
  } catch (error) {
    next(error);
  }
};

// Remove a product from the cart
export const removeFromCart = async (req, res, next) => {
  const { productId } = req.body;
  const userId = req.userId;

  if (!productId) {
    return next(errorHandler(400, 'Product ID is required'));
  }

  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return next(errorHandler(404, 'Cart not found'));
    }

    // Remove the product from the cart
    cart.products = cart.products.filter(
      (item) => item.productId.toString() !== productId
    );

    await cart.save();
    res.status(200).json({ message: 'Product removed from cart', cart });
  } catch (error) {
    next(error);
  }
};
