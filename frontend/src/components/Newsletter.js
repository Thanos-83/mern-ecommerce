import React from 'react';
import './Newsletter.css';
import { Link } from 'react-router-dom';
function Newletter() {
  return (
    <div className='newsletter'>
      <div className='newsletter__form'>
        <h2>Subscribe to our Newsletter</h2>
        <p>
          Sign up for the weekly newsletter and build better ecommerce stores.
        </p>
        <div className='newsletter__input'>
          <input type='text' placeholder='Ender your email' />
          <button className='newsletter__btn'>Subscribe</button>
        </div>
        <p>
          We respect your privacy. For more info click{' '}
          <span>
            <Link to='/'>here</Link>
          </span>
          .
        </p>
      </div>
    </div>
  );
}

export default Newletter;
