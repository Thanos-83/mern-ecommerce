import React from 'react';
import './ShoppingInfo.css';
import { Link } from 'react-router-dom';
import {
  LocalShipping,
  Payment,
  AssignmentReturn,
  ChevronRight,
} from '@material-ui/icons/';
import RowContainer from './RowContainer';
function ShoppingInfo() {
  return (
    <RowContainer>
      <div className='shoppingInfo__container'>
        <div className='shipping__info'>
          <LocalShipping />
          <h3>Free Shipping</h3>
          <p>On orders over $75.00</p>
          <Link to='/'>
            Learn More <ChevronRight />{' '}
          </Link>
        </div>
        <div className='payment__info'>
          <Payment />
          <h3>100% Secure Payment</h3>
          <p>We ensure secure payment with PEV</p>
          <Link to='/'>
            Learn More <ChevronRight />{' '}
          </Link>
        </div>
        <div className='return__info'>
          <AssignmentReturn />
          <h3>20 Days Return</h3>
          <p>Return it within 20 day for an exchange</p>
          <Link to='/'>
            Learn More <ChevronRight />{' '}
          </Link>
        </div>
      </div>
    </RowContainer>
  );
}

export default ShoppingInfo;
