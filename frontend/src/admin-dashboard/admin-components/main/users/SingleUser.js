import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './SingleUser.css';
import { Link, useHistory } from 'react-router-dom';
import Divider from '@mui/material/Divider';
import { Button, TextField } from '@mui/material';

function SingleUser({ match }) {
  const history = useHistory();
  const [userInfo, setUserInfo] = useState(null);
  useEffect(() => {
    axios
      .get(`/api/dashboard/users/${match.params.userID}`)
      .then((response) => setUserInfo(response.data.user))
      .catch((error) => {
        console.log('Fetch user error: ', error);
      });
  }, [match.params.userID]);
  console.log(userInfo);

  const lastOrderDate =
    userInfo?.orders[0] && new Date(userInfo?.orders[0].createdAt).getTime();
  console.log('last order: ', lastOrderDate);
  const userRegisterDate = new Date(userInfo?.createdAt).getTime();
  const currentDate = new Date().getTime();
  console.log((currentDate - userRegisterDate) / (1000 * 3600 * 24));
  const userOrderDate = userInfo?.orders.map((order) =>
    new Date(order.createdAt).toLocaleDateString()
  );
  return (
    <div className='singleUser'>
      <div className='singleUser__header'>
        <h1>{userInfo?.name}</h1>
        <Button variant='outlined' size='small'>
          <Link to='/dashboard/users'>Back to Users</Link>
        </Button>
      </div>
      <div className='singleUser__info'>
        <div className='singleUser__info-left'>
          <div className='singleUser__profile'>
            <div className='singleUser__profile-image'>
              <img
                src={`${
                  userInfo?.avatar
                    ? userInfo?.avatar
                    : 'https://i.pravatar.cc/300'
                }`}
                alt='single user'
              />
            </div>
            <div className='singleUser__profile-contact'>
              <p>{userInfo?.name}</p>
              <p>{userInfo?.email}</p>
              <p>+38 (094) 730-24-25</p>
            </div>
          </div>
          <Divider variant='middle' />
          <div className='singleUser__activity'>
            <div>
              <h3>Last Order</h3>
              <p>
                {lastOrderDate &&
                  ((currentDate - lastOrderDate) / (1000 * 3600 * 24) / 30 < 1
                    ? Math.ceil(
                        (currentDate - lastOrderDate) / (1000 * 3600 * 24)
                      ) + ' days ago - '
                    : Math.ceil(
                        (currentDate - lastOrderDate) / (1000 * 3600 * 24) / 30
                      ) + ' months ago - ')}
                {lastOrderDate && (
                  <Link
                    to={`/dashboard/orders/${userInfo?.orders[0]._id}/edit`}>
                    #{userInfo?.orders[0]._id.slice(0, 8)}...
                  </Link>
                )}
                {!lastOrderDate && 'No Orders Yet!'}
              </p>
            </div>
            <div>
              <h3>Average Order Value</h3>
              <p>$574.00</p>
            </div>
            <div>
              <h3>Registered</h3>
              <p>
                {(currentDate - userRegisterDate) / (1000 * 3600 * 24) / 30 < 1
                  ? Math.ceil(
                      (currentDate - userRegisterDate) / (1000 * 3600 * 24)
                    ) + ' days ago'
                  : Math.ceil(
                      (currentDate - userRegisterDate) / (1000 * 3600 * 24) / 30
                    ) + ' months ago'}
              </p>
            </div>
            <div></div>
          </div>
        </div>
        <div className='singleUser__info-right'>
          <div className='singleUser__notes'>
            <TextField
              id='standard-multiline-static'
              // label='Multiline'
              fullWidth
              multiline
              rows={4}
              placeholder='Notes about customer'
              // variant='standard'
            />
          </div>
          <div className='singleUser__orders'>
            <div className='singleUser__orders-header'>
              <h2>Orders</h2>
              <p>
                Total spent $
                {userInfo?.orders
                  .map((order) => order.totalPrice)
                  .reduce(
                    (accum, currentValue) => accum + currentValue,
                    0
                  )}{' '}
                on {userInfo?.orders.length} orders
              </p>
            </div>
            <div className='singleUser__orders-list'>
              {userInfo?.orders.map((order, index) => (
                <div key={order._id}>
                  <Link
                    to={`/dashboard/orders/${order?._id}/edit`}
                    className='order__id'>
                    #{order?._id.slice(0, 8)}...
                  </Link>
                  <p className='order__date'>{userOrderDate[index]}</p>
                  <p className='order__status'>
                    {order.status ? order?.status : 'Recieved'}
                  </p>
                  <p className='order__items'>
                    {order?.orderItems.length} item(s)
                  </p>
                  <p className='order__total'>{order?.totalPrice} €</p>
                </div>
              ))}
            </div>
          </div>
          <div className='singleUser__address'>
            <div className='singleUser__address-header'>
              <h2>Addresses</h2>
            </div>
            <div className='singleUser__address-list'>
              <p>{userInfo?.name}</p>
              <p>Random Federation 115302, Moscow ul. Varshavskaya, 15-2-178</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleUser;
