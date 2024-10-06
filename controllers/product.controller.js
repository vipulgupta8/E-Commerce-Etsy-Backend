import Product from '../models/product.model.js';
import { errorHandler } from '../utils/error.js';

// Create a new product
export const createProduct = async (req, res, next) => {
  const { title, price, description, images} = req.body;

  // Validate required fields
  if (!title || !price || !description || !images) {
    return next(errorHandler(400, 'All fields are required!'));
  }

  try {
    // Create a new product instance
    const newProduct = new Product({
      title,
      price,
      description,
      images,
    });

    // Save the product to the database
    await newProduct.save();
    
    res.status(201).json({
      message: 'Product created successfully',
      product: newProduct,
    });
  } catch (error) {
    next(error);
  }
};

// Get all products
export const getProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

// Get a product by ID
export const getProductById = async (req, res, next) => {
  const { id } = req.params;
  
  try {
    const product = await Product.findById(id);
    if (!product) {
      return next(errorHandler(404, 'Product not found'));
    }
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

// Update a product by ID
export const updateProduct = async (req, res, next) => {
  const { id } = req.params; // Get the product ID from the URL params
  const { title, price, description, images } = req.body; // Get the updated fields from the body

  // Check if at least one field is provided for updating
  if (!title && !price && !description && !images) {
    return next(errorHandler(400, 'At least one field must be provided to update'));
  }

  try {
    // Find the product by ID and update it with the provided fields
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { title, price, description, images }, // Update only provided fields
      { new: true, runValidators: true } // Return the updated product and run validation
    );

    // If product is not found, return an error
    if (!updatedProduct) {
      return next(errorHandler(404, 'Product not found'));
    }

    // Send back the updated product
    res.status(200).json({
      message: 'Product updated successfully',
      product: updatedProduct,
    });
  } catch (error) {
    next(error);
  }
};
