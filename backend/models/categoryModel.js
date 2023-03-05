import mongoose from 'mongoose';

const categorySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  isParent: {
    type: Boolean,
    required: true,
  },
});

const Category = mongoose.model('category', categorySchema);

export default Category;
