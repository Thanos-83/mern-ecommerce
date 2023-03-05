import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const orderSlice = createSlice({
  name: 'order',
  initialState: {
    order: null,
    loading: false,
    success: false,
    error: null,
  },
  reducers: {
    orderCreateRequest: (state) => {
      state.loading = true;
    },
    orderCreateSuccess: (state, action) => {
      state.order = action.payload;
      state.success = true;
      state.loading = false;
    },
    orderCreateFail: (state, action) => {
      console.log('hey iam here....');
      state.loading = false;
      state.success = false;
      state.error = action.payload;
    },
  },
});

export const {
  orderCreateRequest,
  orderCreateSuccess,
  orderCreateFail,
} = orderSlice.actions;

// ======= Order Actions - Async logic ========

export const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch(orderCreateRequest());

    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    // const { data } = await axios.post('/api/order', order, config);
    // dispatch(orderCreateSuccess(data));

    axios
      .post('/api/orders', order, config)
      .then((response) => dispatch(orderCreateSuccess(response.data)))
      .catch((error) => {
        dispatch(orderCreateFail(error.message));
      });
  } catch (error) {
    console.log(error);
    dispatch(orderCreateFail(error.response.data.message));

    const err = error.response.data.message
      ? error.reponse.data.message
      : error.message;
    dispatch(orderCreateFail(err));
  }
};

export default orderSlice.reducer;
