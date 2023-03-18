import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const deleteProductSlice = createSlice({
  name: 'deleteProduct',
  initialState: {
    loading: false,
    success: false,
    error: null,
  },
  reducers: {
    deleteProductRequest: (state) => {
      console.log('iam in delete, request...');
      state.loading = true;
    },
    deleteProductSuccess: (state) => {
      state.loading = false;
      state.success = true;
    },
    deleteProductFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteProductReset: (state) => {
      // state.loading = false;
      state.success = false;
    },
  },
});

export const {
  deleteProductRequest,
  deleteProductSuccess,
  deleteProductFail,
  deleteProductReset,
} = deleteProductSlice.actions;

// Delete product

export const deleteProduct = (id) => async (dispatch, getState) => {
  try {
    console.log('product ID: ', id);
    dispatch(deleteProductRequest());
    console.log('iam here');
    // const userInfo = getState();
    const {
      userLogin: { userInfo },
    } = getState();

    console.log('User Info: ', userInfo);
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    await axios.delete(`/api/dashboard/products/${id}`, config);
    console.log('product deleted succesfully . . .');
    dispatch(deleteProductSuccess());
  } catch (error) {
    console.log(error);
    const err =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(deleteProductFail(err));
  }
};

export default deleteProductSlice.reducer;
