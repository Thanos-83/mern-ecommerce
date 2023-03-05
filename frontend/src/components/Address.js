import React, { useState } from 'react';
import './Address.css';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAddress } from '../features/cart/cartSlice';
function Address({ next, back, activeStep }) {
  const dispatch = useDispatch();
  const cartInfo = useSelector((state) => state.cartProducts);
  console.log(cartInfo);
  const { shippingAddress } = cartInfo;
  const [street, setStreet] = useState(shippingAddress.street);
  const [streetNumber, setStreetNumber] = useState(
    shippingAddress.streetNumber
  );
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      saveShippingAddress({
        street,
        streetNumber,
        city,
        postalCode,
      })
    );
    next();
  };
  return (
    <div className='address'>
      <h2>Fill the delivery address info</h2>

      <form className='address__form'>
        <div className='address__street'>
          <label> Street</label>
          <TextField
            required
            id='filled-required'
            // label='Required'
            defaultValue={street}
            variant='outlined'
            onChange={(e) => setStreet(e.target.value)}
          />
        </div>
        <div className='address__number'>
          <label> Number</label>
          <TextField
            required
            id='filled-required'
            // label='Required'
            defaultValue={streetNumber}
            variant='outlined'
            onChange={(e) => setStreetNumber(e.target.value)}
          />
        </div>
        <div className='address__city'>
          <label> City</label>
          <TextField
            required
            id='filled-required'
            // label='Required'
            defaultValue={city}
            variant='outlined'
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
        <div className='address__postalCode'>
          <label> Postal Code</label>
          <TextField
            required
            id='filled-required'
            // label='Required'
            defaultValue={postalCode}
            variant='outlined'
            onChange={(e) => setPostalCode(e.target.value)}
          />
        </div>
        <div className='address__btns'>
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
            onClick={handleSubmit}
            className='checkout__btnNext'>
            {activeStep === 2 ? 'Finish' : 'Next'}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Address;
