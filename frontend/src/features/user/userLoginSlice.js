import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const userInfoFromLocaleStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

export const userLoginSlice = createSlice({
  name: 'userLogin',
  initialState: {
    userInfo: userInfoFromLocaleStorage,
    loading: false,
    error: null,
  },

  reducers: {
    userLoginRequest: (state) => {
      state.loading = true;
      state.error = false;
    },
    userLoginSuccess: (state, action) => {
      state.userInfo = action.payload;
      state.loading = false;
      state.error = false;
    },
    userLoginFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    userLogout: (state) => {
      state.userInfo = null;
      localStorage.removeItem('userInfo');
    },
  },
});

export const {
  userLoginRequest,
  userLoginSuccess,
  userLoginFail,
  userLogout,
} = userLoginSlice.actions;

// ------  Async logic -------
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch(userLoginRequest());
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await axios.post(
      '/api/users/login',
      { email, password },
      config
    );
    // console.log(response);
    dispatch(userLoginSuccess(response.data));

    localStorage.setItem('userInfo', JSON.stringify(response.data));
  } catch (error) {
    // console.log('hello error...');
    console.log(error.message);
    // const err =
    //   error.response && error.response.data.message
    //     ? error.response.data.message
    //     : error.message;
    // dispatch(userLoginFail(err));
  }
};

export const userLogin = (state) => state.userLogin;
export default userLoginSlice.reducer;
