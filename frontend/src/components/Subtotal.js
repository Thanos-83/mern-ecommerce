import React from 'react';
import './Subtotal.css';
import { Link } from 'react-router-dom';
import Currency from 'react-currency-formatter';

function Subtotal({ allCartProducts }) {
  const totalPrice = allCartProducts.cartProducts
    .map((product) => product.price * product.qty)
    .reduce((x, y) => x + y, 0)
    .toFixed(2);

  return (
    <div className='subtotal'>
      <h2 className='text-2xl font-semibold'>
        Subtotal (
        {allCartProducts.cartProducts
          .map((x) => x.qty)
          .reduce((x, y) => x + y, 0)}{' '}
        Items )
      </h2>
      <ul className='space-y-2'>
        {allCartProducts.cartProducts.map((product) => (
          <li className='flex items-center justify-between'>
            <p>Price:</p>
            <span className='block'>
              <Currency quantity={product.price * product.qty} currency='EUR' />{' '}
              ({product.qty} items){' '}
            </span>
          </li>
        ))}
      </ul>
      <p className='text-lg font-bold text-gray-900 mt-2 flex items-center justify-between'>
        Total:
        <span>
          {' '}
          <Currency quantity={totalPrice} currency='EUR' />
        </span>
      </p>
      <div className='subtotal__button'>
        <Link to='/checkout'>Procced to check out</Link>
      </div>
    </div>
  );
}

export default Subtotal;
