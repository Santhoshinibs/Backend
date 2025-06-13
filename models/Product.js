import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    userName: { type: String, required: true },
    ratings: { type: Number, required: true },
    comments: { type: String, required: true },
  },
  { timestamps: true }
);

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  image: String,
  category: String,
  countInStock: Number,
  reviews: [reviewSchema],
  numberOfRatings: Number,
  averageRatings: Number,
});

const Product = mongoose.model('Product', productSchema);
export default Product;


