import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getMyOrdersSlice = createSlice({
  name: 'myOrders',
  initialState: {
    myOrders: [],
    loading: false,
    error: null,
  },
  reducers: {
    getMyOrdersRequest: (state) => {
      state.loading = true;
    },
    getMyOrdersSuccess: (state, action) => {
      state.loading = false;
      state.success = true;
      state.myOrders = action.payload;
    },
    getMyOrdersFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    getMyOrdersReset: (state) => {
      state.myOrders = [];
    },
  },
});

export const {
  getMyOrdersRequest,
  getMyOrdersSuccess,
  getMyOrdersFail,
  getMyOrdersReset,
} = getMyOrdersSlice.actions;

// === Actions and Async logic
export const getMyOrders = () => async (dispatch, getState) => {
  try {
    dispatch(getMyOrdersRequest());
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/orders/myorders`, config);

    dispatch(getMyOrdersSuccess(data));
  } catch (error) {
    const err =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch(getMyOrdersFail(err));
  }
};

export default getMyOrdersSlice.reducer;
