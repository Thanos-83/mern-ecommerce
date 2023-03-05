import React from 'react';
import './ShoppingCart.css';
import CartProduct from '../components/CartProduct.js';
import Subtotal from '../components/Subtotal';

import { useSelector } from 'react-redux';
import { cartProducts } from '../features/cart/cartSlice';
import RowContainer from '../components/RowContainer';
function Card() {
  const allCartProducts = useSelector(cartProducts);

  return (
    <RowContainer>
      <div className='cart'>
        <h2>Shopping cart component</h2>
        <div className='cart__content'>
          <div className='cart__contentLeft'>
            {allCartProducts.cartProducts.length === 0 ? (
              <h2>Your Shopping Cart is empty</h2>
            ) : (
              <>
                <h2 className='cart__contentTitle'>
                  Shopping cart{' '}
                  {`(${allCartProducts.cartProducts.length} items)`}
                </h2>
                {allCartProducts.cartProducts.map((product) => (
                  <CartProduct
                    img={product?.image}
                    name={product?.name}
                    price={product?.price}
                    id={product?.id}
                    qty={product.qty}
                    key={product?.id}
                  />
                ))}
              </>
            )}
          </div>
          <div className='cart__contentRight'>
            <Subtotal allCartProducts={allCartProducts} />
          </div>
        </div>
      </div>
    </RowContainer>
  );
}

export default Card;
