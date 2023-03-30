import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Checkbox, MenuItem, Select } from '@mui/material';
import { Link } from 'react-router-dom';
import Currency from 'react-currency-formatter';
import moment from 'moment';

import './EditOrder.css';

const label = { inputProps: { 'aria-label': 'Order Paid Checkbox' } };

function EditOrder({ match }) {
  const [orderInfo, setOrderInfo] = useState(null);
  const [orderStatus, setOrderStatus] = useState('');
  const [checked, setChecked] = useState(false);
  console.log(orderInfo);
  const handleChangeStatus = (e) => {
    setOrderStatus(e.target.value);
  };
  useEffect(() => {
    axios
      .get(`/api/dashboard/orders/${match.params.orderID}/edit`)
      .then((res) => {
        setOrderInfo(res.data.order);
        setChecked(res.data.order.isPaid);
        setOrderStatus(res.data.order.status);
      })
      .catch((error) => console.log(error));
  }, [match.params.orderID]);
  const orderDate = new Date(orderInfo?.createdAt).toLocaleDateString();
  console.log('is paid: ', typeof orderInfo?.isPaid);
  return (
    <div className='editOrder w-full max-w-7xl mx-auto'>
      <div className='flex items-center justify-between pb-4 border-b border-b-slate-300'>
        <h1 className='text-3xl '>Edit Order</h1>
        <Button variant='outlined' size='small'>
          <Link to='/dashboard/orders'>Back to Orders</Link>
        </Button>
      </div>
      <div className='editOrder__content mt-8  p-4 bg-white'>
        <div className='editOrder__top'>
          <h1>
            Order ID: <span> {orderInfo?._id} </span>
          </h1>
          <p>
            Order Date: <span>{orderDate}</span>
          </p>
        </div>
        <div className='editOrder__products'>
          <ul>
            {orderInfo?.orderItems.map((item) => (
              <li>
                <div className='editOrder__productImage'>
                  <img src={item.image} alt='order item' />
                </div>
                <div className='editOrder__productInfo'>
                  <p>{item.name}</p>
                  <div>
                    <p className='editOrder__productPrice'>
                      <Currency quantity={item.price} currency='EUR' />
                    </p>
                    <p className='editOrder__productQty'>
                      Qty: <span>{item.qty}</span>
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className='editOrder__status'>
          <p>Order Status</p>
          <Select
            // labelId='demo-simple-select-label'
            id='select-status'
            value={orderStatus}
            defaultValue='pending'
            // label='Age'
            size='small'
            onChange={handleChangeStatus}>
            <MenuItem value={'pending'}>Pending</MenuItem>
            <MenuItem value={'delivered'}>Delivered</MenuItem>
            <MenuItem value={'canceled'}>Canceled</MenuItem>
          </Select>
        </div>

        <div className='editOrder__paidStatus'>
          <p>Is Order Paid? </p>
          <Checkbox {...label} checked={checked} color='success' />

          {orderInfo?.isPaid && (
            <span className='text-sm py-1 px-2 rounded bg-green-700 !text-white'>
              Order paid at {moment(orderInfo?.createdAt).format('LL')}
            </span>
          )}
        </div>

        <div className='editOrder__shipping'>
          <h2>Shipping to:</h2>
          <p>
            Name : <span>{orderInfo?.user.name}</span>
          </p>
          <p>
            Email : <span>{orderInfo?.user.email}</span>
          </p>
          <p>
            Address :{' '}
            <span>
              {orderInfo?.shippingAddress.city} ,{' '}
              {orderInfo?.shippingAddress.street}{' '}
              {orderInfo?.shippingAddress.streetNumber}, T.K.{' '}
              {orderInfo?.shippingAddress.postalCode}
            </span>
          </p>
        </div>

        <div className='editOrder__summary'>
          <h2>Order Summary</h2>
          <div>
            <div className='editOrder__summary-itemsPrice'>
              <p>Item(s) Price:</p>
              <span>
                <Currency
                  quantity={
                    orderInfo?.orderItems
                      .map((item) => item.price.toFixed(2) * item.qty)
                      .reduce(
                        (accumulator, currentValue) =>
                          accumulator + currentValue,
                        0
                      ) / 1.24
                  }
                  currency='EUR'
                />
              </span>
            </div>
            <div className='editOrder__summary-taxPrice'>
              <p>Tax Price:</p>
              <span>
                <Currency
                  quantity={
                    orderInfo?.orderItems
                      .map((item) => item.price.toFixed(2) * item.qty)
                      .reduce(
                        (accumulator, currentValue) =>
                          accumulator + currentValue,
                        0
                      ) -
                    orderInfo?.orderItems
                      .map((item) => item.price.toFixed(2) * item.qty)
                      .reduce(
                        (accumulator, currentValue) =>
                          accumulator + currentValue,
                        0
                      ) /
                      1.24
                  }
                  currency='EUR'
                />
              </span>
            </div>
            <div className='editOrder__summary-totalPrice'>
              <p>Total Price:</p>
              <span>
                <Currency quantity={orderInfo?.totalPrice} currency='EUR' />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditOrder;
