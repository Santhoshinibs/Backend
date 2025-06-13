import Product from '../models/Product.js';
import mongoose from 'mongoose';

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch products' });
  }
};

export const getProductById = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid product ID format' });
  }

  try {
    const product = await Product.findById(id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const addProductReview = async (req, res) => {
  const { ratings, comments } = req.body;
  const productId = req.params.id;
  const userId = req.user._id;
  const userName = req.user.name;

  try {
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === userId.toString()
    );
    if (alreadyReviewed) {
      return res.status(400).json({ message: 'Product already reviewed' });
    }

    product.reviews.push({ user: userId, userName, ratings: Number(ratings), comments });
    product.numberOfRatings = product.reviews.length;
    product.averageRatings =
      product.reviews.reduce((acc, item) => acc + item.ratings, 0) / product.reviews.length;

    await product.save();
    res.status(201).json({ message: 'Review added successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
