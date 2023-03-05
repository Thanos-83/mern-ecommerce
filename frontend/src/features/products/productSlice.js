import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const productDetailsSlice = createSlice({
  name: 'productDetails',
  initialState: {
    product: { reviews: [] },
    loading: false,
    error: null,
  },
  reducers: {
    productDetailsRequest: (state) => {
      // state.product = { ...state.product };
      state.loading = true;
    },
    productDetailsRequestSuccess: (state, action) => {
      state.product = action.payload;
      state.loading = false;
    },
    productDetailsRequestFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  productDetailsRequest,
  productDetailsRequestSuccess,
  productDetailsRequestFail,
} = productDetailsSlice.actions;

//----------- ASYNC logic ------------

export const listProductDetails = (id) => async (dispatch) => {
  try {
    dispatch(productDetailsRequest());
    console.log('iam here 1 . . . ');

    const { data } = await axios.get(`/api/products/${id}`);
    console.log('iam here 2 . . . ');
    console.log(data);
    dispatch(productDetailsRequestSuccess(data));
  } catch (error) {
    const err =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(productDetailsRequestFail(err));
  }
};

export const productDetails = (state) => state.productDetails;

export default productDetailsSlice.reducer;
