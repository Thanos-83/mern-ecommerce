import React from 'react';
import './CartItems.css';
import CartItem from './CartItem';
import { useSelector, useDispatch } from 'react-redux';
import { cartProducts } from '../features/cart/cartSlice';
import { Link } from 'react-router-dom';
import { Close } from '@material-ui/icons';
import {
  // openCartItemsSidebar,
  closeCartItemsSidebar,
} from '../features/cart/cartSlice';
function CartItems({ handleClose }) {
  const dispatch = useDispatch();
  const CartProductsInfo = useSelector(cartProducts);
  // const { active } = useSelector(cartProducts);

  const handleCloseCartItemsSidebar = () => {
    dispatch(closeCartItemsSidebar());
  };
  return (
    <div className={`cartItems ${CartProductsInfo.active ? 'open' : 'close'}`}>
      <div className='cartItems__header'>
        <h2>Cart Items(s)</h2>
        <button onClick={handleCloseCartItemsSidebar} type='button'>
          <Close />
        </button>
      </div>
      <div className='cartItems__container'>
        <div className='cartItems__itemsContainer'>
          {CartProductsInfo.cartProducts.map((product) => (
            <CartItem
              img={product?.image}
              name={product?.name}
              price={product?.price}
              id={product?.id}
              qty={product.qty}
              key={product?.id}
            />
          ))}
        </div>
        <div className='cartItems__btns'>
          <div className='cartItems__totalPriceContainer'>
            <div className='cartItems__subtotal'>
              <h3>Subtotal</h3>
              <p>
                1023.34 <span>Euro</span>
              </p>
            </div>
            <div className='cartItems__vat'>
              <h3>Vat 24%</h3>
              <p>
                123.34 <span>Euro</span>
              </p>
            </div>
            <div className='cartItems__total'>
              <h3>Total</h3>
              <p>
                1234.34 <span>Euro</span>
              </p>
            </div>
          </div>
          <Link
            className='cartItems__btn'
            to='/cart'
            onClick={() => handleCloseCartItemsSidebar()}>
            Shopping Cart
          </Link>
          {/* <Link className='cartItems__btn' to='/' onClick={() => handleClose()}>
          Continue Shopping
        </Link> */}
        </div>
      </div>
    </div>
  );
}

export default CartItems;
