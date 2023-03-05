import mongoose from 'mongoose';

const productDashboardSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  countInStock: {
    type: Number,
    required: true,
    default: 0,
  },
  image: {
    type: String,
    required: false,
  },
});

const Product = mongoose.model('product', productDashboardSchema);

export default Product;
