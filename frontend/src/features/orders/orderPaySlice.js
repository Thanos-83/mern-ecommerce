import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const orderPaySlice = createSlice({
  name: 'orderPay',
  initialState: {
    order: {},
    loadingPay: false,
    error: null,
    successPay: false,
  },
  reducers: {
    orderPayRequest: (state) => {
      state.loadingPay = true;
    },
    orderPaySuccess: (state, action) => {
      state.loadingPay = false;
      state.successPay = true;
      state.order = action.payload;
    },
    orderPayFail: (state, action) => {
      state.loadingPay = false;
      state.error = action.payload;
    },
    orderPayReset: (state) => {
      state.loadingPay = false;
      state.successPay = false;
    },
  },
});

export const {
  orderPayRequest,
  orderPaySuccess,
  orderPayFail,
  orderPayReset,
} = orderPaySlice.actions;

// ====== Actions & Async logic======

export const payOrder = (orderId, paymentResult) => async (
  dispatch,
  getState
) => {
  try {
    dispatch(orderPayRequest());
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.put(
      `/api/orders/${orderId}/pay`,
      paymentResult,
      config
    );
    dispatch(orderPaySuccess(data));
  } catch (error) {
    console.log(error);
    // dispatch(orderDtailsFail(error.response.data.message));
    const err = error.response.data.message
      ? error.reponse.data.message
      : error.message;
    dispatch(orderPayFail(err));
  }
};

export default orderPaySlice.reducer;
