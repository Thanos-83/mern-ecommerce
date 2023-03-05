import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const orderDetailsSlice = createSlice({
  name: 'order',
  initialState: {
    order: {},
    // orderItems: [],
    // orderShippingAddress: {},
    loading: true,
    success: false,
    error: false,
  },
  reducers: {
    orderDetailsRequest: (state) => {
      state.loading = true;
    },
    orderDetailsSuccess: (state, action) => {
      state.loading = false;
      state.success = true;
      state.order = action.payload;
    },
    orderDetailsFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  orderDetailsRequest,
  orderDetailsSuccess,
  orderDetailsFail,
} = orderDetailsSlice.actions;

// ====== Actions & Async logic======

export const getOrderDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch(orderDetailsRequest());
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(`/api/orders/${id}`, config);
    dispatch(orderDetailsSuccess(data));
  } catch (error) {
    console.log(error);
    // dispatch(orderDtailsFail(error.response.data.message));
    const err = error.response.data.message
      ? error.reponse.data.message
      : error.message;
    dispatch(orderDetailsFail(err));
  }
};

export default orderDetailsSlice.reducer;
