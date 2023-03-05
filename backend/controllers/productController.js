import Product from '../models/productModel.js';
import asyncHandler from 'express-async-handler';
import colors from 'colors';

// @desc    Fetch all products from the DB
// @route   GET /api/products
// @access  Public
export const getProducts = asyncHandler(async (req, res) => {
  const pageSize = 6;
  const page = Number(req.query.pageNumber) || 1;
  console.log(req.query);

  console.log('In server, Page: ', page);
  try {
    const numOfProducts = await Product.countDocuments();
    console.log(numOfProducts);
    const products = await Product.find({})
      .limit(pageSize)
      .skip(pageSize * (page - 1));
    console.log('hello, iam fetching products....');
    res
      .status(200)
      .json({ products, page, pages: Math.ceil(numOfProducts / pageSize) });
  } catch (error) {
    console.log('Error in fetching products: ', error);
    res.status(400).json({ messase: error });
  }
});

// @desc    Fetch single product from the DB using its _id
// @route   GET /api/products/:id
// @access  Public
export const getSingleProductById = asyncHandler(async (req, res) => {
  const singleProduct = await Product.findById(req.params.id);

  if (singleProduct) {
    res.json(singleProduct);
    console.log(
      `Hello, iam fetching single product from product Controller......`.green
    );
  } else {
    // res.status(404).json({
    //   message: 'Product Not Found',
    // });
    res.status(404);
    throw new Error('Product Not Found');
  }
});

// @desc    Create new review
// @route   PUT /api/products/:id/reviews
// @access  Private

export const createReview = async (req, res, next) => {
  const { rating, review } = req.body;

  const productID = req.params.id;
  console.log(rating, review);
  const product = await Product.findById(productID);
  try {
    if (product) {
      const alreadyReviewd = product.reviews.find(
        (review) => review.user.toString() === req.user._id.toString()
      );

      if (alreadyReviewd) {
        // res.status(400);
        throw new Error('Product already reviewd!');
      }

      const newReview = {
        name: req.user.name,
        rating: Number(rating),
        review,
        user: req.user._id,
      };
      product.reviews.push(newReview);

      product.numReviews = product.reviews.length;

      product.rating =
        product.reviews.reduce(
          (acc, currentItem) => currentItem.rating + acc,
          0
        ) / product.reviews.length;

      // console.log(product);
      const reviewAdded = await product.save();
      console.log(reviewAdded);
      res.status(201).json({ msg: 'Review Added Successfully!' });
    } else {
      // res.status(404);
      throw new Error('Product NOT found');
    }
  } catch (error) {
    console.log('This is my error: ', error);
    res.status('404').json({ message: error });
  }
};
