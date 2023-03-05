import { createSlice } from '@reduxjs/toolkit';

import axios from 'axios';

export const createProductSlice = createSlice({
  name: 'createNewProduct',
  initialState: {
    product: {},
    loading: false,
    success: false,
    error: null,
  },
  reducers: {
    createProductRequest: (state) => {
      console.log('iam in createProductSlice  request...');
      state.loading = true;
    },
    createProductSuccess: (state, action) => {
      state.loading = false;
      state.success = true;
      state.product = action.payload;
    },
    createProductFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    createProductReset: (state) => {
      state.product = {};
    },
  },
});

export const { createProductRequest, createProductSuccess, createProductFail } =
  createProductSlice.actions;

// create product

export const addProductToDB = (product) => async (dispatch, getState) => {
  try {
    dispatch(createProductRequest());

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    console.log('iam in create product slice');
    console.log('create product slice: ', product);
    const response = await axios.post(
      '/api/dashboard/products/add/',
      product,
      config
    );
    console.log(response);
    console.log('iam here 2');
    dispatch(createProductSuccess(response.data));
  } catch (error) {
    console.log('iam here 3');
    const err =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(createProductFail(err));
  }
};

export default createProductSlice.reducer;
