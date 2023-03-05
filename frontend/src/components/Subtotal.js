import React from 'react';
import './Subtotal.css';
import { Link } from 'react-router-dom';

function Subtotal({ allCartProducts }) {
  const totalPrice = allCartProducts.cartProducts
    .map((product) => product.price * product.qty)
    .reduce((x, y) => x + y, 0)
    .toFixed(2);

  return (
    <div className='subtotal'>
      <h2>
        Subtotal (Items:{' '}
        {allCartProducts.cartProducts
          .map((x) => x.qty)
          .reduce((x, y) => x + y, 0)}
        )
      </h2>
      <ul>
        {allCartProducts.cartProducts.map((product) => (
          <li>
            <p>Price: {(product.price * product.qty).toFixed(2)} $</p>
            <span>({product.qty} items) </span>
          </li>
        ))}
      </ul>
      <p className='subtotal__total'>Total: {totalPrice} $</p>
      <div className='subtotal__button'>
        <Link to='/checkout'>Procced to check out</Link>
      </div>
    </div>
  );
}

export default Subtotal;
