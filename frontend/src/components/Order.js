import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import Collapse from '@material-ui/core/Collapse';
import Alert from '@material-ui/lab/Alert';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './Order.css';
import { createOrder } from '../features/orders/createOrderSlice';
import { useHistory } from 'react-router-dom';
import { resetCartItems } from '../features/cart/cartSlice';

function Order({ back, activeStep }) {
  const [open, setOpen] = useState(true);
  const dispatch = useDispatch();
  const history = useHistory();
  const cart = useSelector((state) => state.cartProducts);
  const orderCreate = useSelector((state) => state.createOrder);

  const numberOfProducts = cart.cartProducts
    .map((item) => item.qty)
    .reduce((acc, curr) => acc + curr, 0);
  const netItemsPrice = cart.cartProducts.reduce(
    (acc, curr) => acc + curr.qty * curr.price,
    0
  );

  const taxPrice = (netItemsPrice * 0.24).toFixed(2);
  const shippingPrice = netItemsPrice > 100 ? 0 : 100;
  const totalPrice = (netItemsPrice * 1.24 + shippingPrice).toFixed(2);

  const { success, error } = orderCreate;
  const handleCreateOrder = () => {
    const orderDetails = {
      orderItems: cart.cartProducts,
      shippingAddress: cart.shippingAddress,
      paymentMethod: cart.paymentMethod,
      itemsPrice: netItemsPrice,
      shippingPrice: shippingPrice,
      taxPrice: taxPrice,
      totalPrice: totalPrice,
    };
    if (error) {
      setOpen(true);
    } else {
      dispatch(createOrder(orderDetails));
      dispatch(resetCartItems());
      // localStorage.setItem('cartItems', []);
    }
  };

  useEffect(() => {
    if (success) {
      history.push('/profile');
    }
  }, [success, history]);
  return (
    <div className='order'>
      {error ? (
        <Collapse in={open}>
          <Alert
            variant='filled'
            severity='error'
            onClose={() => setOpen(false)}>
            {error}
          </Alert>
        </Collapse>
      ) : null}
      <div className='order__details'>
        <div className='order__detailsLeft'>
          <div className='order__address'>
            <h3>Shipping Address</h3>
            <p>Street: {cart.shippingAddress.street}</p>
            <p>Number: {cart.shippingAddress.streetNumber}</p>
            <p>City: {cart.shippingAddress.city}</p>
            <p>Postal Code: {cart.shippingAddress.postalCode}</p>
          </div>
          <div className='order__paymentMethod'>
            <h3>Payment Method</h3>
            <p>Method: {cart.paymentMethod}</p>
          </div>
          <div className='order__items'>
            <h3>Order Products</h3>
            {cart.cartProducts.length >= 1 ? (
              <>
                {cart.cartProducts.map((product, index) => (
                  <div className='order__itemsInfo'>
                    <Link to={`/product/${product.id}`}>
                      <img src={product.image} alt='' />
                    </Link>
                    <Link to={`/product/${product.id}`}>
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
              <p>Your cart is empty</p>
            )}
          </div>
        </div>
        <div className='order__detailsRight'>
          <h3>Order Summary</h3>
          <div className='order__summary'>
            <div className='order__summaryItems'>
              <h4>Items : {numberOfProducts}</h4>
            </div>
            <div className='order__summaryShipping'>
              <h4>Shipping : {shippingPrice === 0 ? 'Free' : shippingPrice}</h4>
              <p></p>
            </div>
            <div className='order__summaryTax'>
              <h4>Tax : 24% </h4>
              <p></p>
            </div>
            <div className='order__summaryTotal'>
              <h4>Total : {totalPrice}$</h4>
              <p></p>
            </div>
          </div>
          <div className='order__btns'>
            <Button
              variant='contained'
              color='primary'
              className='order__btnNext'
              onClick={handleCreateOrder}>
              Order Now
            </Button>
            <Button
              variant='contained'
              disabled={activeStep === 0}
              onClick={back}
              className='order__btnBack'>
              Back
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Order;
