import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true, trim: true },
  description: { type: String },
  image: { type: String },  // Optional: URL for category image
  parentCategory: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' }, // For sub-categories
}, { timestamps: true });

export default mongoose.model('Category', categorySchema);
