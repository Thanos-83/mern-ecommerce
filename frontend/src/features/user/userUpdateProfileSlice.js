import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { getUserProfileSuccess } from './userDetails';

export const userUpdateProfile = createSlice({
  name: 'userUpdateProfile',
  initialState: {
    userInfo: null,
    loading: false,
    error: null,
    success: false,
  },

  reducers: {
    userUpdateProfileRequest: (state) => {
      state.loading = true;
    },
    userUpdateProfileSuccess: (state, action) => {
      state.userInfo = action.payload;
      state.loading = false;
      state.success = true;
    },
    userUpdateProfileFail: (state, action) => {
      state.error = action.payload;
    },
    userUpdateProfileReset: (state) => {
      state.loading = false;
    },
  },
});

export const {
  userUpdateProfileRequest,
  userUpdateProfileSuccess,
  userUpdateProfileFail,
} = userUpdateProfile.actions;

// ----- async factions ----------
export const updateUserProfile = (user) => async (dispatch, getState) => {
  try {
    dispatch(userUpdateProfileRequest());
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    console.log(userInfo);
    console.log(user);
    const response = await axios.put('api/users/profile', user, config);
    console.log(response);
    dispatch(userUpdateProfileSuccess(response.data));
    dispatch(getUserProfileSuccess(response.data));
  } catch (error) {
    console.log(error);
    dispatch(userUpdateProfileFail(error.message));
  }
};

export default userUpdateProfile.reducer;
