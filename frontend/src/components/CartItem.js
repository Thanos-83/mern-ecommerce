import React from 'react';
import { Link } from 'react-router-dom';
import Currency from 'react-currency-formatter';
import './CartItem.css';
function CartItem({ img, name, price, qty, id }) {
  return (
    <div className='cartItem border-b border-b-slate-200'>
      <Link to={`/product/${id}`}>
        <img src={img.secureUrl} alt={`cart items product ${name}`} />
      </Link>
      <div className='cartItem__right'>
        <p className='line-clamp-1'>{name}</p>
        <div className='cartItem__price'>
          <h4>
            Price: : <Currency quantity={price} currency='EUR' />
          </h4>
          <p>(x {qty})</p>
        </div>
        <div className='cartItem__total'>
          <p>
            Subtotal: <Currency quantity={qty * price} currency='EUR' />
          </p>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
