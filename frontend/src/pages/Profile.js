import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { CircularProgress } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
// import Alert from '@material-ui/lab/Alert';
import {
  userProfileDetails,
  getUserDetails,
  // updateUserDetails,
} from '../features/user/userDetails.js';
import { getMyOrders } from '../features/orders/getOrdersSlice';
import { updateUserProfile } from '../features/user/userUpdateProfileSlice';
import './Profile.css';
import RowContainer from '../components/RowContainer.js';

function Profile() {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const dispatch = useDispatch();
  const { userDetails } = useSelector(userProfileDetails);
  const { userInfo } = useSelector((state) => state.userLogin);

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    } else {
      if (userInfo) {
        setUsername(userInfo.name);
        setEmail(userInfo.email);
      }
      dispatch(getUserDetails('profile'));
      dispatch(getMyOrders());
    }
  }, [dispatch, history, userInfo]);

  const handleUpdate = (e) => {
    e.preventDefault();
    alert('upadate profile clicked');

    if (password !== confirmPassword) {
      alert('passwords do not match');
    } else {
      dispatch(
        updateUserProfile({
          _id: userDetails._id,
          name: username,
          email,
          password,
        })
      );
      setPassword('');
      setConfirmPassword('');
    }
  };

  return (
    <RowContainer>
      <div className='profile'>
        <div className='profile__left'>
          <h2>User Profile</h2>
          <form onSubmit={handleUpdate} className='profile__form'>
            <div className='profile__formEmail'>
              <label>Name</label>
              <input
                value={username}
                type='text'
                placeholder='Username'
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className='profile__formEmail'>
              <label>Email</label>
              <input
                value={email}
                type='email'
                placeholder='Email'
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className='profile__formPassword'>
              <label>Password</label>
              <input
                value={password}
                type='password'
                placeholder='Password'
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className='profile__formPasswordRepeat'>
              <label>Confirm Password</label>
              <input
                value={confirmPassword}
                type='password'
                placeholder='Password'
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <button>Update</button>
          </form>
        </div>
      </div>
    </RowContainer>
  );
}

export default Profile;
