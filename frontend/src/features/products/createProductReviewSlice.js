import { createSlice } from '@reduxjs/toolkit';

import axios from 'axios';

export const createProductReviewSlice = createSlice({
  name: 'createNewProductReview',
  initialState: {
    product: {},
    loading: false,
    success: false,
    error: null,
  },
  reducers: {
    createProductReviewRequest: (state) => {
      // console.log('iam in createProductReviewReviewSlice  request...');
      state.loading = true;
    },
    createProductReviewSuccess: (state, action) => {
      state.loading = false;
      state.success = true;
      // state.product = action.payload;
    },
    createProductReviewFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    createProductReviewReset: (state) => {
      state.product = {};
    },
  },
});

export const {
  createProductReviewRequest,
  createProductReviewSuccess,
  createProductReviewFail,
} = createProductReviewSlice.actions;

// create product review

export const createProductReview =
  (productID, review) => async (dispatch, getState) => {
    try {
      dispatch(createProductReviewRequest());
      console.log('productID: ', productID, 'review data: ', review);
      const {
        userLogin: { userInfo },
      } = getState();

      if (!userInfo) {
        createProductReviewFail('You have to loggedin to leave a review!');
        throw new Error('You have to loggedin to leave a review!');
      }

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const response = await axios.post(
        `/api/products/${productID}/reviews/`,
        review,
        config
      );
      console.log(response);
      // console.log('iam here 2');
      dispatch(createProductReviewSuccess());
    } catch (error) {
      console.log('Leave review error: ', error);
      const err =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch(createProductReviewFail(err));
    }
  };

export default createProductReviewSlice.reducer;
