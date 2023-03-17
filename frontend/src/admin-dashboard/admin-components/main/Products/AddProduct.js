import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import CircularProgress from '@material-ui/core/CircularProgress';
import { TextField, Snackbar, InputLabel } from '@material-ui/core';
import { CloudUpload } from '@material-ui/icons';
import { Alert, Autocomplete } from '@material-ui/lab';

import './AddProduct.css';
import { addProductToDB } from '../../../../features/products/createProductSlice.js';
import { getCategories } from '../../../../features/categories/categoriesSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

function AddProduct() {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);

  const createProduct = useSelector((state) => state.createProduct);

  console.log('create product: ', createProduct);
  const { categories } = useSelector((state) => state.categoriesList);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

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

  const addProduct = async (e) => {
    e.preventDefault();

    dispatch(addProductToDB({ ...productData, user: userInfo._id }));

    if (createProduct.success) {
      setProductData({
        name: '',
        brand: '',
        category: '',
        description: '',
        price: 0,
        countInStock: 0,
        image: '',
      });
      setOpen(true);
    }
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
      // setImageSelected(fileReader.result);
      setProductData({ ...productData, image: fileReader.result });
    };
  };
  return (
    <div className='addProduct'>
      <div className='snackbar'>
        <Snackbar
          open={open}
          autoHideDuration={2000}
          onClose={handleClose}
          anchorOrigin={{
            horizontal: 'right',
            vertical: 'top',
          }}>
          <Alert variant='filled' onClose={handleClose} severity='success'>
            Product Added Successfully!
          </Alert>
        </Snackbar>
      </div>
      <div className='addProduct__header'>
        <h3>ADD NEW PRODUCT</h3>
        <Button variant='outlined' size='small'>
          <Link to='/dashboard/products'>Back to Products</Link>
        </Button>
      </div>
      <div className='addProduct__form'>
        <form
          onSubmit={addProduct}
          className='addProduct__form'
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
            value={productData.category}
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
          <button
            // onClick={addProduct}
            type='submit'
            className='w-full sm:w-3/4 md:w-1/2 lg:w-1/4 py-2 border border-orange-400 bg-orange-600 rounded text-slate-200 mt-6'>
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddProduct;
