import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { login } from './userLoginSlice';

export const userRegisterSlice = createSlice({
  name: 'userRegister',
  initialState: {
    userInfo: null,
    loading: false,
    error: false,
  },

  reducers: {
    userRegisterRequest: (state) => {
      state.loading = true;
      state.error = false;
    },
    userRegisterSuccess: (state, action) => {
      state.userInfo = action.payload;
      state.loading = false;
      state.error = false;
    },
    userRegisterFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  userRegisterRequest,
  userRegisterSuccess,
  userRegisterFail,
} = userRegisterSlice.actions;

// ------ async logic ----------------

export const register = (username, email, password) => async (dispatch) => {
  try {
    dispatch(userRegisterRequest());
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axios.post(
      '/api/users',
      { name: username, email, password },
      config
    );
    dispatch(userRegisterSuccess(data));
    localStorage.setItem('userInfo', JSON.stringify(data));

    dispatch(login(email, password));
  } catch (error) {
    const err =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(userRegisterFail(err));
  }
};

export const userRegister = (state) => state.userRegister;

export default userRegisterSlice.reducer;
