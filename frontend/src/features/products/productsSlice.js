import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const productsSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    loading: false,
    error: null,
    pages: null,
    page: null,
  },
  reducers: {
    productsRequest: (state) => {
      state.loading = true;
    },
    productsRequestSuccess: (state, action) => {
      state.products = action.payload.products;
      state.loading = false;
      state.error = null;
      state.pages = action.payload.pages;
      state.page = action.payload.page;
    },
    productsRequestFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { productsRequest, productsRequestSuccess, productsRequestFail } =
  productsSlice.actions;

// -------- async logic -------------
export const listProducts =
  (pageNumber = '') =>
  async (dispatch) => {
    try {
      dispatch(productsRequest());
      console.log('here 1');
      const response = await axios.get(
        `/api/products?pageNumber=${pageNumber}`
      );
      console.log('response: ', response);
      dispatch(productsRequestSuccess(response.data));
      console.log('here 2');
    } catch (error) {
      console.log(error);
      const err =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch(productsRequestFail(err));
    }
  };

// The function below is called a selector and allows us to select a value from the state.
//Selectors can also be defined inline where they're used instead of in the slice file.
//For example: `useSelector((state) => state.counter.value)`
export const productsList = (state) => state.productsList;

export default productsSlice.reducer;
