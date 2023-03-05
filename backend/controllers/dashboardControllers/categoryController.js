import Category from '../../models/categoryModel.js';

// @desc    Add category to DB
// @route   POST /api/dashboard/categories
// @access  Private

export const createCategory = async (req, res, next) => {
  const { name, isParent } = req.body;
  if (name) {
    const categoryInfo = {
      name,
      isParent,
    };
    const newCategory = new Category(categoryInfo);

    const createdCategory = await newCategory.save();
    // console.log(createdCategory);
    res.status(201).json(createdCategory);
  } else {
    res.status(500).json({
      message: 'No category created.',
    });
  }
};

// @desc    Get all categories
// @route   GET /api/dashboard/categories
// @access  Private

export const getCategories = async (req, res, next) => {
  const categories = await Category.find();

  res.json(categories);
};
