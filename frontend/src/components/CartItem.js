import React from 'react';
import { Link } from 'react-router-dom';
import './CartItem.css';
function CartItem({ img, name, price, qty, id }) {
  return (
    <div className='cartItem'>
      <Link to={`/product/${id}`}>
        <img src={img} alt={`cart items product ${name}`} />
      </Link>
      <div className='cartItem__right'>
        <p>{name}</p>
        <div className='cartItem__price'>
          <h4>Price: {price}</h4>
          <p>(x {qty})</p>
        </div>
        <div className='cartItem__total'>
          <p>Subtotal: {(qty * price).toFixed(2)} $</p>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
