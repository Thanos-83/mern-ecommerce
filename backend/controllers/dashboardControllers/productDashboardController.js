// import Product from '../../models/dashboardModels/productDashboardModel.js';
import Product from '../../models/productModel.js';

// @desc    Add product to the DB
// @route   POST /api/dashboard/products
// @access  Private
export const addProduct = async (req, res, next) => {
  const name = req.body.name;
  const category = req.body.category;
  const image = req.body.image;
  const description = req.body.description;
  const brand = req.body.brand;
  const price = req.body.price;
  const countInStock = req.body.countInStock;
  const user = req.body.user;

  // console.log(req.file);
  console.log(`${user}`.magenda);
  console.log('iam in the add product controller...');
  const productData = {
    name,
    brand,
    description,
    price,
    countInStock,
    category,
    image,
    user,
  };

  const productInfo = new Product(productData);

  const createdProduct = await productInfo.save();
  console.log(createdProduct);
  res.status(201).json(createdProduct.data);
};

// @desc    Update single product
// @route   PUT /api/dashboard/products/:id/edit
// @access  Private

export const updateProduct = async (req, res, next) => {
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
  console.log(`${req.body}`.green);
  console.log(`${productID}`.red);
  console.log(`${req.body.name}`.green);
  const product = await Product.findById(productID);
  console.log(product);
  if (product) {
    product.name = name;
    product.brand = brand;
    product.category = category;
    product.description = description;
    product.price = price;
    product.countInStock = countInStock;
    product.image = image;
    product.user = user;

    // console.log(product);
    const updatedProduct = await product.save();
    console.log(updatedProduct);
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error('Product NOT found');
  }
};

// @desc    Delete product
// @route   DELETE /api/dashboard/products/:id
// @access  Private

export const deleteProduct = async (req, res, next) => {
  console.log('iam in the delete route...');
  const product = await Product.findById(req.params.id);

  if (product) {
    await product.remove();
    res.json({
      message: 'Product removed succesfully',
    });
  } else {
    res.status(404);
    throw new Error('Product NOT found');
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
