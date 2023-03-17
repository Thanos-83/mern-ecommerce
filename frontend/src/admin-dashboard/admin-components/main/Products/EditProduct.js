import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import CircularProgress from '@material-ui/core/CircularProgress';
import { TextField, InputLabel } from '@material-ui/core';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { Autocomplete } from '@material-ui/lab';
import { CloudUpload } from '@material-ui/icons';

import './EditProduct.css';
import {
  listProductDetails,
  productDetails,
} from '../../../../features/products/productSlice.js';
import {
  updateProduct,
  // editProductReset,
} from '../../../../features/products/editProductSlice.js';
import { getCategories } from '../../../../features/categories/categoriesSlice';

import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

function EditProduct() {
  const params = useParams();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);

  const { product } = useSelector(productDetails);
  const { userInfo } = useSelector((state) => state.userLogin);
  const { categories } = useSelector((state) => state.categoriesList);
  console.log(categories);

  const [productData, setProductData] = useState({
    name: '',
    brand: '',
    category: '',
    description: '',
    price: 0,
    countInStock: 0,
    image: '',
  });
  console.log(productData);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  useEffect(() => {
    if (product._id !== params.id) {
      dispatch(listProductDetails(params.id));
    } else {
      setProductData({
        name: product.name,
        brand: product.brand,
        category: product.category,
        description: product.description,
        price: product.price,
        countInStock: product.countInStock,
        image: product.image,
      });
      // console.log(product.image);
    }
  }, [
    dispatch,
    params.id,
    product._id,
    product.brand,
    product.category,
    product.countInStock,
    product.description,
    product.image,
    product.name,
    product.price,
  ]);

  const editProduct = async (e) => {
    e.preventDefault();
    dispatch(
      updateProduct({
        name: productData.name,
        brand: productData.brand,
        category: productData.category,
        description: productData.description,
        price: productData.price,
        image: productData.image,
        countInStock: productData.countInStock,
        id: params.id,
        user: userInfo._id,
      })
    );
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    previewImage(file);
  };

  const previewImage = (image) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(image);
    fileReader.onloadend = () => {
      setProductData({ ...productData, image: fileReader.result });
    };
  };

  return (
    <div className='editProduct'>
      <div className='snackbar'>
        <Snackbar
          open={open}
          autoHideDuration={2000}
          onClose={handleClose}
          anchorOrigin={{
            horizontal: 'right',
            vertical: 'bottom',
          }}>
          <Alert variant='filled' onClose={handleClose} severity='success'>
            Product Updated Successfully!
          </Alert>
        </Snackbar>
      </div>
      <h3>EDIT PRODUCT</h3>
      <div className='addProduct__form'>
        <form
          onSubmit={editProduct}
          className='editProduct__form'
          encType='multipart/form-data'>
          <InputLabel error={0 ? true : false}>Product Name</InputLabel>
          <TextField
            value={productData.name}
            variant='outlined'
            required
            id='name'
            shrink='true'
            autoFocus={true}
            size='small'
            fullWidth
            // label='Required'
            helperText={`${0 ? 'Incorrect entry.' : ''}`}
            error={0 ? true : false}
            onChange={(e) =>
              setProductData({ ...productData, name: e.target.value })
            }
          />
          <InputLabel>Product Category</InputLabel>
          <Autocomplete
            options={categories}
            getOptionLabel={(option) => option.name}
            fullWidth='true'
            autoSelect='true'
            // value={productData.category}
            onChange={(event, newValue) => {
              // setValue(newValue);
              if (newValue) {
                setProductData({ ...productData, category: newValue.name });
              } else {
                setProductData({ ...productData, category: '' });
              }
            }}
            inputValue={productData.category}
            renderInput={(params) => (
              <TextField
                {...params}
                required
                shrink='true'
                id='category'
                // label='Required'
                variant='outlined'
              />
            )}
          />

          <InputLabel>Brand</InputLabel>
          <TextField
            value={productData.brand}
            required
            fullWidth
            id='brand'
            // label='Required'
            variant='outlined'
            onChange={(e) =>
              setProductData({ ...productData, brand: e.target.value })
            }
          />

          <InputLabel>Description</InputLabel>
          <TextField
            value={productData.description}
            required
            fullWidth
            id='description'
            // label='Required'
            variant='outlined'
            multiline={true}
            rows={5}
            onChange={(e) =>
              setProductData({ ...productData, description: e.target.value })
            }
          />

          <InputLabel>Price</InputLabel>
          <TextField
            value={productData.price}
            required
            error={0 ? true : false}
            id='price'
            fullWidth
            type='number'
            // label='Required'
            variant='outlined'
            onChange={(e) =>
              setProductData({ ...productData, price: e.target.value })
            }
          />

          <InputLabel>Stock Quantity</InputLabel>
          <TextField
            value={productData.countInStock}
            required
            fullWidth
            error={0 ? true : false}
            id='quantity'
            type='number'
            // label='Required'
            variant='outlined'
            onChange={(e) =>
              setProductData({ ...productData, countInStock: e.target.value })
            }
          />
          <div className='product__images'>
            <CloudUpload />
            <InputLabel htmlFor='image'>
              Upload Image
              <span>(click here...)</span>
            </InputLabel>

            <input
              type='file'
              name='image'
              id='image'
              hidden={true}
              placeholder='Featured Image'
              onChange={uploadFileHandler}
            />
          </div>
          <div className='images'>
            <h3>here will be displied all images</h3>
            {productData.image ? (
              // <img src={`/${productData.image}`} alt='' />
              <img src={productData.image} alt='selected' />
            ) : (
              'No files yet'
            )}
            <div
              onClick={(e) => setProductData({ ...productData, image: '' })}
              style={{ cursor: 'pointer' }}>
              Delete image
            </div>
          </div>
          <div className='editProduct__button'>
            <button type='submit'>Update Product</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProduct;
