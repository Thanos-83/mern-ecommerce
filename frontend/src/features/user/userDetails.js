import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const userDetailsSlice = createSlice({
  name: 'userDetails',
  initialState: {
    userDetails: null,
    loading: false,
    error: null,
  },

  reducers: {
    getUserProfileRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    getUserProfileSuccess: (state, action) => {
      state.userDetails = action.payload;
      state.loading = false;
      state.error = null;
    },
    getUserProfileFail: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  getUserProfileRequest,
  getUserProfileSuccess,
  getUserProfileFail,
} = userDetailsSlice.actions;

// ----async logic -----------
export const getUserDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch(getUserProfileRequest());
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const response = await axios.get(`/api/users/${id}`, config);
    // console.log(response);
    dispatch(getUserProfileSuccess(response.data));
  } catch (error) {
    // console.log('hello error...');
    console.log(error.message);
    // const err =
    //   error.response && error.response.data.message
    //     ? error.response.data.message
    //     : error.message;
    dispatch(getUserProfileFail(error.message));
  }
};

export const userProfileDetails = (state) => state.userDetails;

export default userDetailsSlice.reducer;
