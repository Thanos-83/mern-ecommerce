import React, { useEffect, useState } from 'react';
import Order from './Order.js';
import axios from 'axios';
function Orders() {
  const [orders, setOrders] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    axios
      .get('/api/dashboard/orders')
      .then((response) => {
        setOrders(response.data.orders);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);
  //   console.log(orders);
  return (
    <div className='orders'>
      <h1>Orders</h1>
      <div className='orders__container'>
        {orders?.map((order) => (
          <Order key={order._id} order={order} />
        ))}
      </div>
    </div>
  );
}

export default Orders;
