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
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Currency from 'react-currency-formatter';
function CartItems({ handleClose }) {
  const dispatch = useDispatch();
  const CartProductsInfo = useSelector(cartProducts);
  // const { active } = useSelector(cartProducts);

  const handleCloseCartItemsSidebar = () => {
    dispatch(closeCartItemsSidebar());
  };
  return (
    <div className={`cartItems ${CartProductsInfo.active ? 'open' : 'close'}`}>
      <div className='cartItems__header border-b pb-2 mb-4'>
        <h2 className='text-xl'>Cart Items(s)</h2>
        <button onClick={handleCloseCartItemsSidebar} type='button'>
          <Close />
        </button>
      </div>
      <div className='cartItems__container'>
        <div className='cartItems__itemsContainer '>
          {CartProductsInfo.cartProducts.length > 0 ? (
            CartProductsInfo.cartProducts.map((product) => (
              <CartItem
                img={product?.image}
                name={product?.name}
                price={product?.price}
                id={product?.id}
                qty={product.qty}
                key={product?.id}
              />
            ))
          ) : (
            <div className='flex flex-col justify-center items-center space-y-6  h-full'>
              <h3 className='text-3xl font-semibold text-slate-500'>
                Your cart is empty
              </h3>
              <AddShoppingCartIcon className='!w-24 !h-24 text-amber-500' />
            </div>
          )}
        </div>
      </div>
      <div className='cartItems__btns pt-2 shadow-md'>
        <div className='cartItems__totalPriceContainer'>
          <div className='cartItems__subtotal'>
            <h3 className='text-xl font-semibold'>Subtotal</h3>
            <p className='text-md text-gray-700'>
              <Currency
                quantity={
                  CartProductsInfo.cartProducts
                    .map((product) => product.price * product.qty)
                    .reduce((x, y) => x + y, 0) / 1.24
                }
                currency='EUR'
              />
            </p>
          </div>
          <div className='cartItems__vat'>
            <h3 className='text-xl font-semibold'>Vat 24%</h3>
            <p className='text-md text-gray-700'>
              <Currency
                quantity={
                  CartProductsInfo.cartProducts
                    .map((product) => product.price * product.qty)
                    .reduce((x, y) => x + y, 0) -
                  CartProductsInfo.cartProducts
                    .map((product) => product.price * product.qty)
                    .reduce((x, y) => x + y, 0) /
                    1.24
                }
                currency='EUR'
              />
            </p>
          </div>
          <div className='cartItems__total'>
            <h3 className='text-xl font-semibold'>Total</h3>
            <p className='text-md text-gray-900'>
              <Currency
                quantity={CartProductsInfo.cartProducts
                  .map((product) => product.price * product.qty)
                  .reduce((x, y) => x + y, 0)}
                currency='EUR'
              />
            </p>
          </div>
        </div>
        <Link
          className='cartItems__btn text-white'
          to='/cart'
          onClick={() => handleCloseCartItemsSidebar()}>
          Shopping Cart
        </Link>
      </div>
    </div>
  );
}

export default CartItems;
