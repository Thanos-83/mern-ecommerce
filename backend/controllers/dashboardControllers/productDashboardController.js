// import Product from '../../models/dashboardModels/productDashboardModel.js';
import Product from '../../models/productModel.js';
import { v2 as cloudinary } from 'cloudinary';
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_SECRET,
//   secure: true,
// });

// @desc    Add product to the DB
// @route   POST /api/dashboard/products
// @access  Private
export const addProduct = async (req, res, next) => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
    secure: true,
  });
  console.log('add product body data: ', req.body);
  const name = req.body.name;
  const category = req.body.category;
  const image = req.body.image;
  const description = req.body.description;
  const brand = req.body.brand;
  const price = req.body.price;
  const countInStock = req.body.countInStock;
  const user = req.body.user;
  console.log('server image: ', image);
  // console.log(req.file);
  // console.log(`${user}`.magenda);
  console.log('iam in the add product controller...');

  try {
    const response = await cloudinary.uploader.upload(image, {
      upload_preset: 'mern-ecommerce',
    });

    const productData = {
      name,
      brand,
      description,
      price,
      countInStock,
      category,
      image: {
        secureUrl: response.secure_url,
        assetId: response.asset_id,
        publicId: response.public_id,
      },
      user,
    };

    const newProduct = new Product(productData);

    const createdProduct = await newProduct.save();
    // console.log(createdProduct);
    res.status(200).json({
      message: 'All good!',
      cloudinaryResponse: response,
      product: createdProduct,
    });
  } catch (error) {
    console.log('cloudinary error: ', error);
    res.status(400).json({ 'error message': error });
  }
};

// @desc    Update single product
// @route   PUT /api/dashboard/products/:id/edit
// @access  Private

export const updateProduct = async (req, res, next) => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
    secure: true,
  });
  const {
    name,
    brand,
    category,
    description,
    price,
    countInStock,
    image,
    user,
  } = req.body;

  const productID = req.params.id;
  console.log('product id to update: ', productID);
  try {
    const product = await Product.findById(productID);
    console.log('product to update: ', product);
    console.log('image to update: ', image);
    if (!image.publicId) {
      // && image.publicId !== product.image.publicId)
      const deleteImageResponse = await cloudinary.uploader.destroy(
        product.image.publicId
      );
      console.log(
        'Delete image from cloudinary response: ',
        deleteImageResponse
      );
      const response = await cloudinary.uploader.upload(image, {
        upload_preset: 'mern-ecommerce',
      });
      image = {
        secureUrl: response.secure_url,
        assetId: response.asset_id,
        publicId: response.public_id,
      };
    }

    if (product) {
      // console.log(product);
      product.name = name;
      product.brand = brand;
      product.category = category;
      product.description = description;
      product.price = price;
      product.countInStock = countInStock;
      product.image = image;
      product.user = user;

      console.log('product before saving to db: ', product);
      const updatedProduct = await product.save();
      console.log(updatedProduct);
      res.status(200).json({ message: 'produdct updated', updatedProduct });
    } else {
      throw new Error('Product NOT found');
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({ 'error message in updating product': error });
  }
};

// @desc    Delete product
// @route   DELETE /api/dashboard/products/:id
// @access  Private

export const deleteProduct = async (req, res, next) => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
    secure: true,
  });
  try {
    console.log('iam in the delete route...');
    console.log('product ID to delete: ', req.params.id);
    const product = await Product.findById(req.params.id);

    if (product) {
      await product.remove();
      const deleteImageResponse = await cloudinary.uploader.destroy(
        product.image.publicId
      );
      console.log('image deleted from the cloudinary: ', deleteImageResponse);
      res.status(200).json({
        message: 'Product removed succesfully',
      });
    } else {
      throw new Error('Product NOT found');
    }
  } catch (error) {
    console.log('error in deleting product: ', error);
    res.status(404).json({ 'error message': error.message });
  }
};

// @desc    Fetch all products from the DB
// @route   GET /api/dashboard/products
// @access  Private / Admin
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});

    console.log('iam fetching all products for the dashboard....');
    res.status(200).json({ products });
  } catch (error) {
    console.log('Error in fetching products: ', error);
    res.status(400).json({ messase: error });
  }
};

// @desc    GET single product by id and Edit
// @route   POST /api/dashboard/products/:id
// @access  Private

export const getSingleProductById = async (req, res, next) => {
  const singleProduct = await Product.findById(req.params.id);
  console.log(singleProduct);
  if (singleProduct) {
    res.status(200).send(singleProduct);
    console.log('Hello, iam fetching single product....');
  } else {
    res.status(404);
    throw new Error('Product NOT found');
  }
};

// @desc    POST upload image to cloudinary
// @route   POST /api/dashboard/products/upload
// @access  Private
export const uploadImage = async (req, res, next) => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
    secure: true,
  });
  const { image } = req.body;
  console.log('upload image: ', image);
  console.log('api_key: ', typeof process.env.CLOUDINARY_API_KEY);
  try {
    cloudinary.api.root_folders().then((result) => {
      console.log('folders: ', result);
    });
    const cloudinaryResponse = await cloudinary.uploader.upload(image, {
      upload_preset: 'mern-ecommerce',
    });
    // console.log(cloudinaryResponse);
    res.status(200).json({ message: 'all good', data: cloudinaryResponse });
  } catch (error) {
    console.log('cloudinary error: ', error);
    res.status(400).json({ 'error message': error });
  }
};
