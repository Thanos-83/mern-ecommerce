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
  const {
    // loading: loadingOrders,
    // error: errorOrders,
    myOrders,
  } = useSelector((state) => state.myOrders);
  console.log(myOrders);
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
        <div className='profile__right'>
          <h2>My Orders</h2>
          <div className='orders'>
            {myOrders.map((order) => (
              <div className='order'>
                <div className='orders__id'>
                  <h2>ID</h2>
                  <p>{order._id}</p>
                </div>
                <div className='orders__date'>
                  <h2>DATE</h2>
                  <p>{order.createdAt.substring(0, 10)}</p>
                </div>
                <div className='orders__price'>
                  <h2>TOTAL</h2>
                  <p>{order.totalPrice}</p>
                </div>
                <div className='orders__isPaid'>
                  <h2>PAID</h2>
                  <p>{order.isPaid ? order.paidAt.substring(0, 10) : 'No'}</p>
                </div>
                <div className='orders__isDelivered'>
                  <h2>DELIVERED</h2>
                  <p>{order.isDelivered ? order.deliveredAt : 'No'}</p>
                </div>
                <div className='orders__details'>
                  <button>Details</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </RowContainer>
  );
}

export default Profile;
