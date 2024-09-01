import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  price: { type: Number, required: true, min: 0 },
  description: { type: String, required: true },
  images: [{ type: String, required: true }],  // Array of image URLs for multiple images
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true }, // Reference to a Category model
  rating: { type: Number, default: 0, min: 0, max: 5 },  // Average rating (0-5 stars)
  reviews: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },  // Reference to User model
      rating: { type: Number, required: true, min: 0, max: 5 }, // Individual rating (0-5 stars)
      comment: { type: String, required: true },
      createdAt: { type: Date, default: Date.now },
    },
  ],
  stock: { type: Number, required: true, min: 0 },  // Stock quantity
  brand: { type: String, required: true, trim: true },
  productStatus: { type: Boolean, default: true },  // True for active, false for inactive
  tags: [{ type: String }],  // Array of tags for better searchability
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
}, { timestamps: true });

export default mongoose.model('Product', productSchema);
