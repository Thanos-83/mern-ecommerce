import React, { useEffect } from 'react';
import './Orders.css';
import RowContainer from './RowContainer';
import { useSelector, useDispatch } from 'react-redux';
import CustomerOrder from './CustomerOrder';
import { getMyOrders } from '../features/orders/getOrdersSlice';
import Skeleton from '@mui/material/Skeleton';
function Orders() {
  const dispatch = useDispatch();
  const {
    loading,
    // error: errorOrders,
    myOrders,
  } = useSelector((state) => state.myOrders);
  console.log(myOrders);
  useEffect(() => {
    dispatch(getMyOrders());
  }, [dispatch]);
  return (
    <RowContainer>
      <div className='orders'>
        <h1>Your Orders</h1>
        <div className='orders__container pb-10'>
          {loading ? (
            <>
              <Skeleton
                animation='wave'
                height={40}
                style={{ marginBottom: 10 }}
              />
              <Skeleton
                animation='wave'
                height={40}
                style={{ marginBottom: 10 }}
              />
              <Skeleton
                animation='wave'
                height={40}
                style={{ marginBottom: 10 }}
              />
              <Skeleton
                animation='wave'
                height={40}
                style={{ marginBottom: 10 }}
              />
              <Skeleton
                animation='wave'
                height={40}
                style={{ marginBottom: 10 }}
              />
              <Skeleton
                animation='wave'
                height={40}
                style={{ marginBottom: 10 }}
              />
            </>
          ) : (
            <>
              <h2 className='text-lg font-semibold'>
                {myOrders.length} {myOrders.length > 1 ? ' Orders' : ' Order'}
              </h2>
              <div className='orders__list mt-5 space-y-4'>
                {myOrders.map((order) => (
                  <CustomerOrder key={order._id} order={order} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </RowContainer>
  );
}

export default Orders;
