import React, { useState } from 'react';
import './PaymentMethod.css';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Alert from '@material-ui/lab/Alert';

import { useDispatch } from 'react-redux';
import { savePaymentMethod } from '../features/cart/cartSlice';

function PaymentMethod({ next, back, activeStep }) {
  const dispatch = useDispatch();

  const [paymentMethod, setPaymentMethod] = useState('');
  const [error, setError] = useState('');
  const handlePaymentMethod = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    if (paymentMethod !== '') {
      next();
    } else {
      setError('Please choose a payment method');
    }
  };

  const handleChange = (e) => {
    setPaymentMethod(e.target.value);
    setError('');
  };
  return (
    <div className='payment'>
      {error ? (
        <Alert className='payment__warning' severity='info'>
          {error}
        </Alert>
      ) : null}
      <h3>Payment method!</h3>
      <div className='payment__method'>
        <div className='payment__checkbox'>
          <Checkbox
            checked={paymentMethod === 'PayPal'}
            value='PayPal'
            onChange={handleChange}
          />
          <label>PayPal</label>
        </div>
        <div className='payment__checkbox'>
          <Checkbox
            checked={paymentMethod === 'cart'}
            value='cart'
            onChange={handleChange}
          />
          <label>Credit/Debit cart</label>
        </div>
        <div className='payment__checkbox'>
          <Checkbox
            checked={paymentMethod === 'cash'}
            value='cash'
            onChange={handleChange}
          />
          <label>Cash on delivery</label>
        </div>
      </div>

      <div className='payment__btns'>
        <Button
          variant='contained'
          disabled={activeStep === 0}
          onClick={back}
          className='checkout__btnBack'>
          Back
        </Button>
        <Button
          variant='contained'
          color='primary'
          onClick={handlePaymentMethod}
          className='checkout__btnNext'>
          {activeStep === 2 ? 'Finish' : 'Next'}
        </Button>
      </div>
    </div>
  );
}

export default PaymentMethod;
