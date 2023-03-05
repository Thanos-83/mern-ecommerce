import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState: {
    categories: [],
    loading: false,
    error: false,
  },
  reducers: {
    categoriesRequest: (state) => {
      state.loading = true;
    },
    categoriesRequestSuccess: (state, action) => {
      state.categories = action.payload;
      state.loading = false;
      state.error = null;
    },
    categoriesRequestFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  categoriesRequest,
  categoriesRequestSuccess,
  categoriesRequestFail,
} = categoriesSlice.actions;

// -------- async logic -------------
export const getCategories = () => async (dispatch) => {
  try {
    dispatch(categoriesRequest());
    const response = await axios.get('/api/dashboard/categories');
    dispatch(categoriesRequestSuccess(response.data));
  } catch (error) {
    const err =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(categoriesRequestFail(err));
  }
};

export default categoriesSlice.reducer;
