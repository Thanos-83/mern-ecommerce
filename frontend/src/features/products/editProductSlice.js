import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const editProductSlice = createSlice({
  name: 'editProduct',
  initialState: {
    product: {},
    loading: false,
    success: false,
    error: null,
  },
  reducers: {
    editProductRequest: (state) => {
      console.log('iam in edit, request...');
      state.loading = true;
    },
    editProductSuccess: (state, action) => {
      state.product = action.payload;
      state.loading = false;
      state.success = true;
    },
    editProductFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    editProductReset: (state) => {
      state.product = {};
      state.success = false;
      state.loading = false;
    },
  },
});

export const {
  editProductRequest,
  editProductSuccess,
  editProductFail,
  editProductReset,
} = editProductSlice.actions;

// create product

export const updateProduct = (productData) => async (dispatch, getState) => {
  try {
    dispatch(editProductRequest());

    const {
      userLogin: { userInfo },
    } = getState();

    console.log(userInfo);
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    console.log(productData);
    // const product = { ...productData, user: userInfo._id };
    const response = await axios.put(
      `/api/dashboard/products/${productData.id}/edit`,
      productData,
      config
    );
    console.log(response.data);
    console.log('product updated succesfully . . .');
    dispatch(editProductSuccess(response.data));
  } catch (error) {
    console.log(error);
    const err =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(editProductFail(err));
  }
};

export default editProductSlice.reducer;
