import { createSlice } from '@reduxjs/toolkit';

import axios from 'axios';

export const createCategorySlice = createSlice({
  name: 'createNewCategory',
  initialState: {
    category: {},
    loading: false,
    success: false,
    error: null,
  },
  reducers: {
    createCategoryRequest: (state) => {
      console.log('iam in createProductSlice  request...');
      state.loading = true;
    },
    createCategorySuccess: (state, action) => {
      state.loading = false;
      state.success = true;
      state.category = action.payload;
    },
    createCategoryFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    createCategoryReset: (state) => {
      state.product = {};
    },
  },
});

export const {
  createCategoryRequest,
  createCategorySuccess,
  createCategoryFail,
} = createCategorySlice.actions;

// create product

export const addCategory = (category) => async (dispatch, getState) => {
  try {
    dispatch(createCategoryRequest());
    console.log('here ....');
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
    console.log('iam in create category slice 1');
    console.log(category);
    const response = await axios.post(
      '/api/dashboard/categories',
      category,
      config
    );
    console.log(response);
    console.log('iam in create category slice 2');

    dispatch(createCategorySuccess(response.data));
  } catch (error) {
    console.log('iam in create category slice 3');
    const err =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(createCategoryFail(err));
  }
};

export default createCategorySlice.reducer;
