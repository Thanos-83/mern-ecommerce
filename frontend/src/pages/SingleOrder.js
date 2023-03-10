import React, { useEffect, useState } from 'react';
import { Collapse, CircularProgress } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './SingleOrder.css';
import { getOrderDetails } from '../features/orders/orderDetailsSlice';
import { orderPayReset } from '../features/orders/orderPaySlice.js';
// import { PayPalButton } from 'react-paypal-button-v2';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function SingleOrder() {
  const [open, setOpen] = useState(true);
  const [sdkReady, setSdkReady] = useState(false);
  // const orderId = match.params.id;
  const params = useParams();
  const orderId = params.id;
  const dispatch = useDispatch();
  const singleOrder = useSelector((state) => state.orderDetails);
  const { order, loading, error } = singleOrder;
  const orderPaid = useSelector((state) => state.orderPay);
  const { loadingPay, successPay } = orderPaid;

  useEffect(() => {
    const addPaypalScript = async () => {
      const { data: clientId } = await axios.get('/api/config/paypal');
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&debug=true`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };

    // addPaypalScript();

    if (!order || order._id !== orderId || successPay) {
      dispatch(orderPayReset());
      dispatch(getOrderDetails(orderId));
    } else {
      if (!order.isPaid) {
        if (!window.paypal) {
          addPaypalScript();
        } else {
          setSdkReady(true);
        }
      }
    }
  }, [order, orderId, successPay, dispatch]);

  // const successPaymentHandler = (paymentResult) => {
  //   console.log(paymentResult);
  //   dispatch(payOrder(orderId, paymentResult));
  // };
  return (
    <div className='singleOrder'>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Collapse in={open}>
          <Alert
            variant='filled'
            severity='error'
            onClose={() => setOpen(false)}>
            {error}
          </Alert>
        </Collapse>
      ) : (
        <div className='singleOrder__details'>
          <h3>Order: {order._id}</h3>
          <div className='singleOrder__top'>
            <div className='order__address'>
              <h3>Shipping Info: </h3>
              <p>
                <strong>Name</strong>: {order.user.name}
              </p>
              <p>
                <strong>Email</strong>:
                <a href={`mailto: ${order.user.email}`}> {order.user.email} </a>
              </p>
              <p>
                <strong>Address</strong>: {order.shippingAddress.street}{' '}
                {order.shippingAddress.streetNumber},{' '}
                {order.shippingAddress.city}, ZIP:{' '}
                {order.shippingAddress.postalCode}
              </p>

              <p>
                {order.isDelivered ? (
                  <Alert severity='success'>Order delivered</Alert>
                ) : (
                  <Alert severity='error'>Order not yet delivered</Alert>
                )}
              </p>
            </div>
            <div className='order__paymentMethod'>
              <h3>Payment Method</h3>
              <p>Method: {order.paymentMethod}</p>
              <p>
                {order.isPaid ? (
                  <Alert variant='filled' severity='success'>
                    ORder paid at {order.paidAt}
                  </Alert>
                ) : (
                  <Alert severity='error'>Order not yet paid!</Alert>
                )}
              </p>
            </div>
            <div className='order__items'>
              <h3>Order Products</h3>
              {order.orderItems.length >= 1 ? (
                <>
                  {order.orderItems.map((product, index) => (
                    <div className='order__itemsInfo'>
                      <Link to={`/product/${product._id}`}>
                        <img src={product.image} alt='' />
                      </Link>
                      <Link to={`/product/${product._id}`}>
                        <h3>{product.name}</h3>
                      </Link>
                      <p>
                        {product.qty}x{product.price} ={' '}
                        {(product.qty * product.price).toFixed(2)} $
                      </p>
                    </div>
                  ))}
                </>
              ) : (
                <p>No products in your order</p>
              )}
            </div>
          </div>
          <div className='singleOrder__bottom'>
            <h3>Order Summary</h3>
            <div className='order__summary'>
              <div className='order__summaryItems'>
                <h4>Items : {order.orderItems.length}</h4>
              </div>
              <div className='order__summaryShipping'>
                <h4>
                  Shipping :{' '}
                  {order.shippingPrice === 0 ? 'Free' : order.shippingPrice}
                </h4>
                <p></p>
              </div>
              <div className='order__summaryTax'>
                <h4>Tax : 24% </h4>
                <p></p>
              </div>
              <div className='order__summaryTotal'>
                <h4>Total : {order.totalPrice}$</h4>
                <p></p>
              </div>
            </div>
            <div className='order__btns'>
              {loadingPay && <CircularProgress />}{' '}
              {!sdkReady ? null : (
                // <CircularProgress />
                // <PayPalButton
                //   amount={order.totalPrice}
                //   onSuccess={successPaymentHandler}
                // />
                <button>Paypal Button Will be here</button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SingleOrder;
